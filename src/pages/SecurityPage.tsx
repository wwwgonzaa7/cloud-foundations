import { CheckCircle2, ClipboardCheck, LockKeyhole, ShieldCheck, TriangleAlert } from 'lucide-react'
import { StatusBadge } from '../components/StatusBadge'
import { SecurityIndicatorCard } from '../components/SecurityIndicatorCard'
import { SharedResponsibilityModel } from '../components/SharedResponsibilityModel'
import { accountProtectionIndicators, complianceStatus, dataProtectionIndicators, iamIndicators, securitySummary, sharedResponsibilityModel } from '../data/security'

export function SecurityPage() {
  return (
    <div className="module-page security-page mx-auto w-full max-w-[1600px] space-y-6">
      <section className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div className="max-w-3xl">
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <ShieldCheck size={15} aria-hidden="true" />
            <span>Control de seguridad Cloud</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">Seguridad e IAM</h1>
          <p className="mt-2 text-sm leading-6 text-muted sm:text-base">Revisa la postura de seguridad de la solución y separa las responsabilidades antes de avanzar con la arquitectura.</p>
        </div>
        <StatusBadge label="Postura controlada" detail="Datos simulados" tone="neutral" icon={<ShieldCheck size={14} aria-hidden="true" />} />
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Resumen de seguridad">
        <SummaryMetric icon={<ClipboardCheck size={17} />} label="Controles evaluados" value={securitySummary.controls.toString()} detail="indicadores locales" />
        <SummaryMetric icon={<CheckCircle2 size={17} />} label="Seguro" value={securitySummary.secure.toString()} detail="controles sin desviaciones" tone="success" />
        <SummaryMetric icon={<ShieldCheck size={17} />} label="Atención" value={securitySummary.attention.toString()} detail="requieren seguimiento" tone="warning" />
        <SummaryMetric icon={<TriangleAlert size={17} />} label="Riesgo" value={securitySummary.risk.toString()} detail="requiere ajuste" tone="danger" />
      </section>

      <SharedResponsibilityModel model={sharedResponsibilityModel} />

      <section aria-labelledby="iam-title">
        <SectionHeading eyebrow="Identidad y acceso" title="IAM" description="Indicadores de gestión de identidades, roles, permisos y control de acceso." />
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {iamIndicators.map((indicator) => <SecurityIndicatorCard key={indicator.id} indicator={indicator} />)}
        </div>
      </section>

      <section className="grid min-w-0 gap-5 xl:grid-cols-2">
        <SecurityGroup title="Protección de cuenta" description="Controles que reducen el riesgo de acceso no autorizado a la cuenta Cloud." indicators={accountProtectionIndicators} />
        <SecurityGroup title="Protección de datos" description="Cobertura prevista para datos almacenados, en tránsito y protegidos mediante cifrado." indicators={dataProtectionIndicators} />
      </section>

      <section className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_360px]" aria-labelledby="cumplimiento-title">
        <div className="rounded-2xl border border-border bg-white p-5 shadow-panel sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Gobierno de la solución</p>
              <h2 id="cumplimiento-title" className="mt-1 text-lg font-semibold text-ink">Cumplimiento</h2>
            </div>
            <StatusBadge label={complianceStatus.state} tone="success" compact />
          </div>
          <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-security/20 bg-security/5 text-security">
              <CheckCircle2 size={36} aria-hidden="true" />
            </div>
            <div>
              <p className="text-xl font-semibold tracking-tight text-ink">{complianceStatus.title}</p>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{complianceStatus.detail}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted">
                <span className="rounded-md border border-border bg-slate-50 px-2.5 py-1.5">{complianceStatus.framework}</span>
                <span className="rounded-md border border-border bg-slate-50 px-2.5 py-1.5">{complianceStatus.reviewed}</span>
              </div>
            </div>
          </div>
        </div>

        <aside className="rounded-2xl border border-slate-800 bg-ink p-5 text-white shadow-panel sm:p-6" aria-label="Leyenda de estados de seguridad">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400"><LockKeyhole size={14} className="text-blue-300" aria-hidden="true" />Estados de seguridad</div>
          <p className="mt-4 text-sm leading-6 text-slate-300">Usa estos estados para priorizar los controles de la próxima fase de diseño.</p>
          <div className="mt-6 space-y-3">
            <LegendRow label="Seguro" detail="Control cubierto" tone="success" />
            <LegendRow label="Atención" detail="Requiere seguimiento" tone="warning" />
            <LegendRow label="Riesgo" detail="Requiere ajuste" tone="danger" />
          </div>
          <p className="mt-6 border-t border-white/10 pt-4 text-xs leading-5 text-slate-400">Esta vista es una evaluación local de referencia; no consulta IAM ni ningún servicio real de AWS.</p>
        </aside>
      </section>
    </div>
  )
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{eyebrow}</p>
      <h2 id={title === 'IAM' ? 'iam-title' : undefined} className="mt-1 text-xl font-semibold text-ink">{title}</h2>
      <p className="mt-1 text-sm text-muted">{description}</p>
    </div>
  )
}

function SecurityGroup({ title, description, indicators }: { title: string; description: string; indicators: typeof accountProtectionIndicators }) {
  const headingId = title === 'Protección de cuenta' ? 'proteccion-cuenta-title' : 'proteccion-datos-title'

  return (
    <section className="min-w-0 rounded-2xl border border-border bg-white p-5 shadow-panel sm:p-6" aria-labelledby={headingId}>
      <div>
        <h2 id={headingId} className="text-lg font-semibold text-ink">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-muted">{description}</p>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {indicators.map((indicator) => <SecurityIndicatorCard key={indicator.id} indicator={indicator} compact />)}
      </div>
    </section>
  )
}

function SummaryMetric({ icon, label, value, detail, tone = 'primary' }: { icon: React.ReactNode; label: string; value: string; detail: string; tone?: 'primary' | 'success' | 'warning' | 'danger' }) {
  const iconClass = tone === 'success' ? 'bg-security/10 text-security' : tone === 'warning' ? 'bg-costs/10 text-costs' : tone === 'danger' ? 'bg-alerts/10 text-alerts' : 'bg-primary/10 text-primary'

  return (
    <div className="rounded-xl border border-border bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-panel">
      <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${iconClass}`}>{icon}</span>
      <p className="mt-4 text-xs font-medium uppercase tracking-[0.12em] text-muted">{label}</p>
      <p className="metric-value mt-1 text-2xl font-semibold tracking-tight text-ink">{value}</p>
      <p className="mt-1 text-xs text-muted">{detail}</p>
    </div>
  )
}

function LegendRow({ label, detail, tone }: { label: string; detail: string; tone: 'success' | 'warning' | 'danger' }) {
  const colorClass = tone === 'success' ? 'bg-security' : tone === 'warning' ? 'bg-costs' : 'bg-alerts'
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5">
      <span className="flex items-center gap-2 text-sm font-medium text-slate-100"><span className={`h-2 w-2 rounded-full ${colorClass}`} />{label}</span>
      <span className="text-xs text-slate-400">{detail}</span>
    </div>
  )
}
