import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home'
import Teams from './pages/Teams'
import Layout from './layout/Layout'
import TeamPlayers from './pages/TeamPlayers';

const router = createBrowserRouter([
  {
    path : "/",
    element : <Layout />,
    children : [
      {
        path : "",
        element : <Home />
      },

      {
        path : "teams",
        element : <Teams />

      },

      {
        path : "teams/:teamId",
        element : <TeamPlayers/>
      }

    ]

  }

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
