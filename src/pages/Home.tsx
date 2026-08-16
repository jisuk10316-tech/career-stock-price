import { Link } from 'react-router-dom'
import { members } from '../data/members'
import { countries } from '../data/countries'
import { loadEntries, computeSeries, START_PRICE } from '../data/journal-store'
import Delta from '../components/Delta'

export default function Home() {
  return (
    <div>
      <section className="border-b border-[var(--color-border)] px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 font-mono text-xs tracking-widest text-[var(--color-brand)]">
            EUROPE FIELD TRIP · CAREER PORTFOLIO
          </p>
          <h1 className="text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            우리가 이동한 만큼,
            <br />
            <span className="text-[var(--color-brand)]">진로도 움직였다.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm text-[var(--color-muted)] sm:text-base">
            유럽 4개국의 산업·연구·도시 현장을 경험하며 변화한
            우리의 진로 관심도를 하나의 주가처럼 기록합니다.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <Link
              to="/journey"
              className="rounded-full bg-[var(--color-brand)] px-5 py-2.5 text-sm font-bold text-[color:var(--color-on-brand)] transition-transform hover:scale-105"
            >
              여정 시작하기 →
            </Link>
            <Link
              to="/market"
              className="rounded-full border border-[var(--color-border)] px-5 py-2.5 text-sm font-bold text-[var(--color-ink)] transition-colors hover:bg-white/5"
            >
              CAREER MARKET 보기
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--color-border)] px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {countries.map((c, i) => (
              <div key={c.id} className="flex items-center gap-2 sm:gap-3">
                <Link
                  to={`/journey/${c.id}`}
                  className="group flex flex-col items-center gap-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 transition-colors hover:border-[var(--color-brand)]"
                >
                  <span className="text-2xl">{c.flag}</span>
                  <span className="text-xs font-bold text-[var(--color-ink)] group-hover:text-[var(--color-brand)]">
                    {c.nameEn.toUpperCase()}
                  </span>
                </Link>
                {i < countries.length - 1 && (
                  <span className="text-[var(--color-muted)]">→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-1 text-lg font-bold">MY CAREER MARKET</h2>
          <p className="mb-6 text-sm text-[var(--color-muted)]">
            네 명의 현재 Career Stock — 탭을 눌러 각자의 그래프를 확인하세요.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {members.map((m) => {
              const series = computeSeries(loadEntries(m.id))
              const current = series.length ? series[series.length - 1].price : START_PRICE
              const change = current - START_PRICE
              return (
                <Link
                  key={m.id}
                  to={`/market/${m.id}`}
                  className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition-colors hover:border-[var(--color-brand)]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: m.color }}
                      />
                      <div>
                        <h3 className="text-base font-bold text-[var(--color-ink)] group-hover:text-[var(--color-brand)]">
                          {m.name}
                        </h3>
                        <p className="text-xs text-[var(--color-muted)]">{m.role}</p>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black tabular" style={{ color: m.color }}>
                        {current}
                      </span>
                      <Delta value={change} size="sm" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
