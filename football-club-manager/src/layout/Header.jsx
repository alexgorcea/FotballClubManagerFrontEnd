import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/laliga.png';

function Header() {
  return (
    <Navbar bg="secondary" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center gap-2">
          <img
            alt="La Liga Logo"
            src={logo}
            width="50"
            height="50"
            className="d-inline-block align-top"
          />
          <span className="fw-bold fs-4 text-light">LaLiga</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/" className="text-light px-3">Home</Nav.Link>
            <Nav.Link href="/teams" className="text-light px-3">Teams</Nav.Link>
            <Nav.Link href="/matches" className="text-light px-3">Matches</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
