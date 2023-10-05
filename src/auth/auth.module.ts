import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { authConfiguration } from './env.config';
import { JwtConfigurationService } from './jwt-configuration.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [authConfiguration],
    }),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfigurationService,
      inject: [ConfigService],
    }),
  ],
  providers: [JwtStrategy],
})
export class AuthModule {}
