import { SearchOrgsUseCase } from './search-orgs'
import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { orgData } from '@/utils/test/org-data'

let orgsRepository: InMemoryOrgsRepository
let sut: SearchOrgsUseCase

describe('Search Orgs', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new SearchOrgsUseCase(orgsRepository)
  })

  it('should be able to search orgs', async () => {
    await orgsRepository.create(orgData)

    const { orgs } = await sut.execute('Org', 1)

    expect(orgs).toEqual(expect.any(Array))
  })
})
