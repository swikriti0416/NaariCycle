import psycopg2
from flask import Flask, request, jsonify

app = Flask(__name__)

# Database connection details
DB_CONFIG = {
    "host": "localhost",
    "user": "postgres",       
    "password": "MySuperSecretP@ssw0rd!", 
    "database": "naaricycle"  
}

def get_db_connection():
    conn = psycopg2.connect(
        host=DB_CONFIG["host"],
        database=DB_CONFIG["database"],
        user=DB_CONFIG["user"],
        password=DB_CONFIG["MySuperSecretP@ssw0rd!"]
    )
    return conn
