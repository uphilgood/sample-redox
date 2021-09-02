import * as dotenv from "dotenv";
dotenv.config();
export default {
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  BASE_URL: process.env.BASE_URL,
  VERSION: process.env.VERSION,
};
