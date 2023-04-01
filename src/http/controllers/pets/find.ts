import { z } from 'zod'
import { AppError } from '@/errors/AppError'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeFindPetUseCase } from '@/use-cases/factories/make-find-pet-use-case'

export async function find(request: FastifyRequest, reply: FastifyReply) {
  const findPetParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = findPetParamsSchema.parse(request.params)

  try {
    const findPetUseCase = makeFindPetUseCase()

    const { pet } = await findPetUseCase.execute(id)

    return reply.status(200).send({
      pet,
    })
  } catch (error) {
    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({ message: error.message })
    }
    throw error
  }
}
