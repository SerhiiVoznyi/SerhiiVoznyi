import { type RefObject, useEffect } from 'react'
import { useMediaQuery, useReducedMotion } from '@mantine/hooks'

/**
 * Writes the pointer offset (-1..1 from viewport centre) to `--parallax-x` / `--parallax-y` on
 * the node, once per animation frame. Layers turn that into movement in CSS, so pointer motion
 * never re-renders React.
 */
export const usePointerParallax = (ref: RefObject<HTMLElement | null>) => {
  const reducedMotion = useReducedMotion()
  const finePointer = useMediaQuery('(pointer: fine)')
  const enabled = finePointer && !reducedMotion

  useEffect(() => {
    const node = ref.current
    if (!node || !enabled) return

    let frame = 0
    let x = 0
    let y = 0

    const write = () => {
      frame = 0
      node.style.setProperty('--parallax-x', x.toFixed(3))
      node.style.setProperty('--parallax-y', y.toFixed(3))
    }

    const onMove = (event: PointerEvent) => {
      x = (event.clientX / window.innerWidth) * 2 - 1
      y = (event.clientY / window.innerHeight) * 2 - 1
      if (!frame) frame = requestAnimationFrame(write)
    }

    const onLeave = () => {
      x = 0
      y = 0
      if (!frame) frame = requestAnimationFrame(write)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)

    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(frame)
      node.style.removeProperty('--parallax-x')
      node.style.removeProperty('--parallax-y')
    }
  }, [ref, enabled])
}
