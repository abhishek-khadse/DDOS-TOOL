export interface BlockedIP {
  ip: string;
  reason: string;
  timestamp: string;
  automatic: boolean;
}

export interface NetworkTraffic {
  timestamp: string;
  source_ip: string;
  requests_per_second: number;
  bandwidth: string;
  status: string;
} 