import { config } from 'dotenv';
config();
const env = {
  PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASS || '',
  DB_NAME: process.env.DB_NAME || 'product_db',
  JWT_SECRET: process.env.JWT_SECRET ||"radhe_computers",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET ||"create_by_shailesh"

};
export default env;