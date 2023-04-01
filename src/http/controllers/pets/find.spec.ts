import { app } from '@/app'
import request from 'supertest'
import { createOrgAndPet } from '@/utils/test/create-org-and-pet'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Find (E2E)', () => {
  beforeAll(async () => {
    app.ready()
  })
  afterAll(async () => {
    app.close()
  })

  it('should be able to find pet', async () => {
    const petId = '5444ca02-d02a-11ed-afa1-0242ac120002'

    await createOrgAndPet(app)

    const response = await request(app.server).get(`/pets/${petId}`).send()

    expect(response.status).toEqual(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        pet: expect.objectContaining({
          id: petId,
        }),
      }),
    )

    it('should not be able to find pet with wrong id', async () => {
      const response = await request(app.server)
        .get('/pets/4f2def52-cff1-11ed-afa1-0242ac120002')
        .send()

      expect(response.status).toEqual(404)
    })
  })
})
