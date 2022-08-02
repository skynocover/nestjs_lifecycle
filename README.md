
## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## generate

```
nest g
```

## docs

> http://localhost:3000/doc/


```
yarn add @nestjs/swagger swagger-ui-express
```

### example

```js
import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  await app.listen(3000);
}

function setupSwagger(app: INestApplication) {
  const builder = new DocumentBuilder();
  const config = builder
    .setTitle('TodoList')
    .setDescription('This is a basic Swagger document.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

bootstrap();
```

### 詳細教學

> https://ithelp.ithome.com.tw/articles/10280346





## module

```js
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
```

- import: 表掛載並讓provider可以使用的module
- controller: 此module需要呼叫的controller
- providers: 這些服務可以在此moduel被共用


```
nest generate module <MODULE_NAME>
```

之後如果自動產生controller或是service的話會自動加入

## controller

```
nest generate controller <NAME>
```

通常會將前綴改成複數
```js
@Controller('newcontrollers')
@Controller('newcont*rollers') //使用通用字元
```

### DTO

> 在controller中使用


## provider

> https://ithelp.ithome.com.tw/articles/10269186


## validator

```
yarn add class-validator class-transformer
```

## Pipe

> 自定義Pipe

```
nest generate pipe <PIPE_NAME>
```

## Middleware

> MIDDLEWARE_NAME 前面可以加上資料夾名稱

```
nest generate middleware <MIDDLEWARE_NAME>
```

### 換成express的型別
```js
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    next();
  }
}
```

## Interceptor

> 攔截器
> 作用於controller之前或之後
> 在controller之前的會早於pipe觸發
> 執行於middleware之後

![](https://d1dwq032kyr03c.cloudfront.net/upload/images/20210405/201193386hVCd5hrJj.png)

```
nest generate interceptor interceptors/hello-world
```

## Guard

> 在middleware之後 interceptor之前

![](https://d1dwq032kyr03c.cloudfront.net/upload/images/20210410/20119338I9fRZRXtaj.png)

```
nest generate guard guards/auth
```

## Decorator

> 裝飾器

```
nest generate decorator decorators/user
```


- 參數裝飾器
  - 用於做出@User等model
- Metadata 裝飾器
  - 用於定義Metadata, 可以拿來做role
- 整合裝飾器
  - 使用applyDecorators將不同的裝飾器整合

必須使用middleware來使用

> 可以用來設計role,並用guard來限制


## Dynamic Module

> 用來區分環境等需要動態處理參數用

> 客製Provider內容

> 用來控制資料庫, 環境變數等功能

### config範例

- 設定configure相關的Module
- 在app.module內引入

### 官方config管理工具


```
yarn add @nestjs/config
```

> 具有崁套功能

```
APP_DOMAIN=example.com
APP_REDIRECT_URL=${APP_DOMAIN}/redirect_url
```

```js
ConfigModule.forRoot({
    expandVariables: true, // 開啟環境變數檔變數嵌入功能
}),
```

參考 common/configuration

[進階用法](https://ithelp.ithome.com.tw/articles/10275664)


## Lifecycle Hooks

- Module 初始化階段 (onModuleInit)
- Nest App 啟動階段 (onApplicationBootstrap)
- Module 銷毀階段 (onModuleDestroy)
- Nest App 關閉前 (beforeApplicationShutdown)
- Nest App 關閉階段 (onApplicationShutdown)

![](https://d1dwq032kyr03c.cloudfront.net/upload/images/20210522/20119338VHekXphWyY.png)

![](https://d1dwq032kyr03c.cloudfront.net/upload/images/20210522/201193384jhaImOilE.png)


### axios 請求

> https://docs.nestjs.com/techniques/http-module

### auth

> https://ithelp.ithome.com.tw/articles/10279148