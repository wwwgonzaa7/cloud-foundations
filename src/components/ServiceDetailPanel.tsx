import { Activity, CheckCircle2, ShieldCheck } from 'lucide-react'
import type { AwsService } from '../data/services'
import { StatusBadge } from './StatusBadge'

interface ServiceDetailPanelProps {
  service: AwsService
}

export function ServiceDetailPanel({ service }: ServiceDetailPanelProps) {
  const Icon = service.icon
  const isUsed = service.usage === 'En uso'

  return (
    <aside className="detail-panel min-w-0 rounded-2xl border border-slate-800 bg-ink p-5 text-white shadow-panel sm:p-6" aria-labelledby="servicio-seleccionado-title">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Servicio seleccionado</p>
          <h2 id="servicio-seleccionado-title" className="mt-2 text-2xl font-semibold tracking-tight">{service.name}</h2>
          <p className="mt-1 text-sm text-slate-400">{service.category}</p>
        </div>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-blue-300"><Icon size={20} aria-hidden="true" /></span>
      </div>

      <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
        <StatusBadge label={service.usage} detail={service.usageDetail} tone={isUsed ? 'success' : 'neutral'} icon={isUsed ? <CheckCircle2 size={14} aria-hidden="true" /> : <Activity size={14} aria-hidden="true" />} />
      </div>

      <div className="mt-6 space-y-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Descripción</p>
          <p className="mt-2 text-sm leading-6 text-slate-200">{service.description}</p>
        </div>
        <div className="border-t border-white/10 pt-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Función principal</p>
          <p className="mt-2 flex items-center gap-2 text-sm font-medium text-white"><ShieldCheck size={15} className="text-blue-300" aria-hidden="true" />{service.primaryFunction}</p>
        </div>
      </div>

      <p className="mt-8 border-t border-white/10 pt-4 text-xs leading-5 text-slate-400">Información local de referencia. Este catálogo no consulta ni administra servicios reales de AWS.</p>
    </aside>
  )
}
