import { Globe2, MapPin, Minus, Plus } from 'lucide-react'
import { useEffect, useState, type PointerEvent as ReactPointerEvent, type WheelEvent as ReactWheelEvent } from 'react'
import type { InfrastructureRegion } from '../data/infrastructure'
import { regionPresentation } from '../data/infrastructure'
import { cn } from '../utils/cn'

interface GlobalInfrastructureMapProps {
  regions: InfrastructureRegion[]
  selectedRegionId: string
  onSelectRegion: (regionId: string) => void
}

interface GlobeView {
  rotationX: number
  rotationY: number
  zoom: number
}

interface DragState {
  x: number
  y: number
}

function getMarkerTone(status: InfrastructureRegion['status']) {
  if (status === 'Operativa') return 'bg-success'
  if (status === 'Atención') return 'bg-warning'
  return 'bg-danger'
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function getPresentation(regionId: string) {
  return regionPresentation[regionId] ?? { country: 'Ubicación global', flag: '🌐', globeX: 50, globeY: 50 }
}

function focusView(regionId: string): GlobeView {
  const presentation = getPresentation(regionId)
  return {
    rotationX: clamp((50 - presentation.globeY) * 0.08, -10, 10),
    rotationY: clamp((50 - presentation.globeX) * 0.22, -10, 10),
    zoom: 1.06,
  }
}

export function GlobalInfrastructureMap({ regions, selectedRegionId, onSelectRegion }: GlobalInfrastructureMapProps) {
  const selectedRegion = regions.find((region) => region.id === selectedRegionId) ?? regions[0]
  const [view, setView] = useState<GlobeView>(() => focusView(selectedRegionId))
  const [isDragging, setIsDragging] = useState(false)
  const [dragState, setDragState] = useState<DragState | null>(null)

  useEffect(() => {
    setView(focusView(selectedRegionId))
  }, [selectedRegionId])

  if (!selectedRegion) return null

  const selectedPresentation = getPresentation(selectedRegion.id)
  const contentTransform = `translate(${(50 - selectedPresentation.globeX) * 0.12}%, ${(50 - selectedPresentation.globeY) * 0.06}%) rotateX(${view.rotationX}deg) rotateY(${view.rotationY}deg) scale(${view.zoom})`

  function selectRegion(regionId: string) {
    onSelectRegion(regionId)
    setView(focusView(regionId))
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest('button')) return
    event.currentTarget.setPointerCapture(event.pointerId)
    setDragState({ x: event.clientX, y: event.clientY })
    setIsDragging(true)
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!dragState) return
    const deltaX = event.clientX - dragState.x
    const deltaY = event.clientY - dragState.y
    setDragState({ x: event.clientX, y: event.clientY })
    setView((current) => ({
      ...current,
      rotationX: clamp(current.rotationX - deltaY * 0.16, -18, 18),
      rotationY: clamp(current.rotationY + deltaX * 0.24, -24, 24),
    }))
  }

  function handlePointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
    setDragState(null)
    setIsDragging(false)
  }

  function handleWheel(event: ReactWheelEvent<HTMLDivElement>) {
    event.preventDefault()
    setView((current) => ({ ...current, zoom: clamp(current.zoom + (event.deltaY < 0 ? 0.04 : -0.04), 0.92, 1.18) }))
  }

  function adjustZoom(amount: number) {
    setView((current) => ({ ...current, zoom: clamp(current.zoom + amount, 0.92, 1.18) }))
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-white shadow-panel" aria-labelledby="mapa-global-title">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-5 sm:px-6">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            <Globe2 size={15} aria-hidden="true" />
            <span>Plano de cobertura</span>
          </div>
          <h2 id="mapa-global-title" className="text-lg font-semibold text-ink">Vista global de regiones</h2>
          <p className="mt-1 text-sm text-muted">Explora el globo y selecciona una región para consultar su capacidad Cloud.</p>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted" aria-label="Leyenda de estados">
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-success" />Operativa</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-warning" />Atención</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-danger" />Mantenimiento</span>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div
          className={cn('globe-stage relative min-h-[420px] overflow-hidden rounded-xl border border-border', isDragging && 'is-dragging')}
          role="group"
          aria-label="Globo interactivo de regiones Cloud desplegadas"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onWheel={handleWheel}
        >
          <div className="absolute left-5 top-4 z-20 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Globo de control global
          </div>

          <div className="globe-sphere" aria-hidden="true">
            <div className="globe-surface" style={{ transform: contentTransform }}>
              <svg className="globe-svg" viewBox="0 0 800 800" role="presentation">
                <ellipse className="globe-latitude" cx="400" cy="400" rx="330" ry="145" />
                <ellipse className="globe-latitude" cx="400" cy="400" rx="330" ry="250" />
                <ellipse className="globe-latitude" cx="400" cy="400" rx="330" ry="330" />
                <ellipse className="globe-longitude" cx="400" cy="400" rx="145" ry="330" />
                <ellipse className="globe-longitude" cx="400" cy="400" rx="250" ry="330" />
                <ellipse className="globe-longitude" cx="400" cy="400" rx="330" ry="330" />
                <path className="globe-land" d="M122 232c24-35 62-61 108-68l39 19 31 36-18 34-35-2-22 28-49-5-27 28-35-22zM193 315l39 5 28 38-14 54-23 25-20 64-25 38-28-38 11-49-13-52 17-45z" />
                <path className="globe-land" d="M309 397l39-32 34 8 17 31-17 28 16 46-33 75-29 74-31 36-19-60 12-62-21-49 17-45z" />
                <path className="globe-land" d="M404 247l40-28 50 6 24 25 48 7 34 27 47 8 35 32-24 31-61-2-29 25-35-9-41 20-29-17-37 9-25-35 20-33-25-30zM515 346l27 13 14 31-23 22-27-15-9-28z" />
                <path className="globe-land" d="M464 441l37 10 19 34-23 39-22 57-36 52-33-15 10-55 23-29 3-49z" />
                <path className="globe-land" d="M619 564l44 8 31 26-25 31-43-5-26-24z" />
                <path className="globe-land" d="M687 303l22 4 13 20-17 15-21-10z" />
              </svg>

              <div className="globe-markers" role="presentation">
                {regions.map((region) => {
                  const presentation = getPresentation(region.id)
                  const isSelected = region.id === selectedRegionId

                  return (
                    <button
                      key={region.id}
                      type="button"
                      aria-label={`Seleccionar región ${region.code}, ${presentation.country}`}
                      aria-pressed={isSelected}
                      className="globe-marker group absolute -translate-x-1/2 -translate-y-1/2 rounded-full p-2 outline-none focus-visible:ring-4 focus-visible:ring-primary/25"
                      style={{ left: `${presentation.globeX}%`, top: `${presentation.globeY}%` }}
                      onClick={(event) => { event.stopPropagation(); selectRegion(region.id) }}
                    >
                      <span className={cn('globe-marker-dot block h-3.5 w-3.5 rounded-full border-2 border-white shadow-marker', getMarkerTone(region.status), isSelected && 'globe-marker-selected')} />
                      <span className={cn('globe-marker-label pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-[#0f172a]/90 px-2 py-1 text-[10px] font-semibold text-white opacity-0 shadow-lg', isSelected && 'opacity-100', 'group-hover:opacity-100')}>{region.code}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <div key={selectedRegion.id} className="globe-selection-panel detail-panel absolute bottom-4 right-4 z-20 hidden w-64 rounded-xl border border-white/10 bg-[#0f172a]/90 p-3 shadow-panel backdrop-blur-sm sm:block">
            <div className="flex items-start gap-3">
              <span className="globe-flag" role="img" aria-label={`Bandera de ${selectedPresentation.country}`}>{selectedPresentation.flag}</span>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">País seleccionado</p>
                <p className="mt-1 text-sm font-semibold text-white">{selectedPresentation.country}</p>
                <p className="mt-0.5 text-xs text-slate-400">{selectedRegion.code} · {selectedRegion.name}</p>
              </div>
              <span className={cn('mt-1 h-2.5 w-2.5 rounded-full', getMarkerTone(selectedRegion.status))} aria-hidden="true" />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/10 pt-3 text-[11px]">
              <span className="text-slate-400">Recursos <strong className="ml-1 text-white">{selectedRegion.resources}</strong></span>
              <span className="text-right text-slate-400">Latencia <strong className="ml-1 text-white">{selectedRegion.latency}</strong></span>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1 rounded-lg border border-white/10 bg-[#0f172a]/90 p-1 shadow-sm" aria-label="Controles de zoom">
            <button type="button" className="rounded p-1.5 text-slate-300 hover:bg-white/10 hover:text-white" onClick={() => adjustZoom(0.04)} aria-label="Acercar el globo"><Plus size={14} /></button>
            <span className="h-4 w-px bg-white/10" />
            <button type="button" className="rounded p-1.5 text-slate-300 hover:bg-white/10 hover:text-white" onClick={() => adjustZoom(-0.04)} aria-label="Alejar el globo"><Minus size={14} /></button>
          </div>

          <div className="absolute bottom-4 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-muted md:flex">
            <MapPin size={12} aria-hidden="true" />
            Arrastra para explorar · datos locales
          </div>
        </div>
      </div>
    </section>
  )
}
