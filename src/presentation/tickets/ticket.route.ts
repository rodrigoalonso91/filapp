import { Router } from "express";
import { TicketController } from "./ticket.controller";
import { TicketService } from "../services";

export class TicketRoute {

  static get routes() {

    const ticketService = new TicketService();
    const ticketController = new TicketController(ticketService);
    
    const router = Router();
    
    router.get('/', ticketController.getTickets);
    router.get('/last', ticketController.getLastTicketNumber);
    router.get('/pending', ticketController.getPendingTickets);

    router.post('/', ticketController.createTicket);

    router.get('/draw/:desk', ticketController.drawTicket);
    router.put('/done/:ticketId', ticketController.finishTicket);

    router.get('/working-on', ticketController.workingOn);

    return router;
  }

}