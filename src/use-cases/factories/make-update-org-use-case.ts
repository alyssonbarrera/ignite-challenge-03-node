import { UpdateOrgUseCase } from '../update-org'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function makeUpdateOrgUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const useCase = new UpdateOrgUseCase(orgsRepository)

  return useCase
}
