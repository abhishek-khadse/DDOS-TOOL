import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { NetworkTable } from './components/NetworkTable';
import { BlockedIPs } from './components/BlockedIPs';
import type { NetworkTraffic, BlockedIP } from './types';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [traffic, setTraffic] = useState<NetworkTraffic[]>([]);
  const [blockedIPs, setBlockedIPs] = useState<BlockedIP[]>([]);

  // Fetch traffic data from the Flask backend
  const fetchTrafficData = async () => {
    console.log('Fetching traffic data...');
    try {
      const response = await fetch('http://localhost:5000/api/traffic');
      console.log('Traffic Response:', response);
      const data = await response.json();
      console.log('Traffic Data:', data);
      setTraffic(data);
    } catch (error) {
      console.error('Error fetching traffic data:', error);
    }
  };

  // Fetch blocked IPs from the Flask backend
  const fetchBlockedIPs = async () => {
    console.log('Fetching blocked IPs...');
    try {
      const response = await fetch('http://localhost:5000/api/blocked-ips');
      console.log('Blocked IPs Response:', response);
      const data = await response.json();
      console.log('Blocked IPs Data:', data);
      setBlockedIPs(data);
    } catch (error) {
      console.error('Error fetching blocked IPs:', error);
    }
  };

  // Add a new blocked IP
  const handleAddIP = async (ip: string, reason: string) => {
    console.log('Adding blocked IP:', { ip, reason });
    try {
      const response = await fetch('http://localhost:5000/api/block-ip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ip, reason }),
      });
      console.log('Block IP Response:', response);
      if (response.ok) {
        const data = await response.json();
        console.log('Block IP Data:', data);
        fetchBlockedIPs(); // Refresh the blocked IPs list
      }
    } catch (error) {
      console.error('Error blocking IP:', error);
    }
  };

  // Remove a blocked IP
  const handleRemoveIP = async (ip: string) => {
    console.log('Removing blocked IP:', ip);
    try {
      const response = await fetch(`http://localhost:5000/api/unblock-ip/${ip}`, {
        method: 'DELETE',
      });
      console.log('Unblock IP Response:', response);
      if (response.ok) {
        const data = await response.json();
        console.log('Unblock IP Data:', data);
        fetchBlockedIPs(); // Refresh the blocked IPs list
      }
    } catch (error) {
      console.error('Error unblocking IP:', error);
    }
  };

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchTrafficData();
    fetchBlockedIPs();
  }, []);

  return (
    <div className={`min-h-screen bg-background text-foreground ${theme === 'dark' ? 'dark' : ''}`}>
      <Header theme={theme} onThemeToggle={toggleTheme} />
      
      <main className="container py-8">
        <div className="space-y-8">
          {/* Live Network Monitoring Section */}
          <section id="monitoring">
            <h2 className="mb-4 text-2xl font-bold">Live Network Monitoring</h2>
            <NetworkTable traffic={traffic} />
          </section>

          {/* Blocked IPs Section */}
          <section id="blocked">
            <h2 className="mb-4 text-2xl font-bold">Blocked IPs</h2>
            <BlockedIPs
              blockedIPs={blockedIPs}
              onRemoveIP={handleRemoveIP}
              onAddIP={handleAddIP}
            />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            System Status: Connected to Backend
          </p>
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Documentation
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;