import './disclaimer-panel.sass'

import { type KeyboardEvent, type MouseEvent, useId, useRef, useState } from 'react'

import { DISCLAIMER } from '@/content/disclaimer'

import { DisplayTitle } from '../display-title/display-title'
import { HazardRule } from '../hazard-rule/hazard-rule'
import { HudButton } from '../hud-button/hud-button'

export const DisclaimerPanel = () => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const titleId = useId()

  const open = () => {
    dialogRef.current?.showModal()
    setIsOpen(true)
  }

  const close = () => dialogRef.current?.close()

  // The dialog box is fully covered by its body, so a click that targets the dialog itself landed on the backdrop.
  const handleClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) close()
  }

  // Keeps reader hotkeys (arrows turn pages, Escape opens the map) from firing behind the modal.
  const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    event.stopPropagation()
    if (event.key === 'Escape') {
      event.preventDefault()
      close()
    }
  }

  return (
    <>
      <div className="disclaimer-tab">
        <button
          type="button"
          className="disclaimer-tab__button"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          onClick={open}>
          <i
            className="las la-info-circle disclaimer-tab__icon"
            aria-hidden="true"
          />
          <span className="disclaimer-tab__label">{DISCLAIMER.label}</span>
        </button>
      </div>
      <dialog
        ref={dialogRef}
        className="disclaimer-panel"
        aria-labelledby={titleId}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onClose={() => setIsOpen(false)}>
        <div className="disclaimer-panel__body">
          <header className="disclaimer-panel__header">
            <p className="disclaimer-panel__kicker">{DISCLAIMER.kicker}</p>
            <HudButton
              icon="la-times"
              label="Close disclaimer"
              className="disclaimer-panel__close"
              onClick={close}
            />
          </header>
          <div id={titleId}>
            <DisplayTitle
              lines={DISCLAIMER.title}
              level={2}
              size="md"
              tone="yellow"
            />
          </div>
          <HazardRule className="disclaimer-panel__rule" />
          {DISCLAIMER.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="disclaimer-panel__text">
              {paragraph}
            </p>
          ))}
          <ul className="disclaimer-panel__links">
            {DISCLAIMER.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="disclaimer-panel__link">
                  {link.label}
                  <i
                    className="las la-external-link-alt"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </>
  )
}
