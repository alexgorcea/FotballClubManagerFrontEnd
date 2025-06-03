import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/laliga.png';

function Header() {
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
            <Nav.Link href="/teams" className="text-light">Teams</Nav.Link>
            <Nav.Link href="/matches" className="text-light">Matches</Nav.Link>
            <Nav.Link href="/cart" className="text-light">Cart</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
