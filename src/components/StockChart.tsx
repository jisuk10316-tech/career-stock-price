import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from 'recharts'

export const STOCK_PALETTE = [
  '#f0b429', // gold
  '#3ec9c9', // teal
  '#c084fc', // purple
  '#fb7185', // pink
  '#60a5fa', // sky
  '#a3e635', // lime
]

interface Series {
  symbol: string
  label: string
  color?: string
}

interface StockChartProps {
  data: Record<string, string | number | null>[]
  series: Series[]
  height?: number
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-2 shadow-xl">
      <p className="mb-1 text-xs font-medium text-[var(--color-muted)]">{label}</p>
      <div className="space-y-0.5">
        {payload
          .filter((p: any) => p.value !== null && p.value !== undefined)
          .map((p: any) => (
            <div key={p.dataKey} className="flex items-center gap-2 text-xs">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: p.color }}
              />
              <span className="text-[var(--color-ink)]">{p.name}</span>
              <span className="tabular font-semibold" style={{ color: p.color }}>
                {p.value}
              </span>
            </div>
          ))}
      </div>
    </div>
  )
}

export default function StockChart({ data, series, height = 320 }: StockChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 12, left: -12, bottom: 8 }}>
        <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="label"
          stroke="var(--color-muted)"
          tick={{ fontSize: 11, fill: 'var(--color-muted)' }}
          interval="preserveStartEnd"
          tickLine={false}
        />
        <YAxis
          stroke="var(--color-muted)"
          tick={{ fontSize: 11, fill: 'var(--color-muted)' }}
          tickLine={false}
          axisLine={false}
          domain={['dataMin - 10', 'dataMax + 10']}
        />
        <ReferenceLine y={100} stroke="var(--color-muted)" strokeDasharray="4 4" />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 12, color: 'var(--color-muted)' }} />
        {series.map((s, i) => (
          <Line
            key={s.symbol}
            type="monotone"
            dataKey={s.symbol}
            name={s.label}
            stroke={s.color ?? STOCK_PALETTE[i % STOCK_PALETTE.length]}
            strokeWidth={2.5}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
            connectNulls={false}
            isAnimationActive={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}
