import { AppDataSource } from '../config/database';
import { Dataset, User, GenerationJob } from '../models';
import { CreateDatasetRequest, DatasetStatus, JobStatus } from '@ai-dataset-generator/shared';
import { AIService } from './ai.service';

export class DatasetService {
  private datasetRepository = AppDataSource.getRepository(Dataset);
  private jobRepository = AppDataSource.getRepository(GenerationJob);
  private aiService = new AIService();

  async createDataset(data: CreateDatasetRequest, user: User): Promise<Dataset> {
    const dataset = this.datasetRepository.create({
      ...data,
      userId: user.id,
      status: DatasetStatus.PENDING,
      progress: 0,
      metadata: {}
    });

    await this.datasetRepository.save(dataset);

    // Start dataset generation in background
    this.generateDataset(dataset);

    return dataset;
  }

  async getDataset(id: string, user: User): Promise<Dataset> {
    const dataset = await this.datasetRepository.findOne({
      where: { id, userId: user.id },
      relations: ['user']
    });

    if (!dataset) {
      throw new Error('Dataset not found');
    }

    return dataset;
  }

  async getUserDatasets(user: User): Promise<Dataset[]> {
    return this.datasetRepository.find({
      where: { userId: user.id },
      order: { createdAt: 'DESC' }
    });
  }

  async deleteDataset(id: string, user: User): Promise<void> {
    const dataset = await this.getDataset(id, user);
    await this.datasetRepository.remove(dataset);
  }

  private async generateDataset(dataset: Dataset): Promise<void> {
    try {
      const job = this.jobRepository.create({
        dataset,
        modelConfig: dataset.config,
        status: JobStatus.QUEUED,
        progress: 0,
        logs: []
      });

      await this.jobRepository.save(job);

      // Update dataset status
      dataset.status = DatasetStatus.GENERATING;
      await this.datasetRepository.save(dataset);

      // Start generation process
      const prompt = dataset.config.prompt as string;
      const size = (dataset.config.size as number) || 1;
      const generatedData = await this.aiService.generateDataset(dataset.type, prompt, size);

      // Store generated data in metadata
      dataset.metadata = { data: generatedData };
      dataset.status = DatasetStatus.COMPLETED;
      await this.datasetRepository.save(dataset);

      // Update job status
      job.status = JobStatus.COMPLETED;
      await this.jobRepository.save(job);
    } catch (error) {
      // Update dataset status on failure
      dataset.status = DatasetStatus.FAILED;
      await this.datasetRepository.save(dataset);
      throw error;
    }
  }

  private async updateProgress(datasetId: string, progress: number): Promise<void> {
    await this.datasetRepository.update(datasetId, { progress });
  }
} 