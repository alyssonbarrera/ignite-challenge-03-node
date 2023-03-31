import { AppError } from '@/errors/AppError'
import { OrgsRepository } from '@/repositories/orgs-repository'

export class DeleteOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(id: string) {
    const org = await this.orgsRepository.findById(id)

    if (!org) {
      throw new AppError('Org not found', 404)
    }

    await this.orgsRepository.delete(id)
  }
}
