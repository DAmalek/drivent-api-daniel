import ticketsRepository from '@/repositories/tickets-repository';

async function listAllTypes() {
  const list = await ticketsRepository.listTypes();

  return list;
}

const ticketService = {
  listAllTypes,
};

export default ticketService;
