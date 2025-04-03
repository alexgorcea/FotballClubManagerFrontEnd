import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import Teams from './pages/Teams'

const router = createBrowserRouter([
  {
    path : '/',
    element : <Home />
  },
  {
    path : '/teams',
    element : <Teams />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
