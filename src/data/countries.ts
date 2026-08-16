import type { Country } from './types'

export const countries: Country[] = [
  { id: 'france', flag: '🇫🇷', nameKo: '프랑스', nameEn: 'France', order: 1 },
  { id: 'switzerland', flag: '🇨🇭', nameKo: '스위스', nameEn: 'Switzerland', order: 2 },
  { id: 'germany', flag: '🇩🇪', nameKo: '독일', nameEn: 'Germany', order: 3 },
  { id: 'netherlands', flag: '🇳🇱', nameKo: '네덜란드', nameEn: 'Netherlands', order: 4 },
]

export const countryOrdinal = ['첫 번째', '두 번째', '세 번째', '네 번째']
