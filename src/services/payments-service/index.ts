import { type } from 'os';
import { Payment } from '@prisma/client';
import { notFoundError, requestError, unauthorizedError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import paymentsRepository from '@/repositories/payments-repository';
import ticketsRepository from '@/repositories/tickets-repository';

export type cardDataParams = {
  issuer: string;
  number: number;
  name: string;
  expirationDate: Date;
  cvv: number;
};

export type paymentObj = Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>;

async function validateEnrollmentAndTicket(ticketId: number, userId: number) {
  const ticket = await ticketsRepository.findTicketById(ticketId);

  if (!ticket) throw notFoundError();

  const enrollment = await enrollmentRepository.findById(ticket.enrollmentId);
  if (!enrollment) throw notFoundError();

  if (enrollment.userId !== userId) throw unauthorizedError();
}

async function findPayments(ticketId: number, userId: number) {
  await validateEnrollmentAndTicket(ticketId, userId);

  const payment = await paymentsRepository.findPaymentByTicketId(ticketId);
  if (!payment) throw notFoundError();

  return payment;
}

async function recivePayment(userId: number, ticketId: number, cardData: cardDataParams) {
  await validateEnrollmentAndTicket(ticketId, userId);

  const ticket = await ticketsRepository.findTicketTypeById(ticketId);

  const paymentData: paymentObj = {
    ticketId,
    value: ticket.TicketType.price,
    cardIssuer: cardData.issuer,
    cardLastDigits: cardData.number.toString().slice(-4),
  };

  const payment = await paymentsRepository.createPayment(ticketId, paymentData);

  await ticketsRepository.ticketPayment(ticketId);

  return payment;
}

export default { findPayments, recivePayment };
