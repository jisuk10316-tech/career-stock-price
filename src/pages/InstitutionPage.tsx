import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { countries } from '../data/countries'
import { institutionById } from '../data/institutions'
import { getEntriesAtInstitution } from '../data/insights'
import { loadAllEntries } from '../data/journal-store'
import { memberById } from '../data/members'
import Delta from '../components/Delta'

export default function InstitutionPage() {
  const { countryId, institutionId } = useParams()
  const country = countries.find((c) => c.id === countryId)
  const institution = institutionId ? institutionById[institutionId] : undefined
  const [open, setOpen] = useState<Set<string>>(new Set())

  if (!country || !institution || institution.countryId !== country.id) {
    return <Navigate to="/journey" replace />
  }

  const allEntries = loadAllEntries()
  const memberEntries = getEntriesAtInstitution(institution.id, allEntries)

  const toggle = (key: string) => {
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <Link
        to={`/journey/${country.id}`}
        className="mb-6 inline-block text-xs text-[var(--color-muted)] hover:text-[var(--color-brand)]"
      >
        ← {country.nameEn}로
      </Link>

      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[var(--color-brand)]">
        {country.flag} {institution.tagline}
      </p>
      <h1 className="mb-6 text-2xl font-black sm:text-3xl">{institution.name}</h1>

      <div className="mb-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <p className="mb-1 text-xs font-bold uppercase tracking-wide text-[var(--color-muted)]">
          Experience
        </p>
        <p className="text-sm leading-relaxed text-[var(--color-ink)] sm:text-base">
          {institution.experience}
        </p>
      </div>

      <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-[var(--color-muted)]">
        팀원별 Career Stock 변화
      </h2>
      <div className="space-y-3">
        {memberEntries.length === 0 && (
          <p className="text-sm text-[var(--color-muted)]">아직 이곳에서의 기록이 없습니다.</p>
        )}
        {memberEntries.map(({ memberId, entry }) => {
          const member = memberById[memberId]
          const isOpen = open.has(entry.id)
          return (
            <div
              key={entry.id}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
            >
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <span className="font-bold text-[var(--color-ink)]">{member.name}</span>
                  <span className="ml-2 text-xs text-[var(--color-muted)]">{member.role}</span>
                </div>
                <Link
                  to={`/market/${member.id}`}
                  className="text-xs text-[var(--color-muted)] hover:text-[var(--color-brand)]"
                >
                  그래프 보기 →
                </Link>
              </div>
              <button
                onClick={() => toggle(entry.id)}
                className="flex w-full items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-left"
              >
                <Delta value={entry.delta} size="sm" />
                <span className="text-xs text-[var(--color-muted)]">
                  {isOpen ? 'WHY ▲' : 'WHY ▼'}
                </span>
              </button>
              {isOpen && (
                <p className="mt-2 px-1 text-sm leading-relaxed text-[var(--color-muted)]">
                  {entry.why}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
