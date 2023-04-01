import { z } from 'zod'
import { AppError } from '@/errors/AppError'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeUpdatePetUseCase } from '@/use-cases/factories/make-update-pet-use-case'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateBodySchema = z.object({
    name: z.string().min(2).optional(),
    photos: z.union([z.string(), z.array(z.string())]).optional(),
    presentation: z.string().optional(),
    energy_level: z.string().optional(),
    suitable_environment: z.string().toUpperCase().optional(),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE']).optional(),
    home_restriction: z
      .enum(['APARTMENT', 'HOUSE', 'CONDOMINIUM', 'URBAN', 'RURAL', 'SHARED'])
      .optional(),
    climate_preference: z.enum(['HOT', 'COLD', 'TEMPERATE', 'DRY']).optional(),
    health_issues: z.union([z.string(), z.array(z.string())]).optional(),
    org_id: z.string().uuid().optional(),
  })

  const updateParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = updateParamsSchema.parse(request.params)
  const data = updateBodySchema.parse(request.body)

  try {
    const updatePetUseCase = makeUpdatePetUseCase()

    await updatePetUseCase.execute({
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
