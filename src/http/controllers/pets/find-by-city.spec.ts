import { app } from '@/app'
import request from 'supertest'
import { createOrgAndPet } from '@/utils/test/create-org-and-pet'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Find By City (E2E)', () => {
  beforeAll(async () => {
    app.ready()
  })
  afterAll(async () => {
    app.close()
  })

  it('should be able to find pet by city', async () => {
    const petId = '5444ca02-d02a-11ed-afa1-0242ac120002'

    await createOrgAndPet()

    const response = await request(app.server)
      .get(`/pets`)
      .query({
        page: 1,
        city: 'Org City',
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

    it('Should be able to return an empty list of pets per city if there is no organization in the city', async () => {
      const response = await request(app.server)
        .get('/pets')
        .query({
          page: 1,
          city: 'wrong-city',
        })
        .send()

      expect(response.status).toEqual(404)
    })
  })
})
