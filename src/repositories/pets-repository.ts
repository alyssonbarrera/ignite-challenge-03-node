import { Pet, Prisma } from '@prisma/client'
import { PetSelectDTO } from './dtos/pet-select-dto'

export interface SearchByCaracteristicsParams {
  property: 'energy_level' | 'suitable_environment' | 'size'
  value: string
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findByOrgId(orgId: string, page: number): Promise<Pet[] | null>
  findById(id: string): Promise<Omit<Pet, 'org_id'> | null>
  searchByCaracteristics(
    query: SearchByCaracteristicsParams,
    page: number,
  ): Promise<Pet[]>
  findByCity(city: string, page: number): Promise<PetSelectDTO[] | null>
  update(id: string, data: Prisma.PetUncheckedUpdateInput): Promise<Pet>
  delete(id: string): Promise<void>
}
