interface DeltaProps {
  value: number
  size?: 'sm' | 'md' | 'lg'
  showSign?: boolean
}

const sizeClasses = {
  sm: 'text-xs px-1.5 py-0.5 gap-0.5',
  md: 'text-sm px-2 py-1 gap-1',
  lg: 'text-base px-2.5 py-1 gap-1',
}

export default function Delta({ value, size = 'md', showSign = true }: DeltaProps) {
  const isUp = value > 0
  const isFlat = value === 0
  const color = isFlat
    ? 'text-[var(--color-muted)] bg-white/5'
    : isUp
      ? 'text-[var(--color-up)] bg-[var(--color-up)]/10'
      : 'text-[var(--color-down)] bg-[var(--color-down)]/10'
  const arrow = isFlat ? '―' : isUp ? '▲' : '▼'

  return (
    <span
      className={`inline-flex items-center rounded font-semibold tabular ${sizeClasses[size]} ${color}`}
    >
      {arrow} {showSign && !isFlat ? (isUp ? '+' : '') : ''}
      {value}
    </span>
  )
}

export function priceColor(value: number) {
  if (value === 0) return 'text-[var(--color-muted)]'
  return value > 0 ? 'text-[var(--color-up)]' : 'text-[var(--color-down)]'
}
