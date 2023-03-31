import { DeleteOrgUseCase } from '../delete-org'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function makeDeleteOrgUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const useCase = new DeleteOrgUseCase(orgsRepository)

  return useCase
}
