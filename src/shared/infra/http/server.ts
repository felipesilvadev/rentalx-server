import 'reflect-metadata';

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swagger from 'swagger-ui-express';

import '../typeorm';
import '@shared/container';
import { AppError } from '@shared/errors/AppError';

import swaggerSetup from '../../../swagger.json';
import { routes } from './routes';

const app = express();

app.use(express.json());

app.use('/api-docs', swagger.serve, swagger.setup(swaggerSetup));

app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    });
  },
);

const PORT = 3333;
app.listen(PORT, () => console.log('🚀 Server started on port:', PORT));
