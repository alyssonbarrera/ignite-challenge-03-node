import { app } from '@/app'
import request from 'supertest'
import { createOrgAndPet } from '@/utils/test/create-org-and-pet'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Delete (E2E)', () => {
  beforeAll(async () => {
    app.ready()
  })
  afterAll(async () => {
    app.close()
  })

  it('should be able to delete pet', async () => {
    const petId = '5444ca02-d02a-11ed-afa1-0242ac120002'

    await createOrgAndPet(app)

    const response = await request(app.server).delete(`/pets/${petId}`).send()

    expect(response.status).toEqual(200)
  })

  it('should not be able to delete the pet if it does not exist ', async () => {
    const response = await request(app.server)
      .delete('/pets/4f2def52-cff1-11ed-afa1-0242ac120002')
      .send()

    expect(response.status).toEqual(404)
  })
})
