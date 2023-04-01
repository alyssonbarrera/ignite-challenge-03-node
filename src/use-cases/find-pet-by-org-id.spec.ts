import { AppError } from '@/errors/AppError'
import { petData } from '@/utils/test/pet-data'
import { orgData } from '@/utils/test/org-data'
import { FindByOrgId } from './find-pet-by-org-id'
import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: FindByOrgId

describe('Find Pet By Org Id Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new FindByOrgId(petsRepository, orgsRepository)
  })

  it('should be able to find pet by org id', async () => {
    const createOrg = await orgsRepository.create(orgData)
    await petsRepository.create({
      ...petData,
      org_id: createOrg.id,
    })

    const { pets } = await sut.execute(createOrg.id, 1)

    expect(pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
        }),
      ]),
    )
  })

  it('should not be able to find pet by org id with wrong org_id', async () => {
    await expect(() => sut.execute('wrong-id', 1)).rejects.toBeInstanceOf(
      AppError,
    )
  })
})
