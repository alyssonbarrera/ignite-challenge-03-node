import { app } from '@/app'
import request from 'supertest'
import { cleanUpOrgs } from '@/utils/test/clean-up-orgs'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Update Org (E2E)', () => {
  beforeAll(async () => {
    app.ready()
  })
  afterAll(async () => {
    app.close()
  })

  it('should be able to update org', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const id = '3f2def52-cff1-11ed-afa1-0242ac120002'

    const response = await request(app.server)
      .put(`/orgs/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'New Org Name',
      })

    expect(response.status).toEqual(204)
  })

  it('should not be able to update org with wrong id', async () => {
    await cleanUpOrgs()

    const { token } = await createAndAuthenticateOrg(app, true)

    const response = await request(app.server)
      .put('/orgs/4f2def52-cff1-11ed-afa1-0242ac120002')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'New Org Name',
      })

    expect(response.status).toEqual(404)
  })
})
