import json
import os
import requests
import psycopg2
from flask import Flask, request, jsonify
from flask_cors import CORS
from jose import jwt
from datetime import datetime, timedelta
import numpy as np
from functools import wraps
import traceback
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
AUTH0_DOMAIN = os.getenv("AUTH0_DOMAIN")
API_IDENTIFIER = os.getenv("API_IDENTIFIER")
ALGORITHMS = ['RS256']

# 🔧 Toggle Auth0 protection (set False to test without tokens)
USE_AUTH = False

# Initialize Flask app
app = Flask(__name__)
CORS(app, supports_credentials=True)

def get_db_connection():
    try:
        conn = psycopg2.connect(DATABASE_URL)
        return conn
    except Exception as e:
        print("❌ Database connection failed:", str(e))
        raise e


#  Auth0 Utilities
def get_jwk():
    url = f'https://{AUTH0_DOMAIN}/.well-known/jwks.json'
    response = requests.get(url)
    return response.json()

def verify_jwt(token):
    try:
        unverified_header = jwt.get_unverified_header(token)
        rsa_key = {}
        for key in get_jwk()['keys']:
            if key['kid'] == unverified_header['kid']:
                rsa_key = {
                    'kty': key['kty'],
                    'kid': key['kid'],
                    'use': key['use'],
                    'n': key['n'],
                    'e': key['e']
                }

        if rsa_key:
            payload = jwt.decode(
                token,
                rsa_key,
                algorithms=ALGORITHMS,
                audience=API_IDENTIFIER,
                issuer=f'https://{AUTH0_DOMAIN}/'
            )
            return payload
        else:
            raise Exception('Unable to find appropriate key')
    except Exception as e:
        raise Exception(f'Error verifying token: {str(e)}')

# -----------------------------------------------
# 🔹 Authentication Decorator
# -----------------------------------------------
def requires_auth(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # Allow preflight OPTIONS request to pass
        if request.method == 'OPTIONS':
            return '', 200

        if not USE_AUTH:
            request.user_id = "test_user"
            return f(*args, **kwargs)

        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split()[1]

        if not token:
            return jsonify({"error": "Authorization token is missing"}), 401

        try:
            payload = verify_jwt(token)
            request.user_id = payload.get('sub')
        except Exception as e:
            return jsonify({"error": str(e)}), 401

        return f(*args, **kwargs)

    return decorated_function


# -----------------------------------------------
# 🔹 Helper Functions
# -----------------------------------------------
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

def train_predict_model(avg_cycle_length, avg_period_length, previous_dates):
    if not previous_dates:
        raise ValueError("Previous dates are required to make predictions")

    prev_dates = sorted([datetime.strptime(date, "%Y-%m-%d") for date in previous_dates])
    avg_cycle_length = int(avg_cycle_length)
    avg_period_length = int(avg_period_length)

    if len(prev_dates) > 1:
        days_between_periods = [(prev_dates[i] - prev_dates[i - 1]).days for i in range(1, len(prev_dates))]
        calculated_avg_cycle = np.mean(days_between_periods)
        std_dev = np.std(days_between_periods)
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

# -----------------------------------------------
# 🔹 Routes
# -----------------------------------------------
@app.route('/test', methods=['GET'])
def test():
    return jsonify({"message": "Flask server is running!", "status": "ok"})

@app.route('/health', methods=['GET'])
def health_check():
    try:
        conn = get_db_connection()
        conn.close()
        return jsonify({"status": "healthy", "database": "connected"})
    except Exception as e:
        return jsonify({"status": "unhealthy", "database": "disconnected", "error": str(e)}), 500

@app.route('/predictions', methods=['GET', 'OPTIONS'])
@requires_auth
def get_prediction():
    # Handle preflight request
    if request.method == 'OPTIONS':
        return '', 200

    try:
        user_id = request.user_id
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

        previous_dates = result[4] if result[4] else []
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
        return jsonify({"prediction": prediction}), 200

    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@app.route('/onboarding', methods=['POST'])
@requires_auth
def onboarding():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data received"}), 400

        user_id = request.user_id
        avg_cycle_length = data.get('avg_cycle_length')
        avg_period_length = data.get('avg_period_length')
        previous_dates = data.get('previous_dates')

        if not all([avg_cycle_length, avg_period_length, previous_dates]):
            return jsonify({"error": "Missing required fields"}), 400

        conn = get_db_connection()
        cur = conn.cursor()
        previous_dates_str = json.dumps(previous_dates)

        cur.execute("""
            INSERT INTO predictions (user_id, avg_cycle_length, avg_period_length, previous_dates)
            VALUES (%s, %s, %s, %s) RETURNING id;
        """, (user_id, avg_cycle_length, avg_period_length, previous_dates_str))
        conn.commit()
        prediction_id = cur.fetchone()[0]

        predicted_start, cycle_day, ovulation_date, fertility_status, confidence, method = train_predict_model(
            avg_cycle_length, avg_period_length, previous_dates
        )

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

# -----------------------------------------------
# 🔹 Start Server
# -----------------------------------------------
if __name__ == '__main__':
    print("=" * 50)
    print("🚀 Starting Flask Server on port 5000")
    print("=" * 50)
    try:
        conn = get_db_connection()
        conn.close()
        print("✅ Database connection successful!")
    except Exception as e:
        print("❌ Database connection failed:", e)
    app.run(debug=True, host='0.0.0.0', port=5000)
