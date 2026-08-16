import type { JournalEntry } from './types'

/**
 * No pre-filled history — every member starts at the base price (100) with
 * an empty timeline. Entries are only added when someone actually logs a
 * real experience through the Career Market form.
 */
export const seedEntries: JournalEntry[] = []
