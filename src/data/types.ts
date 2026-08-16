export type MemberId = 'jeongyun' | 'jiseok' | 'hyeongwook' | 'seungwon'
export type CountryId = 'france' | 'switzerland' | 'germany' | 'netherlands'

export interface Member {
  id: MemberId
  name: string
  role: string
}

export interface Institution {
  id: string
  countryId: CountryId
  name: string
  nameKo: string
  tagline: string
}

export interface Country {
  id: CountryId
  flag: string
  nameKo: string
  nameEn: string
  order: number
}

/** One logged reaction to an experience. Delta is always a multiple of 10. */
export interface JournalEntry {
  id: string
  memberId: MemberId
  /** Free-text place/industry/job/research environment — not limited to the trip itinerary. */
  place: string
  /** Linked institution when the entry matches a known stop on the itinerary. */
  institutionId?: string
  delta: number
  why: string
  /** Sort key: seed entries use the itinerary order (0-14), new entries use Date.now(). */
  at: number
}
