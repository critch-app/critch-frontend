import { createPortal } from 'react-dom'
import { useRef, useEffect } from 'react'

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
