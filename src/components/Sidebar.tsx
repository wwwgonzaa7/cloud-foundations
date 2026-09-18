import { Activity, ChevronRight, CloudCog, Globe2, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { navigationGroups, region } from '../data/navigation'
import { cn } from '../utils/cn'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      <div
        className={cn('fixed inset-0 z-30 bg-sidebar/40 transition-opacity duration-200 md:hidden', isOpen ? 'opacity-100' : 'pointer-events-none opacity-0')}
        aria-hidden="true"
      >
        <button className="absolute inset-0 h-full w-full cursor-default" onClick={onClose} aria-label="Cerrar menú" />
      </div>

      <aside
        id="main-navigation"
        className={cn(
          'sidebar-shell fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-white/10 text-white shadow-xl shadow-slate-950/10 transition-[transform,width] duration-200 ease-out',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'md:translate-x-0 md:max-lg:w-20 lg:w-72',
        )}
        aria-label="Navegación principal"
      >
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-5 md:max-lg:justify-center md:max-lg:px-2">
          <NavLink to="/dashboard" onClick={onClose} className="flex min-w-0 items-center gap-3 rounded-lg outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary">
              <span className="sidebar-brand-mark flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary">
              <CloudCog className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="min-w-0 md:max-lg:hidden">
              <span className="block truncate text-sm font-semibold tracking-tight">CloudOps Dashboard</span>
              <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400">Centro de control</span>
            </span>
          </NavLink>
          <button onClick={onClose} className="rounded-md p-1.5 text-slate-400 transition hover:bg-white/10 hover:text-white md:hidden" aria-label="Cerrar menú">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="border-b border-white/10 p-4 md:max-lg:px-2 md:max-lg:py-4">
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3 md:max-lg:flex md:max-lg:justify-center md:max-lg:p-2" title={`Región activa: ${region.code}`}>
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              <Globe2 className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              <span className="md:max-lg:hidden">Región activa</span>
            </div>
            <div className="mt-2 flex items-center justify-between md:max-lg:hidden">
              <div>
                <p className="text-sm font-semibold text-white">{region.code}</p>
                <p className="text-xs text-slate-400">{region.name}</p>
              </div>
              <span className="relative flex h-2.5 w-2.5" aria-label="Región disponible">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-security opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-security" />
              </span>
            </div>
            <span className="hidden h-2.5 w-2.5 rounded-full bg-security md:max-lg:block" aria-label={`Región activa ${region.code}`} />
          </div>
        </div>

        <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-5 md:max-lg:px-2" aria-label="Secciones del panel">
          {navigationGroups.map((group) => (
            <div key={group.label} className="mb-6 last:mb-0">
              <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 md:max-lg:hidden">{group.label}</p>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      title={item.label}
                      className={({ isActive }) =>
                        cn(
                          'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary md:max-lg:justify-center md:max-lg:px-2',
                          isActive ? 'sidebar-nav-active text-white' : 'text-slate-400 hover:bg-white/[0.06] hover:text-slate-100',
                        )
                      }
                    >
                      <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
                      <span className="truncate md:max-lg:hidden">{item.label}</span>
                      <ChevronRight className="ml-auto h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-60 md:max-lg:hidden" aria-hidden="true" />
                    </NavLink>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-white/10 p-4 md:max-lg:flex md:max-lg:justify-center md:max-lg:p-3">
          <div className="flex items-center gap-3 text-xs text-slate-400 md:max-lg:block" title="Estado del sistema: todos los sistemas operativos">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-security/10 text-security">
              <Activity className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="md:max-lg:hidden">
              <p className="font-medium text-slate-300">CloudOps v0.1.0</p>
              <p className="mt-0.5">Plano de control frontend</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
