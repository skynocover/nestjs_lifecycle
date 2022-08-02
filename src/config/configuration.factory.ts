import { registerAs } from '@nestjs/config';

// 將環境變數再封裝一層
export default registerAs('database', () => ({
  host: process.env.DB_HOST || 3000,
  password: process.env.DB_PASSWORD || 123456,
}));

// 直接輸出PORT
// export default () => ({
//   PORT: process.env.PORT || 3000,
// });
