import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import '@renderer/assets/styles/globa.css'
import ServerBar from '@renderer/components/ServerBar/ServerBar'
import Server from '@renderer/views/Server'
import store from './store'
import Home from '@renderer/views/Home'

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <div className=" mt-1 flex">
        <BrowserRouter>
          <ServerBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/server/:id/*" element={<Server />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  )
}

export default App
