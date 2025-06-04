import { useAuth } from '../context/AuthContext';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/laliga.png';
import { useNavigate } from 'react-router-dom';

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Eroare la logout:', err);
    }
  };

  return (
    <Navbar bg="secondary" variant="dark" expand="lg" sticky="top" className="shadow-sm px-3">
      <Container fluid>
        <Navbar.Brand href="/" className="d-flex align-items-center gap-2">
          <img
            alt="La Liga Logo"
            src={logo}
            width="40"
            height="40"
            className="d-inline-block align-middle"
          />
          <span className="fw-bold fs-4 text-light">LaLiga</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto gap-3">
            <Nav.Link href="/" className="text-light">Home</Nav.Link>
            {user ? (
              <>
                <Nav.Link href="/teams" className="text-light">Teams</Nav.Link>
                <Nav.Link href="/matches" className="text-light">Matches</Nav.Link>
                <Nav.Link href="/cart" className="text-light">Cart</Nav.Link>
                <Nav.Link onClick={handleLogout} className="text-light" style={{ cursor: 'pointer' }}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/register" className="text-light">Register</Nav.Link>
                <Nav.Link href="/login" className="text-light">Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
