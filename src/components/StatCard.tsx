import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react'
import type { DashboardMetric } from '../data/dashboard'
import { cn } from '../utils/cn'

interface StatCardProps {
  metric: DashboardMetric
}

const toneStyles = {
  primary: {
    icon: 'bg-primary/10 text-primary',
    accent: 'bg-primary',
    value: 'text-ink',
  },
  success: {
    icon: 'bg-security/10 text-security',
    accent: 'bg-security',
    value: 'text-security',
  },
  warning: {
    icon: 'bg-costs/10 text-[#B45309]',
    accent: 'bg-costs',
    value: 'text-ink',
  },
  danger: {
    icon: 'bg-alerts/10 text-alerts',
    accent: 'bg-alerts',
    value: 'text-alerts',
  },
}

export function StatCard({ metric }: StatCardProps) {
  const Icon = metric.icon
  const tone = toneStyles[metric.tone]
  const TrendIcon = metric.secondary.startsWith('+') ? ArrowUpRight : metric.secondary.startsWith('−') ? ArrowDownRight : Minus

  return (
    <article className="tech-frame group relative overflow-hidden rounded-xl border border-border bg-card p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md sm:p-5">
      <span className={cn('absolute inset-x-0 top-0 h-0.5 opacity-70', tone.accent)} aria-hidden="true" />
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="tech-label text-[10px] font-semibold uppercase leading-5">{metric.label}</p>
          <p className={cn('metric-value mt-3 text-2xl font-semibold tracking-tight sm:text-3xl', tone.value)}>{metric.value}</p>
        </div>
        <span className={cn('metric-icon flex h-9 w-9 shrink-0 items-center justify-center rounded-lg', tone.icon)}>
          <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
        </span>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px]">
        <span className="text-muted">{metric.helper}</span>
        <span className={cn('inline-flex items-center gap-0.5 font-medium', metric.secondary.startsWith('−') ? 'text-security' : metric.secondary.startsWith('+') ? 'text-primary' : 'text-muted')}>
          <span aria-hidden="true"><TrendIcon className="h-3 w-3" /></span>
          {metric.secondary}
        </span>
      </div>
    </article>
  )
}
