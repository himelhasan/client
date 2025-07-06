import React from 'react';
import { Zap } from 'lucide-react';

const DashboardHeader = () => {
  return (
    <div className="bg-white shadow">
      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <Zap className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Outreach Dashboard</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
