import { CheckCircle2, CircleAlert, Database, Fingerprint, KeyRound, LockKeyhole, ShieldCheck, TriangleAlert, UserRound, Users, ArrowLeftRight } from 'lucide-react'
import type { SecurityIconName, SecurityIndicator, SecurityState } from '../data/security'
import { cn } from '../utils/cn'
import { StatusBadge } from './StatusBadge'

interface SecurityIndicatorCardProps {
  indicator: SecurityIndicator
  compact?: boolean
}

const iconMap: Record<SecurityIconName, typeof ShieldCheck> = {
  access: LockKeyhole,
  account: ShieldCheck,
  authentication: Fingerprint,
  compliance: CheckCircle2,
  data: Database,
  encryption: KeyRound,
  identity: UserRound,
  permissions: LockKeyhole,
  roles: Users,
  transit: ArrowLeftRight,
}

function statusTone(state: SecurityState) {
  if (state === 'Seguro') return 'success' as const
  if (state === 'Atención') return 'warning' as const
  return 'danger' as const
}

function statusIcon(state: SecurityState) {
  if (state === 'Seguro') return <CheckCircle2 size={14} aria-hidden="true" />
  if (state === 'Atención') return <CircleAlert size={14} aria-hidden="true" />
  return <TriangleAlert size={14} aria-hidden="true" />
}

export function SecurityIndicatorCard({ indicator, compact = false }: SecurityIndicatorCardProps) {
  const Icon = iconMap[indicator.icon]

  return (
    <article className={cn('tech-frame rounded-xl border border-border bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-panel', compact ? 'p-4' : 'p-5')}>
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon size={19} aria-hidden="true" />
        </span>
        <StatusBadge label={indicator.state} tone={statusTone(indicator.state)} icon={statusIcon(indicator.state)} compact />
      </div>
      <h3 className="mt-4 text-sm font-semibold text-ink">{indicator.title}</h3>
      <p className="mt-2 text-sm font-medium text-slate-700">{indicator.summary}</p>
      <p className="mt-1 text-xs leading-5 text-muted">{indicator.detail}</p>
    </article>
  )
}
