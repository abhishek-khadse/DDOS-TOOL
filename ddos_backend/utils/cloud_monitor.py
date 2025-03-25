import boto3  # For AWS (replace with appropriate SDK for other clouds)
from datetime import datetime, timedelta

def fetch_traffic_data():
    """
    Fetch traffic data from cloud provider
    Returns sample data matching frontend expectations
    """
    return [
        {
            "timestamp": datetime.now().isoformat(),
            "source_ip": "192.168.1.1",
            "requests_per_second": 150,
            "bandwidth": "1.5 MB/s",
            "status": "normal"
        }
    ]

def get_blocked_ips_list():
    """
    Get list of currently blocked IPs
    Returns data structure matching frontend expectations
    """
    return [
        {
            "ip": "192.168.1.100",
            "reason": "Suspicious activity",
            "timestamp": datetime.now().isoformat(),
            "automatic": True
        }
    ]