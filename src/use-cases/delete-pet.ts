import { AppError } from '@/errors/AppError'
import { PetsRepository } from '@/repositories/pets-repository'

interface DeletePetUseCaseRequest {
  id: string
  org_id: string
  payload: {
    sub: string
    role: 'ADMIN' | 'MEMBER'
  }
}

export class DeletePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ id, org_id, payload }: DeletePetUseCaseRequest) {
    const pet = await this.petsRepository.findById(id)

    if (payload.role !== 'ADMIN' && payload.sub !== org_id) {
      throw new AppError('You are not allowed to update this pet', 403)
    }

    if (!pet) {
      throw new AppError('Pet not found', 404)
    }

    await this.petsRepository.delete(id)
  }
}
