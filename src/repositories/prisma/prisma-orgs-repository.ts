import { prisma } from '@/lib/prisma'
import { Prisma, Org } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'

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

  async searchMany(query: string, page: number): Promise<Org[]> {
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
        id: true,
        name: true,
        owner: true,
        email: true,
        zip_code: true,
        address: true,
        address_number: true,
        neighborhood: true,
        city: true,
        state: true,
        whatsapp: true,
        password: false,
        created_at: true,
      },
    })

    return orgs as Org[]
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
