import { UpdatePetUseCase } from '../update-pet'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeUpdatePetUseCase() {
  const petsRepository = new PrismaPetsRepository()

  const useCase = new UpdatePetUseCase(petsRepository)

  return useCase
}
