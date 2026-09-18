import { Activity, Boxes, Globe2, Server } from 'lucide-react'
import { StatusBadge } from './StatusBadge'
import { dashboardRegion } from '../data/dashboard'

interface RegionCardProps {
  region: typeof dashboardRegion
}

export function RegionCard({ region }: RegionCardProps) {
  return (
    <article className="tech-frame relative overflow-hidden rounded-2xl border border-border bg-sidebar p-5 text-white shadow-sm sm:p-6">
      <div className="absolute right-0 top-0 h-32 w-32 translate-x-1/3 -translate-y-1/3 rounded-full border-[18px] border-primary/10" aria-hidden="true" />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            <Globe2 className="h-4 w-4 text-primary" aria-hidden="true" />
            <span>Región activa</span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <h3 className="text-2xl font-semibold tracking-tight">{region.code}</h3>
            <span className="text-sm text-slate-400">· {region.name}</span>
          </div>
          <p className="mt-1 text-sm text-slate-400">{region.location}</p>
        </div>
        <StatusBadge label={region.status} detail="Saludable" compact />
      </div>
      <div className="relative mt-7 grid grid-cols-2 gap-3 border-t border-white/10 pt-4">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06] text-primary"><Boxes className="h-4 w-4" aria-hidden="true" /></span>
          <div><p className="text-lg font-semibold">{region.services}</p><p className="text-[11px] text-slate-400">Servicios desplegados</p></div>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06] text-security"><Server className="h-4 w-4" aria-hidden="true" /></span>
          <div><p className="text-lg font-semibold">{region.resources}</p><p className="text-[11px] text-slate-400">Recursos activos</p></div>
        </div>
      </div>
      <div className="relative mt-4 flex items-center gap-2 text-xs text-slate-400">
        <Activity className="h-3.5 w-3.5 text-security" aria-hidden="true" />
        <span>{region.statusDetail}</span>
      </div>
    </article>
  )
}
