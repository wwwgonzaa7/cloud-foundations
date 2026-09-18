import type { LucideIcon } from 'lucide-react'

export interface NavigationItem {
  label: string
  path: string
  icon: LucideIcon
  description: string
}

export interface NavigationGroup {
  label: string
  items: NavigationItem[]
}
