import { find } from './find'
import { register } from './register'
import { FastifyInstance } from 'fastify'
import { findByCity } from './find-by-city'
import { findByOrgId } from './find-by-org-id'
import { searchByCaracteristics } from './search-by-caracteristics'
import { deletePet } from './delete'
import { update } from './update'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/:id', find)
  app.get('/pets/org/:id', findByOrgId)
  app.get('/pets', findByCity)
  app.get('/pets/search', searchByCaracteristics)

  // Authenticated routes
  app.post('/pets', { onRequest: [verifyJWT] }, register)
  app.put('/pets/:id', { onRequest: [verifyJWT] }, update)
  app.delete('/pets/:id', { onRequest: [verifyJWT] }, deletePet)
}
