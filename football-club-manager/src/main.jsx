import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home'
import Teams from './pages/Teams'
import Layout from './layout/Layout'
import TeamPlayers from './pages/TeamPlayers';
import Details from './pages/Details';
import Matches from './pages/Matches';
import CreateMatch from './pages/CreateMatch';
import EditMatch from './pages/EditMatch';

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
      },

      {
        path : "players/:playerId",
        element : <Details />
      },
      {
        path : "matches",
        element : <Matches /> 
      },
      {
        path : "matches/create",
        element : <CreateMatch />
      },
      {
        path : "matches/edit/:matchId",
        element : <EditMatch />
      }
    
    ]

  }

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
