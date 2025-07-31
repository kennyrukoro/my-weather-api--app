# app.py
import os
import requests
from flask import Flask, jsonify, request

app = Flask(__WEATHERX__)

API_KEY = "dcba4dda5d661fa9120c07657173fed9"  # Put your actual key here or use environment variable

@app.route('/weather/<city>')
def weather(city):
    url = "http://api.openweathermap.org/data/2.5/weather?q={}&appid={}".format(city, API_KEY)

    response = requests.get(url)
    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({"error": "City not found"}), 404

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)

