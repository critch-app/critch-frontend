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
/**
 * Main application component that handles routing and renders primary views.
 *
 * @returns {React.JSX.Element} The rendered component hierarchy.
 */
function App(): React.JSX.Element {
  const { isError, error } = useGlobalEventListeners()
  const { isConnectionError, connectionError } = useConnectionState()
  const navigate = useNavigate()
  useEffect(() => {
    if (isConnectionError) {
      navigate(`/un-recovered-error?error=${connectionError}`)
    } else {
      navigate(`/`)
    }
  }, [isConnectionError])
  return (
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
  )
}

export default App
