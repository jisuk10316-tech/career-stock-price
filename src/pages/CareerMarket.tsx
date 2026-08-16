import { useNavigate, useParams } from 'react-router-dom'
import { members } from '../data/members'
import { events } from '../data/events'
import { institutionOrder, institutionById } from '../data/institutions'
import { countries } from '../data/countries'
import { getMemberChartData, getMemberTotalChange } from '../data/prices'
import StockChart, { STOCK_PALETTE } from '../components/StockChart'
import Delta from '../components/Delta'

export default function CareerMarket() {
  const { memberId } = useParams()
  const navigate = useNavigate()
  const active = members.find((m) => m.id === memberId) ?? members[0]

  const chartData = getMemberChartData(active.id)
  const totals = getMemberTotalChange(active.id)

  const timeline = institutionOrder
    .map((instId) => ({
      institution: institutionById[instId],
      events: events.filter((e) => e.institutionId === instId && e.memberId === active.id),
    }))
    .filter((row) => row.events.length > 0)

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <p className="mb-2 font-mono text-xs tracking-widest text-[var(--color-brand)]">
        CAREER MARKET
      </p>
      <h1 className="mb-6 text-2xl font-black sm:text-3xl">MY CAREER MARKET</h1>

      <div className="mb-8 flex flex-wrap gap-2 border-b border-[var(--color-border)] pb-4">
        {members.map((m) => {
          const isActive = m.id === active.id
          return (
            <button
              key={m.id}
              onClick={() => navigate(`/market/${m.id}`)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                isActive
                  ? 'bg-[var(--color-brand)] text-[#10141d]'
                  : 'border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-ink)]'
              }`}
            >
              {m.name}
            </button>
          )
        })}
      </div>

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[var(--color-ink)]">{active.name}</h2>
          <p className="text-sm text-[var(--color-muted)]">{active.role}</p>
        </div>
      </div>

      <div className="mb-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6">
        <StockChart
          data={chartData}
          series={active.stocks.map((s) => ({ symbol: s.symbol, label: s.label }))}
          height={360}
        />
      </div>

      <div className="mb-10 grid gap-3 sm:grid-cols-2">
        {totals.map((t, i) => (
          <div
            key={t.symbol}
            className="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3"
          >
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: STOCK_PALETTE[i % STOCK_PALETTE.length] }}
              />
              <span className="text-sm font-medium text-[var(--color-ink)]">{t.label}</span>
            </div>
            <div className="flex items-center gap-2 tabular">
              <span className="text-sm text-[var(--color-muted)]">
                {t.start} → {t.current}
              </span>
              <Delta value={t.change} size="sm" />
            </div>
          </div>
        ))}
      </div>

      <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-[var(--color-muted)]">
        Career Timeline
      </h3>
      <div className="space-y-4 border-l border-[var(--color-border)] pl-5">
        {timeline.map(({ institution, events: evs }) => {
          const country = countries.find((c) => c.id === institution.countryId)!
          return (
            <div key={institution.id} className="relative">
              <span className="absolute -left-[26px] top-1.5 h-2.5 w-2.5 rounded-full bg-[var(--color-brand)]" />
              <p className="mb-1 text-xs text-[var(--color-muted)]">
                {country.flag} {institution.name}
              </p>
              <div className="space-y-2">
                {evs.map((e) => {
                  const label = active.stocks.find((s) => s.symbol === e.symbol)?.label ?? e.symbol
                  return (
                    <div
                      key={`${institution.id}-${e.symbol}`}
                      className="rounded-lg bg-[var(--color-surface)] p-3"
                    >
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm font-semibold text-[var(--color-ink)]">
                          {label}
                          {e.discovery && (
                            <span className="ml-2 rounded-full bg-[var(--color-brand)]/15 px-2 py-0.5 text-[10px] font-bold text-[var(--color-brand)]">
                              NEW STOCK
                            </span>
                          )}
                        </span>
                        <Delta value={e.delta} size="sm" />
                      </div>
                      <p className="text-sm leading-relaxed text-[var(--color-muted)]">{e.why}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
