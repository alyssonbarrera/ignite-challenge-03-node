import { z } from 'zod'
import { AppError } from '@/errors/AppError'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-pet-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string().min(2),
    photos: z.union([z.string(), z.array(z.string())]),
    presentation: z.string(),
    energy_level: z.string(),
    suitable_environment: z.string().toUpperCase(),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
    home_restriction: z.enum([
      'APARTMENT',
      'HOUSE',
      'CONDOMINIUM',
      'URBAN',
      'RURAL',
      'SHARED',
    ]),
    climate_preference: z.enum(['HOT', 'COLD', 'TEMPERATE', 'DRY']),
    health_issues: z.union([z.string(), z.array(z.string())]),
    org_id: z.string().uuid(),
  })

  const data = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute(data)
  } catch (error) {
    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({ message: error.message })
    }
    throw error
  }

  return reply.status(201).send()
}
