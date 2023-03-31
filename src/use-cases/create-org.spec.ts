import { compare } from 'bcryptjs'
import { AppError } from '@/errors/AppError'
import { CreateOrgUseCase } from './create-org'
import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { orgData } from '@/utils/test/org-data'

let orgsRepository: InMemoryOrgsRepository
let sut: CreateOrgUseCase

describe('Create Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it('should be able to create org', async () => {
    const { org } = await sut.execute(orgData)

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to create org with same email', async () => {
    await sut.execute(orgData)

    await expect(sut.execute(orgData)).rejects.toBeInstanceOf(AppError)
  })

  it('should hash user password upon registration', async () => {
    const { org } = await sut.execute(orgData)

    const isPasswordCorrectlyHashed = await compare(
      orgData.password,
      org.password,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
