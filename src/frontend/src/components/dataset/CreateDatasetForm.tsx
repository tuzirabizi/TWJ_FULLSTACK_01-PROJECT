import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreateDatasetRequestSchema,
  CreateDatasetRequest,
  DatasetType,
  DatasetFormat,
  ModelType,
} from '@ai-dataset-generator/shared';
import { useDataset } from '../../hooks/useDataset';

export const CreateDatasetForm: React.FC = () => {
  const { createDataset } = useDataset();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateDatasetRequest>({
    resolver: zodResolver(CreateDatasetRequestSchema),
    defaultValues: {
      config: {
        type: DatasetType.TEXT,
        format: DatasetFormat.JSON,
        size: 100,
        parameters: {},
      },
    },
  });

  const selectedType = watch('config.type');

  const onSubmit = async (data: CreateDatasetRequest) => {
    try {
      await createDataset(data);
    } catch (error) {
      console.error('Dataset creation failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Dataset Name
        </label>
        <input
          {...register('name')}
          type="text"
          id="name"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          {...register('description')}
          id="description"
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          Dataset Type
        </label>
        <select
          {...register('config.type')}
          id="type"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          {Object.values(DatasetType).map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="format" className="block text-sm font-medium text-gray-700">
          Output Format
        </label>
        <select
          {...register('config.format')}
          id="format"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          {Object.values(DatasetFormat).map((format) => (
            <option key={format} value={format}>
              {format.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="size" className="block text-sm font-medium text-gray-700">
          Dataset Size
        </label>
        <input
          {...register('config.size', { valueAsNumber: true })}
          type="number"
          id="size"
          min={1}
          max={1000}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      {selectedType === DatasetType.TEXT && (
        <div>
          <label htmlFor="model" className="block text-sm font-medium text-gray-700">
            Language Model
          </label>
          <select
            {...register('config.parameters.model')}
            id="model"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value={ModelType.GPT3}>GPT-3</option>
            <option value={ModelType.GPT4}>GPT-4</option>
          </select>
        </div>
      )}

      {selectedType === DatasetType.IMAGE && (
        <div>
          <label htmlFor="model" className="block text-sm font-medium text-gray-700">
            Image Model
          </label>
          <select
            {...register('config.parameters.model')}
            id="model"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value={ModelType.STABLE_DIFFUSION}>Stable Diffusion</option>
            <option value={ModelType.DALL_E}>DALL-E</option>
          </select>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isSubmitting ? 'Creating Dataset...' : 'Create Dataset'}
      </button>
    </form>
  );
}; 