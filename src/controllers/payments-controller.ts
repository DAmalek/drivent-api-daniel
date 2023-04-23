import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from '@/services/payments-service';

export async function readPayments(req: AuthenticatedRequest, res: Response) {
  const ticketId = Number(req.query.ticketId);

  if (!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST);

  const { userId } = req;

  try {
    const payments = await paymentsService.findPayments(ticketId, userId);
    if (!payments) return res.sendStatus(httpStatus.NOT_FOUND);
    return res.status(httpStatus.OK).send(payments);
  } catch (error) {
    if (error.name === 'UnauthorizedError') return res.sendStatus(httpStatus.UNAUTHORIZED);

    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function createPayment(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketId, cardData } = req.body;

  if (!ticketId || !cardData) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const payment = await paymentsService.recivePayment(userId, ticketId, cardData);
    if (!payment) return res.sendStatus(httpStatus.NOT_FOUND);

    res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === 'UnauthorizedError') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
