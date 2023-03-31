import { randomUUID } from 'node:crypto'
import { Prisma, Org } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'

export class InMemoryOrgsRepository implements OrgsRepository {
  public orgs: Org[] = []

  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org = {
      id: randomUUID(),
      name: data.name,
      owner: data.owner,
      email: data.email,
      zip_code: data.zip_code,
      address: data.address,
      address_number: data.address_number,
      neighborhood: data.neighborhood,
      city: data.city,
      state: data.state,
      whatsapp: data.whatsapp,
      password: data.password,
      created_at: new Date(),
    } as Org

    this.orgs.push(org)

    return org
  }

  async findById(id: string): Promise<Org | null> {
    const org = this.orgs.find((org) => org.id === id)

    if (!org) {
      return null
    }

    return org
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = this.orgs.find((org) => org.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async searchMany(query: string, page: number): Promise<Org[]> {
    return this.orgs
      .filter((org) => org.name.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async update(id: string, data: Prisma.OrgUpdateInput): Promise<Org> {
    const orgIndex = this.orgs.findIndex((org) => org.id === id)

    if (orgIndex >= 0) {
      this.orgs[orgIndex] = {
        ...this.orgs[orgIndex],
        ...data,
      } as Org
    }
    return this.orgs[orgIndex]
  }

  async delete(id: string): Promise<void> {
    const orgIndex = this.orgs.findIndex((org) => org.id === id)

    if (orgIndex >= 0) {
      this.orgs.splice(orgIndex, 1)
    }
  }
}
