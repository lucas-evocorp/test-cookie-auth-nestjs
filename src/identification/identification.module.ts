import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { IdentificationController } from './identification.controller';
import { JwtStrategy, JWT_SECRET_TMP } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: false,
    }),
    JwtModule.register({
      secret: JWT_SECRET_TMP,
      signOptions: { expiresIn: '1d' },
    }),
  ],

  controllers: [IdentificationController],

  providers: [AuthService, JwtStrategy],
})
export class IdentificationModule {}
