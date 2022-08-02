import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// swagger
import {
  DocumentBuilder,
  SwaggerModule,
  SwaggerCustomOptions,
} from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

// 使用官方的config
import { ConfigService } from '@nestjs/config';

// pirsma 安全關閉
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // swagger
  setupSwagger(app);

  // 全域使用middleware
  // app.use(logger);

  // 全域使用Interceptor
  // app.useGlobalInterceptors(new HelloWorldInterceptor());

  // 全域使用Guard
  // app.useGlobalGuards(new AuthGuard());

  // 全域前綴
  // app.setGlobalPrefix('/api');

  // 使用官方設定檔
  const configService = app.get(ConfigService); // 取得 ConfigService
  const port = configService.get('port');
  console.log(port);

  // 安全關閉
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(3000);
}

function setupSwagger(app: INestApplication) {
  const builder = new DocumentBuilder();
  const config = builder
    .setTitle('Document')
    .setDescription('This is a basic Swagger document.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const options: SwaggerCustomOptions = {
    explorer: true, // 開啟搜尋列
  };
  SwaggerModule.setup('doc', app, document, options);
}

bootstrap();
