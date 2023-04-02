import { app } from '@/app'
import request from 'supertest'
import { createOrgAndPet } from '@/utils/test/create-org-and-pet'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
import { createPet } from '@/utils/test/create-pet'
import { cleanUpOrgs } from '@/utils/test/clean-up-orgs'

describe('Delete (E2E)', () => {
  beforeAll(async () => {
    app.ready()
  })
  afterAll(async () => {
    app.close()
  })

  it('should be able to delete pet', async () => {
    const petId = '6444ca02-d02a-11ed-afa1-0242ac120002'
    const orgId = '3f2def52-cff1-11ed-afa1-0242ac120002'

    const { token } = await createAndAuthenticateOrg(app)
    await createPet()

    await createOrgAndPet()

    const response = await request(app.server)
      .delete(`/pets/${petId}`)
      .set('Authorization', `Bearer ${token}`)
      .query({ org_id: orgId })
      .send()

    expect(response.status).toEqual(200)
  })

  it('should not be able to delete the pet if it does not exist ', async () => {
    await cleanUpOrgs()

    const { token } = await createAndAuthenticateOrg(app, true)
    await createPet()

    await createOrgAndPet()
    const response = await request(app.server)
      .delete('/pets/4f2def52-cff1-11ed-afa1-0242ac120002')
      .set('Authorization', `Bearer ${token}`)
      .query({ org_id: '4f2def52-cff1-11ed-afa1-0242ac120002' })
      .send()

    expect(response.status).toEqual(404)
  })
})
