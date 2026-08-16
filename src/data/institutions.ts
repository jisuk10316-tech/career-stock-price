import type { Institution } from './types'

export const institutions: Institution[] = [
  // FRANCE
  {
    id: 'ifpen',
    countryId: 'france',
    name: 'IFP Energies Nouvelles – Rueil',
    nameKo: 'IFP 에너지 연구소',
    tagline: '신재생에너지 R&D 연구소',
  },
  {
    id: 'arts-et-metiers',
    countryId: 'france',
    name: 'Musée des Arts et Métiers',
    nameKo: '국립 공예박물관',
    tagline: '산업·과학기술사 박물관',
  },
  {
    id: 'apur',
    countryId: 'france',
    name: 'Atelier Parisien d’Urbanisme (APUR)',
    nameKo: '파리 도시계획 아틀리에',
    tagline: '파리시 도시계획 연구기관',
  },
  {
    id: 'carbios',
    countryId: 'france',
    name: 'CARBIOS',
    nameKo: '카르비오스',
    tagline: '플라스틱 생분해 바이오기업',
  },
  // SWITZERLAND
  {
    id: 'cern',
    countryId: 'switzerland',
    name: 'CERN',
    nameKo: '유럽입자물리연구소',
    tagline: '세계 최대 입자물리 연구소',
  },
  {
    id: 'eigergletscher',
    countryId: 'switzerland',
    name: 'Eigergletscher',
    nameKo: '아이거글레처',
    tagline: '알프스 산악철도·케이블카 거점',
  },
  {
    id: 'eth-zurich',
    countryId: 'switzerland',
    name: 'ETH Zürich',
    nameKo: '취리히 연방공과대학',
    tagline: '세계적 수준의 공과대학',
  },
  // GERMANY
  {
    id: 'green-city-office',
    countryId: 'germany',
    name: 'Green City Office',
    nameKo: '그린시티 오피스',
    tagline: '도시 환경·기후 정책 기관',
  },
  {
    id: 'basf',
    countryId: 'germany',
    name: 'BASF',
    nameKo: 'BASF',
    tagline: '세계 최대 화학기업',
  },
  {
    id: 'embl',
    countryId: 'germany',
    name: 'EMBL',
    nameKo: '유럽분자생물학연구소',
    tagline: '분자생물학 국제 연구소',
  },
  {
    id: 'dhl',
    countryId: 'germany',
    name: 'DHL Europe Innovation Center',
    nameKo: 'DHL 유럽 혁신센터',
    tagline: '물류 혁신·자동화 센터',
  },
  // NETHERLANDS
  {
    id: 'boerhaave',
    countryId: 'netherlands',
    name: 'Rijksmuseum Boerhaave',
    nameKo: '라익스뮤지엄 부르하버',
    tagline: '과학사 박물관',
  },
  {
    id: 'portlantis',
    countryId: 'netherlands',
    name: 'Portlantis',
    nameKo: '포틀란티스',
    tagline: '로테르담 항만 전시관',
  },
  {
    id: 'infratech',
    countryId: 'netherlands',
    name: 'InfraTech 2027',
    nameKo: '인프라테크 2027',
    tagline: '차세대 인프라 박람회',
  },
  {
    id: 'cycling-embassy',
    countryId: 'netherlands',
    name: 'Dutch Cycling Embassy',
    nameKo: '더치 사이클링 임바시',
    tagline: '자전거 중심 모빌리티 정책기관',
  },
]

export const institutionById = Object.fromEntries(institutions.map((i) => [i.id, i]))
export const institutionsByCountry = (countryId: string) =>
  institutions.filter((i) => i.countryId === countryId)
export const institutionOrder = institutions.map((i) => i.id)
