import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function HomeClient(){
  const { user } = useAuth();

  const personalizedMessage = user?.username
    ? `⚽ Welcome back, ${user.username}! Get ready for a new La Liga season.`
    : 'Welcome back!';

  return (
    <Container className="mt-5 text-center">
      <h1 className="mb-4">Hello, {user?.username}!</h1>
      <p className="lead">{personalizedMessage}</p>
      <Row className="mt-4">
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Teams & Players</Card.Title>
              <Card.Text>Get detailed info and updated market values from La Liga.</Card.Text>
              <Link to="/teams"><Button variant="success">View</Button></Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Matches & Tickets</Card.Title>
              <Card.Text>Buy tickets for your favorite La Liga matches.</Card.Text>
              <Link to="/matches"><Button variant="info">View</Button></Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>My Cart</Card.Title>
              <Card.Text>Track your ticket purchases easily.</Card.Text>
              <Link to="/cart"><Button variant="warning">Open</Button></Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeClient;