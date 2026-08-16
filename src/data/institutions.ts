import type { Institution } from './types'

export const institutions: Institution[] = [
  // FRANCE
  {
    id: 'ifpen',
    countryId: 'france',
    name: 'IFP Energies Nouvelles – Rueil',
    nameKo: 'IFP 에너지 연구소',
    tagline: '신재생에너지 R&D 연구소',
    experience: '에너지 전환 기술이 연구실에서 산업 현장으로 이어지는 과정을 관찰했다.',
  },
  {
    id: 'arts-et-metiers',
    countryId: 'france',
    name: 'Musée des Arts et Métiers',
    nameKo: '국립 공예박물관',
    tagline: '산업·과학기술사 박물관',
    experience: '산업혁명 이후 제조·물류·소재 기술이 발전해온 흐름을 직접 확인했다.',
  },
  {
    id: 'apur',
    countryId: 'france',
    name: 'Atelier Parisien d’Urbanisme (APUR)',
    nameKo: '파리 도시계획 아틀리에',
    tagline: '파리시 도시계획 연구기관',
    experience: '도시 데이터를 기반으로 정책이 설계되는 실제 과정을 살펴봤다.',
  },
  {
    id: 'carbios',
    countryId: 'france',
    name: 'CARBIOS',
    nameKo: '카르비오스',
    tagline: '플라스틱 생분해 바이오기업',
    experience: '효소를 이용해 플라스틱을 분해하는 바이오 기술의 산업화 현장을 봤다.',
  },
  // SWITZERLAND
  {
    id: 'cern',
    countryId: 'switzerland',
    name: 'CERN',
    nameKo: '유럽입자물리연구소',
    tagline: '세계 최대 입자물리 연구소',
    experience: '수천 명의 연구자와 초대형 장비가 얽힌 프로젝트의 운영 방식을 관찰했다.',
  },
  {
    id: 'eigergletscher',
    countryId: 'switzerland',
    name: 'Eigergletscher',
    nameKo: '아이거글레처',
    tagline: '알프스 산악철도·케이블카 거점',
    experience: '알프스 극한지형에서 산악철도·케이블카 운영과 물자 보급 구조를 관찰했다.',
  },
  {
    id: 'eth-zurich',
    countryId: 'switzerland',
    name: 'ETH Zürich',
    nameKo: '취리히 연방공과대학',
    tagline: '세계적 수준의 공과대학',
    experience: '학부생부터 연구에 깊이 참여하는 공과대학의 연구 환경을 경험했다.',
  },
  // GERMANY
  {
    id: 'green-city-office',
    countryId: 'germany',
    name: 'Green City Office',
    nameKo: '그린시티 오피스',
    tagline: '도시 환경·기후 정책 기관',
    experience: '탄소중립 도시 전략이 실제 행정에 반영되는 과정을 확인했다.',
  },
  {
    id: 'basf',
    countryId: 'germany',
    name: 'BASF',
    nameKo: 'BASF',
    tagline: '세계 최대 화학기업',
    experience: '통합 생산단지(Verbund)에서 화학 산업의 규모와 연구개발 구조를 봤다.',
  },
  {
    id: 'embl',
    countryId: 'germany',
    name: 'EMBL',
    nameKo: '유럽분자생물학연구소',
    tagline: '분자생물학 국제 연구소',
    experience: '생명과학 연구가 국제적으로 협력하는 구조를 직접 확인했다.',
  },
  {
    id: 'dhl',
    countryId: 'germany',
    name: 'DHL Europe Innovation Center',
    nameKo: 'DHL 유럽 혁신센터',
    tagline: '물류 혁신·자동화 센터',
    experience: 'AI·IoT·자동화 기술이 실제 물류 운영과 어떻게 연결되는지 관찰했다.',
  },
  // NETHERLANDS
  {
    id: 'boerhaave',
    countryId: 'netherlands',
    name: 'Rijksmuseum Boerhaave',
    nameKo: '라익스뮤지엄 부르하버',
    tagline: '과학사 박물관',
    experience: '수백 년간 이어진 과학 연구의 축적 과정을 살펴봤다.',
  },
  {
    id: 'portlantis',
    countryId: 'netherlands',
    name: 'Portlantis',
    nameKo: '포틀란티스',
    tagline: '로테르담 항만 전시관',
    experience: '세계 최대급 항만에서 선박·트럭·철도·터미널이 하나로 연결되는 흐름을 봤다.',
  },
  {
    id: 'infratech',
    countryId: 'netherlands',
    name: 'InfraTech 2027',
    nameKo: '인프라테크 2027',
    tagline: '차세대 인프라 박람회',
    experience: '차세대 인프라·모빌리티 기술의 실제 적용 사례를 다수 확인했다.',
  },
  {
    id: 'cycling-embassy',
    countryId: 'netherlands',
    name: 'Dutch Cycling Embassy',
    nameKo: '더치 사이클링 임바시',
    tagline: '자전거 중심 모빌리티 정책기관',
    experience: '자전거 중심 교통정책이 도시 전체를 어떻게 바꿨는지 확인했다.',
  },
]

export const institutionById = Object.fromEntries(institutions.map((i) => [i.id, i]))
export const institutionsByCountry = (countryId: string) =>
  institutions.filter((i) => i.countryId === countryId)
export const institutionOrder = institutions.map((i) => i.id)
