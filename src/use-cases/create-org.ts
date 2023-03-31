import { AppError } from '@/errors/AppError'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'

interface CreateOrgUseCaseRequest {
  name: string
  owner: string
  email: string
  zip_code: string
  address: string
  address_number: string
  neighborhood: string
  city: string
  state: string
  whatsapp: string
  password: string
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    owner,
    email,
    zip_code,
    address,
    address_number,
    neighborhood,
    city,
    state,
    whatsapp,
    password,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    password = await hash(password, 6)

    const userWithSomeEmail = await this.orgsRepository.findByEmail(email)

    if (userWithSomeEmail) {
      throw new AppError('Email already in use', 409)
    }

    const org = await this.orgsRepository.create({
      name,
      owner,
      email,
      zip_code,
      address,
      address_number,
      neighborhood,
      city,
      state,
      whatsapp,
      password,
    })

    return {
      org,
    }
  }
}
