import { AppError } from '@/errors/AppError'
import { DeleteOrgUseCase } from './delete-org'
import { orgData } from '@/utils/test/org-data'
import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let orgsRepository: InMemoryOrgsRepository
let sut: DeleteOrgUseCase

describe('Search Orgs', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new DeleteOrgUseCase(orgsRepository)
  })

  it('should be able to search orgs', async () => {
    const createOrg = await orgsRepository.create(orgData)

    await sut.execute(createOrg.id)

    const org = await orgsRepository.findById(createOrg.id)

    expect(org).toEqual(null)
  })

  it('should not be able to delete org if not exists', async () => {
    await expect(sut.execute('invalid-id')).rejects.toBeInstanceOf(AppError)
  })
})
