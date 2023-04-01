import { prisma } from '@/lib/prisma'
import { Prisma, Pet } from '@prisma/client'
import {
  PetsAndOrgs,
  PetsRepository,
  SearchByCaracteristicsParams,
} from '../pets-repository'
import { PrismaOrganizationSelect } from './prisma-orgs-repository'

export const PrismaPetSelect = {
  id: true,
  name: true,
  photos: true,
  presentation: true,
  energy_level: true,
  suitable_environment: true,
  size: true,
  home_restriction: true,
  climate_preference: true,
  health_issues: true,
}

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

  async findById(id: string): Promise<Omit<Pet, 'org_id'> | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
      select: {
        ...PrismaPetSelect,
        organization: {
          select: {
            ...PrismaOrganizationSelect,
          },
        },
      },
    })

    return pet
  }

  async searchByCaracteristics(
    { property, value }: SearchByCaracteristicsParams,
    page: number,
  ): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        [property]: {
          equals: value.toUpperCase(),
        },
      },

      take: 20,
      skip: (page - 1) * 20,
    })

    return pets
  }

  async findByCity(city: string, page: number): Promise<PetsAndOrgs[] | null> {
    const pets = await prisma.$queryRaw<PetsAndOrgs[]>`
    SELECT "pets".*
    FROM "pets"
    INNER JOIN "orgs" ON "pets"."org_id" = "orgs"."id"
    WHERE translate(lower("orgs"."city"), 'áàâãäéèêëíìîïóòôõöúùûü', 'aaaaaeeeeiiiiooooouuuu') = ${city}
    LIMIT 20
    OFFSET ${(page - 1) * 20}
  `

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
