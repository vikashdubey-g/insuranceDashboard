import React from 'react';
import { Sidebar } from './Sidebar';

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <div className="flex w-full bg-white overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col bg-white overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};
