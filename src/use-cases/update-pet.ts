import { AppError } from '@/errors/AppError'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface UpdatePetUseCaseRequest {
  id: string
  data: {
    name?: string
    photos?: string | string[]
    presentation?: string
    energy_level?: string
    suitable_environment?: string
    size?: 'SMALL' | 'MEDIUM' | 'LARGE'
    home_restriction?:
      | 'APARTMENT'
      | 'HOUSE'
      | 'CONDOMINIUM'
      | 'URBAN'
      | 'RURAL'
      | 'SHARED'
    climate_preference?: 'HOT' | 'COLD' | 'TEMPERATE' | 'DRY'
    health_issues?: string | string[]
    org_id?: string
  }
}

interface UpdatePetUseCaseResponse {
  petUpdated: Pet
}

export class UpdatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    id,
    data,
  }: UpdatePetUseCaseRequest): Promise<UpdatePetUseCaseResponse> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new AppError('Pet not found', 404)
    }

    const petUpdated = await this.petsRepository.update(id, data)

    return {
      petUpdated,
    }
  }
}
