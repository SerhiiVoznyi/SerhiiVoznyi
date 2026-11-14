import { type ReactNode, useEffect, useId, useRef } from 'react'

import { type CSSVars, cx } from '../cx'
import { useSheetState } from './sheet-stack-context'

export type SheetTreatment = 'paper' | 'ink' | 'yellow'
export type SheetEdge = 'clean' | 'torn' | 'notched'

type SheetProps = {
  id: string
  index: number
  title: string
  teaser?: string
  treatment?: SheetTreatment
  edge?: SheetEdge
  /** Extra header content for the front state, e.g. a status readout. */
  aside?: ReactNode
  className?: string
  children: ReactNode
}

export const Sheet = ({
  id,
  index,
  title,
  teaser,
  treatment = 'paper',
  edge = 'clean',
  aside,
  className,
  children,
}: SheetProps) => {
  const { depth, count, isFront, wasPromoted, shouldTakeFocus, promote } =
    useSheetState(id)
  const headingId = useId()
  const headingRef = useRef<HTMLHeadingElement>(null)
  const number = String(index).padStart(2, '0')

  useEffect(() => {
    if (isFront && shouldTakeFocus) headingRef.current?.focus({ preventScroll: true })
  }, [isFront, shouldTakeFocus])

  return (
    <section
      aria-labelledby={headingId}
      className={cx('sheet', 'layer', className)}
      data-state={isFront ? 'front' : 'stacked'}
      data-promoted={isFront && wasPromoted ? '' : undefined}
      data-treatment={treatment}
      data-edge={edge}
      style={
        {
          '--layer-depth': depth,
          '--sheet-rot-sign': index % 2 === 0 ? 1 : -1,
          zIndex: count - depth,
        } as CSSVars
      }>
      <div className="sheet__paper">
        {isFront ? (
          <>
            <header className="sheet__header">
              <span
                className="sheet__index"
                aria-hidden="true">
                {number}
              </span>
              <h2
                id={headingId}
                ref={headingRef}
                tabIndex={-1}
                className="sheet__title">
                {title}
              </h2>
              {aside && <div className="sheet__aside">{aside}</div>}
            </header>
            <div
              className="sheet__body"
              tabIndex={0}>
              {children}
            </div>
          </>
        ) : (
          <>
            <h2
              id={headingId}
              className="sheet__title sheet__title--hidden">
              {title}
            </h2>
            <button
              type="button"
              className="sheet__spine"
              onClick={() => promote({ focus: true })}
              aria-label={`Bring sheet ${number}, ${title}, to the front`}>
              <span className="sheet__spine-strip">
                <span className="sheet__spine-index">{number}</span>
                <span className="sheet__spine-title">{title}</span>
                {teaser && <span className="sheet__spine-teaser">{teaser}</span>}
              </span>
            </button>
          </>
        )}
        <span
          className="sheet__dim"
          aria-hidden="true"
        />
      </div>
    </section>
  )
}
