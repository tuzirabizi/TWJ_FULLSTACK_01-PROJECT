import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models';
import { LoginRequest, RegisterRequest, AuthResponse, UserRole } from '@ai-dataset-generator/shared';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const existingUser = await this.userRepository.findOne({
      where: { email: data.email }
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = this.userRepository.create({
      ...data,
      password: hashedPassword,
      role: UserRole.USER
    });

    await this.userRepository.save(user);

    const { accessToken, refreshToken } = this.generateTokens(user);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString()
      },
      accessToken,
      refreshToken
    };
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    const user = await this.userRepository.findOne({
      where: { email: data.email }
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(data.password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    const { accessToken, refreshToken } = this.generateTokens(user);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString()
      },
      accessToken,
      refreshToken
    };
  }

  async refreshToken(token: string): Promise<{ accessToken: string }> {
    try {
      const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as { id: string };
      const user = await this.userRepository.findOne({
        where: { id: decoded.id }
      });

      if (!user) {
        throw new Error('User not found');
      }

      const accessToken = this.generateAccessToken(user);
      return { accessToken };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  private generateTokens(user: User) {
    const accessToken = this.generateAccessToken(user);
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION || '7d' }
    );

    return { accessToken, refreshToken };
  }

  private generateAccessToken(user: User): string {
    return jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRATION || '1h' }
    );
  }
} 