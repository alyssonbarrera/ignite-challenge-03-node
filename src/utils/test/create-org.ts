import { hash } from 'bcryptjs'
import { orgData } from './org-data'
import { prisma } from '@/lib/prisma'

export async function createOrg(isAdmin = false) {
  const id = '3f2def52-cff1-11ed-afa1-0242ac120002'

  await prisma.org.create({
    data: {
      id,
      ...orgData,
      role: isAdmin ? 'ADMIN' : 'MEMBER',
      password: await hash(orgData.password, 6),
    },
  })
}
