import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import '@renderer/assets/styles/globa.css'
import Server from '@renderer/views/Server'
import store from './store'
import Home from '@renderer/views/Home'
import Register from '@renderer/views/Register'
import Login from '@renderer/views/Login'
function App(): JSX.Element {
  return (
    <Provider store={store}>
      <div className=" mt-1 flex">
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<Home />} />
            <Route path="/server/:id/*" element={<Server />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  )
}

export default App
