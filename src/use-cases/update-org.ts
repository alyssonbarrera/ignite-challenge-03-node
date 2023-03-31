import { hash } from 'bcryptjs'
import { Org } from '@prisma/client'
import { AppError } from '@/errors/AppError'
import { OrgsRepository } from '@/repositories/orgs-repository'

interface UpdateOrgUseCaseRequest {
  id: string
  data: {
    name?: string
    owner?: string
    email?: string
    zip_code?: string
    address?: string
    address_number?: string
    neighborhood?: string
    city?: string
    state?: string
    whatsapp?: string
    password?: string
  }
}

interface UpdateOrgUseCaseResponse {
  orgUpdated: Org
}

export class UpdateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    id,
    data,
  }: UpdateOrgUseCaseRequest): Promise<UpdateOrgUseCaseResponse> {
    const org = await this.orgsRepository.findById(id)

    if (!org) {
      throw new AppError('Org not found', 404)
    }

    if (data.password) {
      data.password = await hash(data.password, 6)
    }

    const orgUpdated = await this.orgsRepository.update(id, data)

    return {
      orgUpdated,
    }
  }
}
