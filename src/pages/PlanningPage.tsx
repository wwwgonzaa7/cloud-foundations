import { Check, ClipboardCheck, Globe2, Info, Layers3, Plus, Save, ServerCog } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { StatusBadge } from '../components/StatusBadge'
import { applicationTypes, availabilityLevels, migrationObjectives, planningRegions, type RegionOption } from '../data/planning'
import { awsServices } from '../data/services'

interface PlanningFormValues {
  solutionName: string
  applicationType: string
  description: string
  region: string
  estimatedUsers: string
  availability: string
  services: string[]
  migrationObjective: string
}

type PlanningErrors = Partial<Record<keyof PlanningFormValues, string>>

const initialForm: PlanningFormValues = {
  solutionName: '',
  applicationType: '',
  description: '',
  region: '',
  estimatedUsers: '',
  availability: '',
  services: [],
  migrationObjective: '',
}

function FieldLabel({ htmlFor, children, required = false }: { htmlFor: string; children: string; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-ink">
      {children}{required && <span className="ml-1 text-alerts" aria-hidden="true">*</span>}
    </label>
  )
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return <p id={id} className="field-feedback mt-1.5 text-xs font-medium text-alerts" role="alert">{message}</p>
}

function getOptionLabel(options: Array<{ value: string; label: string }>, value: string) {
  return options.find((option) => option.value === value)?.label ?? 'Sin seleccionar'
}

