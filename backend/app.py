from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from datetime import datetime

app = Flask(__name__)
CORS(app)

DATA_FILE = 'gratitude_data.json'

# Load existing gratitude entries from file
def load_data():
    try:
        with open(DATA_FILE, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return []

# Save gratitude entries to file
def save_data(entries):
    with open(DATA_FILE, 'w') as f:
        json.dump(entries, f, indent=4)

# Save a new gratitude journal entry
@app.route('/api/gratitude', methods=['POST'])
def save_gratitude():
    data = request.json
    entries = load_data()
    today_entry = {
        'date': datetime.now().strftime('%Y-%m-%d'),
        'entries': data.get('entries', [])
    }
    entries.append(today_entry)
    save_data(entries)
    return jsonify({'message': 'Gratitude saved successfully'}), 200

# Get gratitude entries from the last 7 days
@app.route('/api/gratitude/weekly', methods=['GET'])
def get_weekly_entries():
    entries = load_data()
    recent_entries = []
    for entry in entries[-7:]:
        recent_entries.extend(entry['entries'])
    return jsonify({'entries': recent_entries}), 200

if __name__ == '__main__':
    app.run(port=5000, debug=True)
