import { TicketType } from '@prisma/client';
import { prisma } from '@/config';

async function listTypes() {
  return prisma.ticketType.findMany();
}

const ticketsRepository = { listTypes };

export default ticketsRepository;
