import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { JobStatus } from '@ai-dataset-generator/shared';
import { Dataset } from './Dataset';

@Entity('generation_jobs')
export class GenerationJob {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'dataset_id' })
  datasetId!: string;

  @ManyToOne(() => Dataset, (dataset: Dataset) => dataset.jobs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'dataset_id' })
  dataset!: Dataset;

  @Column({
    name: 'model_config',
    type: 'jsonb',
    default: {}
  })
  modelConfig!: Record<string, any>;

  @Column({
    type: 'enum',
    enum: JobStatus,
    default: JobStatus.QUEUED
  })
  status!: JobStatus;

  @Column({ type: 'float', default: 0 })
  progress!: number;

  @Column({ type: 'text', nullable: true })
  error!: string | null;

  @Column({ type: 'jsonb', default: [] })
  logs!: string[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
} 