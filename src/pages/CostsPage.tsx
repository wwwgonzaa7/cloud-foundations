import { Calculator, Info, Plus, ReceiptText, WalletCards } from 'lucide-react'
import { useMemo, useState } from 'react'
import { StatusBadge } from '../components/StatusBadge'
import { CostDistributionChart, type CostChartItem } from '../components/CostDistributionChart'
import { CostEstimatorTable } from '../components/CostEstimatorTable'
import { calculateMonthlyCost, costServiceCatalog, HOURS_PER_MONTH, mockPricingNote, type CostEstimateItem } from '../data/costs'
import { formatUSD } from '../utils/currency'

const chartColors = ['#2563EB', '#16A34A', '#F59E0B', '#0F766E', '#64748B', '#7C3AED', '#DC2626', '#0891B2']

export function CostsPage() {
  const [estimate, setEstimate] = useState<CostEstimateItem[]>([])
  const [selectedServiceId, setSelectedServiceId] = useState('')
  const [addError, setAddError] = useState('')

  const availableServices = costServiceCatalog.filter((service) => !estimate.some((item) => item.serviceId === service.id))
  const monthlyTotal = useMemo(() => estimate.reduce((total, item) => {
    const service = costServiceCatalog.find((entry) => entry.id === item.serviceId)
    return service ? total + calculateMonthlyCost(item, service) : total
  }, 0), [estimate])
  const annualTotal = monthlyTotal * 12
  const chartData: CostChartItem[] = estimate.flatMap((item, index) => {
    const service = costServiceCatalog.find((entry) => entry.id === item.serviceId)
    return service ? [{ service: service.name, amount: calculateMonthlyCost(item, service), color: chartColors[index % chartColors.length] }] : []
  })

  const addService = () => {
    if (!selectedServiceId) {
      setAddError('Selecciona un servicio antes de agregarlo.')
      return
    }
    if (estimate.some((item) => item.serviceId === selectedServiceId)) {
      setAddError('Ese servicio ya está en la estimación.')
      return
    }
    setEstimate((current) => [...current, { serviceId: selectedServiceId, quantity: 1, hours: HOURS_PER_MONTH }])
    setSelectedServiceId('')
    setAddError('')
  }

  const updateItem = (serviceId: string, field: 'quantity' | 'hours', value: number) => {
    setEstimate((current) => current.map((item) => item.serviceId === serviceId ? { ...item, [field]: value } : item))
  }

  const removeService = (serviceId: string) => {
    setEstimate((current) => current.filter((item) => item.serviceId !== serviceId))
  }

  return (
    <div className="module-page costs-page mx-auto w-full max-w-[1480px]">
      <div className="mb-7 flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
        <div className="max-w-3xl">
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary"><span className="h-px w-6 bg-primary" /><span>Economía Cloud · estimación local</span></div>
          <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Costos y economía Cloud</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted sm:text-base">Construye una proyección de costos ajustando la cantidad y las horas estimadas de cada servicio AWS.</p>
        </div>
        <StatusBadge label="Precios simulados" detail="Sin conexión con AWS" icon={<Info className="h-4 w-4" />} />
      </div>

      <section className="mb-5 grid gap-4 sm:grid-cols-2" aria-label="Resumen de costos">
        <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-sidebar p-5 text-white shadow-sm sm:p-6"><div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary"><WalletCards className="h-5 w-5" aria-hidden="true" /></div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Costo mensual estimado</p><p key={monthlyTotal} className="metric-value mt-4 text-3xl font-semibold tracking-tight">{formatUSD(monthlyTotal)}</p><p className="mt-2 text-xs text-slate-400">{estimate.length} {estimate.length === 1 ? 'servicio incluido' : 'servicios incluidos'} · cálculo local</p></div>
        <div className="relative overflow-hidden rounded-2xl border border-costs/25 bg-card p-5 shadow-sm sm:p-6"><div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-xl bg-costs/10 text-[#B45309]"><ReceiptText className="h-5 w-5" aria-hidden="true" /></div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Costo anual estimado</p><p key={annualTotal} className="metric-value mt-4 text-3xl font-semibold tracking-tight text-ink">{formatUSD(annualTotal)}</p><p className="mt-2 text-xs text-muted">Proyección equivalente a 12 meses</p></div>
      </section>

      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.25fr)_minmax(330px,0.75fr)]">
        <div className="min-w-0 space-y-5">
          <section className="rounded-2xl border border-border bg-card shadow-sm" aria-labelledby="add-service-heading">
            <div className="flex items-start gap-3 border-b border-border px-5 py-4 sm:px-6"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><Calculator className="h-5 w-5" aria-hidden="true" /></span><div><h3 id="add-service-heading" className="font-semibold text-ink">Agregar servicio a la estimación</h3><p className="mt-0.5 text-xs text-muted">Cada servicio se agrega una vez y luego puedes ajustar su escala.</p></div></div>
            <div className="flex flex-col gap-3 px-5 py-5 sm:flex-row sm:items-end sm:px-6"><div className="min-w-0 flex-1"><label htmlFor="cost-service-select" className="mb-2 block text-sm font-medium text-ink">Servicio AWS</label><select id="cost-service-select" value={selectedServiceId} onChange={(event) => { setSelectedServiceId(event.target.value); setAddError('') }} className="planning-input"><option value="">Selecciona un servicio</option>{availableServices.map((service) => <option key={service.id} value={service.id}>{service.name} · {service.category}</option>)}</select></div><button type="button" onClick={addService} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"><Plus className="h-4 w-4" aria-hidden="true" />Agregar servicio</button></div>
            {selectedServiceId && <p className="px-5 pb-5 text-xs text-muted sm:px-6">{costServiceCatalog.find((service) => service.id === selectedServiceId)?.description} · tarifa simulada aplicable por recurso/hora.</p>}
            {addError && <p className="px-5 pb-5 text-xs font-medium text-alerts sm:px-6" role="alert">{addError}</p>}
          </section>
          <CostEstimatorTable items={estimate} catalog={costServiceCatalog} onUpdate={updateItem} onRemove={removeService} />
          <p className="flex items-start gap-2 px-1 text-xs leading-5 text-muted"><Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />{mockPricingNote}</p>
        </div>

        <aside className="order-first min-w-0 space-y-5 xl:sticky xl:top-24 xl:order-last" aria-label="Distribución de costos"><CostDistributionChart data={chartData} /><div className="rounded-2xl border border-border bg-slate-50/80 p-5"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Criterio de cálculo</p><p className="mt-2 text-sm leading-6 text-ink">El costo mensual se estima con la cantidad de recursos, las horas mensuales y una tarifa simulada por servicio.</p><div className="mt-4 rounded-lg border border-border bg-card px-3 py-2 font-mono text-xs text-muted">cantidad × horas × tarifa</div></div></aside>
      </div>
    </div>
  )
}
