import { prisma } from '@/lib/prisma'
import { petData } from './pet-data'
import { orgData } from './org-data'

export async function createOrgAndPet(isAdmin = false) {
  const petId = '5444ca02-d02a-11ed-afa1-0242ac120002'
  const orgId = '5f2def52-cff1-11ed-afa1-0242ac120002'

  await prisma.org.create({
    data: {
      id: orgId,
      ...orgData,
      role: isAdmin ? 'ADMIN' : 'MEMBER',
      email: 'orgmail@example.com',
    },
  })

  await prisma.pet.create({
    data: {
      id: petId,
      ...petData,
      org_id: orgId,
    },
  })
}
