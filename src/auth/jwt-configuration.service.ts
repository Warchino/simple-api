import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

import type { JwtEnvironment } from './env.config';

@Injectable()
export class JwtConfigurationService implements JwtOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
    const { secret, expirationTime } =
      this.configService.get<JwtEnvironment>('jwt');

    return {
      secret,
      signOptions: {
        expiresIn: expirationTime,
      },
    };
  }
}
