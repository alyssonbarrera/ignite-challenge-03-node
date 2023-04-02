import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Delete (E2E)', () => {
  beforeAll(async () => {
    app.ready()
  })
  afterAll(async () => {
    app.close()
  })

  it('should be able to delete org', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const id = '3f2def52-cff1-11ed-afa1-0242ac120002'

    const response = await request(app.server)
      .delete(`/orgs/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.status).toEqual(200)
  })

  it('should not be able to delete the org if it does not exist ', async () => {
    const { token } = await createAndAuthenticateOrg(app, true)

    const response = await request(app.server)
      .delete('/orgs/4f2def52-cff1-11ed-afa1-0242ac120002')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.status).toEqual(404)
  })
})
