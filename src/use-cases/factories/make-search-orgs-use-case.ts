import { SearchOrgsUseCase } from '../search-orgs'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function makeSearchOrgsUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const useCase = new SearchOrgsUseCase(orgsRepository)

  return useCase
}
