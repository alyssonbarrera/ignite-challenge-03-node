import { app } from '@/app'
import request from 'supertest'
import { createOrgAndPet } from '@/utils/test/create-org-and-pet'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Find By Org Id (E2E)', () => {
  beforeAll(async () => {
    app.ready()
  })
  afterAll(async () => {
    app.close()
  })

  it('should be able to find pet by org id', async () => {
    const petId = '5444ca02-d02a-11ed-afa1-0242ac120002'
    const orgId = '5f2def52-cff1-11ed-afa1-0242ac120002'

    await createOrgAndPet(app)

    const response = await request(app.server)
      .get(`/pets/org/${orgId}`)
      .query({
        page: 1,
      })
      .send()

    expect(response.status).toEqual(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        pets: [
          expect.objectContaining({
            id: petId,
          }),
        ],
      }),
    )

    it('should not be able to find pet by org id with wrong org_id', async () => {
      const response = await request(app.server)
        .get('/pets/org/4f2def52-cff1-11ed-afa1-0242ac120002')
        .send()

      expect(response.status).toEqual(404)
    })
  })
})
