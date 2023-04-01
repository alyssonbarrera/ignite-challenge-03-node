import { FindPetUseCase } from './find-pet'
import { AppError } from '@/errors/AppError'
import { petData } from '@/utils/test/pet-data'
import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'

let petsRepository: InMemoryPetsRepository
let sut: FindPetUseCase

describe('Find Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FindPetUseCase(petsRepository)
  })

  it('should be able to get org', async () => {
    const createPet = await petsRepository.create(petData)

    const { pet } = await sut.execute(createPet.id)

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to get org with wrong id', async () => {
    await expect(() => sut.execute('wrong-id')).rejects.toBeInstanceOf(AppError)
  })
})
