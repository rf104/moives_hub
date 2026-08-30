import './App.css'
import { Outlet } from 'react-router-dom'
import { MovieProvider } from './contexts/MovieContext'
import { ToastProvider } from './contexts/ToastContext'
import NavBar from './components/NavBar'

function App() {
  return (
    <MovieProvider>
      <ToastProvider>
        <NavBar />
        <Outlet />
      </ToastProvider>
    </MovieProvider>
  )
}

export default App
