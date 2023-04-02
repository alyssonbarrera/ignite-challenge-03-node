import { AuthenticateUseCase } from '../authenticate'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function makeAuthenticateUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const useCase = new AuthenticateUseCase(orgsRepository)

  return useCase
}
