from typing import TypedDict, List
from datetime import datetime

class BlockedIP(TypedDict):
    ip: str
    reason: str
    timestamp: str
    automatic: bool

class NetworkTraffic(TypedDict):
    timestamp: str
    source_ip: str
    requests_per_second: int
    bandwidth: str
    status: str 