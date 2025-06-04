import { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import api from '../../api/axiosConfig';

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
      await api.post(`/reviews/add-to/${matchId}`, formData);
      alert('Review created!');
      navigate(`/review/${matchId}`, { state: { matchTeams } });
    } catch (error) {
      console.error(error);
      alert('Error creating review.');
    }
  };

  const formatLabel = (label) => label.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/\b\w/g, char => char.toUpperCase());


  return (
    <Card className="shadow-sm mx-auto p-4" style={{ maxWidth: '600px' }}>
      <Card.Title className="fs-4 fw-bold text-center mb-4">
        Create Review
      </Card.Title>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>{matchTeams.homeTeam.name} Score</Form.Label>
              <Form.Control
                type="number"
                value={formData.homeTeamScore}
                onChange={(e) => handleChange(null, 'homeTeamScore', e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>{matchTeams.awayTeam.name} Score</Form.Label>
              <Form.Control
                type="number"
                value={formData.awayTeamScore}
                onChange={(e) => handleChange(null, 'awayTeamScore', e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <hr className="border-light" />

        <div className="text-center mt-4">
          <Button type="submit" variant="primary" className="px-4">
            Submit Review
          </Button>
        </div>
      </Form>
    </Card>
  );
}

export default CreateReview;
