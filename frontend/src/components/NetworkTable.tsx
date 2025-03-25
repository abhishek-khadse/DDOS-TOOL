import React from 'react';
import { NetworkTraffic } from '../types';
import { AlertTriangle } from 'lucide-react';

interface NetworkTableProps {
  traffic: NetworkTraffic[];
}

export function NetworkTable({ traffic }: NetworkTableProps) {
  // Get only the last 10 entries and reverse the order for display
  const recentTraffic = traffic.slice(-10).reverse();

  return (
    <div className="rounded-lg border bg-card">
      <div className="h-[400px] overflow-hidden">
        <table className="w-full">
          <thead className="sticky top-0 bg-muted/50">
            <tr>
              <th className="whitespace-nowrap p-3 text-left font-medium">Time</th>
              <th className="whitespace-nowrap p-3 text-left font-medium">Source IP</th>
              <th className="whitespace-nowrap p-3 text-left font-medium">Requests/s</th>
              <th className="whitespace-nowrap p-3 text-left font-medium">Bandwidth</th>
              <th className="whitespace-nowrap p-3 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentTraffic.map((item) => (
              <tr
                key={`${item.source_ip}-${item.timestamp}`}
                className={`border-t transition-colors ${
                  item.status === 'suspicious'
                    ? 'animate-pulse bg-red-50 dark:bg-red-900/20'
                    : 'hover:bg-muted/50'
                }`}
              >
                <td className="whitespace-nowrap p-3 font-mono text-sm">
                  {new Date(item.timestamp).toLocaleTimeString()}
                </td>
                <td className="whitespace-nowrap p-3 font-mono">{item.source_ip}</td>
                <td className="whitespace-nowrap p-3">
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-sm font-medium text-primary">
                    {item.requests_per_second}
                  </span>
                </td>
                <td className="whitespace-nowrap p-3">
                  <span className="text-sm text-muted-foreground">
                    {item.bandwidth}
                  </span>
                </td>
                <td className="whitespace-nowrap p-3">
                  {item.status === 'suspicious' ? (
                    <div className="flex items-center text-red-600 dark:text-red-400">
                      <AlertTriangle className="mr-1 h-4 w-4" />
                      <span className="text-sm">Suspicious</span>
                    </div>
                  ) : (
                    <span className="text-sm text-green-600 dark:text-green-400">
                      {item.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
            {recentTraffic.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-muted-foreground">
                  No network traffic detected
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}