import { Router } from 'express';
import { TicketRoute } from './tickets/ticket.route';

export class AppRoutes {

  static get routes(): Router {

    const router = Router();

    router.use('api/ticket', TicketRoute.routes);

    return router;
  }
}

