import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function HomeGuest() {
    return (
        <Container className="mt-5 text-center">
            <h1 className="mb-4">Welcome to <span>Football League Manager - La Liga Edition</span>!</h1>
            <p className="lead">Discover the thrilling world of Spanish football: teams, players, matches, and more!</p>
            <Row className="mt-5">
                <Col md={4}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title>Teams & Players</Card.Title>
                            <Card.Text>Explore La Liga clubs and star players with market value insights.</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title>Matches & Tickets</Card.Title>
                            <Card.Text>View upcoming matches and buy your tickets.</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title>Your Cart</Card.Title>
                            <Card.Text>Manage your purchased tickets in one place.</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="justify-content-center mt-5">
                <Col md={6}>
                    <Card className="shadow">
                        <Card.Body>
                            <Card.Title>Get Started</Card.Title>
                            <Card.Text>Create an account or log in to enjoy full access to La Liga universe.</Card.Text>
                            <Link to="/login"><Button variant="primary" className="me-2">Login</Button></Link>
                            <Link to="/register"><Button variant="outline-primary">Register</Button></Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default HomeGuest;