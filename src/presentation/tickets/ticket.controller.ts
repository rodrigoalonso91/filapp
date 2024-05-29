import { Request, Response } from "express";
import { TicketService } from "../services";

export class TicketController {

  constructor(
    private readonly ticketService: TicketService
  ) {}

  public getTickets = async (req: Request, res: Response) => {
    res.json(this.ticketService.tickets);
  }

  public getLastTicketNumber = async (req: Request, res: Response) => {
    res.json(this.ticketService.getLastTicketNumber());
  }

  public getPendingTickets = async (req: Request, res: Response) => {
    res.json(this.ticketService.pendingTickets);
  }

  public createTicket = async (req: Request, res: Response) => {
    res.status(201).json(this.ticketService.createTicket());
  }

  public drawTicket = async (req: Request, res: Response) => {
    res.json(this.ticketService.drawTicket(req.params.desk));
  }

  public finishTicket = async (req: Request, res: Response) => {
    res.json(this.ticketService.finishTicket(req.params.ticketId));
  }

  public workingOn = async (req: Request, res: Response) => {
    res.json(this.ticketService.lastWorkingOnTickets);
  }
}