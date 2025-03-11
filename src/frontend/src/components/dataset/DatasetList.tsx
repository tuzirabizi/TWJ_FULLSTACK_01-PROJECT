import React from 'react';
import { Dataset, DatasetStatus } from '@ai-dataset-generator/shared';
import { useDataset } from '../../hooks/useDataset';

export const DatasetList: React.FC = () => {
  const { datasets, deleteDataset } = useDataset();

  const getStatusColor = (status: DatasetStatus) => {
    switch (status) {
      case DatasetStatus.COMPLETED:
        return 'bg-green-100 text-green-800';
      case DatasetStatus.FAILED:
        return 'bg-red-100 text-red-800';
      case DatasetStatus.GENERATING:
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this dataset?')) {
      try {
        await deleteDataset(id);
      } catch (error) {
        console.error('Failed to delete dataset:', error);
      }
    }
  };

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {datasets.map((dataset) => (
          <li key={dataset.id}>
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex min-w-0 flex-1 items-center">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-indigo-600">
                      {dataset.name}
                    </p>
                    <p className="mt-1 truncate text-sm text-gray-500">
                      {dataset.description}
                    </p>
                  </div>
                </div>
                <div className="ml-4 flex flex-shrink-0 space-x-4">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusColor(
                      dataset.status
                    )}`}
                  >
                    {dataset.status}
                  </span>
                  {dataset.status === DatasetStatus.COMPLETED && (
                    <a
                      href={dataset.downloadUrl}
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Download
                    </a>
                  )}
                  <button
                    onClick={() => handleDelete(dataset.id)}
                    className="font-medium text-red-600 hover:text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="mt-2">
                <div className="flex items-center text-sm text-gray-500">
                  <p>Type: {dataset.type}</p>
                  <span className="mx-2">•</span>
                  <p>Format: {dataset.format}</p>
                  {dataset.status === DatasetStatus.GENERATING && (
                    <>
                      <span className="mx-2">•</span>
                      <p>Progress: {dataset.progress}%</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}; 