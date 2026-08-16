import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { countries } from '../data/countries'
import { institutionById } from '../data/institutions'
import { getEventsAtInstitution } from '../data/insights'
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

  const memberEvents = getEventsAtInstitution(institution.id)
  const byMember = Object.values(memberById).map((m) => ({
    member: m,
    events: memberEvents.filter((e) => e.memberId === m.id),
  }))

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
      <div className="space-y-4">
        {byMember.map(({ member, events: evs }) => (
          <div
            key={member.id}
            className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
          >
            <div className="mb-3 flex items-center justify-between">
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
            {evs.length === 0 ? (
              <p className="text-sm text-[var(--color-muted)]">이번 장소에서는 특별한 변화가 없었다.</p>
            ) : (
              <div className="space-y-2">
                {evs.map((e) => {
                  const key = `${member.id}-${e.symbol}`
                  const label = member.stocks.find((s) => s.symbol === e.symbol)?.label ?? e.symbol
                  const isOpen = open.has(key)
                  return (
                    <div key={key} className="rounded-lg bg-white/5">
                      <button
                        onClick={() => toggle(key)}
                        className="flex w-full items-center justify-between px-3 py-2 text-left"
                      >
                        <span className="text-sm text-[var(--color-ink)]">
                          {label}
                          {e.discovery && (
                            <span className="ml-2 rounded-full bg-[var(--color-brand)]/15 px-2 py-0.5 text-[10px] font-bold text-[var(--color-brand)]">
                              NEW
                            </span>
                          )}
                        </span>
                        <span className="flex items-center gap-2">
                          <Delta value={e.delta} size="sm" />
                          <span className="text-xs text-[var(--color-muted)]">
                            {isOpen ? 'WHY ▲' : 'WHY ▼'}
                          </span>
                        </span>
                      </button>
                      {isOpen && (
                        <p className="border-t border-[var(--color-border)] px-3 py-2 text-sm leading-relaxed text-[var(--color-muted)]">
                          {e.why}
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
