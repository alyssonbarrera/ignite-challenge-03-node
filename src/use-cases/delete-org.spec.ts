import { randomUUID } from 'node:crypto'
import { AppError } from '@/errors/AppError'
import { DeleteOrgUseCase } from './delete-org'
import { orgData } from '@/utils/test/org-data'
import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let orgsRepository: InMemoryOrgsRepository
let sut: DeleteOrgUseCase

describe('Delete Org', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new DeleteOrgUseCase(orgsRepository)
  })

  it('should be able to delete org if user is not admin', async () => {
    const createOrgOne = await orgsRepository.create(orgData)
    const createOrgTwo = await orgsRepository.create({
      ...orgData,
      email: `org-${randomUUID()}@email.com`,
    })

    await sut.execute(createOrgOne.id, { sub: createOrgTwo.id, role: 'MEMBER' })

    const orgOne = await orgsRepository.findById(createOrgOne.id)
    const orgTwo = await orgsRepository.findById(createOrgTwo.id)

    expect(orgOne).toEqual(
      expect.objectContaining({
        id: createOrgOne.id,
      }),
    )
    expect(orgTwo).toEqual(null)
  })

  it('should be able to delete org if user is admin', async () => {
    const createOrgOne = await orgsRepository.create(orgData)
    const createOrgTwo = await orgsRepository.create({
      ...orgData,
      email: `org-${randomUUID()}@email.com`,
    })

    await sut.execute(createOrgOne.id, { sub: createOrgTwo.id, role: 'ADMIN' })

    const org = await orgsRepository.findById(createOrgOne.id)

    expect(org).toEqual(null)
  })

  it('should not be able to delete org if not exists', async () => {
    await expect(
      sut.execute('invalid-id', { sub: 'id', role: 'MEMBER' }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
