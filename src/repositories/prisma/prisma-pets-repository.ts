import { prisma } from '@/lib/prisma'
import { Prisma, Pet } from '@prisma/client'
import {
  PetsRepository,
  SearchByCaracteristicsParams,
} from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findByOrgId(orgId: string, page: number): Promise<Pet[] | null> {
    const pet = await prisma.pet.findMany({
      where: {
        org_id: orgId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pet
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async searchByCaracteristics(
    { property, query }: SearchByCaracteristicsParams,
    page: number,
  ): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        [property]: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pets
  }

  async update(id: string, data: Prisma.PetUpdateInput): Promise<Pet> {
    const pet = await prisma.pet.update({
      where: {
        id,
      },
      data,
    })

    return pet
  }

  async delete(id: string): Promise<void> {
    await prisma.pet.delete({
      where: {
        id,
      },
    })
  }
}
