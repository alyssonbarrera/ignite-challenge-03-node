import { create } from './create'
import { search } from './search'
import { update } from './update'
import { profile } from './profile'
import { deleteOrg } from './delete'
import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { refresh } from './refresh'

export async function orgsRoutes(app: FastifyInstance) {
  app.get('/orgs/:id', profile)
  app.get('/orgs', search)
  app.post('/orgs', create)
  app.post('/orgs/session', authenticate)
  app.patch('/orgs/token/refresh', refresh)

  // Authenticated routes
  app.put('/orgs/:id', { onRequest: [verifyJWT] }, update)
  app.delete('/orgs/:id', { onRequest: [verifyJWT] }, deleteOrg)
}
