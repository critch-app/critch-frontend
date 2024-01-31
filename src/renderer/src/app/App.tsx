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
import { useEffect } from 'react'
import { useWebSocket } from '@renderer/hooks/useWebSocket'
import { RootState } from './store'
import { useSelector } from 'react-redux'
import { useWebSocketProvider } from '@renderer/hooks/useWebSocketProvider'
import ErrorBoundary from '@renderer/components/ErrorBoundary/ErrorBoundary'

function App(): React.JSX.Element {
  const userToken = useSelector((state: RootState) => state.login.userToken)
  const { isError, error } = useGlobalEventListeners()
  const { isConnectionError, connectionError } = useConnectionState()
  const navigate = useNavigate()
  const { isWsConnectionError, ws } = useWebSocket(userToken)
  const WSProvider = useWebSocketProvider()

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
        <div className={`mt-1 flex`}>
          {isError && <Error error={error} reset={null} />}
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<Home />} />
            <Route path="/server/:id/*" element={<Server />} />
            <Route path="/un-recovered-error" element={<UnrecoveredError />} />
          </Routes>
        </div>
      </WSProvider.Provider>
    </ErrorBoundary>
  )
}

export default App
