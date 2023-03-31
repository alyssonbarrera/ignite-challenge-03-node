import { app } from '@/app'
import request from 'supertest'
import { orgData } from '@/utils/test/org-data'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create (E2E)', () => {
  beforeAll(async () => {
    app.ready()
  })
  afterAll(async () => {
    app.close()
  })

  it('should be able to create org', async () => {
    const response = await request(app.server).post('/orgs').send(orgData)

    expect(response.status).toEqual(201)
  })
})
