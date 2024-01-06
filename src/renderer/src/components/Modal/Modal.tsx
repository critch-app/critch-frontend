/* eslint-disable @typescript-eslint/no-explicit-any */
import { createPortal } from 'react-dom'
import { useRef, useEffect } from 'react'

/**
 * Reusable modla component
 * @param {any} children - The JSX element contained by th modla
 * @returns {React.JSX.Element} renderer component.
 */
export default function Modal({ children }: any): React.JSX.Element {
  const elRef = useRef<HTMLDivElement | null>(null)

  if (!elRef.current) {
    elRef.current = document.createElement('div')
  }

  useEffect((): any => {
    const modalRoot = document.getElementById('modal')
    if (!modalRoot) {
      return null
    }
    modalRoot.appendChild(elRef.current as Node)

    return () => {
      modalRoot.removeChild(elRef.current as Node)
    }
  }, [])

  return createPortal(<div className="critch-modal">{children}</div>, elRef.current)
}
