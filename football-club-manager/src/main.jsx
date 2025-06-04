import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home'
import Teams from './pages/Teams'
import Layout from './layout/Layout'
import TeamPlayers from './pages/Players/TeamPlayers';
import Details from './pages/Players/Details';
import Matches from './pages/Matches/Matches';
import CreateMatch from './pages/Matches/CreateMatch';
import EditMatch from './pages/Matches/EditMatch';
import Review from './pages/Reviews/Review';
import CreateReview from './pages/Reviews/CreateReview';
import EditReview from './pages/Reviews/EditReview';
import Tickets from './pages/Tickets';
import ShoppingCart from './pages/ShoppingCart';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Authentication/Login';
import Register from './pages/Authentication/Register';
import ProtectedRoutes from './components/ProtectedRoutes';
import '../index.css'


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
        element : <ProtectedRoutes><Teams /></ProtectedRoutes>
      },

      {
        path : "teams/:teamId",
        element : <ProtectedRoutes><TeamPlayers/></ProtectedRoutes>
      },

      {
        path : "players/:playerId",
        element : <ProtectedRoutes><Details /></ProtectedRoutes>
      },

      {
        path : "matches",
        element : <ProtectedRoutes><Matches /> </ProtectedRoutes>
      },
      {
        path : "matches/create",
        element : <ProtectedRoutes><CreateMatch /></ProtectedRoutes>
      },

      {
        path : "matches/edit/:matchId",
        element : <ProtectedRoutes><EditMatch /></ProtectedRoutes>
      },

      {
        path : "review/:matchId",
        element : <ProtectedRoutes><Review /></ProtectedRoutes>
      },

      {
        path : "review/createReview/:matchId",
        element : <ProtectedRoutes><CreateReview /></ProtectedRoutes>
      },

      {
        path : "review/editReview/:matchId",
        element : <ProtectedRoutes><EditReview /></ProtectedRoutes>
      },

      {
        path : "matches/tickets/:matchId",
        element : <ProtectedRoutes><Tickets /></ProtectedRoutes>
      },

      {
        path : "cart",
        element : <ProtectedRoutes><ShoppingCart /></ProtectedRoutes>
      },
      {
        path : "register",
        element : <Register />
      },
      {
        path : "login",
        element : <Login />
      }
    
    ]

  }

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  </StrictMode>
)
