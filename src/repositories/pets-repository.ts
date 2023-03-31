import { Pet, Prisma } from '@prisma/client'

export interface SearchByCaracteristicsParams {
  property: 'energy_level' | 'suitable_environments' | 'size'
  query: string
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findByOrgId(orgId: string, page: number): Promise<Pet[] | null>
  findById(id: string): Promise<Pet | null>
  searchByCaracteristics(
    query: SearchByCaracteristicsParams,
    page: number,
  ): Promise<Pet[]>
  update(id: string, data: Prisma.PetUpdateInput): Promise<Pet>
  delete(id: string): Promise<void>
}
