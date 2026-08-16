import { events } from './events'
import { institutionOrder, institutionById } from './institutions'
import { members } from './members'
import { countries } from './countries'
import type { MemberId } from './types'

export const START_PRICE = 100

export interface PricePoint {
  institutionId: string
  label: string
  countryId: string
  price: number
  delta: number
  why?: string
}

/** Full price series for one member's stock symbol across the whole journey. */
export function getStockSeries(memberId: MemberId, symbol: string): PricePoint[] {
  const memberEvents = events.filter((e) => e.memberId === memberId && e.symbol === symbol)
  const firstIdx = memberEvents.some((e) => e.discovery)
    ? institutionOrder.indexOf(memberEvents.find((e) => e.discovery)!.institutionId)
    : 0

  const series: PricePoint[] = []
  let price = START_PRICE
  const startInstitution = institutionOrder[firstIdx]
  series.push({
    institutionId: `${startInstitution}__start`,
    label: firstIdx === 0 ? '출국' : `${institutionById[startInstitution].nameKo} 발견`,
    countryId: institutionById[startInstitution].countryId,
    price,
    delta: 0,
  })

  for (let i = firstIdx; i < institutionOrder.length; i++) {
    const instId = institutionOrder[i]
    const ev = memberEvents.find((e) => e.institutionId === instId)
    const delta = ev ? ev.delta : 0
    price += delta
    series.push({
      institutionId: instId,
      label: institutionById[instId].nameKo,
      countryId: institutionById[instId].countryId,
      price,
      delta,
      why: ev?.why,
    })
  }
  return series
}

/** All stock series for a member, keyed by symbol. */
export function getMemberSeries(memberId: MemberId) {
  const member = members.find((m) => m.id === memberId)!
  return member.stocks.map((s) => ({
    ...s,
    series: getStockSeries(memberId, s.symbol),
  }))
}

export function getCurrentPrice(memberId: MemberId, symbol: string): number {
  const series = getStockSeries(memberId, symbol)
  return series[series.length - 1].price
}

/** Chart-friendly rows: one row per institution, one column per stock symbol. */
export function getMemberChartData(memberId: MemberId) {
  const member = members.find((m) => m.id === memberId)!
  const seriesBySymbol = Object.fromEntries(
    member.stocks.map((s) => [s.symbol, getStockSeries(memberId, s.symbol)])
  ) as Record<string, PricePoint[]>

  const startIdxBySymbol = Object.fromEntries(
    member.stocks.map((s) => {
      const series = seriesBySymbol[s.symbol]
      const startId = series[0].institutionId.replace('__start', '')
      return [s.symbol, institutionOrder.indexOf(startId)]
    })
  )

  const rows: Record<string, string | number | null>[] = []
  const startRow: Record<string, string | number | null> = { label: '출국', order: -1 }
  member.stocks.forEach((s) => {
    startRow[s.symbol] = startIdxBySymbol[s.symbol] === 0 ? START_PRICE : null
  })
  rows.push(startRow)

  institutionOrder.forEach((instId, idx) => {
    const inst = institutionById[instId]
    const row: Record<string, string | number | null> = { label: inst.nameKo, order: idx }
    member.stocks.forEach((s) => {
      if (idx < startIdxBySymbol[s.symbol]) {
        row[s.symbol] = null
        return
      }
      const point = seriesBySymbol[s.symbol].find((p) => p.institutionId === instId)
      row[s.symbol] = point ? point.price : null
    })
    rows.push(row)
  })
  return rows
}

/** Simple average-index snapshot per country boundary, for overview charts. */
export function getMemberCountryIndex(memberId: MemberId) {
  const member = members.find((m) => m.id === memberId)!
  const seriesBySymbol = Object.fromEntries(
    member.stocks.map((s) => [s.symbol, getStockSeries(memberId, s.symbol)])
  )
  const countryIds = ['france', 'switzerland', 'germany', 'netherlands']
  const points: { countryId: string; label: string; index: number }[] = [
    { countryId: 'start', label: '출국', index: START_PRICE },
  ]
  countryIds.forEach((cid) => {
    const lastInCountry = institutionOrder
      .filter((id) => institutionById[id].countryId === cid)
      .pop()!
    const prices = member.stocks.map((s) => {
      const series = seriesBySymbol[s.symbol]
      const upTo = series.filter(
        (p) => institutionOrder.indexOf(p.institutionId.replace('__start', '')) <=
          institutionOrder.indexOf(lastInCountry)
      )
      return upTo.length ? upTo[upTo.length - 1].price : START_PRICE
    })
    const index = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length)
    const country = countries.find((c) => c.id === cid)!
    points.push({ countryId: cid, label: country.nameKo, index })
  })
  return points
}

export function getMemberTotalChange(memberId: MemberId) {
  const member = members.find((m) => m.id === memberId)!
  return member.stocks.map((s) => {
    const series = getStockSeries(memberId, s.symbol)
    const current = series[series.length - 1].price
    return { symbol: s.symbol, label: s.label, start: START_PRICE, current, change: current - START_PRICE }
  })
}
