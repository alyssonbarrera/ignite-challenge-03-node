import {
  PetsRepository,
  SearchByCaracteristicsParams,
} from '@/repositories/pets-repository'

export class SearchPetsByCaracteristics {
  constructor(private petsRepository: PetsRepository) {}

  async execute(
    { property, value }: SearchByCaracteristicsParams,
    page: number,
  ) {
    const pets = await this.petsRepository.searchByCaracteristics(
      { property, value },
      page,
    )
    return { pets }
  }
}
