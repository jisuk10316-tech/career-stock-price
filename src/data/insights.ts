import { events } from './events'
import { members, memberById } from './members'
import { institutions, institutionById } from './institutions'
import type { CareerEvent } from './types'

export function getEventsAtInstitution(institutionId: string): CareerEvent[] {
  return events.filter((e) => e.institutionId === institutionId)
}

/** One headline event per member at an institution (falls back to biggest |delta|). */
export function getPrimaryEventsAtInstitution(institutionId: string) {
  return members
    .map((m) => {
      const memberEvents = events.filter(
        (e) => e.institutionId === institutionId && e.memberId === m.id
      )
      if (!memberEvents.length) return null
      const primary = memberEvents.find((e) => e.primary) ?? memberEvents.sort(
        (a, b) => Math.abs(b.delta) - Math.abs(a.delta)
      )[0]
      return { member: m, event: primary }
    })
    .filter((x): x is { member: (typeof members)[number]; event: CareerEvent } => x !== null)
}

export function getBiggestMoveAtInstitution(institutionId: string) {
  const list = getEventsAtInstitution(institutionId)
  if (!list.length) return null
  return list.reduce((a, b) => (Math.abs(b.delta) > Math.abs(a.delta) ? b : a))
}

export function stockLabel(memberId: string, symbol: string) {
  const member = memberById[memberId as keyof typeof memberById]
  return member?.stocks.find((s) => s.symbol === symbol)?.label ?? symbol
}

export interface NewsItem extends CareerEvent {
  memberName: string
  stockName: string
  institutionName: string
  countryFlag: string
}

const flagByCountry: Record<string, string> = {
  france: '🇫🇷',
  switzerland: '🇨🇭',
  germany: '🇩🇪',
  netherlands: '🇳🇱',
}

export function getCareerNews(threshold = 12): NewsItem[] {
  return events
    .filter((e) => Math.abs(e.delta) >= threshold)
    .map((e) => ({
      ...e,
      memberName: memberById[e.memberId].name,
      stockName: stockLabel(e.memberId, e.symbol),
      institutionName: institutionById[e.institutionId].nameKo,
      countryFlag: flagByCountry[institutionById[e.institutionId].countryId],
    }))
    .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta))
}

export function getInstitutionsInOrder() {
  return institutions
}
