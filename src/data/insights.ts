import type { JournalEntry, MemberId } from './types'
import { members, memberById } from './members'
import { institutionById, institutions } from './institutions'

const flagByCountry: Record<string, string> = {
  france: '🇫🇷',
  switzerland: '🇨🇭',
  germany: '🇩🇪',
  netherlands: '🇳🇱',
}

export interface MemberEntry {
  memberId: MemberId
  entry: JournalEntry
}

/** Every logged entry at a given institution, across all members. */
export function getEntriesAtInstitution(
  institutionId: string,
  allEntries: Record<MemberId, JournalEntry[]>
): MemberEntry[] {
  return members.flatMap((m) =>
    allEntries[m.id]
      .filter((e) => e.institutionId === institutionId)
      .map((entry) => ({ memberId: m.id, entry }))
  )
}

/** One representative entry per member at an institution (most recent if several). */
export function getPrimaryEntriesAtInstitution(
  institutionId: string,
  allEntries: Record<MemberId, JournalEntry[]>
) {
  return members
    .map((m) => {
      const matches = allEntries[m.id]
        .filter((e) => e.institutionId === institutionId)
        .sort((a, b) => b.at - a.at)
      return matches.length ? { member: m, entry: matches[0] } : null
    })
    .filter((x): x is { member: (typeof members)[number]; entry: JournalEntry } => x !== null)
}

export function getBiggestMoveAtInstitution(
  institutionId: string,
  allEntries: Record<MemberId, JournalEntry[]>
): MemberEntry | null {
  const list = getEntriesAtInstitution(institutionId, allEntries)
  if (!list.length) return null
  return list.reduce((a, b) => (Math.abs(b.entry.delta) > Math.abs(a.entry.delta) ? b : a))
}

export interface NewsItem extends JournalEntry {
  memberName: string
  countryFlag: string
}

export function getCareerNews(
  allEntries: Record<MemberId, JournalEntry[]>,
  threshold = 20
): NewsItem[] {
  return members
    .flatMap((m) => allEntries[m.id].map((entry) => ({ memberId: m.id, entry })))
    .filter(({ entry }) => Math.abs(entry.delta) >= threshold)
    .map(({ memberId, entry }) => ({
      ...entry,
      memberName: memberById[memberId].name,
      countryFlag: entry.institutionId
        ? flagByCountry[institutionById[entry.institutionId].countryId]
        : '📝',
    }))
    .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta))
}

export function getInstitutionsInOrder() {
  return institutions
}
