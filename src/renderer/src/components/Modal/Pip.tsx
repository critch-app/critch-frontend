import { createPortal } from 'react-dom'
import { useRef, useEffect } from 'react'
import Draggable from 'react-draggable'

export default function Pip({ children }: any): React.JSX.Element {
  const elRef = useRef<HTMLDivElement | null>(null)

  if (!elRef.current) {
    elRef.current = document.createElement('div')
  }

  useEffect((): any => {
    const modalRoot = document.getElementById('pip')
    if (!modalRoot) {
      return null
    }
    modalRoot.appendChild(elRef.current as Node)

    return () => {
      modalRoot.removeChild(elRef.current as Node)
    }
  }, [])

  return createPortal(
    <Draggable nodeRef={elRef}>
      <div className="critch-pip">{children}</div>
    </Draggable>,
    elRef.current
  )
}
