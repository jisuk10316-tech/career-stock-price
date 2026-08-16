import { useState } from 'react'
import { Link } from 'react-router-dom'
import { institutions } from '../data/institutions'
import { countries } from '../data/countries'
import { getPrimaryEntriesAtInstitution } from '../data/insights'
import { loadAllEntries } from '../data/journal-store'
import Delta from '../components/Delta'

export default function Compare() {
  const [selected, setSelected] = useState(institutions[4].id) // default: CERN
  const allEntries = loadAllEntries()

  const institution = institutions.find((i) => i.id === selected)!
  const country = countries.find((c) => c.id === institution.countryId)!
  const rows = getPrimaryEntriesAtInstitution(institution.id, allEntries)

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <p className="mb-2 font-mono text-xs tracking-widest text-[var(--color-brand)]">
        SAME PLACE, DIFFERENT MOVE
      </p>
      <h1 className="mb-2 text-2xl font-black sm:text-3xl">같은 장소, 네 개의 시선</h1>
      <p className="mb-8 text-sm text-[var(--color-muted)]">
        같은 기관을 방문했지만 네 명의 Career Stock은 서로 다른 방향으로 움직였습니다.
      </p>

      <div className="mb-8 flex flex-wrap gap-2">
        {institutions.map((inst) => (
          <button
            key={inst.id}
            onClick={() => setSelected(inst.id)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
              inst.id === selected
                ? 'bg-[var(--color-brand)] text-[#10141d]'
                : 'border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-ink)]'
            }`}
          >
            {inst.name}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <div className="mb-6 flex items-center gap-3">
          <span className="text-3xl">{country.flag}</span>
          <div>
            <h2 className="text-lg font-bold text-[var(--color-ink)]">{institution.name}</h2>
            <p className="text-xs text-[var(--color-muted)]">{institution.tagline}</p>
          </div>
        </div>

        {rows.length === 0 ? (
          <p className="text-sm text-[var(--color-muted)]">아직 이곳에서의 기록이 없습니다.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
                  <th className="py-2 pr-4">팀원</th>
                  <th className="py-2 pr-4">변화</th>
                  <th className="py-2">이유</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(({ member, entry }) => (
                  <tr key={member.id} className="border-b border-[var(--color-border)] last:border-0">
                    <td className="py-3 pr-4 font-semibold text-[var(--color-ink)]">
                      <Link to={`/market/${member.id}`} className="hover:text-[var(--color-brand)]">
                        {member.name}
                      </Link>
                    </td>
                    <td className="py-3 pr-4">
                      <Delta value={entry.delta} size="sm" />
                    </td>
                    <td className="py-3 text-[var(--color-muted)]">{entry.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-6 text-center text-sm italic text-[var(--color-muted)]">
          “같은 장소를 방문했지만, 진로는 서로 다른 방향으로 움직였다.”
        </p>
      </div>
    </div>
  )
}
