import { Link, Navigate, useParams } from 'react-router-dom'
import { countries, countryOrdinal } from '../data/countries'
import { institutionsByCountry } from '../data/institutions'
import { getBiggestMoveAtInstitution, stockLabel } from '../data/insights'
import { memberById } from '../data/members'
import Delta from '../components/Delta'

export default function CountryPage() {
  const { countryId } = useParams()
  const country = countries.find((c) => c.id === countryId)
  if (!country) return <Navigate to="/journey" replace />

  const idx = country.order - 1
  const institutions = institutionsByCountry(country.id)

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <Link to="/journey" className="mb-6 inline-block text-xs text-[var(--color-muted)] hover:text-[var(--color-brand)]">
        ← JOURNEY로
      </Link>
      <p className="mb-2 font-mono text-xs tracking-widest text-[var(--color-brand)]">
        {countryOrdinal[idx]} 이동
      </p>
      <div className="mb-10 flex items-center gap-4">
        <span className="text-5xl">{country.flag}</span>
        <div>
          <h1 className="text-3xl font-black">{country.nameEn.toUpperCase()}</h1>
          <p className="text-sm text-[var(--color-muted)]">{country.nameKo}</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {institutions.map((inst) => {
          const biggest = getBiggestMoveAtInstitution(inst.id)
          return (
            <Link
              key={inst.id}
              to={`/journey/${country.id}/${inst.id}`}
              className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition-colors hover:border-[var(--color-brand)]"
            >
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[var(--color-brand)]">
                {inst.tagline}
              </p>
              <h2 className="mb-2 text-lg font-bold text-[var(--color-ink)] group-hover:text-[var(--color-brand)]">
                {inst.name}
              </h2>
              <p className="mb-4 text-sm text-[var(--color-muted)]">{inst.experience}</p>
              {biggest && (
                <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-sm">
                  <span className="text-[var(--color-muted)]">
                    {memberById[biggest.memberId].name} · {stockLabel(biggest.memberId, biggest.symbol)}
                  </span>
                  <Delta value={biggest.delta} size="sm" />
                </div>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
