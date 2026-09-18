import { ArrowUpRight, Boxes, Compass, Layers3 } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { allNavigationItems } from '../data/navigation'

export function PlaceholderPage() {
  const { pathname } = useLocation()
  const currentItem = allNavigationItems.find((item) => item.path === pathname) ?? allNavigationItems[0]
  const Icon = currentItem.icon
  const moduleName = currentItem.label === 'AWS Services' ? currentItem.label : currentItem.label.toLowerCase()

  return (
    <div className="mx-auto w-full max-w-[1440px]">
      <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div className="max-w-2xl">
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <span className="h-px w-6 bg-primary" />
            <span>Centro de control de infraestructura Cloud</span>
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{currentItem.label}</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted sm:text-base">
            {currentItem.description}. Este espacio está preparado para el módulo de planificación correspondiente.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-muted shadow-sm lg:self-auto">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span>Marcador de módulo</span>
          <span className="font-mono text-[11px] text-slate-400">{pathname}</span>
        </div>
      </div>

      <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]" aria-labelledby="placeholder-heading">
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 id="placeholder-heading" className="font-semibold text-ink">{currentItem.label} workspace</h3>
                <p className="mt-0.5 text-xs text-muted">Listo para implementación</p>
              </div>
            </div>
            <span className="hidden rounded-full border border-security/20 bg-security/5 px-2.5 py-1 text-xs font-medium text-security sm:inline-flex">Estructura lista</span>
          </div>
          <div className="min-h-[270px] p-5 sm:p-6">
            <div className="flex h-full min-h-[220px] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-slate-50/70 px-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/15 bg-white text-primary shadow-sm">
                <Layers3 className="h-6 w-6" aria-hidden="true" />
              </div>
              <h4 className="mt-4 font-semibold text-ink">Próximamente: módulo de {moduleName}</h4>
              <p className="mt-2 max-w-md text-sm leading-6 text-muted">
                La navegación, la región activa y el estado global ya están conectados. El contenido específico se añadirá en la siguiente fase.
              </p>
            </div>
          </div>
        </div>

        <aside className="rounded-2xl border border-border bg-sidebar p-5 text-white shadow-sm" aria-label="Contexto del centro de control">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            <Compass className="h-4 w-4 text-primary" aria-hidden="true" />
            <span>Plano de control</span>
          </div>
          <p className="mt-5 text-2xl font-semibold tracking-tight">Planifica con señales.</p>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Una base común para tomar decisiones de capacidad, coste y arquitectura con contexto de región.
          </p>
          <div className="mt-8 border-t border-white/10 pt-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Siguiente paso</span>
              <ArrowUpRight className="h-4 w-4 text-primary" aria-hidden="true" />
            </div>
            <p className="mt-2 text-sm font-medium text-slate-200">Definir la superficie del módulo</p>
          </div>
        </aside>
      </section>
    </div>
  )
}
