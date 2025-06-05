import { Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <Container className="mt-5">
      <h1>Home Page</h1>
      {user && <h4>Bun venit, {user.username}!</h4>}
    </Container>
  );
};

export default Home;
