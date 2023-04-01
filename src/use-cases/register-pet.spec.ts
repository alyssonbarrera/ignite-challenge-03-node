import { AppError } from '@/errors/AppError'
import { petData } from '@/utils/test/pet-data'
import { RegisterPetUseCase } from './register-pet'
import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { orgData } from '@/utils/test/org-data'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: RegisterPetUseCase

describe('Create Org Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterPetUseCase(petsRepository, orgsRepository)
  })

  it('should be able to register pet', async () => {
    const org = await orgsRepository.create(orgData)

    const { pet } = await sut.execute({
      ...petData,
      org_id: org.id,
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.org_id).toEqual(org.id)
  })

  it('should not be able to register pet with invalid org id', async () => {
    await expect(
      sut.execute({
        ...petData,
        org_id: 'invalid-org-id',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
