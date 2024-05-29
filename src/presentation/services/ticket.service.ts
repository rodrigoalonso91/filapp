import { UUIDAdapter } from "../../config/uuid.adapter";
import { type Ticket } from "../../domain";

export class TicketService {

  constructor() {}

  public tickets: Ticket[] = [
    { id: UUIDAdapter.generateUUID(), number: 1, createdAt: new Date(), done: false },
    { id: UUIDAdapter.generateUUID(), number: 2, createdAt: new Date(), done: false },
    { id: UUIDAdapter.generateUUID(), number: 3, createdAt: new Date(), done: false },
    { id: UUIDAdapter.generateUUID(), number: 4, createdAt: new Date(), done: false },
    { id: UUIDAdapter.generateUUID(), number: 5, createdAt: new Date(), done: false },
    { id: UUIDAdapter.generateUUID(), number: 6, createdAt: new Date(), done: false },
  ];

  private readonly workingOnTickets: Ticket[] = [];

  public get pendingTickets(): Ticket[] {
    return this.tickets.filter(ticket => !ticket.done && !ticket.handleAtDesk);
  }

  public get lastWorkingOnTickets(): Ticket[] {
    return this.workingOnTickets.slice(0, 4);
  }

  public getLastTicketNumber(): number {
    return this.tickets.at(-1)?.number ?? 0;
  }

  public createTicket(): Ticket {

    const ticket: Ticket = {
      id: UUIDAdapter.generateUUID(),
      number: this.getLastTicketNumber() + 1,
      createdAt: new Date(),
      done: false
    };

    this.tickets.push(ticket);
    return ticket;
  }

  public drawTicket(desk: string) {

    const ticket = this.tickets.find(ticket => !ticket.handleAtDesk);

    if (!ticket) return { status: 'error', message: 'No hay tickets pendientes' }

    ticket.handleAtDesk = desk;
    ticket.handleAt = new Date();

    this.workingOnTickets.unshift({ ...ticket });

    return { status: 'ok', ticket };
  }

  public finishTicket(ticketId: string) {

    const ticket = this.tickets.find(ticket => ticket.id === ticketId);
    if (!ticket) return { status: 'error', message: 'No se encontro el ticket' }

    this.tickets.map(t => {
      if (t.id === ticketId) {
        t.handleAt = new Date();
        t.done = true;
      }
      return t;
    })

    return { status: 'ok' };
  }
}