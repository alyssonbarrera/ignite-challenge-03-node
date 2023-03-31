import { z } from 'zod'
import { AppError } from '@/errors/AppError'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetOrgUseCase } from '@/use-cases/factories/make-get-org-use-case'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const profileParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = profileParamsSchema.parse(request.params)

  try {
    const getOrgUseCase = makeGetOrgUseCase()

    const { org } = await getOrgUseCase.execute(id)

    return reply.status(200).send({
      org: {
        ...org,
        password: undefined,
      },
    })
  } catch (error) {
    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({ message: error.message })
    }
    throw error
  }
}
