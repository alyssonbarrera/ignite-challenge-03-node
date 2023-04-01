interface PetData {
  id?: string
  name: string
  photos: string[]
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
  health_issues: string[]
  org_id: string
}

export const petData = {
  name: 'Pet Name',
  photos: ['photo1', 'photo2'],
  presentation: 'Pet Presentation',
  energy_level: '1',
  suitable_environment: 'Pet Suitable Environment',
  size: 'SMALL',
  home_restriction: 'APARTMENT',
  climate_preference: 'HOT',
  health_issues: ['health issue 1', 'health issue 2'],
} as PetData
