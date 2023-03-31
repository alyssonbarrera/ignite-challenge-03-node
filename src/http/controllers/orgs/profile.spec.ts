import { app } from '@/app'
import request from 'supertest'
import { createUser } from '@/utils/test/create-org'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Profile (E2E', () => {
  beforeAll(async () => {
    app.ready()
  })
  afterAll(async () => {
    app.close()
  })

  it('should be able to get org profile', async () => {
    const id = '3f2def52-cff1-11ed-afa1-0242ac120002'

    await createUser(app)

    const response = await request(app.server).get(`/orgs/${id}`).send()

    expect(response.status).toEqual(200)
  })

  it('should not be able to get org profile with wrong id', async () => {
    const response = await request(app.server)
      .get('/orgs/4f2def52-cff1-11ed-afa1-0242ac120002')
      .send()

    expect(response.status).toEqual(404)
  })
})
