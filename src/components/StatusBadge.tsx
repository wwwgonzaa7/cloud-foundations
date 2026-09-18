import { CheckCircle2, CircleAlert, CircleDot } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '../utils/cn'

type StatusTone = 'success' | 'warning' | 'danger' | 'neutral'

interface StatusBadgeProps {
  label: string
  detail?: string
  tone?: StatusTone
  icon?: ReactNode
  compact?: boolean
}

const toneStyles: Record<StatusTone, string> = {
  success: 'border-security/20 bg-security/5 text-security',
  warning: 'border-costs/25 bg-costs/5 text-[#B45309]',
  danger: 'border-alerts/20 bg-alerts/5 text-alerts',
  neutral: 'border-border bg-slate-50 text-muted',
}

const toneIcons: Record<StatusTone, typeof CheckCircle2> = {
  success: CheckCircle2,
  warning: CircleAlert,
  danger: CircleAlert,
  neutral: CircleDot,
}

export function StatusBadge({ label, detail, tone = 'success', icon, compact = false }: StatusBadgeProps) {
  const Icon = toneIcons[tone]

  return (
    <div
      className={cn(
        'status-badge inline-flex items-center gap-2 rounded-full border font-medium',
        compact ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm',
        toneStyles[tone],
      )}
      role="status"
      aria-label={detail ? `${label}. ${detail}` : label}
    >
      <span aria-hidden="true">{icon ?? <Icon className={compact ? 'h-3.5 w-3.5' : 'h-4 w-4'} />}</span>
      <span>{label}</span>
      {detail && <span className="hidden font-normal text-muted sm:inline">· {detail}</span>}
    </div>
  )
}
