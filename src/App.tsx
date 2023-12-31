
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import { Home } from './pages/Home'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/home' element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
