import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import Favt from './pages/Favt.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public: Login page (no navbar) */}
      <Route path="/login" element={<Login />} />

      {/* Protected: App layout with Navbar */}
      <Route path="/" element={<App />}>
        <Route index element={<Navigate to="/home" replace />} />
        <Route
          path="home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="favt"
          element={
            <ProtectedRoute>
              <Favt />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)
