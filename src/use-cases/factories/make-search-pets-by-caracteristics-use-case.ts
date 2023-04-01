import { SearchPetsByCaracteristics } from '../search-pets-by-caracteristics'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeSearchPetsByCaracteristicsUseCase() {
  const petsRepository = new PrismaPetsRepository()

  const useCase = new SearchPetsByCaracteristics(petsRepository)

  return useCase
}
