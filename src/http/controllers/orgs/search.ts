import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeSearchOrgsUseCase } from '@/use-cases/factories/make-search-orgs-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchQuerySchema = z.object({
    query: z.string().toLowerCase(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchQuerySchema.parse(request.query)

  const searchOrgsUseCase = makeSearchOrgsUseCase()

  const { orgs } = await searchOrgsUseCase.execute(query, page)

  reply.status(200).send({
    orgs,
  })
}
