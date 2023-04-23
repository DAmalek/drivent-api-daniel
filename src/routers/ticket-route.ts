import { Router } from 'express';
import { readTypes, readTickets, createTicket } from '@/controllers/tickets-controller';
import { authenticateToken, validateBody } from '@/middlewares';
import { createTicketSchema } from '@/schemas/tickets-schemas';

const ticketRouter = Router();
ticketRouter
  .all('/*', authenticateToken)
  .get('/types', readTypes)
  .get('/', readTickets)
  .post('/', validateBody(createTicketSchema), createTicket);

export { ticketRouter };
