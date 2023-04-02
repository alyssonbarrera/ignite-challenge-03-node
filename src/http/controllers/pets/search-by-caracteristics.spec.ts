import { app } from '@/app'
import request from 'supertest'
import { createOrgAndPet } from '@/utils/test/create-org-and-pet'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Search By Caracteristics (E2E)', () => {
  beforeAll(async () => {
    app.ready()
  })
  afterAll(async () => {
    app.close()
  })

  it('should be able to search pets by caracteristics', async () => {
    const petId = '5444ca02-d02a-11ed-afa1-0242ac120002'

    await createOrgAndPet()

    const response = await request(app.server)
      .get(`/pets/search`)
      .query({
        property: 'energy_level',
        value: 1,
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
  })

  it('should be able to return an empty pet list when searching for pets by sending values that do not match a characteristic of a registered pet', async () => {
    const response = await request(app.server)
      .get(`/pets/search`)
      .query({
        property: 'size',
        value: 'wrong_value',
        page: 1,
      })
      .send()

    expect(response.status).toEqual(400)
  })

  it('should not be able to search pets by caracteristics with wrong property', async () => {
    const response = await request(app.server)
      .get(`/pets/search`)
      .query({
        property: 'wrong_property',
        value: 'wrong_value',
        page: 1,
      })
      .send()

    expect(response.status).toEqual(400)
  })
})
