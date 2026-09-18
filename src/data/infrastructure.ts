export type RegionStatus = 'Operativa' | 'Atención' | 'Mantenimiento'

export interface InfrastructureRegion {
  id: string
  code: string
  name: string
  location: string
  status: RegionStatus
  statusDetail: string
  services: string[]
  resources: number
  latency: string
  x: number
  y: number
}

export interface RegionPresentation {
  country: string
  flag: string
  globeX: number
  globeY: number
}

// Presentation metadata for the existing mock regions. It does not add
// infrastructure records; it only gives the globe a geographic presentation.
export const regionPresentation: Record<string, RegionPresentation> = {
  'us-east-1': { country: 'Estados Unidos', flag: '🇺🇸', globeX: 32, globeY: 35 },
  'us-west-2': { country: 'Estados Unidos', flag: '🇺🇸', globeX: 20, globeY: 37 },
  'eu-west-1': { country: 'Irlanda', flag: '🇮🇪', globeX: 48, globeY: 28 },
  'sa-east-1': { country: 'Brasil', flag: '🇧🇷', globeX: 31, globeY: 65 },
  'ap-northeast-1': { country: 'Japón', flag: '🇯🇵', globeX: 76, globeY: 36 },
}

export const infrastructureRegions: InfrastructureRegion[] = [
  {
    id: 'us-east-1',
    code: 'us-east-1',
    name: 'N. Virginia',
    location: 'Estados Unidos · Costa este',
    status: 'Operativa',
    statusDetail: 'Todos los servicios responden',
    services: ['EC2', 'S3', 'RDS', 'CloudFront', 'Route 53'],
    resources: 42,
    latency: '12 ms',
    x: 24,
    y: 43,
  },
  {
    id: 'us-west-2',
    code: 'us-west-2',
    name: 'Oregon',
    location: 'Estados Unidos · Costa oeste',
    status: 'Operativa',
    statusDetail: 'Capacidad disponible',
    services: ['EC2', 'S3', 'CloudFront', 'VPC'],
    resources: 28,
    latency: '31 ms',
    x: 13,
    y: 46,
  },
  {
    id: 'eu-west-1',
    code: 'eu-west-1',
    name: 'Ireland',
    location: 'Europa · Irlanda',
    status: 'Atención',
    statusDetail: 'Latencia elevada en 2 servicios',
    services: ['EC2', 'RDS', 'S3', 'IAM'],
    resources: 31,
    latency: '48 ms',
    x: 48,
    y: 36,
  },
  {
    id: 'sa-east-1',
    code: 'sa-east-1',
    name: 'São Paulo',
    location: 'Sudamérica · Brasil',
    status: 'Mantenimiento',
    statusDetail: 'Ventana programada activa',
    services: ['EC2', 'RDS', 'VPC'],
    resources: 16,
    latency: '105 ms',
    x: 31,
    y: 70,
  },
  {
    id: 'ap-northeast-1',
    code: 'ap-northeast-1',
    name: 'Tokyo',
    location: 'Asia · Japón',
    status: 'Operativa',
    statusDetail: 'Todos los servicios responden',
    services: ['EC2', 'S3', 'CloudFront', 'CloudWatch'],
    resources: 24,
    latency: '82 ms',
    x: 78,
    y: 43,
  },
]

export const globalInfrastructureSummary = {
  regions: infrastructureRegions.length,
  resources: infrastructureRegions.reduce((total, region) => total + region.resources, 0),
  services: new Set(infrastructureRegions.flatMap((region) => region.services)).size,
  operationalRegions: infrastructureRegions.filter((region) => region.status === 'Operativa').length,
}
