import { Routes, Route, useNavigate } from 'react-router-dom'
import '@renderer/assets/styles/globa.css'
import Server from '@renderer/views/Server'
import Home from '@renderer/views/Home'
import Register from '@renderer/views/Register'
import Login from '@renderer/views/Login'
import { useGlobalEventListeners } from '@renderer/hooks/useGlobalEventListners'
import Error from '@renderer/components/Error/Error'
import { useConnectionState } from '@renderer/hooks/useConnectionState'
import UnrecoveredError from '@renderer/views/UnrecoveredError'
import { useEffect, useState } from 'react'
import { useWebSocket } from '@renderer/hooks/useWebSocket'
import { RootState } from './store'
import { useSelector } from 'react-redux'
import { useWebSocketProvider } from '@renderer/hooks/useWebSocketProvider'
import ErrorBoundary from '@renderer/components/ErrorBoundary/ErrorBoundary'
import Pip from '@renderer/components/Modal/Pip'
import PipModal from '@renderer/features/stream/SubComponents/PipModal'
import { useGlobalPipProvider } from '@renderer/hooks/useGlobalPipProvider'
import { Client, RemoteStream } from 'ion-sdk-js'
import { IonSFUJSONRPCSignal } from 'ion-sdk-js/lib/signal/json-rpc-impl'

function App(): React.JSX.Element {
  const userToken = useSelector((state: RootState) => state.login.userToken)
  const joinedChannel = useSelector((state: RootState) => state.meeting.joinedChannel)
  const pip = useSelector((state: RootState) => state.meeting.pip)
  const { isError, error } = useGlobalEventListeners()
  const { isConnectionError, connectionError } = useConnectionState()
  const navigate = useNavigate()
  const { isWsConnectionError, ws } = useWebSocket(userToken)
  const WSProvider = useWebSocketProvider()
  const GlopalPipProvider = useGlobalPipProvider()
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null)
  const [remoteStreams, setRemoteStreams] = useState<RemoteStream[]>([])
  const [client, setClient] = useState<Client | null>(null)
  const [signal, setSignal] = useState<IonSFUJSONRPCSignal | null>(null)

  useEffect(() => {
    if (isWsConnectionError) {
      navigate(`/login`)
    } else {
      navigate(`/`)
    }
  }, [isWsConnectionError])

  useEffect(() => {
    if (isConnectionError) {
      navigate(`/un-recovered-error?error=${connectionError}`)
    } else {
      navigate(`/`)
    }
  }, [isConnectionError])

  return (
    <ErrorBoundary>
      <WSProvider.Provider value={ws}>
        <GlopalPipProvider.Provider
          value={{
            mediaStream,
            setMediaStream,
            remoteStreams,
            setRemoteStreams,
            client,
            setClient,
            signal,
            setSignal
          }}
        >
          <div className={`mt-1 flex`}>
            {isError && <Error error={error} reset={null} />}
            {joinedChannel && pip && (
              <Pip>
                <PipModal />
              </Pip>
            )}
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/*" element={<Home />} />
              <Route path="/server/*" element={<Server />} />
              <Route path="/un-recovered-error" element={<UnrecoveredError />} />
            </Routes>
          </div>
        </GlopalPipProvider.Provider>
      </WSProvider.Provider>
    </ErrorBoundary>
  )
}

export default App
