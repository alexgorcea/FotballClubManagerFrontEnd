import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home'
import Teams from './pages/Teams'
import Layout from './layout/Layout'

const router = createBrowserRouter([
  {
    path : '/',

    element : <Layout />,

    children : [
      {
        path : "",
        element : <Home />
      },

      {
        path : "teams",
        element : <Teams />
      }

    ]

  }

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
