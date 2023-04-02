import { OrgsRepository } from '@/repositories/orgs-repository'

export class SearchOrgsUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(query: string, page: number) {
    query = query.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

    const orgs = await this.orgsRepository.searchMany(query, page)

    return {
      orgs,
    }
  }
}
