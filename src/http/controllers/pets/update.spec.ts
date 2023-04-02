import { app } from '@/app'
import request from 'supertest'
import { createPet } from '@/utils/test/create-pet'
import { cleanUpOrgs } from '@/utils/test/clean-up-orgs'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Update Pet (E2E)', () => {
  beforeAll(async () => {
    app.ready()
  })
  afterAll(async () => {
    app.close()
  })

  it('should be able to update pet', async () => {
    const petId = '6444ca02-d02a-11ed-afa1-0242ac120002'
    const orgId = '3f2def52-cff1-11ed-afa1-0242ac120002'

    const { token } = await createAndAuthenticateOrg(app)
    await createPet()

    const response = await request(app.server)
      .put(`/pets/${petId}`)
      .set('Authorization', `Bearer ${token}`)
      .query({ org_id: orgId })
      .send({
        name: 'New Pet Name',
        photos: ['photo1', 'photo2', 'photo3'],
        health_issues: 'New Health Issues',
      })

    expect(response.status).toEqual(204)
  })

  it('should not be able to update pet with wrong id', async () => {
    await cleanUpOrgs()

    const { token } = await createAndAuthenticateOrg(app, true)

    await createPet()

    const response = await request(app.server)
      .put('/pets/4f2def52-cff1-11ed-afa1-0242ac120002')
      .set('Authorization', `Bearer ${token}`)
      .query({ org_id: '4f2def52-cff1-11ed-afa1-0242ac120002' })
      .send({
        name: 'New Org Name',
      })

    expect(response.status).toEqual(404)
  })
})
