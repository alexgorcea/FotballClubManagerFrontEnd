import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Background from './Backround'

export default function Layout() {
  return (
    <>
      <Background />
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1 py-4">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}