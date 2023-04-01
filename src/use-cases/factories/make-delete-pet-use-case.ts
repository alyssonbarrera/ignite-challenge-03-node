import { DeletePetUseCase } from '../delete-pet'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeDeletePetUseCase() {
  const petsRepository = new PrismaPetsRepository()

  const useCase = new DeletePetUseCase(petsRepository)

  return useCase
}
