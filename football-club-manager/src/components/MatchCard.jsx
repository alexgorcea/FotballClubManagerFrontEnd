import { useState, useEffect } from 'react';
import { Card, ListGroup, Stack, Row, Col, Image, Button } from 'react-bootstrap';
import api from '../api/axiosConfig';

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
    <Card className="text-center">
      <Card.Body>
        <Card.Title className="text-center mb-4">
          <Row className="align-items-center">
            <Col className="text-center">
              {homeTeam && (
                <>
                  <Image src={homeTeam.image} alt={homeTeam.name} height={50} fluid />
                  <div>{homeTeam.name}</div>
                </>
              )}
            </Col>
            <Col xs="auto"><strong>vs</strong></Col>
            <Col className="text-center">
              {awayTeam && (
                <>
                  <Image src={awayTeam.image} alt={awayTeam.name} height={50} fluid />
                  <div>{awayTeam.name}</div>
                </>
              )}
            </Col>
          </Row>
        </Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>{formattedDate}</ListGroup.Item>
        <ListGroup.Item><strong>Winner Prize:</strong> ${match.prize.toLocaleString()}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Stack gap={2}>
          {match.reviewId ? (
            <Button className="mb-2" variant='primary' href={`/reviews/${match.reviewId}`}>View Review</Button>
          ) : (
            <Button className="mb-2" variant='primary' href={`/reviews/createReview`}>Create Review</Button>
          )}
          <Button className="mb-2" variant='primary' href={`/matches/edit/${match.matchId}`}>Edit Match</Button>
          <Button variant='danger' onClick={deleteMatch}>Delete</Button>
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default MatchCard;
