export type MemberId = 'jeongyun' | 'jiseok' | 'hyeongwook' | 'seungwon'
export type CountryId = 'france' | 'switzerland' | 'germany' | 'netherlands'

export interface Member {
  id: MemberId
  name: string
  role: string
  stocks: { symbol: string; label: string; description: string }[]
}

export interface Institution {
  id: string
  countryId: CountryId
  name: string
  nameKo: string
  tagline: string
  experience: string
}

export interface Country {
  id: CountryId
  flag: string
  nameKo: string
  nameEn: string
  order: number
}

export interface CareerEvent {
  institutionId: string
  memberId: MemberId
  symbol: string
  delta: number
  why: string
  discovery?: boolean
  primary?: boolean
}
