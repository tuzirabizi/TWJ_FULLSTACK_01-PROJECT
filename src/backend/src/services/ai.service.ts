import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import sharp from 'sharp';
import { DatasetType } from '@ai-dataset-generator/shared';

@Injectable()
export class AIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateTextData(prompt: string, n: number = 1): Promise<string[]> {
    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      n,
      temperature: 0.7,
    });

    return completion.choices.map(choice => choice.message.content || '').filter(Boolean);
  }

  async generateImageData(prompt: string, n: number = 1): Promise<string[]> {
    const response = await this.openai.images.generate({
      model: 'dall-e-3',
      prompt,
      n,
      size: '1024x1024',
      response_format: 'url',
    });

    return response.data.map(item => item.url || '').filter(Boolean);
  }

  async processImage(imageUrl: string, format: 'jpeg' | 'png' | 'webp'): Promise<Buffer> {
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();
    
    return sharp(Buffer.from(buffer))
      .resize(1024, 1024, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .toFormat(format)
      .toBuffer();
  }

  async generateDataset(
    type: DatasetType,
    prompt: string,
    size: number,
  ): Promise<string[]> {
    switch (type) {
      case DatasetType.TEXT:
        return this.generateTextData(prompt, size);
      case DatasetType.IMAGE:
        return this.generateImageData(prompt, size);
      default:
        throw new Error(`Unsupported dataset type: ${type}`);
    }
  }
} 