import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '@renderer/assets/styles/globa.css'
import Server from '@renderer/views/Server'
import Home from '@renderer/views/Home'
import Register from '@renderer/views/Register'
import Login from '@renderer/views/Login'
import { useGlobalEventListeners } from '@renderer/hooks/useGlobalEventListners'
import Error from '@renderer/components/Error/Error'
/**
 * Main application component that handles routing and renders primary views.
 *
 * @returns {React.JSX.Element} The rendered component hierarchy.
 */
function App(): React.JSX.Element {
  const { isError, error } = useGlobalEventListeners()
  return (
    <div className={`mt-1 flex`}>
      <BrowserRouter>
        {isError && (
          <div>
            <Error error={error} reset={null} />
          </div>
        )}
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Home />} />
          <Route path="/server/:id/*" element={<Server />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
