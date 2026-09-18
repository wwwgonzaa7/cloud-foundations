import { CheckCircle2, CircleAlert, LockKeyhole } from 'lucide-react'
import { StatusBadge } from './StatusBadge'
import type { SecurityControl } from '../data/dashboard'
import { cn } from '../utils/cn'

interface SecurityCardProps {
  controls: SecurityControl[]
}

const statusTone = {
  Seguro: 'success',
  Atención: 'warning',
  Riesgo: 'danger',
} as const

export function SecurityCard({ controls }: SecurityCardProps) {
  return (
    <article className="tech-frame rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            <LockKeyhole className="h-4 w-4 text-security" aria-hidden="true" />
            <span>Seguridad</span>
          </div>
          <h3 className="mt-2 text-lg font-semibold tracking-tight text-ink">Postura de seguridad</h3>
        </div>
        <StatusBadge label="Seguro" detail="4 controles" compact />
      </div>
      <div className="divide-y divide-border px-5 sm:px-6">
        {controls.map((control) => {
          const isSafe = control.status === 'Seguro'
          return (
            <div key={control.label} className="flex items-center justify-between gap-3 py-3.5">
              <div className="flex min-w-0 items-center gap-3">
                <span className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-lg', isSafe ? 'bg-security/10 text-security' : 'bg-costs/10 text-[#B45309]')}>
                  {isSafe ? <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> : <CircleAlert className="h-4 w-4" aria-hidden="true" />}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink">{control.label}</p>
                  <p className="truncate text-xs text-muted">{control.detail}</p>
                </div>
              </div>
              <StatusBadge label={control.status} tone={statusTone[control.status]} compact />
            </div>
          )
        })}
      </div>
    </article>
  )
}
