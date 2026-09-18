import { BarChart3 } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, type TooltipContentProps } from 'recharts'
import { formatUSD } from '../utils/currency'

export interface CostChartItem {
  service: string
  amount: number
  color: string
}

function CostTooltip({ active, payload }: TooltipContentProps) {
  if (!active || !payload?.length) return null
  const entry = payload[0]
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 text-xs shadow-lg">
      <p className="font-semibold text-ink">{entry.payload.service}</p>
      <p className="mt-1 text-muted">{formatUSD(Number(entry.value))} / mes</p>
    </div>
  )
}

export function CostDistributionChart({ data }: { data: CostChartItem[] }) {
  return (
    <article className="tech-frame rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4 sm:px-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted"><BarChart3 className="h-4 w-4 text-primary" aria-hidden="true" /><span>Distribución de costos</span></div>
          <h3 className="mt-2 text-lg font-semibold tracking-tight text-ink">Costo mensual por servicio</h3>
        </div>
        <span className="rounded-lg bg-primary/10 px-2.5 py-1.5 text-xs font-semibold text-primary">Simulado</span>
      </div>
      <div className="px-4 py-5 sm:px-6">
        {data.length === 0 ? (
          <div className="flex min-h-[260px] items-center justify-center rounded-xl border border-dashed border-border bg-slate-50/70 px-6 text-center text-sm text-muted">Agrega servicios para visualizar la distribución del costo.</div>
        ) : (
          <>
            <div className="chart-plot h-[260px] w-full" aria-label="Gráfico de costo mensual estimado por servicio">
              <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} layout="vertical" margin={{ top: 8, right: 12, left: 4, bottom: 4 }}>
                  <defs>
                    <linearGradient id="cost-distribution-fill" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#2563EB" stopOpacity={0.72} />
                      <stop offset="100%" stopColor="#67E8F9" stopOpacity={0.96} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#294252" strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(value) => `US$${value}`} />
                  <YAxis type="category" dataKey="service" tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} width={68} />
                  <Tooltip content={CostTooltip} cursor={{ fill: 'rgba(103, 232, 249, 0.08)' }} />
                  <Bar dataKey="amount" radius={[0, 4, 4, 0]} fill="url(#cost-distribution-fill)" name="Costo mensual" isAnimationActive animationBegin={40} animationDuration={420} animationEasing="ease-out" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-border pt-3 sm:grid-cols-3">
              {data.map((item) => <div key={item.service} className="flex items-center gap-1.5 text-xs"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} aria-hidden="true" /><span className="text-muted">{item.service}</span><span className="ml-auto font-medium text-ink">{formatUSD(item.amount)}</span></div>)}
            </div>
          </>
        )}
      </div>
    </article>
  )
}
