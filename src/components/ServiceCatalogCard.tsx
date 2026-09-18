import { Activity, CheckCircle2, ShieldCheck } from 'lucide-react'
import type { AwsService } from '../data/services'
import { cn } from '../utils/cn'
import { StatusBadge } from './StatusBadge'

interface ServiceCatalogCardProps {
  service: AwsService
  isSelected: boolean
  onSelect: () => void
}

export function ServiceCatalogCard({ service, isSelected, onSelect }: ServiceCatalogCardProps) {
  const Icon = service.icon
  const isUsed = service.usage === 'En uso'

  return (
    <button
      type="button"
      aria-label={`Ver detalles de ${service.name}`}
      aria-pressed={isSelected}
      onClick={onSelect}
      className={cn(
        'filter-result tech-frame group flex h-full w-full flex-col rounded-xl border bg-white p-4 text-left shadow-sm outline-none transition duration-200 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-panel focus-visible:ring-4 focus-visible:ring-primary/15 sm:p-5',
        isSelected ? 'border-primary ring-2 ring-primary/10' : 'border-border',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors duration-200', isSelected ? 'bg-primary text-white' : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white')}>
          <Icon size={19} aria-hidden="true" />
        </span>
        <StatusBadge label={service.usage} tone={isUsed ? 'success' : 'neutral'} compact icon={isUsed ? <CheckCircle2 size={14} aria-hidden="true" /> : <Activity size={14} aria-hidden="true" />} />
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-3">
        <h3 className="text-base font-semibold text-ink">{service.name}</h3>
        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">{service.category}</span>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-700">{service.description}</p>
      <div className="mt-auto border-t border-border pt-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-muted">Función principal</p>
        <p className="mt-1 flex items-center gap-2 text-sm font-medium text-ink"><ShieldCheck size={14} className="text-primary" aria-hidden="true" />{service.primaryFunction}</p>
      </div>
    </button>
  )
}
