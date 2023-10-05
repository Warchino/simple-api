import { Injectable } from '@nestjs/common';

import type { ReadStream } from 'fs';
import { createReadStream, existsSync } from 'fs';

@Injectable()
export class AssetService {
  get3DAsset(assetFileName: string): ReadStream | null {
    if (!existsSync(assetFileName)) {
      return null;
    }
    return createReadStream(assetFileName);
  }
}
