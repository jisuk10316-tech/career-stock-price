import type { Member } from './types'

export const members: Member[] = [
  { id: 'jeongyun', name: '최정윤', role: '교통 · 도시', color: '#5E7FA3' },
  { id: 'jiseok', name: '양지석', role: 'SCM · 물류', color: '#6B8F5E' },
  { id: 'hyeongwook', name: '서형욱', role: '화학 · 연구', color: '#82699E' },
  { id: 'seungwon', name: '최승원', role: '환경 · 에너지', color: '#B8823A' },
]

export const memberById = Object.fromEntries(members.map((m) => [m.id, m])) as Record<
  string,
  Member
>
