import WS from '@renderer/api/ws/ws'
import { useEffect, useState } from 'react'
export function useWebSocket(token: string): {
  isWsConnectionError: boolean
  wsConnectionError: string
  ws: WS | null
} {
  const [isWsConnectionError, setIsWsConnectionError] = useState(false)
  const [wsConnectionError, setWsConnectionError] = useState('')
  const [ws, setWs] = useState<null | WS>(null)
  const handleOpen = (): void => {
    setIsWsConnectionError(false)
    setWsConnectionError('')
  }

  const handleError = (error: Event): void => {
    const errorEvent = error as ErrorEvent
    setIsWsConnectionError(true)
    setWsConnectionError(errorEvent.message || 'WS error occurred')
  }

  const handleClose = (): void => {
    setIsWsConnectionError(true)
    setWsConnectionError('WS connection closed')
  }

  useEffect(() => {
    ;(async (): Promise<void> => {
      const ws = await new WS(token)
      ws.onClose(handleClose)
      ws.onOpen(handleOpen)
      ws.onError(handleError)
      setWs(ws)
    })()
  }, [token])

  return { isWsConnectionError, wsConnectionError, ws }
}
