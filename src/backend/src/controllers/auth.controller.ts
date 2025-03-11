import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginRequest, RegisterRequest, AuthResponse } from '@ai-dataset-generator/shared';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() data: RegisterRequest): Promise<AuthResponse> {
    try {
      return await this.authService.register(data);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  async login(@Body() data: LoginRequest): Promise<AuthResponse> {
    try {
      return await this.authService.login(data);
    } catch (error) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('refresh')
  async refreshToken(@Body() data: { refreshToken: string }): Promise<{ accessToken: string }> {
    try {
      return await this.authService.refreshToken(data.refreshToken);
    } catch (error) {
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
    }
  }
} 