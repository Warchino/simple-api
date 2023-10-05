import { parse } from 'path';

import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Res,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AssetService } from './asset.service';

@Controller('assets')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Get(':fileName')
  @UseGuards(JwtAuthGuard)
  getGLTFFile(
    @Res({ passthrough: true }) response: Response,
    @Param() params: { fileName: string },
  ) {
    const stream = this.assetService.get3DAsset(params.fileName);
    if (!stream) {
      response.status(HttpStatus.NOT_FOUND);
      return null;
    }
    const { ext, base } = parse(stream.path as string);
    const modelType = ext === '.gltf' ? '+json' : '-binary';
    response.set({
      'Content-Type': `model/gltf${modelType}`,
      'Content-Disposition': `attachment; filename="${base}"`,
    });
    return new StreamableFile(stream);
  }
}
