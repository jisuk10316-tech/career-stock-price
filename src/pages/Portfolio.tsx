import { useState } from 'react'
import { Link } from 'react-router-dom'
import { members, memberById } from '../data/members'
import { countries } from '../data/countries'
import { institutionsByCountry } from '../data/institutions'
import { getBiggestMoveAtInstitution } from '../data/insights'
import { loadAllEntries } from '../data/journal-store'
import { portfolio } from '../data/portfolio'
import Delta from '../components/Delta'
import type { MemberId } from '../data/types'

function countryHeadline(countryId: string, allEntries: ReturnType<typeof loadAllEntries>) {
  const insts = institutionsByCountry(countryId)
  const moves = insts
    .map((i) => ({ inst: i, move: getBiggestMoveAtInstitution(i.id, allEntries) }))
    .filter((x) => x.move)
  if (!moves.length) return null
  const top = moves.reduce((a, b) =>
    Math.abs(b.move!.entry.delta) > Math.abs(a.move!.entry.delta) ? b : a
  )
  return { institution: top.inst, move: top.move! }
}

export default function Portfolio() {
  const [active, setActive] = useState<MemberId>(members[0].id)
  const activeMember = memberById[active]
  const narrative = portfolio[active]
  const allEntries = loadAllEntries()

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <p className="mb-2 font-mono text-xs tracking-widest text-[var(--color-brand)]">
        FINAL PORTFOLIO
      </p>
      <h1 className="mb-2 text-2xl font-black sm:text-3xl">Where Am I Heading?</h1>
      <p className="mb-10 text-sm text-[var(--color-muted)]">
        가장 높은 주가가 아니라, 여행이 우리에게 알려준 진로 탐색 결과를 정리합니다.
      </p>

      <section className="mb-12">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-[var(--color-muted)]">
          Physical Journey × Career Journey
        </h2>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <div className="flex flex-wrap items-center gap-2 text-sm font-bold">
            {countries.map((c, i) => (
              <span key={c.id} className="flex items-center gap-2">
                <span className="text-[var(--color-ink)]">
                  {c.flag} {c.nameEn}
                </span>
                {i < countries.length - 1 && <span className="text-[var(--color-muted)]">→</span>}
              </span>
            ))}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-4">
            {countries.map((c) => {
              const headline = countryHeadline(c.id, allEntries)
              if (!headline) return null
              const { institution, move } = headline
              return (
                <div key={c.id} className="rounded-xl bg-white/5 p-3 text-center">
                  <p className="mb-1 text-xs text-[var(--color-muted)]">{institution.nameKo}</p>
                  <p className="mb-1 text-xs font-semibold text-[var(--color-ink)]">
                    {memberById[move.memberId].name}
                  </p>
                  <Delta value={move.entry.delta} size="sm" />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-[var(--color-muted)]">
          팀원별 진로 탐색 결과
        </h2>
        <div className="mb-6 flex flex-wrap gap-2">
          {members.map((m) => (
            <button
              key={m.id}
              onClick={() => setActive(m.id)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                m.id === active
                  ? 'bg-[var(--color-brand)] text-[#10141d]'
                  : 'border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-ink)]'
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-[var(--color-ink)]">{activeMember.name}</h3>
              <p className="text-xs text-[var(--color-muted)]">{activeMember.role}</p>
            </div>
            <Link
              to={`/market/${activeMember.id}`}
              className="text-xs text-[var(--color-muted)] hover:text-[var(--color-brand)]"
            >
              전체 그래프 보기 →
            </Link>
          </div>

          <div className="space-y-4">
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-wide text-[var(--color-muted)]">
                Before
              </p>
              <p className="text-sm text-[var(--color-ink)]">{narrative.before}</p>
            </div>
            <div className="text-center text-[var(--color-muted)]">↓</div>
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-wide text-[var(--color-muted)]">
                During
              </p>
              <p className="text-sm text-[var(--color-ink)]">{narrative.during}</p>
            </div>
            <div className="text-center text-[var(--color-muted)]">↓</div>
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-wide text-[var(--color-brand)]">
                After
              </p>
              <p className="text-base font-medium leading-relaxed text-[var(--color-ink)]">
                {narrative.after}
              </p>
            </div>
            <div className="text-center text-[var(--color-muted)]">↓</div>
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[var(--color-muted)]">
                Next Move
              </p>
              <ul className="space-y-1.5">
                {narrative.nextMove.map((n) => (
                  <li
                    key={n}
                    className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm text-[var(--color-ink)]"
                  >
                    <span className="text-[var(--color-brand)]">●</span>
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
