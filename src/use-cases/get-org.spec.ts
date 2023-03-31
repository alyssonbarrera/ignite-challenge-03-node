import { GetOrgUseCase } from './get-org'
import { AppError } from '@/errors/AppError'
import { orgData } from '@/utils/test/org-data'
import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let orgsRepository: InMemoryOrgsRepository
let sut: GetOrgUseCase

describe('Get Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new GetOrgUseCase(orgsRepository)
  })

  it('should be able to get org', async () => {
    const createOrg = await orgsRepository.create(orgData)

    const { org } = await sut.execute(createOrg.id)

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to get org with wrong id', async () => {
    await expect(() => sut.execute('wrong-id')).rejects.toBeInstanceOf(AppError)
  })
})
