import { app } from '@/app'
import request from 'supertest'
import { petData } from '@/utils/test/pet-data'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
import { cleanUpOrgs } from '@/utils/test/clean-up-orgs'

describe('Register (E2E)', () => {
  beforeAll(async () => {
    app.ready()
  })
  afterAll(async () => {
    app.close()
  })

  it('should be able to register pet', async () => {
    const orgId = '3f2def52-cff1-11ed-afa1-0242ac120002'

    const { token } = await createAndAuthenticateOrg(app)

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...petData,
        org_id: orgId,
      })

    expect(response.status).toEqual(201)
  })

  it('should not be able to register pet with invalid org id', async () => {
    await cleanUpOrgs()

    const { token } = await createAndAuthenticateOrg(app)

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...petData,
        org_id: '5444ca02-d02a-11ed-afa1-0242ac120002',
      })

    expect(response.status).toEqual(404)
  })

  it('should not be able to register pet with invalid data', async () => {
    await cleanUpOrgs()

    const orgId = '3f2def52-cff1-11ed-afa1-0242ac120002'

    const { token } = await createAndAuthenticateOrg(app)

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...petData,
        home_restriction: 'invalid',
        org_id: orgId,
      })

    expect(response.status).toEqual(400)
  })
})
