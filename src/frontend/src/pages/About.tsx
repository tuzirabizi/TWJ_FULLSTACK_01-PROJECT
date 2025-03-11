import React from 'react';
import { Link } from 'react-router-dom';

export const About: React.FC = () => {
  const stats = [
    { label: 'Active Users', value: '10,000+' },
    { label: 'Datasets Generated', value: '50,000+' },
    { label: 'Data Points', value: '1M+' },
    { label: 'Success Rate', value: '99.9%' }
  ];

  const team = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Chief AI Scientist',
      description: 'PhD in Machine Learning with 10+ years of experience in AI research.'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Lead Engineer',
      description: 'Expert in distributed systems and scalable data processing.'
    },
    {
      name: 'Emma Thompson',
      role: 'Product Manager',
      description: 'Former ML researcher turned product leader.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mission Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-primary-900 mb-4">
            Our Mission
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to democratize AI development by providing high-quality,
            diverse datasets that enable innovation and advancement in machine learning.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary-900 text-center mb-8">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold text-primary-900 mb-2">
                  {member.name}
                </h3>
                <div className="text-primary-600 mb-3">{member.role}</div>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Link
            to="/register"
            className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-block"
          >
            Join Our Community
          </Link>
        </div>
      </div>
    </div>
  );
}; 