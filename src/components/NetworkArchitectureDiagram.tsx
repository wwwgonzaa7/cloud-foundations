import { ArrowDown, CheckCircle2, Cloud, Database, Globe2, Network, Server, ShieldCheck } from 'lucide-react'
import type { NetworkNode, NetworkNodeId } from '../data/network'
import { cn } from '../utils/cn'
import { StatusBadge } from './StatusBadge'

interface NetworkArchitectureDiagramProps {
  nodes: NetworkNode[]
  selectedNodeId: NetworkNodeId
  onSelectNode: (nodeId: NetworkNodeId) => void
}

const iconMap = {
  internet: Globe2,
  route53: Cloud,
  cloudfront: Cloud,
  vpc: Network,
  ec2: Server,
  rds: Database,
}

const accentStyles = {
  slate: 'border-slate-300 bg-slate-50 text-slate-700',
  blue: 'border-primary/25 bg-primary/[0.04] text-primary',
  green: 'border-security/25 bg-security/[0.04] text-security',
  amber: 'border-costs/30 bg-costs/[0.05] text-[#B45309]',
}

function findNode(nodes: NetworkNode[], id: NetworkNodeId) {
  return nodes.find((node) => node.id === id) ?? nodes[0]
}

export function NetworkArchitectureDiagram({ nodes, selectedNodeId, onSelectNode }: NetworkArchitectureDiagramProps) {
  const selectedNode = findNode(nodes, selectedNodeId)

  return (
    <section className="tech-frame overflow-hidden rounded-2xl border border-border bg-white shadow-panel" aria-labelledby="diagrama-red-title">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-5 sm:px-6">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            <Network size={15} aria-hidden="true" />
            <span>Topología lógica</span>
          </div>
          <h2 id="diagrama-red-title" className="text-lg font-semibold text-ink">Flujo de arquitectura Cloud</h2>
          <p className="mt-1 text-sm text-muted">Selecciona un nodo para consultar su función dentro de la solución.</p>
        </div>
        <StatusBadge label="Operativa" detail="Flujo protegido" compact />
      </div>

      <div className="overflow-x-auto p-5 sm:p-8">
        <div className="network-diagram-canvas mx-auto min-w-[650px] max-w-[760px] rounded-xl border border-border px-6 py-8 sm:px-12">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Plano de control de red
            </div>
            <div className="flex items-center gap-4 text-[11px] text-muted">
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" />Flujo público</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-security" />Red privada</span>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <DiagramNode node={findNode(nodes, 'internet')} isSelected={selectedNodeId === 'internet'} onSelectNode={onSelectNode} />
            <FlowConnector label="Solicitud" active={selectedNodeId === 'internet' || selectedNodeId === 'route53'} />
            <DiagramNode node={findNode(nodes, 'route53')} isSelected={selectedNodeId === 'route53'} onSelectNode={onSelectNode} />
            <FlowConnector label="Resolución" active={selectedNodeId === 'route53' || selectedNodeId === 'cloudfront'} />
            <DiagramNode node={findNode(nodes, 'cloudfront')} isSelected={selectedNodeId === 'cloudfront'} onSelectNode={onSelectNode} />
            <FlowConnector label="Entrada protegida" active={selectedNodeId === 'cloudfront' || selectedNodeId === 'vpc'} />

            <div className="relative w-full rounded-2xl border-2 border-dashed border-security/35 bg-security/[0.025] px-4 pb-6 pt-5 sm:px-8">
              <div className="absolute -top-3 left-5 flex items-center gap-2 rounded-md border border-security/20 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-security sm:left-7">
                <Network size={13} aria-hidden="true" />
                Red privada
              </div>
              <div className="flex justify-center">
                <DiagramNode node={findNode(nodes, 'vpc')} isSelected={selectedNodeId === 'vpc'} onSelectNode={onSelectNode} />
              </div>

              <div className="vpc-branch relative mt-10 grid grid-cols-2 gap-4 sm:gap-14">
                <span className={cn('network-connection absolute left-1/4 right-1/4 top-[-20px] h-px bg-security/35', (selectedNodeId === 'vpc' || selectedNodeId === 'ec2' || selectedNodeId === 'rds') && 'network-connection-active')} aria-hidden="true" />
                <span className={cn('network-connection absolute left-1/4 top-[-20px] h-5 w-px bg-security/35', (selectedNodeId === 'vpc' || selectedNodeId === 'ec2') && 'network-connection-active')} aria-hidden="true" />
                <span className={cn('network-connection absolute right-1/4 top-[-20px] h-5 w-px bg-security/35', (selectedNodeId === 'vpc' || selectedNodeId === 'rds') && 'network-connection-active')} aria-hidden="true" />
                <div className="flex justify-center"><DiagramNode node={findNode(nodes, 'ec2')} isSelected={selectedNodeId === 'ec2'} onSelectNode={onSelectNode} /></div>
                <div className="flex justify-center"><DiagramNode node={findNode(nodes, 'rds')} isSelected={selectedNodeId === 'rds'} onSelectNode={onSelectNode} /></div>
              </div>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-border pt-4 text-[11px] text-muted">
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 size={13} className="text-security" aria-hidden="true" />Nodo operativo</span>
            <span className="inline-flex items-center gap-1.5"><ShieldCheck size={13} className="text-primary" aria-hidden="true" />Flujo lógico</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-px w-4 bg-border" />Conexión dirigida</span>
          </div>
        </div>
      </div>

      <div key={selectedNode.id} className="detail-panel border-t border-border bg-slate-50/70 px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <span className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border', accentStyles[selectedNode.accent])}>
              {(() => { const Icon = iconMap[selectedNode.id]; return <Icon size={19} aria-hidden="true" /> })()}
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Nodo seleccionado · {selectedNode.layer}</p>
              <h3 className="mt-1 text-base font-semibold text-ink">{selectedNode.label}</h3>
            </div>
          </div>
          <StatusBadge label={selectedNode.status} tone="success" compact />
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-700">{selectedNode.description}</p>
      </div>
    </section>
  )
}

function DiagramNode({ node, isSelected, onSelectNode }: { node: NetworkNode; isSelected: boolean; onSelectNode: (nodeId: NetworkNodeId) => void }) {
  const Icon = iconMap[node.id]

  return (
    <button
      type="button"
      aria-label={`Seleccionar nodo ${node.label}`}
      aria-pressed={isSelected}
      onClick={() => onSelectNode(node.id)}
      className={cn(
        'network-node group relative z-10 flex min-w-[185px] items-center gap-3 rounded-xl border px-3.5 py-3 text-left shadow-sm outline-none transition duration-200 hover:-translate-y-0.5 hover:shadow-panel focus-visible:ring-4 focus-visible:ring-primary/15 sm:min-w-[220px]',
        accentStyles[node.accent],
        isSelected && 'network-node-selected ring-4 ring-primary/10',
      )}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm"><Icon size={18} aria-hidden="true" /></span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold text-ink">{node.label}</span>
        <span className="mt-0.5 block truncate text-[11px] text-muted">{node.detail}</span>
      </span>
      <span className="ml-auto h-2 w-2 shrink-0 rounded-full bg-security" aria-label={`${node.label}: operativo`} />
    </button>
  )
}

function FlowConnector({ label, active }: { label: string; active: boolean }) {
  return (
    <div className={cn('network-flow-connector', active && 'network-connection-active')} aria-hidden="true">
      <span>{label}</span>
      <ArrowDown size={15} />
    </div>
  )
}
