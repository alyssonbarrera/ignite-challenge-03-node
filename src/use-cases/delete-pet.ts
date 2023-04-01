import { AppError } from '@/errors/AppError'
import { PetsRepository } from '@/repositories/pets-repository'

export class DeletePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(id: string) {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new AppError('Pet not found', 404)
    }

    await this.petsRepository.delete(id)
  }
}
