import { z } from 'zod'
import { AppError } from '@/errors/AppError'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeCreateOrgUseCase } from '@/use-cases/factories/make-create-org-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    owner: z.string(),
    email: z.string().email(),
    zip_code: z.string(),
    address: z.string(),
    address_number: z.string(),
    neighborhood: z.string(),
    city: z.string(),
    state: z.string(),
    whatsapp: z.string(),
    password: z.string().min(6),
  })

  const data = createBodySchema.parse(request.body)

  try {
    const createOrgUseCase = makeCreateOrgUseCase()

    await createOrgUseCase.execute(data)
  } catch (error) {
    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({ message: error.message })
    }
    throw error
  }

  return reply.status(201).send()
}
