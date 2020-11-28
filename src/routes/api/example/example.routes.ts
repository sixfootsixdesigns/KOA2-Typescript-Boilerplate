import * as Router from 'koa-router';
import { exampleController } from '../../../controllers';

const flowRoutes = new Router();

flowRoutes
  .post('/example', exampleController.create)
  .get('/example/:id', exampleController.getById);
export { flowRoutes };
