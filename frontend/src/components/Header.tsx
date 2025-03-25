import React from 'react';
import { Moon, Sun, Shield } from 'lucide-react';

interface HeaderProps {
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
}

export function Header({ theme, onThemeToggle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Logo and App Name */}
        <div className="flex items-center space-x-2">
          <Shield className="h-6 w-6" />
          <span className="font-bold text-xl">Sage Shield</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-1 items-center justify-center space-x-4">
          <a
            href="#monitoring"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Live Monitoring
          </a>
          <a
            href="#blocked"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Blocked IPs
          </a>
        </nav>

        {/* Theme Toggle Button */}
        <button
          onClick={onThemeToggle}
          className="rounded-full p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>
      </div>
    </header>
  );
}