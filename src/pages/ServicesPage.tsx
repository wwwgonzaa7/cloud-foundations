import { Activity, Boxes, CheckCircle2, CircleDot, Layers3, Search, Server } from 'lucide-react'
import { useMemo, useState } from 'react'
import { ServiceCatalogCard } from '../components/ServiceCatalogCard'
import { ServiceDetailPanel } from '../components/ServiceDetailPanel'
import { StatusBadge } from '../components/StatusBadge'
import { awsServices, serviceCategories, serviceSummary } from '../data/services'

export function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [selectedServiceId, setSelectedServiceId] = useState(awsServices[0].id)

  const visibleServices = useMemo(
    () => activeCategory === 'Todos' ? awsServices : awsServices.filter((service) => service.category === activeCategory),
    [activeCategory],
  )
  const selectedService = awsServices.find((service) => service.id === selectedServiceId) ?? awsServices[0]

  function selectCategory(category: string) {
    setActiveCategory(category)
    const firstService = category === 'Todos' ? awsServices[0] : awsServices.find((service) => service.category === category)
    if (firstService) setSelectedServiceId(firstService.id)
  }

  return (
    <div className="module-page services-page mx-auto w-full max-w-[1600px] space-y-6">
      <section className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div className="max-w-3xl">
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <Boxes size={15} aria-hidden="true" />
            <span>Catálogo de infraestructura Cloud</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">Servicios AWS</h1>
          <p className="mt-2 text-sm leading-6 text-muted sm:text-base">Consulta los servicios que forman parte de la solución y su función principal dentro del diseño Cloud.</p>
        </div>
        <StatusBadge label="Catálogo local" detail="Sin conexión con AWS" tone="neutral" icon={<Layers3 size={14} aria-hidden="true" />} />
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Resumen del catálogo">
        <SummaryMetric icon={<Boxes size={17} />} label="Servicios catalogados" value={serviceSummary.total.toString()} detail="componentes disponibles" />
        <SummaryMetric icon={<CheckCircle2 size={17} />} label="En uso" value={serviceSummary.used.toString()} detail="incluidos en la solución" tone="success" />
        <SummaryMetric icon={<CircleDot size={17} />} label="No utilizado" value={serviceSummary.unused.toString()} detail="reservado para después" tone="neutral" />
        <SummaryMetric icon={<Layers3 size={17} />} label="Categorías" value={serviceSummary.categories.toString()} detail="grupos de arquitectura" />
      </section>

      <section className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0 rounded-2xl border border-border bg-white p-5 shadow-panel sm:p-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Inventario de servicios</p>
              <h2 className="mt-1 text-lg font-semibold text-ink">Catálogo AWS</h2>
              <p className="mt-1 text-sm text-muted">Filtra por categoría o selecciona una tarjeta para ver más detalle.</p>
            </div>
            <div className="hidden items-center gap-2 text-xs text-muted sm:flex"><Search size={14} aria-hidden="true" />Vista de referencia</div>
          </div>

          <div className="mt-5 flex gap-2 overflow-x-auto pb-1" aria-label="Filtrar servicios por categoría">
            {serviceCategories.map((category) => (
              <button
                key={category}
                type="button"
                aria-pressed={activeCategory === category}
                onClick={() => selectCategory(category)}
                className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15 ${activeCategory === category ? 'border-primary bg-primary text-white' : 'border-border bg-white text-muted hover:border-primary/35 hover:text-primary'}`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
            {visibleServices.map((service) => <ServiceCatalogCard key={service.id} service={service} isSelected={service.id === selectedServiceId} onSelect={() => setSelectedServiceId(service.id)} />)}
          </div>
        </div>

        <ServiceDetailPanel key={selectedService.id} service={selectedService} />
      </section>

      <section className="flex flex-col gap-3 rounded-xl border border-border bg-slate-50/70 px-4 py-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-5" aria-label="Estado del catálogo">
        <div className="flex items-center gap-2"><Activity size={15} className="text-primary" aria-hidden="true" /><span>Estado del catálogo: datos locales listos para la práctica.</span></div>
        <div className="flex items-center gap-2 text-xs"><Server size={14} aria-hidden="true" /><span>{serviceSummary.used} servicios considerados en uso</span></div>
      </section>
    </div>
  )
}

function SummaryMetric({ icon, label, value, detail, tone = 'primary' }: { icon: React.ReactNode; label: string; value: string; detail: string; tone?: 'primary' | 'success' | 'neutral' }) {
  const iconClass = tone === 'success' ? 'bg-security/10 text-security' : tone === 'neutral' ? 'bg-slate-100 text-slate-600' : 'bg-primary/10 text-primary'

  return (
    <div className="rounded-xl border border-border bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-panel">
      <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${iconClass}`}>{icon}</span>
      <p className="mt-4 text-xs font-medium uppercase tracking-[0.12em] text-muted">{label}</p>
      <p className="metric-value mt-1 text-2xl font-semibold tracking-tight text-ink">{value}</p>
      <p className="mt-1 text-xs text-muted">{detail}</p>
    </div>
  )
}
