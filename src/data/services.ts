export type ServiceUsage = 'En uso' | 'No utilizado'

import { Activity, Box, Database, Globe2, KeyRound, Network, Server } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface AwsService {
  id: string
  name: string
  category: string
  description: string
  primaryFunction: string
  usage: ServiceUsage
  usageDetail: string
  icon: LucideIcon
}

export const awsServices: AwsService[] = [
  {
    id: 'ec2',
    name: 'EC2',
    category: 'Cómputo y almacenamiento',
    description: 'Capacidad de cómputo escalable para ejecutar la aplicación dentro de la infraestructura Cloud.',
    primaryFunction: 'Ejecutar cargas de trabajo',
    usage: 'En uso',
    usageDetail: '2 instancias previstas en la solución',
    icon: Server,
  },
  {
    id: 's3',
    name: 'S3',
    category: 'Cómputo y almacenamiento',
    description: 'Almacenamiento de objetos para archivos, activos y respaldos de la solución.',
    primaryFunction: 'Almacenar objetos',
    usage: 'En uso',
    usageDetail: 'Repositorio de activos configurado',
    icon: Box,
  },
  {
    id: 'rds',
    name: 'RDS',
    category: 'Datos',
    description: 'Base de datos relacional administrada para persistir la información de la aplicación.',
    primaryFunction: 'Gestionar datos relacionales',
    usage: 'En uso',
    usageDetail: 'Capa de datos de la solución',
    icon: Database,
  },
  {
    id: 'iam',
    name: 'IAM',
    category: 'Seguridad e identidad',
    description: 'Controla identidades, roles y permisos para limitar el acceso a los recursos Cloud.',
    primaryFunction: 'Gestionar acceso',
    usage: 'En uso',
    usageDetail: 'Roles y permisos definidos como ejemplo',
    icon: KeyRound,
  },
  {
    id: 'vpc',
    name: 'VPC',
    category: 'Red y entrega',
    description: 'Red virtual aislada que define los límites y la conectividad de la infraestructura interna.',
    primaryFunction: 'Aislar la red Cloud',
    usage: 'En uso',
    usageDetail: 'Contenedor de EC2 y RDS',
    icon: Network,
  },
  {
    id: 'route53',
    name: 'Route 53',
    category: 'Red y entrega',
    description: 'Servicio de nombres que dirige las solicitudes hacia el punto de entrada de la solución.',
    primaryFunction: 'Resolver dominios',
    usage: 'En uso',
    usageDetail: 'Entrada DNS de la arquitectura',
    icon: Globe2,
  },
  {
    id: 'cloudfront',
    name: 'CloudFront',
    category: 'Red y entrega',
    description: 'Red de distribución que entrega contenido con menor latencia desde ubicaciones cercanas.',
    primaryFunction: 'Distribuir contenido',
    usage: 'En uso',
    usageDetail: 'Capa de distribución global',
    icon: Globe2,
  },
  {
    id: 'cloudwatch',
    name: 'CloudWatch',
    category: 'Observabilidad',
    description: 'Servicio previsto para métricas, registros y señales operativas de los recursos Cloud.',
    primaryFunction: 'Observar la operación',
    usage: 'No utilizado',
    usageDetail: 'Reservado para una fase posterior',
    icon: Activity,
  },
]

export const serviceCategories = ['Todos', ...Array.from(new Set(awsServices.map((service) => service.category)))]

export const serviceSummary = {
  total: awsServices.length,
  used: awsServices.filter((service) => service.usage === 'En uso').length,
  unused: awsServices.filter((service) => service.usage === 'No utilizado').length,
  categories: serviceCategories.length - 1,
}
