import dotenv from 'dotenv';
dotenv.config();

type NodeEnv = 'development' | 'production';

interface EnvConfig {
  PORT: string;
  MONGO_URI: string;
  NODE_ENV: NodeEnv;
  JWT_SECRET:string;
  JWT_EXPIRES_IN:string;

}

const loadEnvironmentVariables = (): EnvConfig => {
  const requiredEnvVars: string[] = ['PORT', 'MONGO_URI', 'NODE_ENV','JWT_SECRET','JWT_EXPIRES_IN'];

  requiredEnvVars.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`❌ Missing required environment variable: ${key}`);
    }
  });

  const nodeEnv = process.env.NODE_ENV?.toLowerCase();
  if (nodeEnv !== 'development' && nodeEnv !== 'production') {
    throw new Error(`❌ NODE_ENV must be either "development" or "production", got "${process.env.NODE_ENV}"`);
  }

  return {
    PORT: process.env.PORT as string,
    MONGO_URI: process.env.MONGO_URI as string,
    NODE_ENV: nodeEnv as NodeEnv,
  JWT_SECRET: process.env.JWT_SECRET as string,
  JWT_EXPIRES_IN:process.env.JWT_EXPIRES_IN as string
  };
};

export const envVars = loadEnvironmentVariables();
