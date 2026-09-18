import {
  Banknote,
  Boxes,
  Database,
  Layers3,
  LockKeyhole,
  Server,
  ShieldCheck,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { serviceSummary } from './services'

export type DashboardTone = 'primary' | 'success' | 'warning' | 'danger'

export interface DashboardMetric {
  label: string
  value: string
  helper: string
  secondary: string
  icon: LucideIcon
  tone: DashboardTone
}

export const dashboardMetrics: DashboardMetric[] = [
  {
    label: 'Servicios utilizados',
    value: serviceSummary.used.toString(),
    helper: 'servicios en uso',
    secondary: 'catálogo local sincronizado',
    icon: Boxes,
    tone: 'primary',
  },
  {
    label: 'Recursos Cloud',
    value: '42',
    helper: 'recursos registrados',
    secondary: '26 en producción',
    icon: Server,
    tone: 'primary',
  },
  {
    label: 'Costo mensual estimado',
    value: 'US$ 184.60',
    helper: 'proyección del mes',
    secondary: 'dentro del presupuesto',
    icon: Banknote,
    tone: 'warning',
  },
  {
    label: 'Costo anual estimado',
    value: 'US$ 2,215.20',
    helper: 'proyección a 12 meses',
    secondary: '−4.2% vs. periodo anterior',
    icon: Layers3,
    tone: 'warning',
  },
  {
    label: 'Estado de seguridad',
    value: 'Seguro',
    helper: 'controles verificados',
    secondary: '4 de 4 activos',
    icon: ShieldCheck,
    tone: 'success',
  },
  {
    label: 'Estado de arquitectura',
    value: 'Saludable',
    helper: 'capas conectadas',
    secondary: '6 de 6 operativas',
    icon: LockKeyhole,
    tone: 'success',
  },
]

export const dashboardRegion = {
  code: 'us-east-1',
  name: 'N. Virginia',
  location: 'Estados Unidos · Costa este',
  services: serviceSummary.used,
  resources: 42,
  status: 'Operativa',
  statusDetail: 'Sin interrupciones registradas',
}

export interface CostDistributionItem {
  service: 'EC2' | 'S3' | 'RDS' | 'CloudFront' | 'Route 53'
  amount: number
  color: string
}

export const costDistribution: CostDistributionItem[] = [
  { service: 'EC2', amount: 78.4, color: '#2563EB' },
  { service: 'RDS', amount: 42.8, color: '#16A34A' },
  { service: 'CloudFront', amount: 27.6, color: '#F59E0B' },
  { service: 'S3', amount: 21.2, color: '#0F766E' },
  { service: 'Route 53', amount: 14.6, color: '#64748B' },
]

export interface SecurityControl {
  label: string
  detail: string
  status: 'Seguro' | 'Atención' | 'Riesgo'
}

export const securityControls: SecurityControl[] = [
  { label: 'IAM', detail: 'Accesos revisados', status: 'Seguro' },
  { label: 'Protección de cuenta', detail: 'MFA habilitado', status: 'Seguro' },
  { label: 'Protección de datos', detail: 'Cifrado configurado', status: 'Atención' },
  { label: 'Cumplimiento', detail: 'Políticas verificadas', status: 'Seguro' },
]

export interface ArchitectureLayer {
  label: 'VPC' | 'Subredes' | 'EC2' | 'RDS' | 'Route 53' | 'CloudFront'
  status: 'Operativo' | 'Atención'
}

export const architectureLayers: ArchitectureLayer[] = [
  { label: 'VPC', status: 'Operativo' },
  { label: 'Subredes', status: 'Operativo' },
  { label: 'EC2', status: 'Operativo' },
  { label: 'RDS', status: 'Operativo' },
  { label: 'Route 53', status: 'Operativo' },
  { label: 'CloudFront', status: 'Operativo' },
]

export const architectureSummary = {
  status: 'Arquitectura saludable',
  detail: '6 capas operativas · última revisión hace 2 min',
}

export const dashboardTotals = {
  monthlyCost: 'US$ 184.60',
  annualCost: 'US$ 2,215.20',
}
