import {
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
} from 'react'

import type { CSSVars } from '@/lib/cx'
import { useReader } from '@/lib/reader'

const DRAG_THRESHOLD = 5

const clamp = (value: number, limit: number) => Math.min(limit, Math.max(-limit, value))

export const SpreadStage = ({ children }: { children: ReactNode }) => {
  const { viewMode, zoom } = useReader()
  const canvasRef = useRef<HTMLDivElement>(null)
  const pan = useRef({ x: 0, y: 0 })
  const drag = useRef({
    active: false,
    moved: false,
    startX: 0,
    startY: 0,
    fromX: 0,
    fromY: 0,
  })

  const writePan = useCallback(
    (x: number, y: number) => {
      const node = canvasRef.current
      if (!node) return
      const next = {
        x: clamp(x, (node.offsetWidth * (zoom - 1)) / 2),
        y: clamp(y, (node.offsetHeight * (zoom - 1)) / 2),
      }
      pan.current = next
      node.style.setProperty('--stage-pan-x', `${next.x}px`)
      node.style.setProperty('--stage-pan-y', `${next.y}px`)
    },
    [zoom],
  )

  useEffect(() => {
    writePan(pan.current.x, pan.current.y)
  }, [writePan])

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (zoom <= 1 || event.button !== 0) return
    drag.current = {
      active: true,
      moved: false,
      startX: event.clientX,
      startY: event.clientY,
      fromX: pan.current.x,
      fromY: pan.current.y,
    }
  }

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const state = drag.current
    if (!state.active) return
    const dx = event.clientX - state.startX
    const dy = event.clientY - state.startY
    if (!state.moved) {
      if (Math.hypot(dx, dy) < DRAG_THRESHOLD) return
      state.moved = true
      event.currentTarget.setPointerCapture(event.pointerId)
      event.currentTarget.dataset.dragging = ''
    }
    writePan(state.fromX + dx, state.fromY + dy)
  }

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    drag.current.active = false
    delete event.currentTarget.dataset.dragging
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  // A pan gesture must not also count as a click on whatever sheet it started over.
  const onClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    if (!drag.current.moved) return
    drag.current.moved = false
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <div
      className="spread-stage"
      data-view={viewMode}
      data-zoomed={zoom > 1 ? '' : undefined}>
      <div
        className="spread-stage__viewport"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}>
        <div
          ref={canvasRef}
          className="spread-stage__canvas"
          style={{ '--stage-scale': zoom } as CSSVars}>
          {children}
        </div>
      </div>
      <span
        className="spread-stage__frame"
        aria-hidden="true"
      />
    </div>
  )
}
