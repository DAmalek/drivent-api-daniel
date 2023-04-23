import { Router } from 'express';
import { createPayment, readPayments } from '@/controllers/payments-controller';
import { authenticateToken } from '@/middlewares';

const paymentsRouter = Router();

paymentsRouter.all('/*', authenticateToken).get('/', readPayments).post('/process', createPayment);

export { paymentsRouter };
