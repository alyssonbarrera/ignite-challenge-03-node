import { GetOrgUseCase } from '../get-org'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function makeGetOrgUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const useCase = new GetOrgUseCase(orgsRepository)

  return useCase
}
