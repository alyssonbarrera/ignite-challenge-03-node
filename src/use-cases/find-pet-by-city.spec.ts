import { petData } from '@/utils/test/pet-data'
import { orgData } from '@/utils/test/org-data'
import { FindPetByCityUseCase } from './find-pet-by-city'
import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: FindPetByCityUseCase

describe('Find Pet By City Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new FindPetByCityUseCase(petsRepository)
  })

  it('should be able to find pet by city', async () => {
    const createOrg = await orgsRepository.create(orgData)
    petsRepository.petsAndOrgs.push({
      ...petData,
      id: 'efae2dfb-57d0-44f6-8869-0e0678f73c3e',
      organization: createOrg,
    })

    const { pets } = await sut.execute(createOrg.city, 1)

    expect(pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
        }),
      ]),
    )
  })

  it('Should be able to return an empty list of pets per city if there is no organization in the city', async () => {
    expect(() => sut.execute('wrong-city', 1)).toEqual(
      expect.arrayContaining([]),
    )
  })
})
