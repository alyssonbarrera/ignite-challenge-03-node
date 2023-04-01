import { Org, Prisma } from '@prisma/client'
import { OrgSelectDTO } from './dtos/org-select-dto'

export interface OrgWithPets extends OrgSelectDTO {
  pets: string[]
}

export interface OrgsRepository {
  create(data: Prisma.OrgCreateInput): Promise<Org>
  findById(id: string): Promise<Org | null>
  findByEmail(email: string): Promise<Org | null>
  findByCity(city: string, page: number): Promise<OrgWithPets[] | null>
  searchMany(query: string, page: number): Promise<OrgWithPets[]>
  update(id: string, data: Prisma.OrgUpdateInput): Promise<Org>
  delete(id: string): Promise<void>
}
