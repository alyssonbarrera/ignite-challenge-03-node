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

  it('should be able to delete pet', async () => {
    const createOrg = await orgsRepository.create(orgData)

    const createPet = await petsRepository.create({
      ...petData,
      org_id: createOrg.id,
    })

    await sut.execute({
      id: createPet.id,
      org_id: createOrg.id,
      payload: {
        sub: createOrg.id,
        role: 'MEMBER',
      },
    })

    const pet = await petsRepository.findById(createPet.id)

    expect(pet).toEqual(null)
  })

  it('should not be able to delete pet if the organization is not the owner or admin', async () => {
    const createOrg = await orgsRepository.create(orgData)

    const createPet = await petsRepository.create({
      ...petData,
      org_id: createOrg.id,
    })

    await expect(
      sut.execute({
        id: createPet.id,
        org_id: createOrg.id,
        payload: {
          sub: 'non-existing-id',
          role: 'MEMBER',
        },
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to delete the pet if the organization is not the owner, but if it is an administrator', async () => {
    const createOrgOne = await orgsRepository.create(orgData)
    const createOrgTwo = await orgsRepository.create(orgData)

    const createPet = await petsRepository.create({
      ...petData,
      org_id: createOrgTwo.id,
    })

    await sut.execute({
      id: createPet.id,
      org_id: createOrgTwo.id,
      payload: {
        sub: createOrgOne.id,
        role: 'ADMIN',
      },
    })

    const pet = await petsRepository.findById(createPet.id)

    expect(pet).toEqual(null)
  })

  it('should not be able to delete pet if not exists', async () => {
    await expect(
      sut.execute({
        id: 'non-existing-id',
        org_id: 'non-existing-id',
        payload: {
          sub: 'non-existing-id',
          role: 'MEMBER',
        },
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
