import { Building2, CheckCircle2, ChevronRight, ShieldCheck, Users } from 'lucide-react'
import type { sharedResponsibilityModel } from '../data/security'

type ResponsibilityModel = typeof sharedResponsibilityModel

interface SharedResponsibilityModelProps {
  model: ResponsibilityModel
}

export function SharedResponsibilityModel({ model }: SharedResponsibilityModelProps) {
  return (
    <section className="tech-frame overflow-hidden rounded-2xl border border-border bg-white shadow-panel" aria-labelledby="responsabilidad-title">
      <div className="border-b border-border px-5 py-5 sm:px-6">
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          <ShieldCheck size={15} aria-hidden="true" />
          <span>Modelo de seguridad</span>
        </div>
        <h2 id="responsabilidad-title" className="text-lg font-semibold text-ink">Modelo de responsabilidad compartida</h2>
        <p className="mt-1 max-w-3xl text-sm leading-6 text-muted">La seguridad Cloud se construye en dos capas: AWS protege la infraestructura y el cliente configura y gobierna sus cargas de trabajo.</p>
      </div>

      <div className="grid divide-y divide-border lg:grid-cols-[minmax(0,1fr)_80px_minmax(0,1fr)] lg:divide-x lg:divide-y-0">
        <ResponsibilityColumn icon={<Building2 size={20} />} data={model.provider} tone="blue" />
        <div className="flex items-center justify-center bg-slate-50 px-4 py-4 lg:flex-col lg:px-0">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary">
            <ShieldCheck size={20} aria-hidden="true" />
          </div>
          <div className="mx-3 h-px flex-1 bg-border lg:mx-0 lg:my-3 lg:h-12 lg:w-px" />
          <ChevronRight className="text-primary lg:hidden" size={16} aria-hidden="true" />
          <span className="hidden text-center text-[10px] font-semibold uppercase leading-4 tracking-[0.12em] text-muted lg:block">Límite<br />de control</span>
        </div>
        <ResponsibilityColumn icon={<Users size={20} />} data={model.customer} tone="slate" />
      </div>
    </section>
  )
}

function ResponsibilityColumn({ icon, data, tone }: { icon: React.ReactNode; data: ResponsibilityModel['provider']; tone: 'blue' | 'slate' }) {
  return (
    <div className="p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${tone === 'blue' ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-700'}`}>{icon}</span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{data.eyebrow}</p>
          <h3 className="mt-1 text-base font-semibold text-ink">{data.title}</h3>
        </div>
      </div>
      <p className="mt-5 text-sm leading-6 text-slate-700">{data.summary}</p>
      <ul className="mt-5 space-y-3">
        {data.controls.map((control) => (
          <li key={control} className="flex items-center gap-2 text-sm text-muted"><CheckCircle2 size={15} className="shrink-0 text-success" aria-hidden="true" />{control}</li>
        ))}
      </ul>
    </div>
  )
}
