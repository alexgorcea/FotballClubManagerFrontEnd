import { useState, useEffect } from 'react';
import { Card, ListGroup, Stack, Row, Col, Image, Button } from 'react-bootstrap';
import api from '../api/axiosConfig';
import { Link } from 'react-router-dom';

function MatchCard({ match }) {

  const [homeTeam, setHomeTeam] = useState();
  const [awayTeam, setAwayTeam] = useState();

  const getHomeTeam = async () => {
    try {
      const response1 = await api.get(`/teams/${match.homeTeamId}`);
      setHomeTeam(response1.data);
    } catch (e) {
      console.log(e);
    }
  }

  const getAwayTeam = async () => {
    try {
      const response2 = await api.get(`/teams/${match.awayTeamId}`);
      setAwayTeam(response2.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getHomeTeam();
    getAwayTeam();
  }, []);

  const matchTeams = {
    homeTeam: homeTeam,
    awayTeam: awayTeam
  }

  const deleteMatch = async () => {
    if (!window.confirm("Are you sure you want to delete this match?")) return;

    try {
      await api.delete(`/matches/delete/${match.matchId}`);
      alert("Match deleted successfully!");
      window.location.reload();
    } catch (e) {
      console.error(e);
      alert("Failed to delete match.");
    }
  };


  const formattedDate = new Date(match.date).toLocaleDateString();

  return (
    <Card className="shadow-sm rounded-4 border-0 h-100">
      <Card.Body className="pb-0">
        <Card.Title className="mb-4">
          <Row className="align-items-center text-center">
            <Col>
              {homeTeam && (
                <>
                  <Image
                    src={homeTeam.image}
                    alt={homeTeam.name}
                    height={50}
                    fluid
                    className="mb-1"
                  />
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
                  <Image
                    src={awayTeam.image}
                    alt={awayTeam.name}
                    height={50}
                    fluid
                    className="mb-1"
                  />
                  <div className="fw-semibold">{awayTeam.name}</div>
                </>
              )}
            </Col>
          </Row>
        </Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item className="d-flex justify-content-between">
          <span className="text-muted">Date</span>
          <span className="fw-medium">{formattedDate}</span>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between">
          <span className="text-muted">Winner Prize</span>
          <span className="fw-medium">${match.prize.toLocaleString()}</span>
        </ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Stack gap={2}>
          {match.reviewId ? (
            <Button
              variant="outline-primary"
              as={Link}
              to={`/review/${match.matchId}`}
              state={{ matchTeams }}
            >
              View Review
            </Button>
          ) : (
            <Button
              variant="primary"
              as={Link}
              to={`/review/createReview/${match.matchId}`}
              state={{ matchTeams }}
            >
              Create Review
            </Button>
          )}
          <Button variant="outline-secondary" as={Link} to={`/matches/edit/${match.matchId}`}>
            Edit Match
          </Button>
          <Button variant="outline-danger" onClick={deleteMatch}>
            Delete
          </Button>
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default MatchCard;
