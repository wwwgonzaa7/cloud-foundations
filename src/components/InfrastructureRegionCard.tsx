import { Activity, Boxes, MapPin, Server } from 'lucide-react'
import type { InfrastructureRegion } from '../data/infrastructure'
import { cn } from '../utils/cn'
import { StatusBadge } from './StatusBadge'

interface InfrastructureRegionCardProps {
  region: InfrastructureRegion
  isSelected: boolean
  onSelect: () => void
}

function statusTone(status: InfrastructureRegion['status']) {
  if (status === 'Operativa') return 'success' as const
  if (status === 'Atención') return 'warning' as const
  return 'danger' as const
}

export function InfrastructureRegionCard({ region, isSelected, onSelect }: InfrastructureRegionCardProps) {
  return (
    <button
      type="button"
      aria-pressed={isSelected}
      aria-label={`Ver detalles de la región ${region.code}`}
      onClick={onSelect}
      className={cn(
        'group flex h-full w-full flex-col rounded-xl border bg-white p-4 text-left shadow-sm outline-none transition duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-panel focus-visible:ring-4 focus-visible:ring-primary/15',
        isSelected ? 'border-primary ring-2 ring-primary/10' : 'border-border',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-white">
            <MapPin size={18} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{region.code}</p>
            <h3 className="mt-1 truncate text-base font-semibold text-ink">{region.name}</h3>
          </div>
        </div>
        <StatusBadge label={region.status} tone={statusTone(region.status)} compact />
      </div>

      <p className="mt-4 flex items-center gap-2 text-xs text-muted"><Activity size={14} aria-hidden="true" />{region.location}</p>
      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4">
        <div>
          <p className="flex items-center gap-1.5 text-xs text-muted"><Server size={13} aria-hidden="true" />Recursos</p>
          <p className="mt-1 text-lg font-semibold text-ink">{region.resources}</p>
        </div>
        <div>
          <p className="flex items-center gap-1.5 text-xs text-muted"><Activity size={13} aria-hidden="true" />Latencia</p>
          <p className="mt-1 text-lg font-semibold text-ink">{region.latency}</p>
        </div>
      </div>
      <div className="mt-4 flex items-start gap-2 border-t border-border pt-4">
        <Boxes size={14} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
        <div className="flex flex-wrap gap-1.5">
          {region.services.map((service) => <span key={service} className="rounded bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600">{service}</span>)}
        </div>
      </div>
    </button>
  )
}
