import { randomUUID } from 'node:crypto'
import { AppError } from '@/errors/AppError'
import { petData } from '@/utils/test/pet-data'
import { orgData } from '@/utils/test/org-data'
import { UpdatePetUseCase } from './update-pet'
import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'

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
    const createOrg = await orgsRepository.create(orgData)

    const createPet = await petsRepository.create({
      ...petData,
      org_id: createOrg.id,
    })

    const { petUpdated } = await sut.execute({
      id: createPet.id,
      data: {
        name: 'New Pet Name',
      },
      org_id: createPet.org_id,
      payload: {
        sub: createPet.org_id,
        role: 'MEMBER',
      },
    })

    expect(petUpdated.name).toEqual('New Pet Name')
  })

  it('should be able to update pet with multiple photos', async () => {
    const createOrg = await orgsRepository.create(orgData)
    const createPet = await petsRepository.create({
      ...petData,
      org_id: createOrg.id,
    })

    const { petUpdated } = await sut.execute({
      id: createPet.id,
      data: {
        photos: ['photo1', 'photo2', 'photo3'],
      },
      org_id: createOrg.id,
      payload: {
        sub: createOrg.id,
        role: 'MEMBER',
      },
    })

    expect(petUpdated.photos).toEqual(['photo1', 'photo2', 'photo3'])
  })

  it('should not be able to update pet with invalid id', async () => {
    await orgsRepository.create(orgData)

    const createPet = await petsRepository.create(petData)

    await expect(
      sut.execute({
        id: 'invalid-id',
        data: {
          name: 'New Pet Name',
        },
        org_id: createPet.org_id,
        payload: {
          sub: createPet.org_id,
          role: 'MEMBER',
        },
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update a pet if the authenticated organization is different from the pet organization and the pet organization is not an admin', async () => {
    const createOrgOne = await orgsRepository.create(orgData)
    const createOrgTwo = await orgsRepository.create({
      ...orgData,
      email: `org-${randomUUID()}@email.com`,
    })

    const createPet = await petsRepository.create({
      ...petData,
      org_id: createOrgOne.id,
    })

    await expect(
      sut.execute({
        id: createPet.id,
        data: {
          name: 'New Pet Name',
        },
        org_id: createOrgOne.id,
        payload: {
          sub: createOrgTwo.id,
          role: 'MEMBER',
        },
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to update the pet belonging to any organization if the authenticated organization is admin', async () => {
    const createOrgOne = await orgsRepository.create(orgData)
    const createOrgTwo = await orgsRepository.create({
      ...orgData,
      email: `org-${randomUUID()}@email.com`,
    })

    const createPet = await petsRepository.create({
      ...petData,
      org_id: createOrgOne.id,
    })

    const { petUpdated } = await sut.execute({
      id: createPet.id,
      data: {
        name: 'New Pet Name',
      },
      org_id: createOrgTwo.id,
      payload: {
        sub: createOrgTwo.id,
        role: 'ADMIN',
      },
    })

    expect(petUpdated.name).toEqual('New Pet Name')
  })
})
