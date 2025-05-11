/** @format */
import express, { Request, Response, NextFunction } from 'express';

import 'dotenv/config';
import cors from 'cors';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import project from './routes/projectRouter';
import webhooks from './routes/webhookRouter';

import { setOrgIdInContext } from './middleware/setOrgIdInContext';

export const requestTimingMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const start = process.hrtime();

  res.on('finish', () => {
    const end = process.hrtime(start);
    const duration = (end[0] * 1e9 + end[1]) / 1e6; // Convert to milliseconds
    // eslint-disable-next-line no-console
    console.log(`${req.method} ${req.originalUrl} - ${duration.toFixed(2)}ms`);
  });

  next();
};
const app = express();

app.use(requestTimingMiddleware);
app.use(cors());
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  // eslint-disable-next-line no-console
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  next();
});

app.use(
  '/api/v1/projects',
  ClerkExpressRequireAuth(),
  setOrgIdInContext,
  project,
);

app.use('/webhooks/v1', webhooks);

// Error handling middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    if (res.headersSent) {
      return next(err);
    }
    console.error('Error:', err.stack);
    res.status(401).json({ message: 'Unauthenticated!', error: err.message });
  },
);

export default app;
