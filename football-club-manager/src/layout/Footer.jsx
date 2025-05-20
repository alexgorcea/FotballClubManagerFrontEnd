import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Footer() {
  return (
    <Navbar bg="secondary" variant="dark" className="mt-auto py-3 shadow-sm">
      <Container className="justify-content-center">
        <span className="text-light small text-center">
          &copy; {new Date().getFullYear()} LaLiga. All rights reserved.
        </span>
      </Container>
    </Navbar>
  );
}

export default Footer;
