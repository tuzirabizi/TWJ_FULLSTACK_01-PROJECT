import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { DatasetType, DatasetFormat, DatasetStatus } from '@ai-dataset-generator/shared';
import { User } from './User';
import { GenerationJob } from './GenerationJob';

@Entity('datasets')
export class Dataset {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ name: 'user_id' })
  userId!: string;

  @ManyToOne(() => User, (user: User) => user.datasets, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({
    type: 'enum',
    enum: DatasetType
  })
  type!: DatasetType;

  @Column({
    type: 'enum',
    enum: DatasetFormat
  })
  format!: DatasetFormat;

  @Column({
    type: 'enum',
    enum: DatasetStatus,
    default: DatasetStatus.PENDING
  })
  status!: DatasetStatus;

  @Column({ type: 'jsonb', default: {} })
  config!: Record<string, unknown>;

  @Column({ type: 'jsonb', default: {} })
  metadata!: Record<string, unknown>;

  @Column({ type: 'float', default: 0 })
  progress!: number;

  @Column({ type: 'text', nullable: true })
  downloadUrl!: string | null;

  @OneToMany(() => GenerationJob, (job: GenerationJob) => job.dataset)
  jobs!: GenerationJob[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
} 