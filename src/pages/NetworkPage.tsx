import { ArrowDown, Boxes, Network, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { NetworkArchitectureDiagram } from '../components/NetworkArchitectureDiagram'
import { StatusBadge } from '../components/StatusBadge'
import { networkFlow, networkNodes, networkSummary, type NetworkNodeId } from '../data/network'

export function NetworkPage() {
  const [selectedNodeId, setSelectedNodeId] = useState<NetworkNodeId>('internet')

  return (
    <div className="module-page network-page mx-auto w-full max-w-[1600px] space-y-6">
      <section className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div className="max-w-3xl">
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <Network size={15} aria-hidden="true" />
            <span>Control de arquitectura Cloud</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">Arquitectura de red</h1>
          <p className="mt-2 text-sm leading-6 text-muted sm:text-base">Visualiza el recorrido de las solicitudes desde Internet hasta los recursos privados de la solución.</p>
        </div>
        <StatusBadge label="Arquitectura operativa" detail="Datos simulados" tone="neutral" icon={<ShieldCheck size={14} aria-hidden="true" />} />
      </section>

      <section className="grid gap-4 sm:grid-cols-3" aria-label="Resumen de arquitectura de red">
        <SummaryMetric icon={<Boxes size={17} />} label="Nodos" value={networkSummary.nodes.toString()} detail="componentes representados" />
        <SummaryMetric icon={<ArrowDown size={17} />} label="Conexiones" value={networkSummary.connections.toString()} detail="flujos dirigidos" />
        <SummaryMetric icon={<Network size={17} />} label="Red privada" value={`${networkSummary.privateLayers} capas`} detail="VPC, EC2 y RDS" />
      </section>

      <NetworkArchitectureDiagram nodes={networkNodes} selectedNodeId={selectedNodeId} onSelectNode={setSelectedNodeId} />

      <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]" aria-labelledby="secuencia-title">
        <div className="rounded-2xl border border-border bg-white p-5 shadow-panel sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Secuencia de entrada</p>
              <h2 id="secuencia-title" className="mt-1 text-lg font-semibold text-ink">Ruta de la solicitud</h2>
            </div>
            <span className="hidden rounded-md border border-border bg-slate-50 px-2.5 py-1.5 text-xs text-muted sm:inline-flex">Flujo principal</span>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {networkFlow.map((nodeId, index) => {
              const node = networkNodes.find((item) => item.id === nodeId) ?? networkNodes[0]
              return (
                <div key={node.id} className="flex items-center gap-2">
                  <button type="button" onClick={() => setSelectedNodeId(node.id)} aria-label={`Seleccionar ${node.label}`} className="rounded-lg border border-border bg-slate-50 px-3 py-2 text-xs font-semibold text-ink transition duration-200 hover:border-primary/35 hover:bg-primary/[0.04] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15">{node.label}</button>
                  {index < networkFlow.length - 1 && <ArrowDown className="rotate-[-90deg] text-muted" size={14} aria-hidden="true" />}
                </div>
              )
            })}
            <ArrowDown className="rotate-[-90deg] text-muted" size={14} aria-hidden="true" />
            <span className="rounded-lg border border-security/25 bg-security/[0.04] px-3 py-2 text-xs font-semibold text-security">EC2 / RDS</span>
          </div>
        </div>

        <aside className="rounded-2xl border border-slate-800 bg-ink p-5 text-white shadow-panel sm:p-6" aria-label="Nota de arquitectura">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400"><ShieldCheck size={14} className="text-blue-300" aria-hidden="true" />Contexto de red</div>
          <p className="mt-4 text-lg font-semibold tracking-tight">Flujo público, recursos privados.</p>
          <p className="mt-3 text-sm leading-6 text-slate-400">Route 53 y CloudFront gestionan la entrada; la VPC agrupa el cómputo y los datos de la solución.</p>
          <div className="mt-6 border-t border-white/10 pt-4 text-xs leading-5 text-slate-400">La vista es conceptual y usa datos locales. No representa una conexión real con AWS.</div>
        </aside>
      </section>
    </div>
  )
}

function SummaryMetric({ icon, label, value, detail }: { icon: React.ReactNode; label: string; value: string; detail: string }) {
  return (
    <div className="rounded-xl border border-border bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-panel">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">{icon}</span>
      <p className="mt-4 text-xs font-medium uppercase tracking-[0.12em] text-muted">{label}</p>
      <p className="metric-value mt-1 text-2xl font-semibold tracking-tight text-ink">{value}</p>
      <p className="mt-1 text-xs text-muted">{detail}</p>
    </div>
  )
}
