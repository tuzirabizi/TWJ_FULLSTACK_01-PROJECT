import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { useAuth } from '../hooks/useAuth';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Datasets Generated', value: '24', icon: '📊', trend: '+12%' },
    { label: 'In Progress', value: '3', icon: '⏳', trend: '+1' },
    { label: 'Storage Used', value: '2.4GB', icon: '💾', trend: '+0.8GB' },
    { label: 'API Calls', value: '1.2K', icon: '🔄', trend: '+15%' }
  ];

  const datasetGeneration = [
    { name: 'Jan', datasets: 12 },
    { name: 'Feb', datasets: 19 },
    { name: 'Mar', datasets: 15 },
    { name: 'Apr', datasets: 25 },
    { name: 'May', datasets: 32 },
    { name: 'Jun', datasets: 28 }
  ];

  const datasetTypes = [
    { name: 'Text', value: 45 },
    { name: 'Image', value: 30 },
    { name: 'Audio', value: 15 },
    { name: 'Mixed', value: 10 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const apiUsage = [
    { name: 'Mon', calls: 150 },
    { name: 'Tue', calls: 230 },
    { name: 'Wed', calls: 180 },
    { name: 'Thu', calls: 290 },
    { name: 'Fri', calls: 200 },
    { name: 'Sat', calls: 120 },
    { name: 'Sun', calls: 90 }
  ];

  const recentDatasets = [
    {
      name: 'Sentiment Analysis Dataset',
      type: 'Text',
      size: '450MB',
      status: 'Completed',
      date: '2 hours ago',
      accuracy: '95%'
    },
    {
      name: 'Object Detection Images',
      type: 'Image',
      size: '1.2GB',
      status: 'In Progress',
      date: '5 hours ago',
      accuracy: '88%'
    },
    {
      name: 'Customer Reviews',
      type: 'Text',
      size: '250MB',
      status: 'Completed',
      date: '1 day ago',
      accuracy: '92%'
    }
  ];

  const generateOptions = [
    {
      title: 'Text Dataset',
      description: 'Generate text data for NLP tasks',
      icon: '📝',
      link: '/generate/text'
    },
    {
      title: 'Image Dataset',
      description: 'Create image datasets for computer vision',
      icon: '🖼️',
      link: '/generate/image'
    },
    {
      title: 'Custom Dataset',
      description: 'Build a dataset with custom parameters',
      icon: '⚙️',
      link: '/generate/custom'
    }
  ];

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user?.name}</h1>
            <p className="text-gray-400">Here's what's happening with your datasets</p>
          </div>
          <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg">
            New Dataset
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="text-2xl">{stat.icon}</div>
                <span className={`text-sm ${stat.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.trend}
                </span>
              </div>
              <div className="text-3xl font-bold text-primary-400 mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Dataset Generation Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
          >
            <h3 className="text-xl font-semibold mb-6 text-white">Dataset Generation Trend</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={datasetGeneration}>
                  <defs>
                    <linearGradient id="colorDatasets" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151"/>
                  <XAxis dataKey="name" stroke="#9CA3AF"/>
                  <YAxis stroke="#9CA3AF"/>
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', color: '#fff' }}/>
                  <Area type="monotone" dataKey="datasets" stroke="#8884d8" fillOpacity={1} fill="url(#colorDatasets)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Dataset Types Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
          >
            <h3 className="text-xl font-semibold mb-6 text-white">Dataset Types Distribution</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={datasetTypes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {datasetTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', color: '#fff' }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* API Usage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700 lg:col-span-2"
          >
            <h3 className="text-xl font-semibold mb-6 text-white">API Usage</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={apiUsage}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151"/>
                  <XAxis dataKey="name" stroke="#9CA3AF"/>
                  <YAxis stroke="#9CA3AF"/>
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', color: '#fff' }}/>
                  <Bar dataKey="calls" fill="#4C1D95" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Generate New Dataset Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Generate New Dataset</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {generateOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-800 rounded-lg p-6 border border-gray-700 cursor-pointer"
              >
                <div className="text-3xl mb-4">{option.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-white">{option.title}</h3>
                <p className="text-gray-400 mb-4">{option.description}</p>
                <Link
                  to={option.link}
                  className="inline-flex items-center text-primary-400 hover:text-primary-300"
                >
                  Get Started
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Datasets */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-white">Recent Datasets</h2>
          <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Accuracy
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {recentDatasets.map((dataset, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">{dataset.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-400">{dataset.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-400">{dataset.size}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          dataset.status === 'Completed'
                            ? 'bg-green-900 text-green-200'
                            : 'bg-yellow-900 text-yellow-200'
                        }`}
                      >
                        {dataset.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-400">{dataset.accuracy}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {dataset.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-primary-400 hover:text-primary-300 mr-4">View</button>
                      <button className="text-primary-400 hover:text-primary-300">Download</button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}; 