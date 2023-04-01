import { app } from '@/app'
import request from 'supertest'
import { createOrgAndPet } from '@/utils/test/create-org-and-pet'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Update Pet (E2E)', () => {
  beforeAll(async () => {
    app.ready()
  })
  afterAll(async () => {
    app.close()
  })

  it('should be able to update pet', async () => {
    const petId = '5444ca02-d02a-11ed-afa1-0242ac120002'

    await createOrgAndPet(app)

    const response = await request(app.server)
      .put(`/pets/${petId}`)
      .send({
        name: 'New Pet Name',
        photos: ['photo1', 'photo2', 'photo3'],
        health_issues: 'New Health Issues',
      })

    expect(response.status).toEqual(204)
  })

  it('should not be able to update pet with wrong id', async () => {
    const response = await request(app.server)
      .put('/pets/4f2def52-cff1-11ed-afa1-0242ac120002')
      .send({
        name: 'New Org Name',
      })

    expect(response.status).toEqual(404)
  })
})
