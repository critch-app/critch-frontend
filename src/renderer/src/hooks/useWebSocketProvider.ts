import WS from '@renderer/api/ws/ws'
import { createContext } from 'react'

const WSProvider = createContext<null | WS>(null)

export function useWebSocketProvider(): React.Context<null | WS> {
  return WSProvider
}
