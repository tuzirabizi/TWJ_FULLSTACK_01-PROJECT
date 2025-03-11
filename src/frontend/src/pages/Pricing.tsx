import React from 'react';
import { Link } from 'react-router-dom';

export const Pricing: React.FC = () => {
  const plans = [
    {
      name: 'Basic',
      price: '$29',
      period: 'per month',
      features: [
        '1,000 text generations',
        '500 image generations',
        'Basic data validation',
        'CSV export',
        'Email support'
      ],
      cta: 'Start Free Trial',
      highlighted: false
    },
    {
      name: 'Professional',
      price: '$99',
      period: 'per month',
      features: [
        '5,000 text generations',
        '2,500 image generations',
        'Advanced data validation',
        'All export formats',
        'Priority support',
        'API access'
      ],
      cta: 'Get Started',
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      features: [
        'Unlimited generations',
        'Custom model training',
        'Advanced analytics',
        'Dedicated support',
        'SLA guarantee',
        'Custom integration'
      ],
      cta: 'Contact Sales',
      highlighted: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-primary-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that best fits your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-sm p-8 ${
                plan.highlighted
                  ? 'ring-2 ring-primary-600 transform scale-105'
                  : ''
              }`}
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-primary-900 mb-2">
                  {plan.name}
                </h3>
                <div className="text-4xl font-bold text-gray-900 mb-1">
                  {plan.price}
                </div>
                <div className="text-gray-500 mb-6">{plan.period}</div>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <svg
                      className="h-5 w-5 text-primary-500 mr-2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="text-center">
                <Link
                  to="/register"
                  className={`w-full inline-block py-3 px-6 rounded-lg font-semibold transition-colors ${
                    plan.highlighted
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 