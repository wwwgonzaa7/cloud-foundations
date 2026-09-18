import { ArrowDown, Cloud, Database, Globe2, Network, Server, ShieldCheck } from 'lucide-react'
import { StatusBadge } from './StatusBadge'
import type { ReactNode } from 'react'

interface InfrastructureNodeProps {
  label: string
  detail: string
  icon: ReactNode
  tone?: 'blue' | 'green' | 'slate'
}

function InfrastructureNode({ label, detail, icon, tone = 'blue' }: InfrastructureNodeProps) {
  const toneStyles = {
    blue: 'border-primary/25 bg-primary/[0.04] text-primary',
    green: 'border-security/25 bg-security/[0.04] text-security',
    slate: 'border-border bg-slate-50 text-muted',
  }

  return (
    <div className={`relative z-10 flex min-w-[150px] items-center gap-3 rounded-xl border px-3 py-3 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:min-w-[175px] ${toneStyles[tone]}`}>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">{icon}</span>
      <div className="min-w-0 text-left">
        <p className="truncate text-sm font-semibold text-ink">{label}</p>
        <p className="mt-0.5 truncate text-[11px] text-muted">{detail}</p>
      </div>
      <span className="ml-auto h-2 w-2 shrink-0 rounded-full bg-security" aria-label={`${label}: operativo`} />
    </div>
  )
}

function Connector({ branch = false }: { branch?: boolean }) {
  return <span className={branch ? 'infrastructure-connector infrastructure-connector-branch' : 'infrastructure-connector'} aria-hidden="true"><ArrowDown className="h-3.5 w-3.5" /></span>
}

export function InfrastructureMap() {
  return (
    <article className="tech-frame overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            <Network className="h-4 w-4 text-primary" aria-hidden="true" />
            <span>Flujo de infraestructura</span>
          </div>
          <h3 className="mt-2 text-lg font-semibold tracking-tight text-ink">Vista resumida de arquitectura</h3>
        </div>
        <StatusBadge label="Operativa" detail="6 capas" compact />
      </div>
      <div className="overflow-x-auto px-5 py-7 sm:px-8 sm:py-9">
        <div className="mx-auto flex min-w-[340px] max-w-[700px] flex-col items-center">
          <InfrastructureNode label="Internet" detail="Entrada pública" icon={<Globe2 className="h-5 w-5" aria-hidden="true" />} tone="slate" />
          <Connector />
          <InfrastructureNode label="Route 53" detail="Resolución DNS" icon={<Cloud className="h-5 w-5" aria-hidden="true" />} />
          <Connector />
          <InfrastructureNode label="CloudFront" detail="Distribución global" icon={<Cloud className="h-5 w-5" aria-hidden="true" />} />
          <Connector />
          <div className="relative w-full pt-1">
            <div className="mx-auto flex w-fit">
              <InfrastructureNode label="VPC" detail="Red privada virtual" icon={<Network className="h-5 w-5" aria-hidden="true" />} tone="green" />
            </div>
            <div className="relative mt-10 grid grid-cols-2 gap-4 sm:gap-12">
              <span className="absolute left-1/4 right-1/4 top-[-20px] h-px bg-border" aria-hidden="true" />
              <span className="absolute left-1/4 top-[-20px] h-5 w-px bg-border" aria-hidden="true" />
              <span className="absolute right-1/4 top-[-20px] h-5 w-px bg-border" aria-hidden="true" />
              <div className="flex justify-center"><InfrastructureNode label="EC2" detail="Cómputo activo" icon={<Server className="h-5 w-5" aria-hidden="true" />} /></div>
              <div className="flex justify-center"><InfrastructureNode label="RDS" detail="Base de datos" icon={<Database className="h-5 w-5" aria-hidden="true" />} tone="green" /></div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-muted">
          <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-security" />Operativo</span>
          <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-security" />Flujo protegido</span>
          <span className="inline-flex items-center gap-1.5"><span className="h-px w-4 bg-border" />Conexión lógica</span>
        </div>
      </div>
    </article>
  )
}
