import { Link } from 'react-router-dom'
import { countries, countryOrdinal } from '../data/countries'
import { institutionsByCountry } from '../data/institutions'

export default function Journey() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <p className="mb-2 font-mono text-xs tracking-widest text-[var(--color-brand)]">JOURNEY</p>
      <h1 className="mb-2 text-2xl font-black sm:text-3xl">이동 경로를 따라가며 진로를 확인하세요</h1>
      <p className="mb-10 text-sm text-[var(--color-muted)]">
        국가를 선택하면 방문 기관과 그곳에서 움직인 팀원들의 Career Stock을 볼 수 있습니다.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        {countries.map((c, idx) => {
          const insts = institutionsByCountry(c.id)
          return (
            <Link
              key={c.id}
              to={`/journey/${c.id}`}
              className="group relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-colors hover:border-[var(--color-brand)]"
            >
              <p className="mb-1 font-mono text-xs text-[var(--color-muted)]">
                {countryOrdinal[idx]} 이동
              </p>
              <div className="mb-4 flex items-center gap-3">
                <span className="text-4xl">{c.flag}</span>
                <div>
                  <h2 className="text-xl font-bold text-[var(--color-ink)] group-hover:text-[var(--color-brand)]">
                    {c.nameEn}
                  </h2>
                  <p className="text-sm text-[var(--color-muted)]">{c.nameKo}</p>
                </div>
              </div>
              <ul className="space-y-1 text-sm text-[var(--color-muted)]">
                {insts.map((i) => (
                  <li key={i.id} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-[var(--color-brand)]" />
                    {i.name}
                  </li>
                ))}
              </ul>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
