import type { Member } from './types'

export const members: Member[] = [
  {
    id: 'jiseok',
    name: '양지석',
    role: 'SCM · 물류',
    stocks: [
      { symbol: 'SCM', label: 'SCM', description: '공급망 전체를 설계하고 조정하는 운영관리 직무' },
      { symbol: 'PORT', label: '항만물류', description: '항만에서 선박·트럭·철도·터미널을 연결하는 물류 운영' },
      { symbol: 'SMLOG', label: '스마트물류', description: '자동화·데이터 기반의 차세대 물류 시스템' },
      { symbol: 'LOGPLAN', label: '물류기획', description: '물류 네트워크와 전략을 설계하는 기획 업무' },
      { symbol: 'DATA', label: '물류데이터분석', description: '물류 운영 데이터를 분석해 의사결정을 돕는 직무' },
      { symbol: 'GRAD', label: '해외대학원', description: '해외 대학원에서의 공급망·물류 연구' },
    ],
  },
  {
    id: 'jeongyun',
    name: '최정윤',
    role: '환경·에너지',
    stocks: [
      { symbol: 'ENV', label: '환경공학', description: '에너지·환경 시스템을 설계하고 관리하는 공학 직무' },
      { symbol: 'CLIM', label: '기후정책', description: '기후변화 대응을 위한 정책과 제도 설계' },
      { symbol: 'GREEN', label: '그린인프라', description: '도시와 산업의 친환경 인프라 구축' },
      { symbol: 'SUSCITY', label: '지속가능도시', description: '탄소중립을 목표로 한 도시 전략 수립' },
      { symbol: 'GRAD', label: '해외대학원', description: '해외 대학원에서의 환경·에너지 연구' },
    ],
  },
  {
    id: 'hyeongwook',
    name: '서형욱',
    role: '화학·연구',
    stocks: [
      { symbol: 'CHEM', label: '융합응용화학', description: '화학을 산업 문제 해결에 응용하는 융합 연구' },
      { symbol: 'MAT', label: '신소재연구', description: '차세대 산업을 위한 신소재 개발' },
      { symbol: 'BIO', label: '바이오소재', description: '생물학적 원리를 활용한 소재·공정 연구' },
      { symbol: 'PROC', label: '공정기술', description: '실험실 기술을 실제 생산 공정으로 옮기는 업무' },
      { symbol: 'RESEARCH', label: '연구직(대학원)', description: '대학원 및 연구소에서의 장기 연구 커리어' },
    ],
  },
  {
    id: 'seungwon',
    name: '최승원',
    role: '교통·도시',
    stocks: [
      { symbol: 'TRANS', label: '교통정책', description: '도시 교통 체계를 설계하는 정책 직무' },
      { symbol: 'INFRA', label: '공공인프라', description: '공공 인프라를 기획하고 운영하는 업무' },
      { symbol: 'URBAN', label: '도시계획', description: '도시 전체의 공간과 기능을 설계하는 계획 직무' },
      { symbol: 'MOBIL', label: '스마트모빌리티', description: '차세대 이동수단과 모빌리티 서비스 설계' },
      { symbol: 'GRAD', label: '해외대학원', description: '해외 대학원에서의 도시·교통 연구' },
    ],
  },
]

export const memberById = Object.fromEntries(members.map((m) => [m.id, m]))
