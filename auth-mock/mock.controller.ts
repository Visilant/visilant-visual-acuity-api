import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInRequestDto } from './sign-in-request.dto';
import { SignInResponseDto } from './sign-in-response.dto';
import { JwtPayload } from './jwt-payload';

const mockUser = {
  id: 1,
  username: 'Mock User',
  email: 'admin',
  password: 'admin',
};

@Controller('api/v2')
export class MockController {
  constructor(private jwtService: JwtService) {}

  @Post('signin')
  async signIn(@Body() body: SignInRequestDto): Promise<SignInResponseDto> {
    if (!this.isRequestValid(body)) {
      throw new UnauthorizedException();
    }

    return this.createSignInResponse();
  }

  private isRequestValid(request: SignInRequestDto): boolean {
    return request.password === mockUser.password && request.email === mockUser.email;
  }

  private async createSignInResponse(): Promise<SignInResponseDto> {
    const token = await this.signToken('4h');
    const refresh_token = await this.signToken('15d');

    return { data: { token, refresh_token, user: {} } };
  }

  private async signToken(expiresIn: string): Promise<string> {
    const payload = this.getPayload();
    const token = await this.jwtService.signAsync(payload, { expiresIn });

    return token;
  }

  private getPayload(): JwtPayload {
    return {
      id: mockUser.id,
      email: mockUser.email,
      username: mockUser.username,
    };
  }
}
