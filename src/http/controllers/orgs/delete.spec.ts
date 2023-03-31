import { app } from '@/app'
import request from 'supertest'
import { createOrg } from '@/utils/test/create-org'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Delete (E2E)', () => {
  beforeAll(async () => {
    app.ready()
  })
  afterAll(async () => {
    app.close()
  })

  it('should be able to delete org', async () => {
    const id = '3f2def52-cff1-11ed-afa1-0242ac120002'

    await createOrg(app)

    const response = await request(app.server).delete(`/orgs/${id}`).send()

    expect(response.status).toEqual(200)
  })

  it('should not be able to delete the org if it does not exist ', async () => {
    const response = await request(app.server)
      .delete('/orgs/4f2def52-cff1-11ed-afa1-0242ac120002')
      .send()

    expect(response.status).toEqual(404)
  })
})
