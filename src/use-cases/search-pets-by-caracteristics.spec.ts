import { orgData } from '@/utils/test/org-data'
import { petData } from '@/utils/test/pet-data'
import { describe, expect, it, beforeEach } from 'vitest'
import { SearchPetsByCaracteristics } from './search-pets-by-caracteristics'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: SearchPetsByCaracteristics

describe('Search Pets By Caracteristics', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new SearchPetsByCaracteristics(petsRepository)
  })

  it('should be able to search pets by caracteristics', async () => {
    const orgCreate = await orgsRepository.create(orgData)
    const petCreate = await petsRepository.create({
      ...petData,
      org_id: orgCreate.id,
    })

    const { pets } = await sut.execute(
      {
        property: 'energy_level',
        value: petCreate.energy_level,
      },
      1,
    )

    expect(pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
        }),
      ]),
    )
  })

  it('should be able to return an empty pet list when searching for pets by sending values that do not match a characteristic of a registered pet', async () => {
    const orgCreate = await orgsRepository.create(orgData)
    await petsRepository.create({
      ...petData,
      org_id: orgCreate.id,
    })

    const { pets } = await sut.execute(
      {
        property: 'energy_level',
        value: 'wrong_value',
      },
      1,
    )

    expect(pets).toEqual(expect.arrayContaining([]))
  })

  it('should not be able to search pets by caracteristics with wrong property', async () => {
    const orgCreate = await orgsRepository.create(orgData)
    await petsRepository.create({
      ...petData,
      org_id: orgCreate.id,
    })

    await expect(() =>
      sut.execute(
        {
          property: 'wrong_property' as any,
          value: 'wrong_value',
        },
        1,
      ),
    ).rejects.toThrow()
  })
})
