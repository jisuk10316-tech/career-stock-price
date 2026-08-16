import type { Member } from './types'

export const members: Member[] = [
  { id: 'jiseok', name: '양지석', role: 'SCM · 물류' },
  { id: 'jeongyun', name: '최정윤', role: '환경 · 에너지' },
  { id: 'hyeongwook', name: '서형욱', role: '화학 · 연구' },
  { id: 'seungwon', name: '최승원', role: '교통 · 도시' },
]

export const memberById = Object.fromEntries(members.map((m) => [m.id, m])) as Record<
  string,
  Member
>
