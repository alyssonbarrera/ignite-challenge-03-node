import { app } from '@/app'
import request from 'supertest'
import { createOrg } from '@/utils/test/create-org'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await createOrg()

    const response = await request(app.server).post('/orgs/session').send({
      email: 'org@email.com',
      password: 'Org Password',
    })

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
