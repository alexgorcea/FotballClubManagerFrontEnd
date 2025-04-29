import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Footer() {
  return (
    <Navbar bg="secondary" variant="dark" className="mt-auto">
      <Container className="justify-content-center py-3">
        <span className="text-light">&copy; {new Date().getFullYear()} LaLiga. All rights reserved.</span>
      </Container>
    </Navbar>
  );
}

export default Footer;