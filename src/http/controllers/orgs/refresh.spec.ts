import { app } from '@/app'
import request from 'supertest'
import { createOrg } from '@/utils/test/create-org'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Refresh Token (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
    await createOrg()

    const authResponse = await request(app.server).post('/orgs/session').send({
      email: 'org@email.com',
      password: 'Org Password',
    })

    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app.server)
      .patch('/orgs/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
