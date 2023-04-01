import { FindByOrgId } from '../find-pet-by-org-id'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeFindPetByOrgIdUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()

  const useCase = new FindByOrgId(petsRepository, orgsRepository)

  return useCase
}
