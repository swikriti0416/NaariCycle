import psycopg2
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import json
import os
from dotenv import load_dotenv
import traceback

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

app = Flask(__name__)
CORS(app, supports_credentials=True)  # Enable CORS for all routes

# PostgreSQL connection
def get_db_connection():
    conn = psycopg2.connect(DATABASE_URL)
    return conn

# Confidence calculation
def calculate_confidence(previous_dates, avg_cycle_length):
    if not previous_dates or len(previous_dates) <= 1:
        return 70.0, "single_cycle"
    
    prev_dates = sorted([datetime.strptime(date, "%Y-%m-%d") for date in previous_dates])
    days_between = [(prev_dates[i] - prev_dates[i - 1]).days for i in range(1, len(prev_dates))]
    
    std_dev = np.std(days_between) if len(days_between) > 1 else 0
    confidence = max(60, min(95, 95 - (std_dev * 3)))
    
    calculated_avg = np.mean(days_between) if days_between else avg_cycle_length
    method = "linear_regression" if abs(calculated_avg - avg_cycle_length) > 3 else "average_cycle"
    
    return round(confidence, 1), method

# Prediction logic
def train_predict_model(avg_cycle_length, avg_period_length, previous_dates):
    if not previous_dates:
        raise ValueError("Previous dates are required to make predictions")
    
    prev_dates = sorted([datetime.strptime(date, "%Y-%m-%d") for date in previous_dates])
    avg_cycle_length = int(avg_cycle_length)
    avg_period_length = int(avg_period_length)

    # Calculate average and confidence
    if len(prev_dates) > 1:
        days_between_periods = [(prev_dates[i] - prev_dates[i-1]).days for i in range(1, len(prev_dates))]
        calculated_avg_cycle = np.mean(days_between_periods)
        std_dev = np.std(days_between_periods) if len(days_between_periods) > 1 else 0
        confidence = max(60, min(95, 95 - (std_dev * 3)))
        method = "linear_regression" if abs(calculated_avg_cycle - avg_cycle_length) > 3 else "average_cycle"
        if method == "linear_regression":
            avg_cycle_length = calculated_avg_cycle
    else:
        confidence = 70
        method = "single_cycle"

    last_period = prev_dates[-1]
    predicted_start = last_period + timedelta(days=int(avg_cycle_length))
    today = datetime.now()
    cycle_day = (today - last_period).days + 1
    cycle_day = max(1, min(cycle_day, int(avg_cycle_length)))

    ovulation_date = predicted_start - timedelta(days=14)
    days_to_ovulation = (ovulation_date - today).days
    if -1 <= days_to_ovulation <= 1:
        fertility_status = "High"
    elif -3 <= days_to_ovulation <= 3:
        fertility_status = "Medium"
    else:
        fertility_status = "Low"

    return predicted_start.date(), cycle_day, ovulation_date.date(), fertility_status, round(confidence, 1), method

# Test endpoint
@app.route('/test', methods=['GET', 'OPTIONS'])
def test():
    if request.method == 'OPTIONS':
        return '', 204
    return jsonify({"message": "Flask server is running!", "status": "ok"})

# Health check
@app.route('/health', methods=['GET', 'OPTIONS'])
def health_check():
    if request.method == 'OPTIONS':
        return '', 204
    try:
        conn = get_db_connection()
        conn.close()
        return jsonify({"status": "healthy", "database": "connected", "message": "Server is running successfully"})
    except Exception as e:
        return jsonify({"status": "unhealthy", "database": "disconnected", "error": str(e)}), 500

# GET latest prediction
@app.route('/predictions/<user_id>', methods=['GET'])
def get_prediction(user_id):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("""
            SELECT id, user_id, avg_cycle_length, avg_period_length, 
                   previous_dates, predicted_start, cycle_day, 
                   ovulation_date, fertility_status, created_at
            FROM predictions 
            WHERE user_id = %s
            ORDER BY created_at DESC
            LIMIT 1;
        """, (user_id,))
        result = cur.fetchone()
        cur.close()
        conn.close()

        if not result:
            return jsonify({"error": "No predictions found for this user"}), 404

        previous_dates = json.loads(result[4]) if result[4] else []
        confidence, method = calculate_confidence(previous_dates, result[2] or 28)
        last_period = datetime.strptime(previous_dates[-1], "%Y-%m-%d") if previous_dates else datetime.now()
        today = datetime.now()
        cycle_day = (today - last_period).days + 1
        cycle_day = max(1, min(cycle_day, result[2] or 28))

        prediction = {
            "id": result[0],
            "user_id": result[1],
            "predicted_start": result[5].strftime('%Y-%m-%d') if result[5] else None,
            "cycle_day": cycle_day,
            "ovulation_date": result[7].strftime('%Y-%m-%d') if result[7] else None,
            "fertility_status": result[8],
            "confidence": confidence,
            "method": method,
            "avg_cycle_length": result[2],
            "avg_period_length": result[3],
            "created_at": result[9].strftime('%Y-%m-%d %H:%M:%S') if result[9] else None
        }
        return jsonify({"prediction": prediction})

    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

# POST onboarding
@app.route('/onboarding', methods=['POST', 'OPTIONS'])
def onboarding():
    if request.method == 'OPTIONS':
        return '', 204
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data received"}), 400

        user_id = data.get('user_id')
        avg_cycle_length = data.get('avg_cycle_length')
        avg_period_length = data.get('avg_period_length')
        previous_dates = data.get('previous_dates')

        if not all([user_id, avg_cycle_length, avg_period_length, previous_dates]):
            return jsonify({"error": "Missing required fields"}), 400

        conn = get_db_connection()
        cur = conn.cursor()
        previous_dates_str = json.dumps(previous_dates)

        # Insert record
        cur.execute("""
            INSERT INTO predictions (user_id, avg_cycle_length, avg_period_length, previous_dates)
            VALUES (%s, %s, %s, %s) RETURNING id;
        """, (user_id, avg_cycle_length, avg_period_length, previous_dates_str))
        conn.commit()
        prediction_id = cur.fetchone()[0]

        # Generate predictions
        predicted_start, cycle_day, ovulation_date, fertility_status, confidence, method = train_predict_model(
            avg_cycle_length, avg_period_length, previous_dates
        )

        # Update database
        cur.execute("""
            UPDATE predictions 
            SET predicted_start = %s, cycle_day = %s, ovulation_date = %s, fertility_status = %s
            WHERE id = %s;
        """, (predicted_start, cycle_day, ovulation_date, fertility_status, prediction_id))
        conn.commit()
        cur.close()
        conn.close()

        response = {
            "prediction": {
                "id": prediction_id,
                "predicted_start": predicted_start.strftime('%Y-%m-%d'),
                "cycle_day": cycle_day,
                "ovulation_date": ovulation_date.strftime('%Y-%m-%d'),
                "fertility_status": fertility_status,
                "confidence": confidence,
                "method": method
            }
        }
        return jsonify(response), 200

    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("=" * 50)
    print("🚀 Starting Flask Server")
    print("=" * 50)
    app.run(debug=False, host='0.0.0.0', port=5000)
    print("=" * 50)
    print("🚀 Flask Server Stopped")
    print("=" * 50)
    