export function PlanningPage() {
  const [form, setForm] = useState<PlanningFormValues>(initialForm)
  const [errors, setErrors] = useState<PlanningErrors>({})
  const [submittedProposal, setSubmittedProposal] = useState<PlanningFormValues | null>(null)

  const updateField = <K extends keyof PlanningFormValues>(field: K, value: PlanningFormValues[K]) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const toggleService = (serviceId: string) => {
    const nextServices = form.services.includes(serviceId)
      ? form.services.filter((id) => id !== serviceId)
      : [...form.services, serviceId]
    updateField('services', nextServices)
  }

  const validateForm = () => {
    const nextErrors: PlanningErrors = {}
    if (!form.solutionName.trim()) nextErrors.solutionName = 'Ingresa un nombre para la solución.'
    if (!form.applicationType) nextErrors.applicationType = 'Selecciona el tipo de aplicación.'
    if (form.description.trim().length < 20) nextErrors.description = 'Describe la solución con al menos 20 caracteres.'
    if (!form.region) nextErrors.region = 'Selecciona una región.'
    if (!form.estimatedUsers || Number(form.estimatedUsers) < 1) nextErrors.estimatedUsers = 'Indica al menos 1 usuario estimado.'
    if (!form.availability) nextErrors.availability = 'Selecciona el nivel de disponibilidad.'
    if (form.services.length === 0) nextErrors.services = 'Selecciona al menos un servicio AWS.'
    if (!form.migrationObjective) nextErrors.migrationObjective = 'Selecciona el objetivo de migración.'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validateForm()) return
    setSubmittedProposal({ ...form, solutionName: form.solutionName.trim(), description: form.description.trim() })
  }

  const selectedRegion = planningRegions.find((region) => region.value === (submittedProposal?.region ?? form.region))

  return (
    <div className="module-page planning-page mx-auto w-full max-w-[1480px]">
      <div className="mb-7 flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
        <div className="max-w-3xl">
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <span className="h-px w-6 bg-primary" />
            <span>Planificación Cloud · nueva propuesta</span>
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Planificación Cloud</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted sm:text-base">
            Define el contexto, la escala y los servicios AWS de una solución antes de llevarla a la siguiente fase.
          </p>
        </div>
        <StatusBadge label="Solo datos locales" detail="No se envía información" icon={<Info className="h-4 w-4" />} />
      </div>

      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(340px,0.65fr)]">
        <form onSubmit={handleSubmit} noValidate className="space-y-5" aria-label="Formulario de propuesta Cloud">
          <section className="rounded-2xl border border-border bg-card shadow-sm">
            <div className="flex items-start gap-3 border-b border-border px-5 py-4 sm:px-6">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><ClipboardCheck className="h-5 w-5" aria-hidden="true" /></span>
              <div><h3 className="font-semibold text-ink">Contexto de la solución</h3><p className="mt-0.5 text-xs text-muted">Información base de la propuesta</p></div>
            </div>
            <div className="grid gap-5 px-5 py-5 sm:grid-cols-2 sm:px-6">
              <div>
                <FieldLabel htmlFor="solution-name" required>Nombre de la solución</FieldLabel>
                <input id="solution-name" value={form.solutionName} onChange={(event) => updateField('solutionName', event.target.value)} aria-invalid={Boolean(errors.solutionName)} aria-describedby={errors.solutionName ? 'solution-name-error' : undefined} className="planning-input" placeholder="Ej. Plataforma de pedidos" />
                <FieldError id="solution-name-error" message={errors.solutionName} />
              </div>
              <div>
                <FieldLabel htmlFor="application-type" required>Tipo de aplicación</FieldLabel>
                <select id="application-type" value={form.applicationType} onChange={(event) => updateField('applicationType', event.target.value)} aria-invalid={Boolean(errors.applicationType)} aria-describedby={errors.applicationType ? 'application-type-error' : undefined} className="planning-input">
                  <option value="">Selecciona un tipo</option>
                  {applicationTypes.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
                <FieldError id="application-type-error" message={errors.applicationType} />
              </div>
              <div className="sm:col-span-2">
                <FieldLabel htmlFor="solution-description" required>Descripción</FieldLabel>
                <textarea id="solution-description" value={form.description} onChange={(event) => updateField('description', event.target.value)} aria-invalid={Boolean(errors.description)} aria-describedby={errors.description ? 'solution-description-error' : undefined} className="planning-input min-h-28 resize-y" placeholder="Describe el propósito de la solución, su flujo principal y los usuarios a los que dará servicio." />
                <div className="mt-1.5 flex justify-between gap-3"><FieldError id="solution-description-error" message={errors.description} /><span className="ml-auto text-[11px] text-muted">{form.description.length} caracteres</span></div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card shadow-sm">
            <div className="flex items-start gap-3 border-b border-border px-5 py-4 sm:px-6">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-security/10 text-security"><Globe2 className="h-5 w-5" aria-hidden="true" /></span>
              <div><h3 className="font-semibold text-ink">Destino y escala</h3><p className="mt-0.5 text-xs text-muted">Región, usuarios y disponibilidad esperada</p></div>
            </div>
            <div className="grid gap-5 px-5 py-5 sm:grid-cols-2 sm:px-6">
              <div>
                <FieldLabel htmlFor="planning-region" required>Región</FieldLabel>
                <select id="planning-region" value={form.region} onChange={(event) => updateField('region', event.target.value)} aria-invalid={Boolean(errors.region)} aria-describedby={errors.region ? 'planning-region-error' : undefined} className="planning-input">
                  <option value="">Selecciona una región</option>
                  {planningRegions.map((region) => <option key={region.value} value={region.value}>{region.label}</option>)}
                </select>
                <FieldError id="planning-region-error" message={errors.region} />
                {form.region && <p className="mt-1.5 text-xs text-muted">{planningRegions.find((region) => region.value === form.region)?.location}</p>}
              </div>
              <div>
                <FieldLabel htmlFor="estimated-users" required>Usuarios estimados</FieldLabel>
                <div className="relative"><input id="estimated-users" type="number" min="1" step="1" value={form.estimatedUsers} onChange={(event) => updateField('estimatedUsers', event.target.value)} aria-invalid={Boolean(errors.estimatedUsers)} aria-describedby={errors.estimatedUsers ? 'estimated-users-error' : 'estimated-users-help'} className="planning-input pr-20" placeholder="Ej. 5000" /><span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-muted">usuarios</span></div>
                <FieldError id="estimated-users-error" message={errors.estimatedUsers} />
                {!errors.estimatedUsers && <p id="estimated-users-help" className="mt-1.5 text-xs text-muted">Promedio esperado de usuarios activos.</p>}
              </div>
              <fieldset className="sm:col-span-2" aria-describedby={errors.availability ? 'availability-error' : undefined}>
                <legend className="mb-2 text-sm font-medium text-ink">Nivel de disponibilidad<span className="ml-1 text-alerts" aria-hidden="true">*</span></legend>
                <div className="grid gap-2 sm:grid-cols-3">
                  {availabilityLevels.map((option) => (
                    <label key={option.value} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition duration-200 ${form.availability === option.value ? 'border-primary bg-primary/[0.04] ring-1 ring-primary/20' : 'border-border hover:border-primary/30'}`}>
                      <input type="radio" name="availability" value={option.value} checked={form.availability === option.value} onChange={(event) => updateField('availability', event.target.value)} className="mt-0.5 h-4 w-4 accent-primary" />
                      <span><span className="block text-sm font-medium text-ink">{option.label}</span><span className="mt-0.5 block text-[11px] leading-4 text-muted">{option.value === 'development' ? 'Entorno no crítico' : option.value === 'high' ? 'Continuidad prioritaria' : 'Impacto crítico'}</span></span>
                    </label>
                  ))}
                </div>
                <FieldError id="availability-error" message={errors.availability} />
              </fieldset>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card shadow-sm">
            <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4 sm:px-6">
              <div className="flex items-start gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><Layers3 className="h-5 w-5" aria-hidden="true" /></span><div><h3 className="font-semibold text-ink">Servicios AWS seleccionados</h3><p className="mt-0.5 text-xs text-muted">Puedes elegir uno o varios servicios para la propuesta</p></div></div>
              <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-muted">{form.services.length} seleccionados</span>
            </div>
            <div className="grid gap-2.5 px-5 py-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
              {awsServices.map((service) => {
                const Icon = service.icon
                const selected = form.services.includes(service.id)
                return (
                  <label key={service.id} className={`group relative flex cursor-pointer flex-col rounded-xl border p-3 transition duration-200 ${selected ? 'border-primary bg-primary/[0.04] shadow-sm ring-1 ring-primary/20' : 'border-border hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-sm'}`}>
                    <input type="checkbox" value={service.id} checked={selected} onChange={() => toggleService(service.id)} className="sr-only" />
                    <span className="flex items-start justify-between gap-2"><span className={`flex h-8 w-8 items-center justify-center rounded-lg ${selected ? 'bg-primary text-white' : 'bg-slate-100 text-muted group-hover:bg-primary/10 group-hover:text-primary'}`}><Icon className="h-4 w-4" aria-hidden="true" /></span><span className={`flex h-5 w-5 items-center justify-center rounded-full border ${selected ? 'border-primary bg-primary text-white' : 'border-border text-transparent'}`}><Check className="h-3 w-3" aria-hidden="true" /></span></span>
                    <span className="mt-3 text-sm font-semibold text-ink">{service.name}</span><span className="mt-1 text-[11px] font-medium text-primary">{service.category}</span><span className="mt-1 text-[11px] leading-4 text-muted">{service.description}</span>
                  </label>
                )
              })}
            </div>
            <div className="px-5 pb-5 sm:px-6"><FieldError id="services-error" message={errors.services} /></div>
          </section>

          <section className="rounded-2xl border border-border bg-card shadow-sm">
            <div className="flex items-start gap-3 border-b border-border px-5 py-4 sm:px-6">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-costs/10 text-[#B45309]"><ServerCog className="h-5 w-5" aria-hidden="true" /></span>
              <div><h3 className="font-semibold text-ink">Objetivo de migración</h3><p className="mt-0.5 text-xs text-muted">Define el motivo principal de la propuesta</p></div>
            </div>
            <div className="px-5 py-5 sm:px-6">
              <FieldLabel htmlFor="migration-objective" required>Objetivo de migración</FieldLabel>
              <select id="migration-objective" value={form.migrationObjective} onChange={(event) => updateField('migrationObjective', event.target.value)} aria-invalid={Boolean(errors.migrationObjective)} aria-describedby={errors.migrationObjective ? 'migration-objective-error' : undefined} className="planning-input">
                <option value="">Selecciona un objetivo</option>
                {migrationObjectives.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
              <FieldError id="migration-objective-error" message={errors.migrationObjective} />
            </div>
          </section>

          <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-end">
            <span className="text-xs text-muted sm:mr-auto"><span className="text-alerts">*</span> Campos obligatorios</span>
            <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"><Save className="h-4 w-4" aria-hidden="true" />Registrar propuesta</button>
          </div>
        </form>

        <aside className="space-y-5 xl:sticky xl:top-24" aria-label="Resumen de la propuesta">
          {submittedProposal ? <ProposalSummary proposal={submittedProposal} region={selectedRegion} /> : <EmptyProposalSummary selectedServices={form.services.length} />}
        </aside>
      </div>
    </div>
  )
}

function EmptyProposalSummary({ selectedServices }: { selectedServices: number }) {
  return (
    <div className="rounded-2xl border border-border bg-sidebar p-5 text-white shadow-sm sm:p-6">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400"><Plus className="h-4 w-4 text-primary" aria-hidden="true" /><span>Resumen de propuesta</span></div>
      <h3 className="mt-5 text-2xl font-semibold tracking-tight">Aún no registrada</h3>
      <p className="mt-3 text-sm leading-6 text-slate-400">Completa el formulario y registra la propuesta para ver aquí la configuración seleccionada.</p>
      <div className="mt-7 border-t border-white/10 pt-4"><p className="text-xs text-slate-400">Servicios seleccionados</p><p className="mt-1 text-2xl font-semibold text-white">{selectedServices}</p><p className="mt-1 text-xs text-slate-400">Elige los servicios AWS que formarán parte de la solución.</p></div>
      <div className="mt-6 flex items-start gap-2 rounded-lg border border-white/10 bg-white/[0.04] p-3 text-xs leading-5 text-slate-400"><Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" /><span>La información se mantiene únicamente en memoria local durante esta fase.</span></div>
    </div>
  )
}

function ProposalSummary({ proposal, region }: { proposal: PlanningFormValues; region?: RegionOption }) {
  const selectedServices = awsServices.filter((service) => proposal.services.includes(service.id))
  return (
    <div className="rounded-2xl border border-security/20 bg-card shadow-sm">
      <div className="border-b border-security/15 bg-security/[0.04] px-5 py-4 sm:px-6"><div className="flex items-center gap-2 text-security"><Check className="h-5 w-5" aria-hidden="true" /><h3 className="font-semibold">Propuesta registrada</h3></div><p className="mt-1 text-xs text-muted">Datos guardados localmente en esta sesión</p></div>
      <div className="space-y-5 px-5 py-5 sm:px-6">
        <div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Solución</p><p className="mt-1 text-lg font-semibold text-ink">{proposal.solutionName}</p><p className="mt-1 text-sm text-muted">{getOptionLabel(applicationTypes, proposal.applicationType)}</p></div>
        <div className="grid grid-cols-2 gap-3"><div className="rounded-lg bg-slate-50 p-3"><p className="text-[11px] text-muted">Región</p><p className="mt-1 text-xs font-semibold text-ink">{region?.label}</p></div><div className="rounded-lg bg-slate-50 p-3"><p className="text-[11px] text-muted">Usuarios</p><p className="mt-1 text-xs font-semibold text-ink">{Number(proposal.estimatedUsers).toLocaleString('es-ES')}</p></div></div>
        <div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Descripción</p><p className="mt-1 text-sm leading-6 text-ink">{proposal.description}</p></div>
        <div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Disponibilidad</p><p className="mt-1 text-sm font-medium text-ink">{getOptionLabel(availabilityLevels, proposal.availability)}</p></div>
        <div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Servicios AWS</p><div className="mt-2 flex flex-wrap gap-1.5">{selectedServices.map((service) => <span key={service.id} className="rounded-full border border-primary/15 bg-primary/5 px-2.5 py-1 text-xs font-medium text-primary">{service.name}</span>)}</div></div>
        <div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Objetivo</p><p className="mt-1 text-sm font-medium text-ink">{getOptionLabel(migrationObjectives, proposal.migrationObjective)}</p></div>
      </div>
    </div>
  )
}
