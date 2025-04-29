import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Background from './Backround'

export default function Layout() {
  return (
    <>
      <Background />
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
    </>
  )
}