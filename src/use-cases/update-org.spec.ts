import { UpdateOrgUseCase } from './update-org'
import { orgData } from '@/utils/test/org-data'
import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { compare } from 'bcryptjs'

let orgsRepository: InMemoryOrgsRepository
let sut: UpdateOrgUseCase

describe('Update Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new UpdateOrgUseCase(orgsRepository)
  })

  it('should be able to update org', async () => {
    const createOrg = await orgsRepository.create(orgData)

    const { orgUpdated } = await sut.execute({
      id: createOrg.id,
      data: {
        name: 'New Org Name',
        password: 'newpassword',
      },
      payload: {
        sub: createOrg.id,
        role: 'MEMBER',
      },
    })

    expect(orgUpdated.name).toEqual('New Org Name')
  })

  it('should hash org password upon update', async () => {
    const createOrg = await orgsRepository.create(orgData)

    const password = 'newpassword'

    const { orgUpdated } = await sut.execute({
      id: createOrg.id,
      data: {
        password,
      },
      payload: {
        sub: createOrg.id,
        role: 'MEMBER',
      },
    })

    const isPasswordCorrectlyHashed = await compare(
      password,
      orgUpdated.password,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
