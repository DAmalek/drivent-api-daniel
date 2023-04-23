import { prisma } from '@/config';
import { paymentObj } from '@/services/payments-service';

async function findPaymentByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: { ticketId },
  });
}

async function createPayment(ticketId: number, paymentData: paymentObj) {
  return prisma.payment.create({
    data: {
      ticketId,
      ...paymentData,
    },
  });
}

export default { findPaymentByTicketId, createPayment };
