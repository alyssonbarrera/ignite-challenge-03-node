import { OrgSelectDTO } from './org-select-dto'

export interface PetSelectDTO {
  id: string
  name: string
  photos: string[] | string
  presentation: string
  energy_level: string
  suitable_environment: string
  size: 'SMALL' | 'MEDIUM' | 'LARGE'
  home_restriction:
    | 'APARTMENT'
    | 'HOUSE'
    | 'CONDOMINIUM'
    | 'URBAN'
    | 'RURAL'
    | 'SHARED'
  climate_preference: 'HOT' | 'COLD' | 'TEMPERATE' | 'DRY'
  health_issues: string[] | string
  organization: OrgSelectDTO
}
