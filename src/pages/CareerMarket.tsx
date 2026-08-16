import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { members } from '../data/members'
import { institutions, institutionsByCountry } from '../data/institutions'
import { countries } from '../data/countries'
import {
  addEntry,
  clampDelta,
  computeSeries,
  DELTA_MAX,
  DELTA_MIN,
  DELTA_STEP,
  loadEntries,
  removeEntry,
  START_PRICE,
} from '../data/journal-store'
import JournalChart from '../components/JournalChart'
import Delta from '../components/Delta'
import type { JournalEntry } from '../data/types'

export default function CareerMarket() {
  const { memberId } = useParams()
  const navigate = useNavigate()
  const active = members.find((m) => m.id === memberId)

  const [entries, setEntries] = useState<JournalEntry[]>(() =>
    active ? loadEntries(active.id) : []
  )

  useEffect(() => {
    if (active) setEntries(loadEntries(active.id))
  }, [active])

  const [placeOption, setPlaceOption] = useState('') // '' | 'custom' | institution id
  const [customPlace, setCustomPlace] = useState('')
  const [delta, setDelta] = useState(0)
  const [why, setWhy] = useState('')

  const selectedInstitution = institutions.find((i) => i.id === placeOption)
  const place = placeOption === 'custom' ? customPlace : (selectedInstitution?.name ?? '')

  const series = useMemo(() => computeSeries(entries), [entries])
  const currentPrice = series.length ? series[series.length - 1].price : START_PRICE
  const totalChange = currentPrice - START_PRICE

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!active || !place.trim() || !why.trim()) return
    const next = addEntry(active.id, {
      place: place.trim(),
      delta,
      why: why.trim(),
      institutionId: selectedInstitution?.id,
    })
    setEntries(next)
    setPlaceOption('')
    setCustomPlace('')
    setDelta(0)
    setWhy('')
  }

  const handleDelete = (id: string) => {
    if (!active) return
    setEntries(removeEntry(active.id, id))
  }

  const timeline = [...series].sort((a, b) => b.at - a.at)

  if (!active) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <p className="mb-2 font-mono text-xs tracking-widest text-[var(--color-brand)]">
          CAREER MARKET
        </p>
        <h1 className="mb-6 text-2xl font-black sm:text-3xl">MY CAREER STOCK</h1>

        <div className="mb-8 flex flex-wrap gap-2 border-b border-[var(--color-border)] pb-4">
          {members.map((m) => (
            <Link
              key={m.id}
              to={`/market/${m.id}`}
              className="rounded-full border border-[var(--color-border)] px-4 py-2 text-sm font-bold text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
              style={{ borderColor: m.color }}
            >
              {m.name}
            </Link>
          ))}
        </div>

        <p className="text-sm text-[var(--color-muted)]">
          누구의 Career Stock을 볼까요? 위 탭을 눌러 선택하세요.
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="mb-2 font-mono text-xs tracking-widest text-[var(--color-brand)]">
        CAREER MARKET
      </p>
      <h1 className="mb-6 text-2xl font-black sm:text-3xl">MY CAREER STOCK</h1>

      <div className="mb-8 flex flex-wrap gap-2 border-b border-[var(--color-border)] pb-4">
        {members.map((m) => {
          const isActive = m.id === active.id
          return (
            <button
              key={m.id}
              onClick={() => navigate(`/market/${m.id}`)}
              style={isActive ? { backgroundColor: m.color } : undefined}
              className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                isActive
                  ? 'text-[color:var(--color-on-brand)]'
                  : 'border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-ink)]'
              }`}
            >
              {m.name}
            </button>
          )
        })}
      </div>

      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-[var(--color-ink)]">{active.name}</h2>
          <p className="text-sm text-[var(--color-muted)]">{active.role}</p>
        </div>
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-black tabular" style={{ color: active.color }}>
            {currentPrice}
          </span>
          <Delta value={totalChange} size="md" />
        </div>
      </div>

      <div className="mb-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6">
        <JournalChart series={series} height={320} color={active.color} />
      </div>

      <div className="mb-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-6">
        <h3 className="mb-1 text-base font-bold text-[var(--color-ink)]">
          Today&apos;s Career Check
        </h3>
        <p className="mb-5 text-sm text-[var(--color-muted)]">
          새로운 산업 · 직무 · 연구환경을 경험했다면 지금 기록하세요.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="place" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[var(--color-muted)]">
              오늘 경험한 곳
            </label>
            <div className="relative">
              <select
                id="place"
                value={placeOption}
                onChange={(e) => setPlaceOption(e.target.value)}
                className="w-full appearance-none rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-2.5 pr-9 text-sm text-[var(--color-ink)] focus:border-[var(--color-brand)] focus:outline-none"
              >
                <option value="" disabled>
                  장소를 선택하세요
                </option>
                {countries.map((c) => (
                  <optgroup key={c.id} label={`${c.flag} ${c.nameKo}`}>
                    {institutionsByCountry(c.id).map((i) => (
                      <option key={i.id} value={i.id}>
                        {i.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
                <option value="custom">✏️ 직접 입력</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]">
                ▾
              </span>
            </div>
            {placeOption === 'custom' && (
              <input
                autoFocus
                value={customPlace}
                onChange={(e) => setCustomPlace(e.target.value)}
                placeholder="예: Google Amsterdam Office"
                className="mt-2 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-brand)] focus:outline-none"
              />
            )}
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label htmlFor="delta" className="text-xs font-bold uppercase tracking-wide text-[var(--color-muted)]">
                관심도가 얼마나 변했나요? (10 단위)
              </label>
              <Delta value={delta} size="md" />
            </div>
            <input
              id="delta"
              type="range"
              min={DELTA_MIN}
              max={DELTA_MAX}
              step={DELTA_STEP}
              value={delta}
              onChange={(e) => setDelta(clampDelta(Number(e.target.value)))}
              style={{ accentColor: active.color }}
              className="w-full"
            />
            <div className="mt-1 flex justify-between text-[10px] tabular text-[var(--color-muted)]">
              <span>{DELTA_MIN}</span>
              <span>0</span>
              <span>+{DELTA_MAX}</span>
            </div>
          </div>

          <div>
            <label htmlFor="why" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[var(--color-muted)]">
              왜 변했나요?
            </label>
            <textarea
              id="why"
              value={why}
              onChange={(e) => setWhy(e.target.value)}
              rows={3}
              placeholder="어떤 경험이 관심도를 움직였는지 적어보세요."
              className="w-full resize-none rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-brand)] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            style={{ backgroundColor: active.color }}
            className="w-full rounded-lg py-2.5 text-sm font-bold text-[color:var(--color-on-brand)] transition-transform hover:scale-[1.01]"
          >
            기록 저장
          </button>
        </form>
      </div>

      <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-[var(--color-muted)]">
        Career Timeline
      </h3>
      <div className="space-y-3">
        {timeline.length === 0 && (
          <p className="text-sm text-[var(--color-muted)]">아직 기록된 경험이 없습니다.</p>
        )}
        {timeline.map((point) => (
          <div
            key={point.id}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
          >
            <div className="mb-1 flex items-start justify-between gap-3">
              <span className="text-sm font-semibold text-[var(--color-ink)]">{point.place}</span>
              <div className="flex items-center gap-2">
                <Delta value={point.delta} size="sm" />
                <span className="text-xs tabular text-[var(--color-muted)]">→ {point.price}</span>
                {point.id.startsWith('entry-') && (
                  <button
                    onClick={() => handleDelete(point.id)}
                    aria-label="기록 삭제"
                    className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-down)]"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
            {point.why && (
              <p className="text-sm leading-relaxed text-[var(--color-muted)]">{point.why}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
