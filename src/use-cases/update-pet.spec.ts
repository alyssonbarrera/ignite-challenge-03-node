import { petData } from '@/utils/test/pet-data'
import { orgData } from '@/utils/test/org-data'
import { UpdatePetUseCase } from './update-pet'
import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { AppError } from '@/errors/AppError'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: UpdatePetUseCase

describe('Update Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new UpdatePetUseCase(petsRepository)
  })

  it('should be able to update pet', async () => {
    await orgsRepository.create(orgData)

    const createPet = await petsRepository.create(petData)

    const { petUpdated } = await sut.execute({
      id: createPet.id,
      data: {
        name: 'New Pet Name',
      },
    })

    expect(petUpdated.name).toEqual('New Pet Name')
  })

  it('should be able to update pet with multiple photos', async () => {
    await orgsRepository.create(orgData)

    const createPet = await petsRepository.create(petData)

    const { petUpdated } = await sut.execute({
      id: createPet.id,
      data: {
        photos: ['photo1', 'photo2', 'photo3'],
      },
    })

    expect(petUpdated.photos).toEqual(['photo1', 'photo2', 'photo3'])
  })

  it('should not be able to update pet with invalid id', async () => {
    await expect(
      sut.execute({
        id: 'invalid-id',
        data: {
          name: 'New Pet Name',
        },
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
