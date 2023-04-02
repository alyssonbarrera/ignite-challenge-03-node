import request from 'supertest'
import { createOrg } from './create-org'
import { FastifyInstance } from 'fastify'

export async function createAndAuthenticateOrg(
  app: FastifyInstance,
  isAdmin = false,
) {
  await createOrg(isAdmin)

  const authResponse = await request(app.server).post('/orgs/session').send({
    email: 'org@email.com',
    password: 'Org Password',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
