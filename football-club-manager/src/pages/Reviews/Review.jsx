import { useEffect, useState } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { Card, ListGroup, Badge, Row, Col, Image, Button, Container } from 'react-bootstrap';
import api from '../../api/axiosConfig';

function Review() {
  const { matchId } = useParams();
  const [review, setReview] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const matchTeams = location.state?.matchTeams;

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await api.get(`/reviews/${matchId}`);
        setReview(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReview();
  }, [matchId]);

  const formatLabel = (label) => label.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, str => str.toUpperCase());

  const deleteReview = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await api.delete(`/reviews/delete/${reviewId}`)
      alert("Review deleted successfully!");
      navigate(`/matches`)
    } catch (e) {
      console.error(e);
      alert("Failed to delete match.");
    }
  }


  if (!review) return <p>Loading review...</p>;

  return (
    <Container>
      <Button variant="secondary" onClick={() => navigate('/matches')}>← Back</Button>
      <Card className="m-4 shadow-sm rounded-4 border-0 mx-auto custom-dark-card" style={{ maxWidth: '900px' }}>
        <Card.Header className="bg-secondary text-white fs-5 fw-semibold text-center rounded-top-4">
          Match Review
        </Card.Header>
        <Card.Body className="p-4">
          <Row className="justify-content-center mb-4">
            <Col xs={12} md={8} lg={6}>
              <Row className="align-items-center text-center">
                <Col>
                  {matchTeams.homeTeam && (
                    <>
                      <Image src={matchTeams.homeTeam.image} alt={matchTeams.homeTeam.name} height={80} fluid className="mb-2" />
                      <div className="fw-semibold">{matchTeams.homeTeam.name}</div>
                    </>
                  )}
                </Col>
                <Col>
                  <Badge bg="secondary" className="fs-5">{review.homeTeamScore}</Badge>
                </Col>
                <Col xs="auto">
                  <span className="fs-2 fw-bold text-muted">-</span>
                </Col>
                <Col>
                  <Badge bg="secondary" className="fs-5">{review.awayTeamScore}</Badge>
                </Col>
                <Col>
                  {matchTeams.awayTeam && (
                    <>
                      <Image src={matchTeams.awayTeam.image} alt={matchTeams.awayTeam.name} height={80} fluid className="mb-2" />
                      <div className="fw-semibold">{matchTeams.awayTeam.name}</div>
                    </>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="justify-content-center mb-4">
            <Col xs={12} md={8} lg={6}>
              <h5 className="text-center mb-3">Spectators</h5>
              <ListGroup variant="flush">
                {Object.entries(review.spectators).map(([key, value]) => (
                  <ListGroup.Item key={key} className="d-flex justify-content-between align-items-center">
                    <span className="text-capitalize">{formatLabel(key)}</span>
                    <Badge bg="info">{value}</Badge>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col xs={12} md={8} lg={6}>
              <h5 className="text-center mb-3">Ticket Earnings</h5>
              <ListGroup variant="flush">
                {Object.entries(review.ticketEarning).map(([key, value]) => (
                  <ListGroup.Item key={key} className="d-flex justify-content-between align-items-center">
                    <span className="text-capitalize">{formatLabel(key)}</span>
                    <Badge bg="warning" text="dark">${value.toFixed(2)}</Badge>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
          <div className="d-flex justify-content-center gap-2 mt-4">
            <Button variant="outline-warning" as={Link} to={`/review/editReview/${matchId}`} state={{ matchTeams }}>Edit Review</Button>
            <Button variant="outline-danger" onClick={() => deleteReview(review.reviewId)}>Delete Review</Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Review;
