import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { AuthResponseDto } from './dto/auth-response.dto';
import { UserResponseDto } from '../users/dto/user-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponseDto> {
    const user = await this.authService.register(registerDto);
    return new AuthResponseDto(
      user,
      'User registered successfully. Please login.',
    );
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Request() req,
    @Body() loginDto: LoginDto,
  ): Promise<AuthResponseDto> {
    // User is already authenticated by LocalAuthGuard
    // req.user is set by Passport after successful authentication
    // Now we need to establish session by calling req.login()
    return new Promise((resolve, reject) => {
      req.login(req.user, (err: any) => {
        if (err) {
          return reject(err);
        }
        const user = new UserResponseDto(req.user);
        resolve(new AuthResponseDto(user, 'Login successful'));
      });
    });
  }

  @UseGuards(AuthenticatedGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Request() req) {
    return new Promise((resolve, reject) => {
      req.logout((err: any) => {
        if (err) {
          return reject(err);
        }
        req.session.destroy((destroyErr: any) => {
          if (destroyErr) {
            return reject(destroyErr);
          }
          resolve({
            message: 'Logout successful',
          });
        });
      });
    });
  }

  @UseGuards(AuthenticatedGuard)
  @Get('me')
  @HttpCode(HttpStatus.OK)
  async getCurrentUser(@Request() req): Promise<UserResponseDto> {
    // req.user is set by AuthenticatedGuard from session
    return new UserResponseDto(req.user);
  }
}
