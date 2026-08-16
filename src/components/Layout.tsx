import { NavLink, Outlet } from 'react-router-dom'

const links = [
  { to: '/', label: 'HOME', shortLabel: 'HOME', end: true },
  { to: '/journey', label: 'JOURNEY', shortLabel: 'JOURNEY' },
  { to: '/market', label: 'CAREER MARKET', shortLabel: 'MARKET' },
]

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 pt-[env(safe-area-inset-top)] backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <NavLink to="/" className="flex items-center gap-2 shrink-0">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-[var(--color-brand)] text-sm font-black text-[color:var(--color-on-brand)]">
              ₩
            </span>
            <span className="whitespace-nowrap font-mono text-sm font-bold tracking-tight text-[var(--color-ink)] sm:text-base">
              CAREER<span className="text-[var(--color-brand)]">STOCK</span>
            </span>
          </NavLink>
          <nav className="scroll-fade-right flex gap-1 overflow-x-auto text-xs font-medium sm:gap-2 sm:text-sm">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 transition-colors ${
                    isActive
                      ? 'bg-[var(--color-brand)] text-[color:var(--color-on-brand)]'
                      : 'text-[var(--color-muted)] hover:bg-white/5 hover:text-[var(--color-ink)]'
                  }`
                }
              >
                <span className="sm:hidden">{l.shortLabel}</span>
                <span className="hidden sm:inline">{l.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-[var(--color-border)] pt-8 pb-[calc(2rem+env(safe-area-inset-bottom))] text-center text-xs text-[var(--color-muted)]">
        <p>우리가 이동한 만큼, 진로도 움직인다</p>
        <p className="mt-1">France → Switzerland → Germany → Netherlands · Career Stock Price</p>
      </footer>
    </div>
  )
}
