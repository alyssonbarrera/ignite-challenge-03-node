import { app } from '@/app'
import request from 'supertest'
import { createOrg } from '@/utils/test/create-org'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Update Org (E2E)', () => {
  beforeAll(async () => {
    app.ready()
  })
  afterAll(async () => {
    app.close()
  })

  it('should be able to update org', async () => {
    const id = '3f2def52-cff1-11ed-afa1-0242ac120002'

    await createOrg(app)

    const response = await request(app.server).put(`/orgs/${id}`).send({
      name: 'New Org Name',
    })

    expect(response.status).toEqual(204)
  })

  it('should not be able to update org with wrong id', async () => {
    const response = await request(app.server)
      .put('/orgs/4f2def52-cff1-11ed-afa1-0242ac120002')
      .send({
        name: 'New Org Name',
      })

    expect(response.status).toEqual(404)
  })
})
