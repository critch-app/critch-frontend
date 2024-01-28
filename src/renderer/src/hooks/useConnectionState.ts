import { useEffect, useState } from 'react'

export function useConnectionState(): {
  isConnectionError: boolean
  connectionError: string
} {
  const [isConnectionError, setIsConnectionErrorError] = useState(false)
  const [connectionError, setConnectionError] = useState('')
  const handleConnectionChange = (): void => {
    if (navigator.onLine) {
      setIsConnectionErrorError(false)
      setConnectionError('')
    } else {
      setIsConnectionErrorError(true)
      setConnectionError('You are offline please connect to the internet and try again')
    }
  }

  useEffect(() => {
    handleConnectionChange()
    window.addEventListener('online', handleConnectionChange)
    window.addEventListener('offline', handleConnectionChange)
    return () => {
      window.removeEventListener('online', handleConnectionChange)
      window.removeEventListener('offline', handleConnectionChange)
    }
  }, [])
  return { isConnectionError, connectionError }
}
