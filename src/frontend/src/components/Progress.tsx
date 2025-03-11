import React from 'react';

interface ProgressProps {
  current: number;
  total: number;
  status: string;
}

export const Progress: React.FC<ProgressProps> = ({ current, total, status }) => {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-base font-medium text-primary-700">Generation Progress</span>
          <span className="text-sm font-medium text-primary-700">{percentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-primary-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
      <div className="text-center text-sm text-gray-600">
        {status}
      </div>
      <div className="text-center text-sm text-gray-500 mt-1">
        {current} of {total} items completed
      </div>
    </div>
  );
}; 