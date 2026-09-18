import { Activity, Boxes, Cloud, Database, Server, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { StatusBadge } from '../components/StatusBadge'
import { GlobalInfrastructureMap } from '../components/GlobalInfrastructureMap'
import { InfrastructureRegionCard } from '../components/InfrastructureRegionCard'
import { infrastructureRegions, globalInfrastructureSummary, regionPresentation } from '../data/infrastructure'

function statusTone(status: (typeof infrastructureRegions)[number]['status']) {
  if (status === 'Operativa') return 'success' as const
  if (status === 'Atención') return 'warning' as const
  return 'danger' as const
}

export function InfrastructurePage() {
  const [selectedRegionId, setSelectedRegionId] = useState(infrastructureRegions[0].id)
  const selectedRegion = infrastructureRegions.find((region) => region.id === selectedRegionId) ?? infrastructureRegions[0]
  const selectedPresentation = regionPresentation[selectedRegion.id]

  return (
    <div className="module-page infrastructure-page mx-auto w-full max-w-[1600px] space-y-6">
      <section className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div className="max-w-3xl">
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <Cloud size={15} aria-hidden="true" />
            <span>Control de infraestructura</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">Infraestructura global</h1>
          <p className="mt-2 text-sm leading-6 text-muted sm:text-base">Observa la distribución de capacidad Cloud por región y revisa el estado operativo de cada despliegue.</p>
        </div>
        <StatusBadge label="Globo global" detail="Datos simulados" tone="neutral" icon={<GlobeIcon />} />
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Resumen global">
        <SummaryMetric icon={<Cloud size={17} />} label="Regiones" value={globalInfrastructureSummary.regions.toString()} detail="puntos desplegados" />
        <SummaryMetric icon={<Server size={17} />} label="Recursos" value={globalInfrastructureSummary.resources.toString()} detail="capacidad registrada" />
        <SummaryMetric icon={<Boxes size={17} />} label="Servicios AWS" value={globalInfrastructureSummary.services.toString()} detail="servicios distribuidos" />
        <SummaryMetric icon={<ShieldCheck size={17} />} label="Regiones operativas" value={`${globalInfrastructureSummary.operationalRegions}/${globalInfrastructureSummary.regions}`} detail="estado de disponibilidad" />
      </section>

      <section className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <GlobalInfrastructureMap regions={infrastructureRegions} selectedRegionId={selectedRegionId} onSelectRegion={setSelectedRegionId} />

        <aside key={selectedRegion.id} className="detail-panel min-w-0 rounded-2xl border border-slate-800 bg-ink p-5 text-white shadow-panel sm:p-6" aria-labelledby="detalle-region-title">
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-3">
              <span className="globe-flag shrink-0" role="img" aria-label={`Bandera de ${selectedPresentation.country}`}>{selectedPresentation.flag}</span>
              <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Región seleccionada</p>
              <p className="mt-1 text-sm font-medium text-slate-200">{selectedPresentation.country}</p>
              <h2 id="detalle-region-title" className="mt-1 text-xl font-semibold">{selectedRegion.name}</h2>
              <p className="mt-1 text-sm text-slate-400">{selectedRegion.code} · Región AWS</p>
              </div>
            </div>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-blue-300"><Database size={19} aria-hidden="true" /></span>
          </div>

          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
            <StatusBadge label={selectedRegion.status} detail={selectedRegion.statusDetail} tone={statusTone(selectedRegion.status)} />
          </div>

          <dl className="mt-6 divide-y divide-white/10">
            <DetailRow label="Ubicación" value={selectedRegion.location} />
            <DetailRow label="Recursos desplegados" value={selectedRegion.resources.toString()} />
            <DetailRow label="Latencia estimada" value={selectedRegion.latency} />
          </dl>

          <div className="mt-6">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400"><Activity size={14} aria-hidden="true" />Servicios desplegados</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {selectedRegion.services.map((service) => <span key={service} className="rounded-md border border-white/10 bg-white/10 px-2.5 py-1.5 text-xs font-medium text-slate-200">{service}</span>)}
            </div>
          </div>

          <p className="mt-8 border-t border-white/10 pt-4 text-xs leading-5 text-slate-400">La información mostrada es local y sirve como referencia para la práctica Cloud Foundations.</p>
        </aside>
      </section>

      <section aria-labelledby="regiones-title">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Inventario regional</p>
            <h2 id="regiones-title" className="mt-1 text-xl font-semibold text-ink">Regiones desplegadas</h2>
          </div>
          <p className="text-sm text-muted">Selecciona una tarjeta para actualizar el detalle.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {infrastructureRegions.map((region) => <InfrastructureRegionCard key={region.id} region={region} isSelected={region.id === selectedRegionId} onSelect={() => setSelectedRegionId(region.id)} />)}
        </div>
      </section>
    </div>
  )
}

function SummaryMetric({ icon, label, value, detail }: { icon: React.ReactNode; label: string; value: string; detail: string }) {
  return (
    <div className="rounded-xl border border-border bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-panel">
      <div className="flex items-center justify-between gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">{icon}</span>
        <Activity size={15} className="text-success" aria-hidden="true" />
      </div>
      <p className="mt-4 text-xs font-medium uppercase tracking-[0.12em] text-muted">{label}</p>
      <p className="metric-value mt-1 text-2xl font-semibold tracking-tight text-ink">{value}</p>
      <p className="mt-1 text-xs text-muted">{detail}</p>
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0">
      <dt className="text-sm text-slate-400">{label}</dt>
      <dd className="max-w-[62%] text-right text-sm font-medium text-slate-100">{value}</dd>
    </div>
  )
}

function GlobeIcon() {
  return <Cloud size={14} aria-hidden="true" />
}
