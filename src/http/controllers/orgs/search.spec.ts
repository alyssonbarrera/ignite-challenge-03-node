import { app } from '@/app'
import { orgData } from '@/utils/test/org-data'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Search Many (E2E)', () => {
  beforeAll(async () => {
    app.ready()
  })
  afterAll(async () => {
    app.close()
  })

  it('should be able to search orgs by name', async () => {
    await request(app.server).post('/orgs').send(orgData)

    const response = await request(app.server)
      .get(`/orgs`)
      .query({
        query: 'Org',
        page: 1,
      })
      .send()

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      orgs: expect.any(Array),
    })
    expect(response.body.orgs[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'Org Name',
      }),
    )
  })
})
