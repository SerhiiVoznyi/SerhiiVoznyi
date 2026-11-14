import { createContext } from 'react'

export type ViewMode = 'spread' | 'single'
export type FxMode = 'full' | 'reduced'

export const ZOOM_MIN = 1
export const ZOOM_MAX = 2.5
export const ZOOM_STEP = 0.5

export type ReaderValue = {
  viewMode: ViewMode
  canToggleView: boolean
  toggleViewMode: () => void
  zoom: number
  zoomIn: () => void
  zoomOut: () => void
  zoomTo: (zoom: number) => void
  resetZoom: () => void
  fx: FxMode
  toggleFx: () => void
}

export const ReaderContext = createContext<ReaderValue | null>(null)
