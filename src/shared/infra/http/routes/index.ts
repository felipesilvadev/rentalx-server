import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';

const routes = Router();

routes.use(authenticateRoutes);
routes.use('/users', usersRoutes);
routes.use('/categories', categoriesRoutes);
routes.use('/specifications', specificationsRoutes);

export { routes };
