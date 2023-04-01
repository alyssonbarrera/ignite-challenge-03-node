import { prisma } from '@/lib/prisma'
import { Prisma, Org } from '@prisma/client'
import { OrgWithPets, OrgsRepository } from '../orgs-repository'

export const PrismaOrganizationSelect = {
  id: true,
  name: true,
  email: true,
  owner: true,
  zip_code: true,
  address: true,
  address_number: true,
  neighborhood: true,
  city: true,
  state: true,
  whatsapp: true,
}

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org = await prisma.org.create({
      data,
    })

    return org
  }

  async findById(id: string): Promise<Org | null> {
    const org = prisma.org.findUnique({
      where: {
        id,
      },
    })

    return org
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = prisma.org.findUnique({
      where: {
        email,
      },
    })

    return org
  }

  async findByCity(city: string, page: number): Promise<OrgWithPets[] | null> {
    const orgs = await prisma.org.findMany({
      where: {
        city,
      },
      take: 20,
      skip: (page - 1) * 20,
      select: {
        ...PrismaOrganizationSelect,
        pets: {
          select: {
            id: true,
          },
        },
      },
    })

    const orgsWithPets = orgs?.map((org) => {
      const pets = org.pets?.map((pet) => pet.id)
      return {
        ...org,
        pets,
      }
    })

    return orgsWithPets
  }

  async searchMany(query: string, page: number): Promise<OrgWithPets[]> {
    const orgs = await prisma.org.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
      take: 20,
      skip: (page - 1) * 20,
      select: {
        ...PrismaOrganizationSelect,
        pets: {
          select: {
            id: true,
          },
        },
      },
    })

    const orgsWithPets = orgs?.map((org) => {
      const pets = org.pets?.map((pet) => pet.id)
      return {
        ...org,
        pets,
      }
    })

    return orgsWithPets
  }

  async update(id: string, data: Prisma.OrgUpdateInput): Promise<Org> {
    const org = await prisma.org.update({
      where: {
        id,
      },
      data,
    })

    return org
  }

  async delete(id: string): Promise<void> {
    await prisma.org.delete({
      where: {
        id,
      },
    })
  }
}
