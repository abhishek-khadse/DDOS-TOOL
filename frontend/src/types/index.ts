export interface NetworkTraffic {
  id: string;
  sourceIp: string;
  destinationIp: string;
  protocol: string;
  length: number;
  timestamp: string;
  isSuspicious: boolean;
}

export interface BlockedIP {
  ip: string;
  reason: string;
  timestamp: string;
  automatic: boolean;
}

export interface LogEntry extends NetworkTraffic {
  type: 'info' | 'warning' | 'error';
  message: string;
}

export type Theme = 'light' | 'dark';