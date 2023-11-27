import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as envalid from 'envalid';

import { EnvConfig } from './types';

@Injectable()
export class EnvironmentService {
  private env: EnvConfig;

  constructor() {
    dotenv.config();

    const env: EnvConfig = envalid.cleanEnv(process.env, {
      API_URL: envalid.url(),
      MONGO_DB_URL: envalid.url(),
      PORT: envalid.num(),
      NODE_ENV: envalid.str(),
      JWT_EXPIRY_MINS: envalid.num(),
      JWT_SECRET: envalid.str(),
    });

    const apiUrl = new URL(env.API_URL);
    // Get pathname of API_URL without leading slash (which is always there
    // even when pathname is actually empty).
    const apiUrlPathname = apiUrl.pathname.slice(1);

    if (apiUrlPathname.endsWith('/')) {
      throw new Error('GLOBAL_PREFIX cannot end with a slash');
    }

    this.env = {
      ...env,
      GLOBAL_PREFIX: apiUrlPathname,
    };
  }

  get<Property extends keyof EnvConfig>(
    configProperty: Property,
  ): EnvConfig[Property] {
    return this.env[configProperty];
  }
}
