import dotenv from 'dotenv';
dotenv.config();

type NodeEnv = 'development' | 'production';

interface EnvConfig {
  PORT: string;
  MONGO_URI: string;
  NODE_ENV: NodeEnv;
  JWT_SECRET:string;
  JWT_EXPIRES_IN:string;
  JWT_REFRESH_SECRET:string;
  JWT_REFRESH_EXPIRES_IN:string;
  GOOGLE_CLIENT_ID:string;
  GOOGLE_CLIENT_SECRET:string;
  GOOGLE_CALLBACK_URL:string;
  EXPRESS_SESSION_SECRET:string;
  FRONTEND_URL:string

}

const loadEnvironmentVariables = (): EnvConfig => {
  const requiredEnvVars: string[] = ['PORT', 'MONGO_URI', 'NODE_ENV','JWT_SECRET','JWT_EXPIRES_IN','JWT_REFRESH_SECRET','JWT_REFRESH_EXPIRES_IN','GOOGLE_CLIENT_ID','GOOGLE_CLIENT_SECRET','GOOGLE_CALLBACK_URL',
    'EXPRESS_SESSION_SECRET','FRONTEND_URL'
  ];

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
  JWT_EXPIRES_IN:process.env.JWT_EXPIRES_IN as string,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
  JWT_REFRESH_EXPIRES_IN:process.env.JWT_REFRESH_EXPIRES_IN as string,
  GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID as string,
  GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET as string,
  GOOGLE_CALLBACK_URL:process.env.GOOGLE_CALLBACK_URL as string,
  EXPRESS_SESSION_SECRET:process.env.EXPRESS_SESSION_SECRET as string,
  FRONTEND_URL:process.env.FRONTEND_URL as string
  };
};

export const envVars = loadEnvironmentVariables();
