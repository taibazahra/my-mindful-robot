from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class GratitudeEntry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    entries = db.Column(db.Text, nullable=False)  # comma-separated values
    mood = db.Column(db.String(50))
    date = db.Column(db.Date, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'entries': self.entries.split(','),
            'mood': self.mood,
            'date': self.date.strftime('%Y-%m-%d')
        }
