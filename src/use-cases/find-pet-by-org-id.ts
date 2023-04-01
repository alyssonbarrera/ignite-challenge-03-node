import { AppError } from '@/errors/AppError'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'

export class FindByOrgId {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute(org_id: string, page: number) {
    const org = await this.orgsRepository.findById(org_id)

    if (!org) {
      throw new AppError('Organization not found', 404)
    }

    const pets = await this.petsRepository.findByOrgId(org_id, page)

    return { pets }
  }
}
