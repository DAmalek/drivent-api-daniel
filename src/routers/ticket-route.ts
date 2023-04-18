import { Router } from 'express';
import { readTypes } from '@/controllers/tickets-controller';
import { authenticateToken } from '@/middlewares';

const ticketRouter = Router();
ticketRouter.all('/*', authenticateToken).post('/').get('/types', readTypes);

export { ticketRouter };
