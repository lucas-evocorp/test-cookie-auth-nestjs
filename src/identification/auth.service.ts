import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login() {
    const payload = { username: 'test', sub: 1 };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
