import { create } from './create'
import { search } from './search'
import { update } from './update'
import { profile } from './profile'
import { deleteOrg } from './delete'
import { FastifyInstance } from 'fastify'

export async function orgsRoutes(app: FastifyInstance) {
  app.get('/orgs/:id', profile)
  app.get('/orgs', search)
  app.post('/orgs', create)
  app.put('/orgs/:id', update)
  app.delete('/orgs/:id', deleteOrg)
}
