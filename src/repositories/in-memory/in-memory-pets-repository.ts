import { Prisma, Pet } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import {
  PetsAndOrgs,
  PetsRepository,
  SearchByCaracteristicsParams,
} from '../pets-repository'
import { PetSelectDTO } from '../dtos/pet-select-dto'

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = []
  public petsAndOrgs: PetSelectDTO[] = []

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: randomUUID(),
      name: data.name,
      photos: data.photos,
      presentation: data.presentation,
      energy_level: data.energy_level,
      suitable_environment: data.suitable_environment,
      size: data.size,
      home_restriction: data.home_restriction,
      climate_preference: data.climate_preference,
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
    { property, value }: SearchByCaracteristicsParams,
    page: number,
  ): Promise<Pet[]> {
    return this.pets
      .filter((pet) => pet[property].includes(value))
      .slice((page - 1) * 20, page * 20)
  }

  async findByCity(city: string, page: number): Promise<PetsAndOrgs[] | null> {
    const pets = this.petsAndOrgs
      .filter((pet) => pet.organization.city === city)
      .slice((page - 1) * 20, page * 20)

    if (!pets) {
      return null
    }

    return pets
  }

  async update(id: string, data: Prisma.PetUpdateInput): Promise<Pet> {
    const petIndex = this.pets.findIndex((pet) => pet.id === id)

    if (petIndex >= 0) {
      this.pets[petIndex] = {
        ...this.pets[petIndex],
        ...data,
      } as Pet
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
