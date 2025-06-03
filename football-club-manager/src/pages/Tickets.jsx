import api from '../api/axiosConfig';
import { useLocation } from 'react-router-dom';
import StadiumCard from '../components/StadiumCard';
import { Card, Container, Row, Col, ListGroup, Image } from 'react-bootstrap';
import { useCart } from './CartContext';

function Tickets() {
  const { cart, addToCart } = useCart();

  const location = useLocation();
  const matchDetails = location.state?.matchDetails;
  const homeTeam = matchDetails.homeTeam;
  const awayTeam = matchDetails.awayTeam;
  const matchDate = new Date(matchDetails.match.date);

  const formattedDate = matchDate.toLocaleDateString();

  const handleAddToCart = async (tribune, quantity, price) => {
    addToCart(tribune, quantity, price);

    const tribuneKey = tribune.toLowerCase() + 'Seats';

    const updatedMatch = { ...matchDetails.match };
    if (!updatedMatch.ticketsSold) {
      updatedMatch.ticketsSold = {
        northSeats: 0,
        eastSeats: 0,
        southSeats: 0,
        westSeats: 0,
        vipSeats: 0,
      };
    }

    updatedMatch.ticketsSold[tribuneKey] += quantity;

    try {
      await api.post(`/matches/edit/${updatedMatch.matchId}`, updatedMatch);
    } catch (err) {
      console.error('Failed to update match:', err);
    }
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.total, 0);

  return (
    <Container fluid className="py-5 px-3 tickets-section">
      <h2 className="text-center text-white fw-bold display-5 mb-2">Buy Tickets</h2>
      <p className="text-center text-light mb-4 fst-italic">
        Select your seats and enjoy the match!
      </p>

      <Row className="justify-content-center mb-4">
        <Col md={6}>
          <Card className="shadow-sm rounded-4 border-0 h-100">
            <Card.Body className="pb-0">
              <Card.Title className="mb-4">
                <Row className="align-items-center text-center">
                  <Col>
                    {homeTeam && (
                      <>
                        <Image src={homeTeam.image} alt={homeTeam.name} height={50} fluid className="mb-1" />
                        <div className="fw-semibold">{homeTeam.name}</div>
                      </>
                    )}
                  </Col>
                  <Col xs="auto">
                    <span className="fs-5 fw-bold text-muted">vs</span>
                  </Col>
                  <Col>
                    {awayTeam && (
                      <>
                        <Image src={awayTeam.image} alt={awayTeam.name} height={50} fluid className="mb-1" />
                        <div className="fw-semibold">{awayTeam.name}</div>
                      </>
                    )}
                  </Col>
                </Row>
              </Card.Title>
            </Card.Body>

            <ListGroup className="list-group-flush">
              <ListGroup.Item className="text-center">
                <span className="text-muted me-2">Date: </span>
                <span className="fw-medium">{formattedDate}</span>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center mb-4">
        <Col md={6} className="mx-auto">
          <StadiumCard onBuy={handleAddToCart} ticketPrices={matchDetails.match.ticketPrices} />
        </Col>
      </Row>

      {cart.length > 0 && (
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="shadow-sm border-0">
              <Card.Header>Selected Tickets</Card.Header>
              <ListGroup variant="flush">
                {cart.map((item, idx) => (
                  <ListGroup.Item key={idx} className="d-flex justify-content-between">
                    <span>{item.quantity} x {item.tribune} @ €{item.price}</span>
                    <strong>€{item.total}</strong>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item className="fw-bold text-end">
                  Total: €{totalAmount}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Tickets;
