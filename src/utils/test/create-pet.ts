import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import { petData } from './pet-data'

export async function createPet(app: FastifyInstance) {
  const petId = '6444ca02-d02a-11ed-afa1-0242ac120002'
  const orgId = '3f2def52-cff1-11ed-afa1-0242ac120002'

  await prisma.pet.create({
    data: {
      id: petId,
      ...petData,
      org_id: orgId,
    },
  })
}
