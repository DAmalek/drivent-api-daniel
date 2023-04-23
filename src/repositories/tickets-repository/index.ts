import { Ticket, TicketStatus, TicketType } from '@prisma/client';
import { prisma } from '@/config';

async function listTypes() {
  return await prisma.ticketType.findMany();
}

async function findTickets(enrollmentId: number) {
  return await prisma.ticket.findFirst({
    where: { enrollmentId },
    include: {
      TicketType: true,
    },
  });
}

async function createTicket(ticketData: CreateTicketParams) {
  return await prisma.ticket.create({
    data: ticketData,
  });
}

async function findTicketById(ticketId: number) {
  return prisma.ticket.findFirst({
    where: { id: ticketId },
    include: { Enrollment: true },
  });
}

async function findTicketTypeById(ticketId: number) {
  return prisma.ticket.findFirst({
    where: { id: ticketId },
    include: {
      TicketType: true,
    },
  });
}

async function ticketPayment(ticketId: number) {
  return prisma.ticket.update({
    where: { id: ticketId },
    data: {
      status: TicketStatus.PAID,
    },
  });
}

export type CreateTicketParams = Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>;

const ticketsRepository = { listTypes, findTickets, createTicket, findTicketById, findTicketTypeById, ticketPayment };

export default ticketsRepository;
