import React from 'react';
import { Button } from '../ui/Button';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export const Header = () => {
  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-8">
      {/* Title Area */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">COI Review Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500 font-medium">Overview of all Certificate of insurance</p>
      </div>

      {/* Actions & Profile */}
      <div className="flex items-center gap-4">
        <Button variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50 bg-white">
          Send Bulk Reminder
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
        
        <Button variant="outline" className="text-gray-700 bg-white shadow-sm border-gray-200">
          <Sparkles className="mr-2 h-4 w-4 text-blue-500" />
          Ask LegalGraph AI
        </Button>

        <Button variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50 bg-white">
          <HelpCircle className="mr-2 h-4 w-4" />
          Help
        </Button>

        <div className="ml-4 flex items-center gap-3 border-l pl-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
            S
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900">Shubham</p>
            <p className="text-xs text-gray-500">shubham@gmail.com</p>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-400 cursor-pointer" />
        </div>
      </div>
    </header>
  );
};
