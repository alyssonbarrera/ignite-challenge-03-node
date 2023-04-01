import { z } from 'zod'
import { AppError } from '@/errors/AppError'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeSearchPetsByCaracteristicsUseCase } from '@/use-cases/factories/make-search-pets-by-caracteristics-use-case'

export async function searchByCaracteristics(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchByCaracteristicsQueryParams = z.object({
    property: z.enum(['energy_level', 'suitable_environment', 'size']),
    value: z.string().min(1),
    page: z.coerce.number().min(1).default(1),
  })

  const { property, value, page } = searchByCaracteristicsQueryParams.parse(
    request.query,
  )

  if (property === 'size') {
    if (!['small', 'medium', 'large'].includes(value.toLowerCase())) {
      return reply.status(400).send({
        message: 'Invalid value for property size',
      })
    }
  }

  try {
    const searchPetsByCaracteristicsUseCase =
      makeSearchPetsByCaracteristicsUseCase()

    const { pets } = await searchPetsByCaracteristicsUseCase.execute(
      { property, value },
      page,
    )

    return reply.status(200).send({
      pets,
    })
  } catch (error) {
    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({ message: error.message })
    }
    throw error
  }
}
