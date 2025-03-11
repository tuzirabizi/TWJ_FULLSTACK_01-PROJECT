import { useState, useEffect, useCallback } from 'react';
import { Dataset, CreateDatasetRequest } from '@ai-dataset-generator/shared';
import { api } from '../services/api';
import { useAuth } from './useAuth';

export const useDataset = () => {
  const { accessToken } = useAuth();
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDatasets = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get<Dataset[]>('/datasets', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setDatasets(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch datasets');
      console.error('Error fetching datasets:', err);
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  const createDataset = useCallback(async (data: CreateDatasetRequest) => {
    try {
      const response = await api.post<Dataset>('/datasets', data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setDatasets((prev) => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError('Failed to create dataset');
      console.error('Error creating dataset:', err);
      throw err;
    }
  }, [accessToken]);

  const deleteDataset = useCallback(async (id: string) => {
    try {
      await api.delete(`/datasets/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setDatasets((prev) => prev.filter((dataset) => dataset.id !== id));
    } catch (err) {
      setError('Failed to delete dataset');
      console.error('Error deleting dataset:', err);
      throw err;
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      fetchDatasets();
    }
  }, [accessToken, fetchDatasets]);

  return {
    datasets,
    loading,
    error,
    createDataset,
    deleteDataset,
    refreshDatasets: fetchDatasets,
  };
}; 