export type NetworkNodeId = 'internet' | 'route53' | 'cloudfront' | 'vpc' | 'ec2' | 'rds'

export interface NetworkNode {
  id: NetworkNodeId
  label: string
  detail: string
  description: string
  layer: string
  status: 'Operativo'
  accent: 'slate' | 'blue' | 'green' | 'amber'
}

export const networkNodes: NetworkNode[] = [
  {
    id: 'internet',
    label: 'Internet',
    detail: 'Entrada pública',
    description: 'Punto de entrada de los usuarios y de las solicitudes que llegan a la solución Cloud.',
    layer: 'Acceso público',
    status: 'Operativo',
    accent: 'slate',
  },
  {
    id: 'route53',
    label: 'Route 53',
    detail: 'Resolución DNS',
    description: 'Resuelve el nombre del dominio y dirige las solicitudes hacia el punto de distribución adecuado.',
    layer: 'Direccionamiento',
    status: 'Operativo',
    accent: 'blue',
  },
  {
    id: 'cloudfront',
    label: 'CloudFront',
    detail: 'Distribución global',
    description: 'Distribuye contenido desde ubicaciones cercanas y actúa como capa de entrada hacia la VPC.',
    layer: 'Entrega de contenido',
    status: 'Operativo',
    accent: 'blue',
  },
  {
    id: 'vpc',
    label: 'VPC',
    detail: 'Red privada virtual',
    description: 'Aísla y organiza la infraestructura interna de la solución con límites de red definidos.',
    layer: 'Red privada',
    status: 'Operativo',
    accent: 'green',
  },
  {
    id: 'ec2',
    label: 'EC2',
    detail: 'Cómputo de aplicación',
    description: 'Ejecuta la lógica de la aplicación dentro de la red privada y recibe el tráfico permitido.',
    layer: 'Cómputo',
    status: 'Operativo',
    accent: 'blue',
  },
  {
    id: 'rds',
    label: 'RDS',
    detail: 'Persistencia de datos',
    description: 'Proporciona la base de datos administrada que almacena la información de la aplicación.',
    layer: 'Datos',
    status: 'Operativo',
    accent: 'green',
  },
]

export const networkFlow: NetworkNodeId[] = ['internet', 'route53', 'cloudfront', 'vpc']

export const networkSummary = {
  nodes: networkNodes.length,
  publicLayers: 3,
  privateLayers: 3,
  connections: 5,
}
