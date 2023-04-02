import { petData } from './pet-data'
import { prisma } from '@/lib/prisma'

export async function createPet() {
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
