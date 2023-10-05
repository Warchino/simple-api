import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssetModule } from './assets/asset.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, AuthModule, AssetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
