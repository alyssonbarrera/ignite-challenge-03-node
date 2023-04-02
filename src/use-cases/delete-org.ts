import { AppError } from '@/errors/AppError'
import { OrgsRepository } from '@/repositories/orgs-repository'

interface Payload {
  sub: string
  role: 'ADMIN' | 'MEMBER'
}

export class DeleteOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(id: string, payload: Payload) {
    if (payload.role !== 'ADMIN') {
      id = payload.sub
    }

    const org = await this.orgsRepository.findById(id)

    if (!org) {
      throw new AppError('Org not found', 404)
    }

    await this.orgsRepository.delete(id)
  }
}
