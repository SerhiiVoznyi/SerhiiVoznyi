import { type RefObject, useEffect } from 'react'

const THRESHOLD = 140
const COOLDOWN_MS = 700
// Trackpad momentum keeps emitting wheel events after an inner scroller hits its end;
// a fresh gesture is required before the stack itself moves.
const MOMENTUM_GRACE_MS = 450

const canScrollInside = (
  target: EventTarget | null,
  root: HTMLElement,
  deltaY: number,
) => {
  let element = target instanceof Element ? target : null
  while (element && element !== root) {
    if (
      element instanceof HTMLElement &&
      element.scrollHeight > element.clientHeight + 1
    ) {
      const { overflowY } = getComputedStyle(element)
      if (overflowY === 'auto' || overflowY === 'scroll') {
        if (
          deltaY > 0 &&
          element.scrollTop + element.clientHeight < element.scrollHeight - 1
        ) {
          return true
        }
        if (deltaY < 0 && element.scrollTop > 0) return true
      }
    }
    element = element.parentElement
  }
  return false
}

/** Wheel past the end of a sheet's own scroll pushes deeper through the stack. */
export const useScrollDepth = (
  ref: RefObject<HTMLElement | null>,
  advance: (step: 1 | -1) => void,
  enabled: boolean,
) => {
  useEffect(() => {
    const node = ref.current
    if (!node || !enabled) return

    let accumulated = 0
    let lockedUntil = 0
    let lastInnerScroll = 0

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaY) < Math.abs(event.deltaX)) return

      const now = performance.now()
      if (canScrollInside(event.target, node, event.deltaY)) {
        accumulated = 0
        lastInnerScroll = now
        return
      }

      event.preventDefault()
      // One stack step per gesture: events still streaming in keep extending the grace window.
      if (now < lockedUntil || now - lastInnerScroll < MOMENTUM_GRACE_MS) {
        lastInnerScroll = now
        return
      }

      accumulated += event.deltaY
      if (Math.abs(accumulated) >= THRESHOLD) {
        advance(accumulated > 0 ? 1 : -1)
        accumulated = 0
        lockedUntil = now + COOLDOWN_MS
      }
    }

    node.addEventListener('wheel', onWheel, { passive: false })
    return () => node.removeEventListener('wheel', onWheel)
  }, [ref, advance, enabled])
}
