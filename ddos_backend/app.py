from flask import Flask, jsonify, request
from flask_cors import CORS  # Enable CORS for frontend-backend communication
from datetime import datetime
import os
from dotenv import load_dotenv
from models import BlockedIP, NetworkTraffic
from utils.cloud_monitor import fetch_traffic_data, get_blocked_ips_list
from utils.mitigation import block_ip, scale_resources, unblock_ip
from utils.alerting import send_alert
from utils.anomaly_detection import detect_anomalies

load_dotenv()  # Load environment variables

app = Flask(__name__)
CORS(app)  # Allow all origins (update this for production)

# Home route - Health check
@app.route('/')
def home():
    return "DDoS Detection Backend is running!"

# API to fetch traffic data
@app.route('/api/traffic', methods=['GET'])
def traffic():
    traffic_data = fetch_traffic_data()
    return jsonify(traffic_data)

# API to detect anomalies
@app.route('/api/detect', methods=['POST'])
def detect():
    traffic_data = fetch_traffic_data()
    anomalies = detect_anomalies(traffic_data)
    
    if anomalies and anomalies['total_anomalies'] > 0:
        send_alert(f"DDoS Attack Detected! Suspicious IPs: {anomalies['suspicious_ips']}")
        block_ip(anomalies['suspicious_ips'])
        scale_resources()
    
    return jsonify(anomalies)

# API to block a specific IP
@app.route('/api/block-ip', methods=['POST'])
def block_ip_route():
    data = request.json
    ip = data.get('ip')
    reason = data.get('reason', 'Manual block')
    
    if ip:
        block_ip([ip], reason)
        return jsonify({
            "status": "success",
            "message": f"Blocked IP: {ip}",
            "ip": ip,
            "reason": reason,
            "timestamp": datetime.now().isoformat(),
            "automatic": False
        })
    return jsonify({"status": "error", "message": "No IP provided"}), 400

# API to get blocked IPs
@app.route('/api/blocked-ips', methods=['GET'])
def get_blocked_ips():
    blocked_ips = get_blocked_ips_list()
    return jsonify(blocked_ips)

# API to unblock an IP
@app.route('/api/unblock-ip/<ip>', methods=['DELETE'])
def unblock_ip_route(ip):
    unblock_ip(ip)
    return jsonify({"status": "success", "message": f"Unblocked IP: {ip}"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)