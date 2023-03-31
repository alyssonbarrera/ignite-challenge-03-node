import { create } from './create'
import { profile } from './profile'
import { FastifyInstance } from 'fastify'

export async function orgsRoutes(app: FastifyInstance) {
  app.get('/orgs/:id', profile)
  app.post('/orgs', create)
}
