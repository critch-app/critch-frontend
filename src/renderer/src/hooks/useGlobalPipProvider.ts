import { GlobalPipContextValue } from '@renderer/env.d'

import { createContext } from 'react'

const GlobalPipProvider = createContext<GlobalPipContextValue>({
  mediaStream: null,
  setMediaStream: () => {},
  remoteStreams: [],
  setRemoteStreams: () => {},
  client: null,
  setClient: () => {},
  signal: null,
  setSignal: () => {}
})

export function useGlobalPipProvider(): React.Context<GlobalPipContextValue> {
  return GlobalPipProvider
}
