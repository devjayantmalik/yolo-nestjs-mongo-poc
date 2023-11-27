// For explanation of each env variable see .env.example in the root directory
// of this repository.
export interface EnvConfig {
  readonly API_URL: string;
  readonly MONGO_DB_URL: string;
  readonly GLOBAL_PREFIX?: string;
  readonly PORT: number;
  readonly NODE_ENV: string;
}
