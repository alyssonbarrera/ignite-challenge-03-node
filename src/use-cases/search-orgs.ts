import { OrgsRepository } from '@/repositories/orgs-repository'

export class SearchOrgsUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(query: string, page: number) {
    const orgs = await this.orgsRepository.searchMany(query, page)

    return {
      orgs,
    }
  }
}
