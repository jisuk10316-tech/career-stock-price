import type { CareerEvent } from './types'

// Ordered chronologically by institutionOrder in institutions.ts.
// `primary: true` marks the headline move for that member at that institution
// (used for the "Same Place, 4 Views" comparison and Career News).
export const events: CareerEvent[] = [
  // ── FRANCE ──────────────────────────────────────────────
  // 1. IFP Energies Nouvelles – Rueil
  { institutionId: 'ifpen', memberId: 'jiseok', symbol: 'SCM', delta: 3,
    why: '에너지 기업의 공급망도 결국 원료 조달과 물류 최적화에서 시작된다는 것을 확인했다.' },
  { institutionId: 'ifpen', memberId: 'jeongyun', symbol: 'ENV', delta: 9, primary: true,
    why: '신재생에너지 연구가 실제 산업 현장에서 어떻게 구현되는지 처음으로 목격했다.' },
  { institutionId: 'ifpen', memberId: 'hyeongwook', symbol: 'CHEM', delta: 11, primary: true,
    why: '촉매 화학이 에너지 전환의 핵심 기술이라는 점에 강한 흥미를 느꼈다.' },
  { institutionId: 'ifpen', memberId: 'seungwon', symbol: 'INFRA', delta: 2,
    why: '에너지 인프라가 도시 정책과 어떻게 연결되는지 관찰했다.' },

  // 2. Musée des Arts et Métiers
  { institutionId: 'arts-et-metiers', memberId: 'jiseok', symbol: 'LOGPLAN', delta: 4,
    why: '산업혁명 시기 물류·제조 시스템의 원형을 보며 기획 업무의 역사적 맥락을 이해했다.' },
  { institutionId: 'arts-et-metiers', memberId: 'jeongyun', symbol: 'SUSCITY', delta: 3,
    why: '과거 산업 유산이 오늘날 도시 재생과 연결되는 사례를 확인했다.' },
  { institutionId: 'arts-et-metiers', memberId: 'hyeongwook', symbol: 'MAT', delta: 6, primary: true,
    why: '과거 소재 혁신이 산업을 어떻게 바꿨는지 확인하며 소재 연구에 대한 관심이 커졌다.' },
  { institutionId: 'arts-et-metiers', memberId: 'seungwon', symbol: 'URBAN', delta: 5,
    why: '기술과 도시 인프라가 함께 발전해온 과정을 시각적으로 확인했다.' },

  // 3. APUR
  { institutionId: 'apur', memberId: 'jiseok', symbol: 'GRAD', delta: 5,
    why: '도시 데이터를 다루는 기관을 보며 해외 대학원에서의 데이터 기반 연구에 관심이 생겼다.' },
  { institutionId: 'apur', memberId: 'jeongyun', symbol: 'GREEN', delta: 10, primary: true,
    why: '도시계획에 환경 데이터가 통합되는 방식에 깊은 인상을 받았다.' },
  { institutionId: 'apur', memberId: 'hyeongwook', symbol: 'PROC', delta: 1,
    why: '정책 중심의 접근이라 현장 공정 기술과는 다소 거리가 있다고 느꼈다.' },
  { institutionId: 'apur', memberId: 'seungwon', symbol: 'URBAN', delta: 14, primary: true,
    why: '실제 도시계획 기관에서 정책이 만들어지는 과정을 직접 보며 진로에 대한 확신이 커졌다.' },

  // 4. CARBIOS
  { institutionId: 'carbios', memberId: 'jiseok', symbol: 'SMLOG', delta: 2,
    why: '바이오 스타트업의 원료 공급망 구조를 짧게 살펴봤다.' },
  { institutionId: 'carbios', memberId: 'jeongyun', symbol: 'CLIM', delta: 8, primary: true,
    why: '생분해 기술이 실제 정책과 어떻게 연결되는지 보며 기후정책에 대한 관심이 강화됐다.' },
  { institutionId: 'carbios', memberId: 'hyeongwook', symbol: 'BIO', delta: 19, primary: true,
    why: '효소를 이용한 플라스틱 분해 기술을 직접 보고 바이오소재 연구에 대한 확신이 생겼다.' },
  { institutionId: 'carbios', memberId: 'seungwon', symbol: 'INFRA', delta: 3,
    why: '순환경제 기술이 도시 폐기물 인프라에 미칠 영향을 짧게 고민했다.' },

  // ── SWITZERLAND ─────────────────────────────────────────
  // 5. CERN
  { institutionId: 'cern', memberId: 'seungwon', symbol: 'TRANS', delta: 4,
    why: '거대 연구시설을 지탱하는 공공 인프라 운영 방식에 관심이 생겼다.' },
  { institutionId: 'cern', memberId: 'jiseok', symbol: 'SCM', delta: 7, primary: true,
    why: '수천 명의 연구자와 장비가 얽힌 초대형 프로젝트의 운영관리 체계에 흥미를 느꼈다.' },
  { institutionId: 'cern', memberId: 'jeongyun', symbol: 'ENV', delta: 15, primary: true,
    why: '거대 실험시설의 에너지 소비와 냉각 시스템을 보며 에너지·환경 관리의 스케일을 체감했다.' },
  { institutionId: 'cern', memberId: 'hyeongwook', symbol: 'CHEM', delta: 22, primary: true,
    why: '입자물리 연구의 규모와 깊이를 직접 보며 연구직에 대한 확신이 가장 크게 상승했다.' },

  // 6. Eigergletscher
  { institutionId: 'eigergletscher', memberId: 'jiseok', symbol: 'SCM', delta: 12, primary: true,
    why: '제한된 지형에서도 사람과 물자를 안정적으로 이동시키는 운영 체계에 흥미가 높아졌다.' },
  { institutionId: 'eigergletscher', memberId: 'jeongyun', symbol: 'ENV', delta: 13, primary: true,
    why: '극한환경에서 인프라를 유지하기 위한 에너지와 환경 관리의 중요성을 발견했다.' },
  { institutionId: 'eigergletscher', memberId: 'hyeongwook', symbol: 'MAT', delta: 7,
    why: '혹한의 환경을 견디는 설비 소재에 관심이 생겼다.' },
  { institutionId: 'eigergletscher', memberId: 'seungwon', symbol: 'MOBIL', delta: 16, primary: true,
    why: '산악철도와 케이블카로 구성된 극한지형 모빌리티 시스템에 큰 흥미를 느꼈다.' },

  // 7. ETH Zürich
  { institutionId: 'eth-zurich', memberId: 'jiseok', symbol: 'GRAD', delta: 9,
    why: '세계적 공과대학의 연구 환경을 직접 보며 해외 대학원 진학에 대한 열망이 커졌다.' },
  { institutionId: 'eth-zurich', memberId: 'jiseok', symbol: 'DATA', delta: 5, discovery: true,
    why: '데이터 사이언스 랩을 견학하며 물류 데이터 분석이라는 직무를 새롭게 발견했다.' },
  { institutionId: 'eth-zurich', memberId: 'jeongyun', symbol: 'GRAD', delta: 11, primary: true,
    why: '환경공학 연구실의 국제적 협업 구조를 보며 대학원 진학 의지가 강해졌다.' },
  { institutionId: 'eth-zurich', memberId: 'hyeongwook', symbol: 'RESEARCH', delta: 14, discovery: true, primary: true,
    why: '학부생도 실험실 연구에 깊이 참여하는 문화를 보며 대학원 진학 의지가 강해졌다.' },
  { institutionId: 'eth-zurich', memberId: 'seungwon', symbol: 'GRAD', delta: 6,
    why: '도시 데이터를 다루는 연구실을 보며 해외 대학원에 대한 관심이 생겼다.' },

  // ── GERMANY ─────────────────────────────────────────────
  // 8. Green City Office
  { institutionId: 'green-city-office', memberId: 'jiseok', symbol: 'LOGPLAN', delta: 1,
    why: '친환경 물류 정책 논의를 짧게 접했다.' },
  { institutionId: 'green-city-office', memberId: 'jeongyun', symbol: 'SUSCITY', delta: 17, primary: true,
    why: '탄소중립 도시 전략이 실제 행정에 반영되는 과정을 보며 확신이 커졌다.' },
  { institutionId: 'green-city-office', memberId: 'hyeongwook', symbol: 'PROC', delta: -2,
    why: '정책 중심 업무를 경험하며 현장 공정 기술과는 결이 다르다는 것을 느꼈다.' },
  { institutionId: 'green-city-office', memberId: 'seungwon', symbol: 'URBAN', delta: 18, primary: true,
    why: '도시 전체의 환경 전략을 설계하는 부서를 보며 도시계획 진로에 대한 관심이 크게 상승했다.' },

  // 9. BASF
  { institutionId: 'basf', memberId: 'jiseok', symbol: 'SCM', delta: 6,
    why: '화학기업의 원료·생산·물류가 하나의 단지 안에서 통합 운영되는 방식을 관찰했다.' },
  { institutionId: 'basf', memberId: 'jeongyun', symbol: 'ENV', delta: 4,
    why: '대규모 화학단지의 환경 관리 시스템을 짧게 살펴봤다.' },
  { institutionId: 'basf', memberId: 'hyeongwook', symbol: 'CHEM', delta: 20, primary: true,
    why: '세계 최대 화학기업의 통합 생산단지(Verbund)를 보며 산업 화학 연구에 대한 관심이 크게 높아졌다.' },
  { institutionId: 'basf', memberId: 'seungwon', symbol: 'INFRA', delta: -1,
    why: '산업 인프라와 공공 인프라의 운영 방식이 다르다는 것을 느꼈다.' },

  // 10. EMBL
  { institutionId: 'embl', memberId: 'jiseok', symbol: 'GRAD', delta: 2,
    why: '국제 공동연구 조직의 운영 구조를 짧게 살펴봤다.' },
  { institutionId: 'embl', memberId: 'jeongyun', symbol: 'CLIM', delta: 3,
    why: '생명과학 연구가 기후 연구와 연결되는 지점을 짧게 확인했다.' },
  { institutionId: 'embl', memberId: 'hyeongwook', symbol: 'BIO', delta: 16, primary: true,
    why: '생명과학 연구의 국제 협력 구조를 보며 바이오 분야 연구에 대한 흥미가 더 깊어졌다.' },
  { institutionId: 'embl', memberId: 'seungwon', symbol: 'GRAD', delta: 5,
    why: '해외 연구기관의 국제 협업 환경에 대한 관심이 조금 더 커졌다.' },

  // 11. DHL Europe Innovation Center
  { institutionId: 'dhl', memberId: 'jiseok', symbol: 'SCM', delta: 18, primary: true,
    why: '물류 자체의 이동보다 데이터를 활용해 전체 운영을 조정하는 업무에 더 큰 흥미를 느꼈다.' },
  { institutionId: 'dhl', memberId: 'jiseok', symbol: 'DATA', delta: 22,
    why: 'AI·IoT 데이터가 물류 의사결정에 실시간으로 반영되는 과정을 직접 확인했다.' },
  { institutionId: 'dhl', memberId: 'jiseok', symbol: 'PORT', delta: -14,
    why: '터미널 현장 운영보다 데이터로 전체 네트워크를 조율하는 업무에 훨씬 더 끌린다는 것을 확인하며 관심이 조정되었다.' },
  { institutionId: 'dhl', memberId: 'jeongyun', symbol: 'GREEN', delta: 6,
    why: '물류 자동화가 탄소 배출 저감과 연결되는 방식을 짧게 살펴봤다.' },
  { institutionId: 'dhl', memberId: 'hyeongwook', symbol: 'PROC', delta: 5,
    why: '자동화 설비의 공정 최적화 방식에 관심이 조금 생겼다.' },
  { institutionId: 'dhl', memberId: 'seungwon', symbol: 'MOBIL', delta: 12, primary: true,
    why: '물류 자동화 기술이 도시 모빌리티 설계에도 적용될 수 있다는 점을 발견했다.' },

  // ── NETHERLANDS ─────────────────────────────────────────
  // 12. Rijksmuseum Boerhaave
  { institutionId: 'boerhaave', memberId: 'jiseok', symbol: 'LOGPLAN', delta: 2,
    why: '과학 도구의 역사를 통해 기획 업무의 장기적 안목에 대해 생각해봤다.' },
  { institutionId: 'boerhaave', memberId: 'jeongyun', symbol: 'CLIM', delta: 4,
    why: '과학사 속 기후 관측의 축적 과정을 짧게 확인했다.' },
  { institutionId: 'boerhaave', memberId: 'hyeongwook', symbol: 'RESEARCH', delta: 9, primary: true,
    why: '수백 년간 이어진 과학 연구의 축적 과정을 보며 장기적 연구직에 대한 확신이 더 깊어졌다.' },
  { institutionId: 'boerhaave', memberId: 'seungwon', symbol: 'URBAN', delta: 3,
    why: '과학 인프라가 도시 발전과 함께해온 역사를 짧게 살펴봤다.' },

  // 13. Portlantis
  { institutionId: 'portlantis', memberId: 'jiseok', symbol: 'PORT', delta: 23, primary: true,
    why: '컨테이너 자체보다 항만에서 선박·트럭·철도·터미널을 하나의 흐름으로 운영하는 과정에 관심이 생겼다.' },
  { institutionId: 'portlantis', memberId: 'jeongyun', symbol: 'GREEN', delta: 9,
    why: '항만의 친환경 전환 전략을 살펴보며 그린 인프라에 대한 관심이 더 커졌다.' },
  { institutionId: 'portlantis', memberId: 'hyeongwook', symbol: 'PROC', delta: 3,
    why: '항만 운영에 필요한 공정 자동화 기술을 짧게 살펴봤다.' },
  { institutionId: 'portlantis', memberId: 'seungwon', symbol: 'INFRA', delta: 19, primary: true,
    why: '세계 최대급 항만의 인프라 운영 체계를 보며 공공 인프라 설계에 대한 흥미가 크게 상승했다.' },

  // 14. InfraTech 2027
  { institutionId: 'infratech', memberId: 'jiseok', symbol: 'SMLOG', delta: 15, primary: true,
    why: '차세대 인프라 박람회에서 스마트 물류 자동화 사례를 다수 확인했다.' },
  { institutionId: 'infratech', memberId: 'jeongyun', symbol: 'GREEN', delta: 12, primary: true,
    why: '차세대 인프라 기술이 대부분 친환경 전환과 맞닿아 있다는 것을 확인했다.' },
  { institutionId: 'infratech', memberId: 'hyeongwook', symbol: 'PROC', delta: 8,
    why: '박람회에서 소개된 신소재·공정 기술 사례에 흥미를 느꼈다.' },
  { institutionId: 'infratech', memberId: 'seungwon', symbol: 'MOBIL', delta: 21, primary: true,
    why: '차세대 인프라 기술 박람회에서 스마트 모빌리티의 실제 적용 사례를 다수 확인했다.' },

  // 15. Dutch Cycling Embassy
  { institutionId: 'cycling-embassy', memberId: 'jiseok', symbol: 'SMLOG', delta: 4,
    why: '자전거 물류(카고바이크) 라스트마일 배송 모델을 짧게 접했다.' },
  { institutionId: 'cycling-embassy', memberId: 'jeongyun', symbol: 'SUSCITY', delta: 7,
    why: '자전거 중심 도시가 지속가능한 도시 모델의 실제 사례라는 것을 확인했다.' },
  { institutionId: 'cycling-embassy', memberId: 'hyeongwook', symbol: 'RESEARCH', delta: -15,
    why: '정책·문화 중심의 접근이 자신이 원하는 실험실 연구와는 결이 다르다는 것을 체감하며 관심도가 크게 조정되었다.' },
  { institutionId: 'cycling-embassy', memberId: 'seungwon', symbol: 'TRANS', delta: 25, primary: true,
    why: '자전거 중심 교통정책이 도시 전체를 어떻게 바꿨는지 보며 교통정책 진로에 대한 확신이 가장 크게 상승했다.' },
]
