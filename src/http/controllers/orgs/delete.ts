import { z } from 'zod'
import { AppError } from '@/errors/AppError'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeDeleteOrgUseCase } from '@/use-cases/factories/make-delete-org-use-case'

export async function deleteOrg(request: FastifyRequest, reply: FastifyReply) {
  const deleteOrgParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = deleteOrgParamsSchema.parse(request.params)

  const payload = request.user

  try {
    const deleteOrgUseCase = makeDeleteOrgUseCase()

    await deleteOrgUseCase.execute(id, payload)
  } catch (error) {
    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({ message: error.message })
    }
    throw error
  }

  return reply.status(200).send()
}
