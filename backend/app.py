import psycopg2
from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from datetime import datetime, timedelta
import json

app = Flask(__name__)

# PostgreSQL connection details
DATABASE_URL = "postgresql://username:password@localhost:5432/your_database"

# Connect to the PostgreSQL database
def get_db_connection():
    conn = psycopg2.connect(DATABASE_URL)
    return conn

# Prediction Form POST route
@app.route('/onboarding', methods=['POST'])
def onboarding():
    # Get the data from the request
    data = request.json

    user_id = data.get('user_id')
    avg_cycle_length = data.get('avg_cycle_length')
    avg_period_length = data.get('avg_period_length')
    previous_dates = data.get('previous_dates')

    # Insert the data into the database
    conn = get_db_connection()
    cur = conn.cursor()

    # Convert previous_dates to a string representation
    previous_dates_str = json.dumps(previous_dates)

    cur.execute("""
        INSERT INTO predictions (user_id, avg_cycle_length, avg_period_length, previous_dates)
        VALUES (%s, %s, %s, %s) RETURNING id;
    """, (user_id, avg_cycle_length, avg_period_length, previous_dates_str))

    conn.commit()
    prediction_id = cur.fetchone()[0]
    conn.close()

    # Train the model and get predictions (this is a simplified version)
    predicted_start, cycle_day, ovulation_date, fertility_status = train_predict_model(
        avg_cycle_length, avg_period_length, previous_dates)

    # Update the database with the predictions
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        UPDATE predictions 
        SET predicted_start = %s, cycle_day = %s, ovulation_date = %s, fertility_status = %s
        WHERE id = %s;
    """, (predicted_start, cycle_day, ovulation_date, fertility_status, prediction_id))

    conn.commit()
    conn.close()

    # Return the prediction data as a response
    response = {
        "predicted_start": predicted_start,
        "cycle_day": cycle_day,
        "ovulation_date": ovulation_date,
        "fertility_status": fertility_status
    }
    
    return jsonify(response)

# Linear Regression Model to predict cycle data (simplified example)
def train_predict_model(avg_cycle_length, avg_period_length, previous_dates):
    # Simulate training data and prediction logic
    # In a real scenario, you would use historical data to train your model

    # Example: Use the previous period dates to predict next period date
    if not previous_dates:
        raise ValueError("Previous dates are required to make predictions")

    # Convert previous period dates to datetime objects
    prev_dates = [datetime.strptime(date, "%Y-%m-%d") for date in previous_dates]
    avg_cycle_length = int(avg_cycle_length)
    avg_period_length = int(avg_period_length)

    # Calculate the next period prediction by averaging previous cycles
    days_between_periods = [(prev_dates[i] - prev_dates[i - 1]).days for i in range(1, len(prev_dates))]
    avg_cycle_length = np.mean(days_between_periods) if days_between_periods else avg_cycle_length

    # Predict the next period start date
    last_period = prev_dates[-1]
    predicted_start = last_period + timedelta(days=avg_cycle_length)

    # Predict cycle day, ovulation date, and fertility
    cycle_day = 23  # Example of a given cycle day
    ovulation_date = predicted_start - timedelta(days=14)  # Assuming ovulation is 14 days before the start of the period
    fertility_status = "Low"  # Example: You could make this dynamic based on model prediction

    return predicted_start.date(), cycle_day, ovulation_date.date(), fertility_status

if __name__ == '__main__':
    app.run(debug=True)
