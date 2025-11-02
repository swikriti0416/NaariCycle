from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta
import numpy as np
from sklearn.linear_model import LinearRegression

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    age = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Period tracking related fields
    average_cycle_length = db.Column(db.Integer, default=28)
    average_period_length = db.Column(db.Integer, default=5)
    last_period_start = db.Column(db.Date)
    
    cycles = db.relationship('Cycle', backref='user', lazy=True)
    symptoms = db.relationship('Symptom', backref='user', lazy=True)
    
    def predict_next_period(self):
        if not self.last_period_start:
            return None
            
        # Simple prediction based on average cycle length
        next_start = self.last_period_start + timedelta(days=self.average_cycle_length)
        
        # If we have historical data, use ML for better prediction
        if len(self.cycles) >= 3:
            return self.predict_with_ml()
            
        return next_start
    
    def predict_with_ml(self):
        # Simple linear regression based on previous cycle lengths
        cycles = sorted(self.cycles, key=lambda x: x.start_date)
        X = np.array(range(len(cycles))).reshape(-1, 1)
        y = np.array([c.cycle_length for c in cycles])
        
        model = LinearRegression()
        model.fit(X, y)
        
        next_cycle_length = model.predict([[len(cycles)]])[0]
        next_start = self.last_period_start + timedelta(days=next_cycle_length)
        
        return next_start
    
    def get_fertility_window(self):
        next_period = self.predict_next_period()
        if not next_period:
            return None
            
        # Fertility window is typically 5 days before ovulation
        # Ovulation usually occurs about 14 days before next period
        ovulation_date = next_period - timedelta(days=14)
        fertility_start = ovulation_date - timedelta(days=5)
        fertility_end = ovulation_date + timedelta(days=1)
        
        return {
            'ovulation_date': ovulation_date,
            'fertility_start': fertility_start,
            'fertility_end': fertility_end
        }
    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'age': self.age,
            'average_cycle_length': self.average_cycle_length,
            'average_period_length': self.average_period_length,
            'last_period_start': self.last_period_start.isoformat() if self.last_period_start else None
        }

class Cycle(db.Model):
    __tablename__ = 'cycles'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date)
    symptoms = db.Column(db.String(500))
    mood = db.Column(db.String(100))
    flow_intensity = db.Column(db.String(50))  # light, medium, heavy
    
    @property
    def cycle_length(self):
        if not self.end_date:
            return None
        return (self.end_date - self.start_date).days + 1
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'start_date': self.start_date.isoformat(),
            'end_date': self.end_date.isoformat() if self.end_date else None,
            'symptoms': self.symptoms,
            'mood': self.mood,
            'flow_intensity': self.flow_intensity,
            'cycle_length': self.cycle_length
        }

class Symptom(db.Model):
    __tablename__ = 'symptoms'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    symptom_type = db.Column(db.String(100), nullable=False)  # cramping, headache, etc.
    severity = db.Column(db.String(50))  # mild, moderate, severe
    notes = db.Column(db.String(500))
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'date': self.date.isoformat(),
            'symptom_type': self.symptom_type,
            'severity': self.severity,
            'notes': self.notes
        }