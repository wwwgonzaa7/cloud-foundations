import { BarChart3, TrendingUp } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, type TooltipContentProps } from 'recharts'
import type { CostDistributionItem } from '../data/dashboard'
import { dashboardTotals } from '../data/dashboard'

interface CostCardProps {
  distribution: CostDistributionItem[]
}

function CostTooltip({ active, payload }: TooltipContentProps) {
  if (!active || !payload?.length) return null
  const entry = payload[0]
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 text-xs shadow-lg">
      <p className="font-semibold text-ink">{entry.payload.service}</p>
      <p className="mt-1 text-muted">US$ {Number(entry.value).toFixed(2)}</p>
    </div>
  )
}

export function CostCard({ distribution }: CostCardProps) {
  return (
    <article className="tech-frame overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            <BarChart3 className="h-4 w-4 text-costs" aria-hidden="true" />
            <span>Resumen de costos</span>
          </div>
          <h3 className="mt-2 text-lg font-semibold tracking-tight text-ink">Proyección Cloud</h3>
        </div>
        <span className="rounded-lg bg-costs/10 px-2.5 py-1.5 text-xs font-semibold text-[#B45309]">Estimado</span>
      </div>
      <div className="grid gap-4 px-5 py-5 sm:grid-cols-2 sm:px-6">
        <div className="rounded-xl border border-border bg-slate-50/70 p-4">
          <p className="text-xs text-muted">Costo mensual estimado</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-ink">{dashboardTotals.monthlyCost}</p>
          <p className="mt-2 flex items-center gap-1 text-xs font-medium text-security"><TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />Dentro del presupuesto</p>
        </div>
        <div className="rounded-xl border border-border bg-slate-50/70 p-4">
          <p className="text-xs text-muted">Costo anual estimado</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-ink">{dashboardTotals.annualCost}</p>
          <p className="mt-2 text-xs text-muted">Proyección de 12 meses</p>
        </div>
      </div>
      <div className="px-3 pb-5 sm:px-6">
        <div className="mb-3 flex items-center justify-between px-2">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Distribución por servicio</p>
          <p className="text-[11px] text-muted">USD / mes</p>
        </div>
        <div className="chart-plot h-[230px] w-full" aria-label="Gráfico de distribución estimada por servicio">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={distribution} margin={{ top: 8, right: 4, left: 4, bottom: 4 }}>
              <defs>
                <linearGradient id="dashboard-cost-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#67E8F9" stopOpacity={0.24} />
                  <stop offset="100%" stopColor="#67E8F9" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#294252" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="service" tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(value) => `US$${value}`} width={48} />
              <Tooltip content={CostTooltip} cursor={{ fill: 'rgba(103, 232, 249, 0.08)' }} />
              <Area type="monotone" dataKey="amount" stroke="#67E8F9" strokeWidth={2.5} fill="url(#dashboard-cost-fill)" name="Costo estimado" isAnimationActive animationBegin={40} animationDuration={520} animationEasing="ease-out" dot={{ r: 3, fill: '#67E8F9', stroke: '#0B1118', strokeWidth: 2 }} activeDot={{ r: 5, fill: '#FFFFFF', stroke: '#67E8F9', strokeWidth: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-border pt-3 sm:grid-cols-5">
          {distribution.map((item) => (
            <div key={item.service} className="flex items-center gap-1.5 text-xs">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} aria-hidden="true" />
              <span className="text-muted">{item.service}</span>
              <span className="ml-auto font-medium text-ink">{item.amount.toFixed(0)}</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}
