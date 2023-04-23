import { Ticket, TicketStatus } from '@prisma/client';
import { notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function listAllTypes() {
  const list = await ticketsRepository.listTypes();
  if (!list) throw notFoundError();

  return list;
}

async function listTicketsByUserId(userId: number) {
  const enrollments = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollments) throw notFoundError();

  const tickets = await ticketsRepository.findTickets(enrollments.id);

  if (!tickets) throw notFoundError();

  return tickets;
}

async function createTicket(ticketTypeId: number, userId: number) {
  const enrollments = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollments) throw notFoundError();

  const ticketData = {
    ticketTypeId,
    enrollmentId: enrollments.id,
    status: TicketStatus.RESERVED,
  };

  await ticketsRepository.createTicket(ticketData);

  const ticket = await ticketsRepository.findTickets(enrollments.id);

  return ticket;
}

const ticketService = {
  listAllTypes,
  listTicketsByUserId,
  createTicket,
};

export default ticketService;
