import { z } from 'zod'
import { AppError } from '@/errors/AppError'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeUpdateOrgUseCase } from '@/use-cases/factories/make-update-org-use-case'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateBodySchema = z.object({
    name: z.string().optional(),
    owner: z.string().optional(),
    email: z.string().toLowerCase().optional(),
    zip_code: z.string().optional(),
    address: z.string().optional(),
    address_number: z.string().optional(),
    neighborhood: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    whatsapp: z.string().optional(),
    password: z.string().min(6).optional(),
  })

  const updateParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = updateParamsSchema.parse(request.params)
  const data = updateBodySchema.parse(request.body)

  try {
    const updateOrgUseCase = makeUpdateOrgUseCase()

    await updateOrgUseCase.execute({
      id,
      data,
    })
  } catch (error) {
    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({
        message: error.message,
      })
    }
    throw error
  }
  return reply.status(204).send()
}
