import React from 'react';
import { Link } from 'react-router-dom';

export const Features: React.FC = () => {
  const features = [
    {
      title: 'Text Generation',
      description: 'Generate high-quality text data using advanced language models.',
      icon: '📝'
    },
    {
      title: 'Image Generation',
      description: 'Create diverse image datasets with customizable parameters.',
      icon: '🖼️'
    },
    {
      title: 'Data Validation',
      description: 'Automatic validation and quality checks for generated data.',
      icon: '✅'
    },
    {
      title: 'Export Options',
      description: 'Export your datasets in multiple formats (CSV, JSON, XML).',
      icon: '📤'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-primary-900 mb-4">
            Powerful Features
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to generate high-quality datasets for your AI models
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-primary-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/register"
            className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-block"
          >
            Start Generating
          </Link>
        </div>
      </div>
    </div>
  );
}; 