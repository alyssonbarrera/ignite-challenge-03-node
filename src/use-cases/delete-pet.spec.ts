import { AppError } from '@/errors/AppError'
import { orgData } from '@/utils/test/org-data'
import { petData } from '@/utils/test/pet-data'
import { DeletePetUseCase } from './delete-pet'
import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: DeletePetUseCase

describe('Delete Pet', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new DeletePetUseCase(petsRepository)
  })

  it('should be able to delete org', async () => {
    const createOrg = await orgsRepository.create(orgData)

    const createPet = await petsRepository.create({
      ...petData,
      org_id: createOrg.id,
    })

    await sut.execute(createPet.id)

    const pet = await petsRepository.findById(createPet.id)

    expect(pet).toEqual(null)
  })

  it('should not be able to delete org if not exists', async () => {
    await expect(sut.execute('invalid-id')).rejects.toBeInstanceOf(AppError)
  })
})
