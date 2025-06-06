import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function HomeAdmin(){
  const { user } = useAuth();

  const personalizedAdminMsg = user?.username
    ? `🔧 Hello, ${user.username}! Manage La Liga data and operations.`
    : 'Access the admin dashboard for management tools';

  return (
    <Container className="mt-5 text-center">
      <h1 className="mb-4">Welcome back, Admin {user?.username}!</h1>
      <p className="lead">{personalizedAdminMsg}</p>
      <Row className="mt-4">
        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Teams & Players</Card.Title>
              <Card.Text>Monitor all La Liga clubs and players with full stats.</Card.Text>
              <Link to="/teams"><Button variant="primary">Access</Button></Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Match Scheduling</Card.Title>
              <Card.Text>Organize and update La Liga match fixtures.</Card.Text>
              <Link to="/matches"><Button variant="secondary">Schedule</Button></Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Results</Card.Title>
              <Card.Text>Post and modify official match scores.</Card.Text>
              <Link to="/matches"><Button variant="dark">Update</Button></Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Financial Reports</Card.Title>
              <Card.Text>View ticket revenue and match attendance data.</Card.Text>
              <Link to="/matches"><Button variant="danger">View</Button></Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeAdmin;
