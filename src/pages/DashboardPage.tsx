import { CheckCircle2, Clock3, MapPin, ShieldCheck } from 'lucide-react'
import { StatusBadge } from '../components/StatusBadge'
import { CostCard } from '../components/CostCard'
import { InfrastructureMap } from '../components/InfrastructureMap'
import { RegionCard } from '../components/RegionCard'
import { SecurityCard } from '../components/SecurityCard'
import { StatCard } from '../components/StatCard'
import { architectureLayers, architectureSummary, costDistribution, dashboardMetrics, dashboardRegion, securityControls } from '../data/dashboard'

export function DashboardPage() {
  return (
    <div className="module-page dashboard-page mx-auto w-full max-w-[1480px]">
      <div className="mb-7 flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
        <div className="max-w-3xl">
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <span className="h-px w-6 bg-primary" />
            <span>Centro de control de infraestructura Cloud</span>
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Panel principal</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted sm:text-base">
            Resumen operativo de la solución Cloud: capacidad, costos, seguridad y arquitectura en una sola vista.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 self-start xl:self-auto">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-ink shadow-sm">
            <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
            <span>{dashboardRegion.code} · {dashboardRegion.name}</span>
          </div>
          <StatusBadge label="Sistema saludable" detail="Última revisión: ahora" />
        </div>
      </div>

      <section className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3" aria-label="Indicadores Cloud">
        {dashboardMetrics.map((metric) => <StatCard key={metric.label} metric={metric} />)}
      </section>

      <section className="mb-6 grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)]" aria-label="Región y arquitectura">
        <RegionCard region={dashboardRegion} />
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                <ShieldCheck className="h-4 w-4 text-security" aria-hidden="true" />
                <span>Estado de arquitectura</span>
              </div>
              <h3 className="mt-2 text-lg font-semibold tracking-tight text-ink">{architectureSummary.status}</h3>
            </div>
            <StatusBadge label="Operativa" compact />
          </div>
          <p className="mt-2 text-xs text-muted">{architectureSummary.detail}</p>
          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {architectureLayers.map((layer) => (
              <div key={layer.label} className="flex items-center gap-2 rounded-lg border border-border bg-slate-50/70 px-3 py-2.5 transition duration-200 hover:border-security/30 hover:bg-security/[0.03]">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-security" aria-hidden="true" />
                <div className="min-w-0"><p className="truncate text-xs font-semibold text-ink">{layer.label}</p><p className="text-[10px] text-muted">{layer.status}</p></div>
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center gap-2 border-t border-border pt-4 text-xs text-muted">
            <Clock3 className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            <span>Observabilidad activa en la región seleccionada</span>
          </div>
        </div>
      </section>

      <section className="mb-6 grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]" aria-label="Costos y seguridad">
        <CostCard distribution={costDistribution} />
        <SecurityCard controls={securityControls} />
      </section>

      <InfrastructureMap />
    </div>
  )
}
