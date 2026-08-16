import { Link } from 'react-router-dom'
import { getCareerNews } from '../data/insights'
import { loadAllEntries, START_PRICE } from '../data/journal-store'

export default function News() {
  const news = getCareerNews(loadAllEntries(), 20)

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="mb-2 font-mono text-xs tracking-widest text-[var(--color-brand)]">
        CAREER NEWS
      </p>
      <h1 className="mb-2 text-2xl font-black sm:text-3xl">진로 시장 속보</h1>
      <p className="mb-10 text-sm text-[var(--color-muted)]">
        크게 움직인 진로 관심도를 뉴스처럼 정리했습니다. 하락도 실패가 아니라{' '}
        <span className="text-[var(--color-ink)]">직접 경험했기 때문에 알게 된 진로 정보</span>
        입니다.
      </p>

      {news.length === 0 ? (
        <p className="text-sm text-[var(--color-muted)]">
          아직 크게 움직인 기록이 없습니다. Career Market에서 경험을 기록해보세요.
        </p>
      ) : (
        <div className="space-y-4">
          {news.map((n, i) => {
            const isUp = n.delta > 0
            const pct = Math.round((n.delta / START_PRICE) * 1000) / 10
            return (
              <article
                key={`${n.id}-${i}`}
                className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
              >
                <div className="mb-2 flex items-center gap-2 text-xs font-bold">
                  <span
                    className={
                      isUp
                        ? 'flex items-center gap-1 text-[var(--color-up)]'
                        : 'flex items-center gap-1 text-[var(--color-down)]'
                    }
                  >
                    <span className="inline-block h-2 w-2 rounded-full bg-current" />
                    {isUp ? 'CAREER BREAKING NEWS' : 'CAREER MARKET NEWS'}
                  </span>
                  <span className="text-[var(--color-muted)]">
                    {n.countryFlag} {n.place}
                  </span>
                </div>
                <h2 className="mb-2 text-lg font-bold text-[var(--color-ink)]">
                  <Link to={`/market/${n.memberId}`} className="hover:text-[var(--color-brand)]">
                    {n.memberName}의 진로 관심도
                  </Link>{' '}
                  <span className={isUp ? 'text-[var(--color-up)]' : 'text-[var(--color-down)]'}>
                    {isUp ? '급등' : '조정'} {isUp ? '+' : ''}
                    {pct}%
                  </span>
                </h2>
                <p className="text-sm leading-relaxed text-[var(--color-muted)]">
                  {n.place} 방문 이후 관심도가{' '}
                  {isUp ? '크게 상승했습니다.' : '경험을 바탕으로 조정되었습니다.'} {n.why}
                </p>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
