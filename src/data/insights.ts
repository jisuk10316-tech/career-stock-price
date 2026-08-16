import type { JournalEntry, MemberId } from './types'
import { members } from './members'

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

export function getBiggestMoveAtInstitution(
  institutionId: string,
  allEntries: Record<MemberId, JournalEntry[]>
): MemberEntry | null {
  const list = getEntriesAtInstitution(institutionId, allEntries)
  if (!list.length) return null
  return list.reduce((a, b) => (Math.abs(b.entry.delta) > Math.abs(a.entry.delta) ? b : a))
}
