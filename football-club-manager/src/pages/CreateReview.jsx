import { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import api from '../api/axiosConfig';

function CreateReview() {
  const navigate = useNavigate();
  const { matchId } = useParams();
  const location = useLocation();
  const matchTeams = location.state?.matchTeams;

  const [formData, setFormData] = useState({
    homeTeamScore: 0,
    awayTeamScore: 0,
    winnerTeamId: '',
    spectators: {
      northSeats: 0, eastSeats: 0, southSeats: 0, westSeats: 0, vipSeats: 0
    },
    ticketEarning: {
      northSeatsEarning: 0, eastSeatsEarning: 0, southSeatsEarning: 0, westSeatsEarning: 0, vipSeatsEarning: 0
    }
  });

  const handleChange = (section, key, value) => {
    if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: { ...prev[section], [key]: parseFloat(value) }
      }));
    } else {
      setFormData(prev => ({ ...prev, [key]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`/reviews/add-to/${matchId}`, formData);
      alert('Review created!');
      navigate(`/review/${matchId}`, { state: { matchTeams } });
    } catch (error) {
      console.error(error);
      alert('Error creating review.');
    }
  };

  return (
    <Card className="m-4 p-4">
      <Card.Title>Create Review</Card.Title>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>{matchTeams.homeTeam.name} Score</Form.Label>
              <Form.Control type="number" value={formData.homeTeamScore}
                onChange={(e) => handleChange(null, 'homeTeamScore', e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{matchTeams.awayTeam.name} Score</Form.Label>
              <Form.Control type="number" value={formData.awayTeamScore}
                onChange={(e) => handleChange(null, 'awayTeamScore', e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <h5>Spectators</h5>
            {Object.keys(formData.spectators).map(key => (
              <Form.Group className="mb-2" key={key}>
                <Form.Label>{key}</Form.Label>
                <Form.Control type="number" value={formData.spectators[key]}
                  onChange={(e) => handleChange('spectators', key, e.target.value)} />
              </Form.Group>
            ))}
          </Col>
        </Row>
        <Button className="mt-3" type="submit">Submit Review</Button>
      </Form>
    </Card>
  );
}

export default CreateReview;
