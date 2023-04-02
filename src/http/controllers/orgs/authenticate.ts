import { z } from 'zod'
import { AppError } from '@/errors/AppError'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { org } = await authenticateUseCase.execute({ email, password })

    const token = await reply.jwtSign(
      {
        role: org.role,
      },
      {
        sign: {
          sub: org.id,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {
        role: org.role,
      },
      {
        sign: {
          sub: org.id,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({
        token,
      })
  } catch (error) {
    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({ message: error.message })
    }
    throw error
  }
}
