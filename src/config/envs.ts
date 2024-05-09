import 'dotenv/config';
import { get } from 'env-var';


export const envs = {

  PORT: get('PORT').required().asPortNumber(),
  
  MONGO_URL: get('MONGO_URL').required().asString(),
  MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),

  JWT_SEED: get('JWT_SEED').required().asString(),
  URL_API_DEV: get('URL_API_DEV').required().asString(),
  URL_API_PROD: get('URL_API_PROD').required().asString(),
  NODE_ENV: get('NODE_ENV').required().asString()

}



