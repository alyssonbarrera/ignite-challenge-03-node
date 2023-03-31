import { prisma } from '@/lib/prisma'
import { orgData } from './org-data'
import { FastifyInstance } from 'fastify'

export async function createOrg(app: FastifyInstance, isAdmin = false) {
  const id = '3f2def52-cff1-11ed-afa1-0242ac120002'

  await prisma.org.create({
    data: {
      id,
      ...orgData,
    },
  })
}
