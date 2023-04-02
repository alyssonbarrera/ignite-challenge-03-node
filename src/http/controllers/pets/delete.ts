import { z } from 'zod'
import { AppError } from '@/errors/AppError'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeDeletePetUseCase } from '@/use-cases/factories/make-delete-pet-use-case'

export async function deletePet(request: FastifyRequest, reply: FastifyReply) {
  const deletePetParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const deletePetQuerySchema = z.object({
    org_id: z.string().uuid(),
  })

  const { id } = deletePetParamsSchema.parse(request.params)
  const { org_id } = deletePetQuerySchema.parse(request.query)

  const payload = request.user

  try {
    const deletePetUseCase = makeDeletePetUseCase()

    await deletePetUseCase.execute({
      id,
      org_id,
      payload,
    })
  } catch (error) {
    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({ message: error.message })
    }
    throw error
  }

  return reply.status(200).send()
}
