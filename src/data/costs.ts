import { awsServices } from './services'
import type { LucideIcon } from 'lucide-react'

export interface CostServiceCatalogItem {
  id: string
  name: 'EC2' | 'S3' | 'RDS' | 'CloudFront' | 'Route 53' | 'CloudWatch' | 'VPC' | 'IAM'
  category: string
  description: string
  unitRate: number
  icon: LucideIcon
}

export interface CostEstimateItem {
  serviceId: string
  quantity: number
  hours: number
}

export const HOURS_PER_MONTH = 730

const simulatedUnitRates: Record<string, number> = {
  ec2: 0.085,
  s3: 0.018,
  rds: 0.142,
  cloudfront: 0.034,
  route53: 0.012,
  cloudwatch: 0.009,
  vpc: 0.006,
  iam: 0.001,
}

export const costServiceCatalog: CostServiceCatalogItem[] = awsServices.map((service) => ({
  id: service.id,
  name: service.name as CostServiceCatalogItem['name'],
  category: service.category,
  description: service.description,
  unitRate: simulatedUnitRates[service.id],
  icon: service.icon,
}))

export const mockPricingNote = 'Tarifas simuladas para la práctica; no representan precios reales de AWS.'

export function calculateMonthlyCost(item: CostEstimateItem, service: CostServiceCatalogItem) {
  return item.quantity * item.hours * service.unitRate
}
