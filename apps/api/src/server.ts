/** @format */
import path from 'path';
import dotenv from 'dotenv';
import moduleAlias from 'module-alias';
import { LooseAuthProp } from '@clerk/clerk-sdk-node';

// Import after module alias configuration
import { testFunction } from '@/testModule';

import app from './app/index';
import { shutdown } from './app/middleware/context';

// Load environment variables
dotenv.config();

if (process.env.APP_SECRETS) {
  try {
    const secrets: Record<string, string> = JSON.parse(process.env.APP_SECRETS);

    // Set individual environment variables
    Object.entries(secrets).forEach(([key, value]) => {
      process.env[key] = value;
    });

    console.log('Successfully loaded secret values into environment variables');
  } catch (error) {
    console.error(
      'Error parsing APP_SECRETS:',
      error instanceof Error ? error.message : 'Unknown error',
    );
  }
}

// Determine the root directory based on the environment
const rootDir = process.env.NODE_ENV === 'production' ? 'build' : 'src';

// Configure module aliases
moduleAlias.addAliases({
  '@': path.join(__dirname, '..', rootDir),
});

// Global type declaration
declare global {
  namespace Express {
    interface Request extends LooseAuthProp {}
  }
}

// Test function call
testFunction();

console.log('All environment variables:', JSON.stringify(process.env, null, 2));
const port = process.env.PORT || '3000';

// S3 Bucket configuration
const s3BucketName = process.env.S3_BUCKET_NAME;
const s3BucketRegion = process.env.S3_BUCKET_REGION;

if (!s3BucketName || !s3BucketRegion) {
  console.error('Missing S3 bucket environment variables');
}

// Clerk configuration
const clerkSecretKey = process.env.CLERK_SECRET_KEY;
const clerkPublishableKey = process.env.CLERK_PUBLISHABLE_KEY;

if (!clerkSecretKey) {
  console.error('Missing Clerk secret key environment variable');
}
if (!clerkPublishableKey) {
  console.error('Missing Clerk publishable key environment variable');
}

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Shutting down gracefully');
  await shutdown(); // This calls your function to close Prisma connections
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
