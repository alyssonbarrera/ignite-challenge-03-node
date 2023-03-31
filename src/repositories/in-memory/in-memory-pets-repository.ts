import { Prisma, Pet } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import {
  PetsRepository,
  SearchByCaracteristicsParams,
} from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: randomUUID(),
      name: data.name,
      photos: data.photos,
      presentation: data.presentation,
      energy_level: data.energy_level,
      suitable_environments: data.suitable_environments,
      size: data.size,
      home_restrictions: data.home_restrictions,
      climate_preferences: data.climate_preferences,
      health_issues: data.health_issues,
      org_id: data.org_id,
      created_at: new Date(),
    } as Pet

    this.pets.push(pet)

    return pet
  }

  async findByOrgId(orgId: string, page: number): Promise<Pet[] | null> {
    const pets = this.pets
      .filter((pet) => pet.org_id === orgId)
      .slice((page - 1) * 20, page * 20)

    if (!pets) {
      return null
    }

    return pets
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = this.pets.find((pet) => pet.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async searchByCaracteristics(
    { property, query }: SearchByCaracteristicsParams,
    page: number,
  ): Promise<Pet[]> {
    return this.pets
      .filter((pet) => pet[property].includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async update(id: string, data: Prisma.PetUpdateInput): Promise<Pet> {
    const petIndex = this.pets.findIndex((pet) => pet.id === id)

    if (petIndex >= 0) {
      this.pets[petIndex] = this.pets[petIndex] as Pet
    }
    return this.pets[petIndex]
  }

  async delete(id: string): Promise<void> {
    const petIndex = this.pets.findIndex((pet) => pet.id === id)

    if (petIndex >= 0) {
      this.pets.splice(petIndex, 1)
    }
  }
}
