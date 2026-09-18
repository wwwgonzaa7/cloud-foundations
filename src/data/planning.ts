export interface PlanningOption {
  value: string
  label: string
}

export interface RegionOption extends PlanningOption {
  location: string
}

export const applicationTypes: PlanningOption[] = [
  { value: 'web', label: 'Aplicación web' },
  { value: 'api', label: 'API o backend' },
  { value: 'data', label: 'Procesamiento de datos' },
  { value: 'mobile', label: 'Aplicación móvil' },
  { value: 'static', label: 'Sitio estático' },
]

export const planningRegions: RegionOption[] = [
  { value: 'us-east-1', label: 'us-east-1 · N. Virginia', location: 'Estados Unidos · Costa este' },
  { value: 'us-east-2', label: 'us-east-2 · Ohio', location: 'Estados Unidos · Centro este' },
  { value: 'us-west-2', label: 'us-west-2 · Oregon', location: 'Estados Unidos · Costa oeste' },
  { value: 'eu-west-1', label: 'eu-west-1 · Ireland', location: 'Europa · Irlanda' },
]

export const availabilityLevels: PlanningOption[] = [
  { value: 'development', label: 'Desarrollo' },
  { value: 'high', label: 'Alta disponibilidad' },
  { value: 'mission-critical', label: 'Misión crítica' },
]

export const migrationObjectives: PlanningOption[] = [
  { value: 'migrate', label: 'Migrar desde infraestructura local' },
  { value: 'modernize', label: 'Modernizar una aplicación existente' },
  { value: 'new-solution', label: 'Crear una solución nueva en Cloud' },
  { value: 'optimize', label: 'Reducir costos operativos' },
]
