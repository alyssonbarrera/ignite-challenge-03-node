import { RegisterPetUseCase } from '../register-pet'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeRegisterUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()

  const useCase = new RegisterPetUseCase(petsRepository, orgsRepository)

  return useCase
}
