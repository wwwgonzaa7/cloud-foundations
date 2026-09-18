export type SecurityState = 'Seguro' | 'Atención' | 'Riesgo'

export type SecurityIconName =
  | 'access'
  | 'account'
  | 'authentication'
  | 'compliance'
  | 'data'
  | 'encryption'
  | 'identity'
  | 'permissions'
  | 'roles'
  | 'transit'

export interface SecurityIndicator {
  id: string
  title: string
  summary: string
  detail: string
  state: SecurityState
  icon: SecurityIconName
}

export const sharedResponsibilityModel = {
  provider: {
    title: 'Responsabilidad del proveedor Cloud',
    eyebrow: 'Seguridad de la Cloud',
    summary: 'AWS protege la infraestructura que ejecuta los servicios Cloud.',
    controls: ['Hardware y centros de datos', 'Red física y virtualización', 'Regiones y disponibilidad'],
  },
  customer: {
    title: 'Responsabilidad del cliente',
    eyebrow: 'Seguridad en la Cloud',
    summary: 'El equipo define cómo se usan, protegen y gobiernan sus recursos.',
    controls: ['Identidades y permisos', 'Datos y cifrado', 'Configuración y cumplimiento'],
  },
}

export const iamIndicators: SecurityIndicator[] = [
  {
    id: 'identity-management',
    title: 'Gestión de identidades',
    summary: 'Identidades centralizadas',
    detail: 'Ciclo de vida definido para cada acceso',
    state: 'Seguro',
    icon: 'identity',
  },
  {
    id: 'users-roles',
    title: 'Usuarios y roles',
    summary: 'Roles separados por función',
    detail: 'Revisión pendiente de 2 roles de ejemplo',
    state: 'Atención',
    icon: 'roles',
  },
  {
    id: 'permissions',
    title: 'Permisos',
    summary: 'Principio de mínimo privilegio',
    detail: 'Políticas evaluadas localmente',
    state: 'Seguro',
    icon: 'permissions',
  },
  {
    id: 'access-control',
    title: 'Control de acceso',
    summary: 'Una política requiere ajuste',
    detail: 'Reducir permisos heredados antes del despliegue',
    state: 'Riesgo',
    icon: 'access',
  },
]

export const accountProtectionIndicators: SecurityIndicator[] = [
  {
    id: 'account-access',
    title: 'Control de acceso',
    summary: 'Acceso administrativo restringido',
    detail: 'Revisión semanal activa',
    state: 'Seguro',
    icon: 'account',
  },
  {
    id: 'authentication',
    title: 'Autenticación',
    summary: 'Verificación reforzada habilitada',
    detail: 'MFA requerida para perfiles críticos',
    state: 'Seguro',
    icon: 'authentication',
  },
  {
    id: 'account-permissions',
    title: 'Permisos de cuenta',
    summary: 'Permisos heredados detectados',
    detail: 'Validar antes de promover la solución',
    state: 'Atención',
    icon: 'permissions',
  },
  {
    id: 'account-protection',
    title: 'Protección de la cuenta',
    summary: 'Guardas de configuración activas',
    detail: 'Sin eventos de riesgo en el escenario de ejemplo',
    state: 'Seguro',
    icon: 'access',
  },
]

export const dataProtectionIndicators: SecurityIndicator[] = [
  {
    id: 'stored-data',
    title: 'Datos almacenados',
    summary: 'Almacenamiento clasificado',
    detail: 'Los repositorios críticos están identificados',
    state: 'Seguro',
    icon: 'data',
  },
  {
    id: 'data-transit',
    title: 'Datos en tránsito',
    summary: 'Canales cifrados',
    detail: 'Conexiones seguras previstas en la arquitectura',
    state: 'Atención',
    icon: 'transit',
  },
  {
    id: 'encryption',
    title: 'Cifrado',
    summary: 'Cifrado definido por política',
    detail: 'Claves y rotación se documentarán en la siguiente fase',
    state: 'Seguro',
    icon: 'encryption',
  },
  {
    id: 'information-protection',
    title: 'Protección de información',
    summary: 'Clasificación de datos preparada',
    detail: 'Cobertura de ejemplo para datos sensibles y operativos',
    state: 'Seguro',
    icon: 'data',
  },
]

export const securitySummary = {
  controls: iamIndicators.length + accountProtectionIndicators.length + dataProtectionIndicators.length,
  secure: [...iamIndicators, ...accountProtectionIndicators, ...dataProtectionIndicators].filter((item) => item.state === 'Seguro').length,
  attention: [...iamIndicators, ...accountProtectionIndicators, ...dataProtectionIndicators].filter((item) => item.state === 'Atención').length,
  risk: [...iamIndicators, ...accountProtectionIndicators, ...dataProtectionIndicators].filter((item) => item.state === 'Riesgo').length,
}

export const complianceStatus = {
  state: 'Seguro' as const,
  title: 'Cumplimiento controlado',
  detail: 'Los controles definidos tienen una cobertura inicial suficiente para continuar la planificación.',
  framework: 'Controles base Cloud Foundations',
  reviewed: '12 controles revisados',
}
