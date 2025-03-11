import React, { useState, useEffect } from 'react';
import { Progress } from '../components/Progress';

export const GenerationProgress: React.FC = () => {
  const [progress, setProgress] = useState({
    current: 0,
    total: 100,
    status: 'Initializing...'
  });

  // Simulated progress for demonstration
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev.current >= prev.total) {
          clearInterval(interval);
          return { ...prev, status: 'Generation completed!' };
        }
        return {
          ...prev,
          current: prev.current + 1,
          status: `Generating item ${prev.current + 1}...`
        };
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Dataset Generation Progress</h1>
          <Progress
            current={progress.current}
            total={progress.total}
            status={progress.status}
          />
        </div>
      </div>
    </div>
  );
}; 