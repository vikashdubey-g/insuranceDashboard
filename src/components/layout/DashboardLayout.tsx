import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen relative">
      <div className="flex w-full bg-white dark:bg-gray-900 overflow-hidden relative">
        {/* Mobile menu toggle button */}
        <div className="md:hidden absolute top-4 left-4 z-50">
          <Button 
            variant="tertiary" 
            className="!p-2 bg-white dark:bg-gray-800 shadow-sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Backdrop for mobile */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        <div className={`fixed inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-300 ease-in-out z-40 bg-white dark:bg-gray-800 h-full`}>
          <Sidebar />
        </div>
        
        <main className="flex-1 flex flex-col bg-white dark:bg-gray-900 overflow-hidden w-full h-screen">
          {children}
        </main>
      </div>
    </div>
  );
};
