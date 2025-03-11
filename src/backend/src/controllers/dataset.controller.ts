import { Request, Response } from 'express';
import { DatasetService } from '../services/dataset.service';
import { CreateDatasetRequestSchema } from '@ai-dataset-generator/shared';
import { AuthRequest } from '../middleware/auth';

export class DatasetController {
  private datasetService = new DatasetService();

  async createDataset(req: AuthRequest, res: Response) {
    try {
      const data = CreateDatasetRequestSchema.parse(req.body);
      const result = await this.datasetService.createDataset(data, req.user!);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  async getDataset(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.datasetService.getDataset(id, req.user!);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  async getUserDatasets(req: AuthRequest, res: Response) {
    try {
      const result = await this.datasetService.getUserDatasets(req.user!);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  async deleteDataset(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      await this.datasetService.deleteDataset(id, req.user!);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }
} 