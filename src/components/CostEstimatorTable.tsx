import { Minus, Plus, Trash2 } from 'lucide-react'
import type { CostEstimateItem, CostServiceCatalogItem } from '../data/costs'
import { calculateMonthlyCost } from '../data/costs'
import { formatUSD } from '../utils/currency'

interface CostEstimatorTableProps {
  items: CostEstimateItem[]
  catalog: CostServiceCatalogItem[]
  onUpdate: (serviceId: string, field: 'quantity' | 'hours', value: number) => void
  onRemove: (serviceId: string) => void
}

export function CostEstimatorTable({ items, catalog, onUpdate, onRemove }: CostEstimatorTableProps) {
  return (
    <article className="tech-frame rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4 sm:px-6">
        <div><h3 className="font-semibold text-ink">Servicios en la estimación</h3><p className="mt-0.5 text-xs text-muted">Ajusta la escala de cada servicio para recalcular el total.</p></div>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-muted">{items.length} {items.length === 1 ? 'servicio' : 'servicios'}</span>
      </div>
      {items.length === 0 ? (
        <div className="flex min-h-[240px] flex-col items-center justify-center px-6 py-10 text-center"><div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/15 bg-primary/5 text-primary"><Plus className="h-6 w-6" aria-hidden="true" /></div><h4 className="mt-4 font-semibold text-ink">Aún no hay servicios agregados</h4><p className="mt-2 max-w-sm text-sm leading-6 text-muted">Selecciona un servicio arriba para comenzar a construir la estimación.</p></div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-[760px] w-full text-left">
            <caption className="sr-only">Servicios agregados a la estimación de costos</caption>
            <thead><tr className="border-b border-border bg-slate-50/70 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted"><th className="px-5 py-3 sm:px-6">Servicio</th><th className="px-3 py-3">Cantidad</th><th className="px-3 py-3">Horas estimadas</th><th className="px-3 py-3">Tarifa simulada</th><th className="px-3 py-3">Costo mensual</th><th className="px-5 py-3 sm:px-6"><span className="sr-only">Acciones</span></th></tr></thead>
            <tbody className="divide-y divide-border">
              {items.map((item) => {
                const service = catalog.find((entry) => entry.id === item.serviceId)
                if (!service) return null
                const Icon = service.icon
                return (
                  <tr key={item.serviceId} className="align-middle transition-colors hover:bg-slate-50/60">
                    <td className="px-5 py-4 sm:px-6"><div className="flex items-center gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon className="h-4 w-4" aria-hidden="true" /></span><div><p className="text-sm font-semibold text-ink">{service.name}</p><p className="text-xs text-muted">{service.category}</p></div></div></td>
                    <td className="px-3 py-4"><label className="sr-only" htmlFor={`${item.serviceId}-quantity`}>Cantidad de {service.name}</label><div className="flex items-center"><button type="button" onClick={() => onUpdate(item.serviceId, 'quantity', Math.max(1, item.quantity - 1))} className="flex h-8 w-8 items-center justify-center rounded-l-md border border-border bg-slate-50 text-muted transition hover:bg-slate-100 hover:text-primary" aria-label={`Reducir cantidad de ${service.name}`}><Minus className="h-3.5 w-3.5" /></button><input id={`${item.serviceId}-quantity`} type="number" min="1" step="1" value={item.quantity} onChange={(event) => onUpdate(item.serviceId, 'quantity', Math.max(1, Number(event.target.value) || 1))} className="h-8 w-14 border-y border-border bg-white text-center text-sm font-medium text-ink outline-none focus:border-primary" /><button type="button" onClick={() => onUpdate(item.serviceId, 'quantity', item.quantity + 1)} className="flex h-8 w-8 items-center justify-center rounded-r-md border border-border bg-slate-50 text-muted transition hover:bg-slate-100 hover:text-primary" aria-label={`Aumentar cantidad de ${service.name}`}><Plus className="h-3.5 w-3.5" /></button></div></td>
                    <td className="px-3 py-4"><label className="sr-only" htmlFor={`${item.serviceId}-hours`}>Horas estimadas de {service.name}</label><div className="flex items-center gap-2"><input id={`${item.serviceId}-hours`} type="number" min="1" step="1" value={item.hours} onChange={(event) => onUpdate(item.serviceId, 'hours', Math.max(1, Number(event.target.value) || 1))} className="h-8 w-24 rounded-md border border-border bg-white px-2 text-sm font-medium text-ink outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10" /><span className="text-xs text-muted">h/mes</span></div></td>
                    <td className="px-3 py-4"><p className="text-sm font-medium text-ink">{formatUSD(service.unitRate)}</p><p className="text-[11px] text-muted">por recurso/hora</p></td>
                    <td className="px-3 py-4"><p className="text-sm font-semibold text-ink">{formatUSD(calculateMonthlyCost(item, service))}</p><p className="text-[11px] text-muted">estimado</p></td>
                    <td className="px-5 py-4 text-right sm:px-6"><button type="button" onClick={() => onRemove(item.serviceId)} className="rounded-md p-2 text-muted transition hover:bg-alerts/5 hover:text-alerts focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alerts" aria-label={`Eliminar ${service.name} de la estimación`} title={`Eliminar ${service.name}`}><Trash2 className="h-4 w-4" /></button></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </article>
  )
}
