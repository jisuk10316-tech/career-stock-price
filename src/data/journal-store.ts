import type { JournalEntry, MemberId } from './types'
import { seedEntries } from './journal-seed'
import { members } from './members'

export const START_PRICE = 100
export const DELTA_STEP = 10
export const DELTA_MIN = -50
export const DELTA_MAX = 50

const storageKey = (memberId: MemberId) => `career-stock:v1:${memberId}`

function readRaw(memberId: MemberId): JournalEntry[] | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(storageKey(memberId))
    return raw ? (JSON.parse(raw) as JournalEntry[]) : null
  } catch {
    return null
  }
}

function writeRaw(memberId: MemberId, entries: JournalEntry[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(storageKey(memberId), JSON.stringify(entries))
}

/** Loads a member's entries, seeding from the trip history on first visit. */
export function loadEntries(memberId: MemberId): JournalEntry[] {
  const existing = readRaw(memberId)
  if (existing) return existing
  const seed = seedEntries.filter((e) => e.memberId === memberId)
  writeRaw(memberId, seed)
  return seed
}

export function loadAllEntries(): Record<MemberId, JournalEntry[]> {
  return Object.fromEntries(members.map((m) => [m.id, loadEntries(m.id)])) as Record<
    MemberId,
    JournalEntry[]
  >
}

export function addEntry(
  memberId: MemberId,
  entry: { place: string; delta: number; why: string; institutionId?: string }
): JournalEntry[] {
  const current = loadEntries(memberId)
  const next: JournalEntry[] = [
    ...current,
    {
      id: `entry-${Date.now()}-${Math.round(Math.random() * 1000)}`,
      memberId,
      place: entry.place,
      institutionId: entry.institutionId,
      delta: entry.delta,
      why: entry.why,
      at: Date.now(),
    },
  ]
  writeRaw(memberId, next)
  return next
}

export function removeEntry(memberId: MemberId, entryId: string): JournalEntry[] {
  const next = loadEntries(memberId).filter((e) => e.id !== entryId)
  writeRaw(memberId, next)
  return next
}

export interface SeriesPoint extends JournalEntry {
  price: number
}

/** Cumulative price series starting at 100, in chronological order. */
export function computeSeries(entries: JournalEntry[]): SeriesPoint[] {
  const sorted = [...entries].sort((a, b) => a.at - b.at)
  let price = START_PRICE
  return sorted.map((e) => {
    price += e.delta
    return { ...e, price }
  })
}

export function getCurrentPrice(entries: JournalEntry[]): number {
  const series = computeSeries(entries)
  return series.length ? series[series.length - 1].price : START_PRICE
}

export function clampDelta(value: number): number {
  const stepped = Math.round(value / DELTA_STEP) * DELTA_STEP
  return Math.min(DELTA_MAX, Math.max(DELTA_MIN, stepped))
}
