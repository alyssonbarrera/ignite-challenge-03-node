import { AppError } from '@/errors/AppError'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'

interface RegisterPetUseCaseRequest {
  name: string
  photos: string | string[]
  presentation: string
  energy_level: string
  suitable_environment: string
  size: 'SMALL' | 'MEDIUM' | 'LARGE'
  home_restriction:
    | 'APARTMENT'
    | 'HOUSE'
    | 'CONDOMINIUM'
    | 'URBAN'
    | 'RURAL'
    | 'SHARED'
  climate_preference: 'HOT' | 'COLD' | 'TEMPERATE' | 'DRY'
  health_issues: string | string[]
  org_id: string
}

export class RegisterPetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    name,
    photos,
    presentation,
    energy_level,
    suitable_environment,
    size,
    home_restriction,
    climate_preference,
    health_issues,
    org_id,
  }: RegisterPetUseCaseRequest) {
    const org = await this.orgsRepository.findById(org_id)

    if (!org) {
      throw new AppError('Organization not found', 404)
    }

    const pet = await this.petsRepository.create({
      name,
      photos,
      presentation,
      energy_level,
      suitable_environment,
      size,
      home_restriction,
      climate_preference,
      health_issues,
      org_id,
    })

    return { pet }
  }
}
