import { app } from '@/app'
import request from 'supertest'
import { petData } from '@/utils/test/pet-data'
import { createOrg } from '@/utils/test/create-org'
import { createOrgAndPet } from '@/utils/test/create-org-and-pet'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (E2E)', () => {
  beforeAll(async () => {
    app.ready()
  })
  afterAll(async () => {
    app.close()
  })

  it('should be able to register pet', async () => {
    const id = '3f2def52-cff1-11ed-afa1-0242ac120002'

    await createOrg(app)

    const response = await request(app.server)
      .post('/pets')
      .send({
        ...petData,
        org_id: id,
      })

    expect(response.status).toEqual(201)
  })

  it('should not be able to register pet with invalid org id', async () => {
    const response = await request(app.server)
      .post('/pets')
      .send({
        ...petData,
        org_id: '5444ca02-d02a-11ed-afa1-0242ac120002',
      })

    expect(response.status).toEqual(404)
  })

  it('should not be able to register pet with invalid data', async () => {
    const orgId = '5f2def52-cff1-11ed-afa1-0242ac120002'

    await createOrgAndPet(app)

    const response = await request(app.server)
      .post('/pets')
      .send({
        ...petData,
        home_restriction: 'invalid',
        org_id: orgId,
      })

    expect(response.status).toEqual(400)
  })
})
