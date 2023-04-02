import { hash } from 'bcryptjs'
import { AppError } from '@/errors/AppError'
import { orgData } from '@/utils/test/org-data'
import { AuthenticateUseCase } from './authenticate'
import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })

  it('should be able to authenticate', async () => {
    await orgsRepository.create({
      ...orgData,
      password: await hash('Org Password', 6),
    })

    const { org } = await sut.execute({
      email: 'org@email.com',
      password: 'Org Password',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'incorrect_org_email@email.com',
        password: 'Org Password',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await orgsRepository.create({
      ...orgData,
      password: await hash('Org Password', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'org@email.com',
        password: 'Incorrect Org Password',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
