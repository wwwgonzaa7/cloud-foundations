import { Bell, Menu, MapPin } from 'lucide-react'
import { StatusBadge } from './StatusBadge'
import { region, systemStatus } from '../data/navigation'

interface HeaderProps {
  title: string
  description: string
  onOpenMenu: () => void
  isMenuOpen: boolean
}

export function Header({ title, description, onOpenMenu, isMenuOpen }: HeaderProps) {
  return (
    <header className="app-header sticky top-0 z-20 border-b border-border/80 bg-canvas/95 backdrop-blur-sm">
      <div className="flex min-h-[76px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            onClick={onOpenMenu}
            aria-controls="main-navigation"
            aria-expanded={isMenuOpen}
            className="rounded-lg border border-border bg-card p-2 text-muted shadow-sm transition hover:border-cyan-300/40 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:hidden"
            aria-label="Abrir menú de navegación"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="min-w-0">
            <div className="mb-0.5 hidden items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted sm:flex">
              <span>CloudOps</span>
              <span className="text-border">/</span>
              <span>Centro de control</span>
            </div>
            <h1 className="truncate text-lg font-semibold tracking-tight text-ink sm:text-xl">{title}</h1>
            <p className="hidden truncate text-xs text-muted sm:block">{description}</p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 sm:flex" aria-label={`Región activa: ${region.code}`}>
            <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
            <div className="text-left leading-none">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">Región</p>
              <p className="mt-1 text-xs font-semibold text-ink">{region.code}</p>
            </div>
          </div>
          <StatusBadge label="Operativo" detail="Todos los sistemas" compact />
          <button
            className="hidden rounded-lg border border-border bg-card p-2 text-muted transition hover:border-cyan-300/40 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:block"
            aria-label="Notificaciones"
            title="Notificaciones"
          >
            <Bell className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="sr-only">{systemStatus.label}: {systemStatus.detail}</div>
    </header>
  )
}
