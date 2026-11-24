import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts'
import type { SeriesPoint } from '../data/journal-store'
import { START_PRICE } from '../data/journal-store'

interface JournalChartProps {
  series: SeriesPoint[]
  height?: number
  /** Accent color, e.g. a member's identity color. Defaults to the brand color. */
  color?: string
}

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  const point: SeriesPoint = payload[0].payload
  const isUp = point.delta > 0
  const isFlat = point.delta === 0
  const color = isFlat ? 'var(--color-muted)' : isUp ? 'var(--color-up)' : 'var(--color-down)'
  return (
    <div className="max-w-64 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-2 shadow-xl">
      <p className="mb-1 text-xs font-semibold text-[var(--color-ink)]">{point.place}</p>
      <p className="mb-1 text-sm font-bold tabular" style={{ color }}>
        {point.price}
        <span className="ml-1.5 text-xs">
          ({isFlat ? '―' : isUp ? '▲' : '▼'} {isFlat ? '' : isUp ? '+' : ''}
          {point.delta})
        </span>
      </p>
      {point.why && <p className="text-xs leading-relaxed text-[var(--color-muted)]">{point.why}</p>}
    </div>
  )
}

function EndDot(props: any) {
  const { cx, cy, index, dataLength, accent } = props
  if (index !== dataLength - 1) return null
  return <circle cx={cx} cy={cy} r={5} fill={accent} stroke="var(--color-surface)" strokeWidth={2} />
}

/** Long place names would otherwise overflow the chart edges — clip with an ellipsis. */
function truncateLabel(text: string, max = 6) {
  return text.length > max ? `${text.slice(0, max)}…` : text
}

function XAxisTick({ x, y, payload, index, visibleTicksCount }: any) {
  const isFirst = index === 0
  const isLast = index === visibleTicksCount - 1
  const anchor = isFirst ? 'start' : isLast ? 'end' : 'middle'
  return (
    <text
      x={x}
      y={y + 12}
      textAnchor={anchor}
      fontSize={11}
      fill="var(--color-muted)"
    >
      {truncateLabel(payload.value)}
    </text>
  )
}

export default function JournalChart({ series, height = 320, color }: JournalChartProps) {
  const accent = color ?? 'var(--color-brand)'
  const gradientId = `journalFill-${accent.replace(/[^a-zA-Z0-9]/g, '')}`
  const data = [
    { place: '출국', price: START_PRICE, delta: 0, why: undefined },
    ...series,
  ]

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 4, left: 4, bottom: 8 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity={0.35} />
            <stop offset="100%" stopColor={accent} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="place"
          stroke="var(--color-muted)"
          tick={<XAxisTick />}
          interval="preserveStartEnd"
          tickLine={false}
        />
        <YAxis
          stroke="var(--color-muted)"
          tick={{ fontSize: 11, fill: 'var(--color-muted)' }}
          tickLine={false}
          axisLine={false}
          width={34}
          domain={['dataMin - 10', 'dataMax + 10']}
        />
        <ReferenceLine y={START_PRICE} stroke="var(--color-muted)" strokeDasharray="4 4" />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="price"
          stroke={accent}
          strokeWidth={3}
          fill={`url(#${gradientId})`}
          isAnimationActive={false}
          dot={(props: any) => (
            <EndDot key={props.index} {...props} dataLength={data.length} accent={accent} />
          )}
          activeDot={{ r: 6, fill: accent, stroke: 'var(--color-surface)', strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
