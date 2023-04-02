import { compare } from 'bcryptjs'
import { Org } from '@prisma/client'
import { AppError } from '@/errors/AppError'
import { OrgsRepository } from '@/repositories/orgs-repository'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  org: Org
}

export class AuthenticateUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email)

    if (!org) {
      throw new AppError('Invalid credentials', 401)
    }

    const doesPasswordMatches = await compare(password, org.password)

    if (!doesPasswordMatches) {
      throw new AppError('Invalid credentials', 401)
    }

    return {
      org,
    }
  }
}
