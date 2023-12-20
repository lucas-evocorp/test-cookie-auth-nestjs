import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { JWtGuard } from './guards/guard';

@Controller('identification')
export class IdentificationController {
  constructor(private readonly authService: AuthService) {
    //
  }

  @Get('login')
  async login(@Res({ passthrough: true }) response: Response) {
    const { accessToken } = await this.authService.login();
    response.cookie('access_token', accessToken, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    });
  }

  @Get('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.cookie('access_token', '', {
      expires: new Date(Date.now()),
    });
  }

  @UseGuards(JWtGuard)
  @Get('private')
  async privateEndPoint(@Req() request: Request) {
    console.log(request.cookies);

    return {
      message: 'hello world',
    };
  }

  @Get('public')
  publicEndPoint(@Req() request: Request) {
    console.log(request.cookies);
    return {
      message: 'hello world',
    };
  }
}
