import 'reflect-metadata';

import express from 'express';
import swagger from 'swagger-ui-express';

import './database';
import './shared/container';
import { routes } from './routes';
import swaggerSetup from './swagger.json';

const app = express();

app.use(express.json());

app.use('/api-docs', swagger.serve, swagger.setup(swaggerSetup));

app.use(routes);

const PORT = 3333;
app.listen(PORT, () => console.log('🚀 Server started on port:', PORT));
