import React, { useState } from 'react';
import { BlockedIP } from '../types';
import { Ban, Trash2 } from 'lucide-react';

interface BlockedIPsProps {
  blockedIPs: BlockedIP[];
  onRemoveIP: (ip: string) => void;
  onAddIP: (ip: string, reason: string) => void;
}

export function BlockedIPs({ blockedIPs, onRemoveIP, onAddIP }: BlockedIPsProps) {
  const [newIP, setNewIP] = useState('');
  const [reason, setReason] = useState('');

  // Handle form submission to block a new IP
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newIP && reason) {
      onAddIP(newIP, reason); // Call the parent function to add the IP
      setNewIP(''); // Reset the form
      setReason('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Form to add a new blocked IP */}
      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border bg-card p-4">
        <h3 className="text-lg font-medium">Add IP to Blacklist</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="ip" className="block text-sm font-medium">
              IP Address
            </label>
            <input
              type="text"
              id="ip"
              value={newIP}
              onChange={(e) => setNewIP(e.target.value)}
              className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
              placeholder="192.168.1.1"
              required
            />
          </div>
          <div>
            <label htmlFor="reason" className="block text-sm font-medium">
              Reason
            </label>
            <input
              type="text"
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
              placeholder="Manual block"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <Ban className="mr-2 h-4 w-4" />
          Block IP
        </button>
      </form>

      {/* Table to display blocked IPs */}
      <div className="rounded-lg border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="p-4 text-left font-medium">IP Address</th>
                <th className="p-4 text-left font-medium">Reason</th>
                <th className="p-4 text-left font-medium">Timestamp</th>
                <th className="p-4 text-left font-medium">Type</th>
                <th className="p-4 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blockedIPs.map((item) => (
                <tr key={item.ip} className="border-t hover:bg-muted/50">
                  <td className="p-4">{item.ip}</td>
                  <td className="p-4">{item.reason}</td>
                  <td className="p-4">{new Date(item.timestamp).toLocaleString()}</td>
                  <td className="p-4">
                    {item.automatic ? 'Automatic' : 'Manual'}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => onRemoveIP(item.ip)}
                      className="inline-flex items-center rounded-md bg-destructive px-3 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              {blockedIPs.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-muted-foreground">
                    No blocked IPs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}