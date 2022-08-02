import { DynamicModule, Module } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';

// 製作動態Module, 因此Module內會清空, 但也可以加上靜態內容
@Module({})
export class ConfigurationModule {
  // 要變成動態需要加上下面的東西
  static forRoot(options: { path: string }): DynamicModule {
    return {
      providers: [
        {
          // 'ENV_PATH' 要跟service指定的相同
          provide: 'ENV_PATH',
          useValue: options.path,
        },
        ConfigurationService,
      ],
      exports: [ConfigurationService],
      module: ConfigurationModule,
      global: true, //把它變成全域的module
    };
  }
}
