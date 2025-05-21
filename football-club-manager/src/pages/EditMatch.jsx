import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import api from '../api/axiosConfig';
import Container from 'react-bootstrap/Container';

function EditMatch() {
  const { matchId } = useParams();
  const navigate = useNavigate();

  const [match, setMatch] = useState({
    homeTeamId: '',
    awayTeamId: '',
    date: '',
    prize: '',
    reviewId: null,
    ticketPrices: {
      northSeats: '',
      eastSeats: '',
      southSeats: '',
      westSeats: '',
      vipSeats: ''
    }
  });

  const [teams, setTeams] = useState([]);

  const fetchTeams = async () => {
    try {
      const response = await api.get('/teams');
      setTeams(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchMatch = async () => {
    try {
      const response = await api.get(`/matches/${matchId}`);
      const data = response.data;

      const formattedDate = new Date(data.date).toISOString().split('T')[0];

      setMatch({
        ...data,
        date: formattedDate,
        ticketPrices: data.ticketPrices || {}
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchTeams();
    fetchMatch();
  }, [matchId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in match.ticketPrices) {
      setMatch(prev => ({
        ...prev,
        ticketPrices: {
          ...prev.ticketPrices,
          [name]: parseInt(value)
        }
      }));
    } else {
      setMatch(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/matches/edit/${matchId}`, match);
      alert('Match updated successfully!');
      navigate('/matches');
    } catch (e) {
      console.log(e);
      alert('Failed to update match.');
    }
  };

  return (
    <Container>
        <Card className="shadow-sm mx-auto p-4" style={{ maxWidth: '600px' }}>
        <h3 className="text-center mb-4">Edit Match</h3>
        <Form onSubmit={handleSubmit}>
            <Row>
            <Col>
                <Form.Group controlId="homeTeamId">
                <Form.Label>Home Team</Form.Label>
                <Form.Select name="homeTeamId" value={match.homeTeamId} onChange={handleChange} required>
                    <option value="">Select home team</option>
                    {teams.map(team => (
                    <option key={team.id} value={team.id}>{team.name}</option>
                    ))}
                </Form.Select>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="awayTeamId">
                <Form.Label>Away Team</Form.Label>
                <Form.Select name="awayTeamId" value={match.awayTeamId} onChange={handleChange} required>
                    <option value="">Select away team</option>
                    {teams.map(team => (
                    <option key={team.id} value={team.id}>{team.name}</option>
                    ))}
                </Form.Select>
                </Form.Group>
            </Col>
            </Row>

            <Form.Group controlId="date">
            <Form.Label>Match Date</Form.Label>
            <Form.Control type="date" name="date" value={match.date} onChange={handleChange} required />
            </Form.Group>

            <Form.Group controlId="prize">
            <Form.Label>Prize ($)</Form.Label>
            <Form.Control type="number" name="prize" value={match.prize} onChange={handleChange} required />
            </Form.Group>

            <hr />
            <h5>Ticket Prices</h5>
            <Row>
            {["northSeats", "eastSeats", "southSeats", "westSeats", "vipSeats"].map(section => (
                <Col md={4} key={section}>
                <Form.Group controlId={section}>
                    <Form.Label>
                      {section.replace("Seats", "").replace(/^[a-z]/, char => char.toUpperCase()) + " Seats"}
                    </Form.Label>

                    <Form.Control type="number" name={section} value={match.ticketPrices[section] || ''} onChange={handleChange} required/>
                </Form.Group>
                </Col>
            ))}
            </Row>

            <div className="text-center mt-4">
            <Button variant="primary" type="submit">Update Match</Button>
            </div>
        </Form>
        </Card>
    </Container>
  );
}

export default EditMatch;
