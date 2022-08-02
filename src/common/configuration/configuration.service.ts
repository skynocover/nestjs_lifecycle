import { Inject, Injectable } from '@nestjs/common';

import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

@Injectable()
export class ConfigurationService {
  private config: any;

  // 'ENV_PATH' 要跟module指定的相同
  constructor(@Inject('ENV_PATH') private readonly path: string) {
    this.setEnvironment();
  }

  public get(key: string): string {
    return this.config[key];
  }

  private setEnvironment(): void {
    const filePath = path.resolve(__dirname, '../../', this.path);
    this.config = dotenv.parse(fs.readFileSync(filePath));
  }
}
