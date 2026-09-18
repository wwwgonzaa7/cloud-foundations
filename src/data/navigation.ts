import {
  Banknote,
  Boxes,
  Cloud,
  LayoutDashboard,
  LockKeyhole,
  Network,
  Server,
} from 'lucide-react'
import type { NavigationGroup } from '../types/navigation'

export const navigationGroups: NavigationGroup[] = [
  {
    label: 'Operaciones',
    items: [
      {
        label: 'Panel',
        path: '/dashboard',
        icon: LayoutDashboard,
        description: 'Resumen operativo',
      },
      {
        label: 'Planificación Cloud',
        path: '/planning',
        icon: Cloud,
        description: 'Planifica cargas de trabajo Cloud',
      },
      {
        label: 'Costos',
        path: '/costs',
        icon: Banknote,
        description: 'Supervisa el gasto Cloud',
      },
    ],
  },
  {
    label: 'Arquitectura',
    items: [
      {
        label: 'Infraestructura global',
        path: '/infrastructure',
        icon: Server,
        description: 'Regiones y capacidad',
      },
      {
        label: 'Seguridad',
        path: '/security',
        icon: LockKeyhole,
        description: 'Postura de seguridad',
      },
      {
        label: 'Arquitectura de red',
        path: '/network',
        icon: Network,
        description: 'Topología de red',
      },
      {
        label: 'Servicios AWS',
        path: '/services',
        icon: Boxes,
        description: 'Catálogo de servicios',
      },
    ],
  },
]

export const allNavigationItems = navigationGroups.flatMap((group) => group.items)

export const region = {
  code: 'us-east-1',
  name: 'N. Virginia',
}

export const systemStatus = {
  label: 'Todos los sistemas operativos',
  detail: 'Última revisión: ahora',
}
