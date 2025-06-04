import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import api from '../../api/axiosConfig';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';

function CreateMatch() {
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
    },
    ticketsSold: {
      northSeats: 0,
      eastSeats: 0,
      southSeats: 0,
      westSeats: 0,
      vipSeats: 0
    }
  });

  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  const getTeams = async () => {
    try {
      const response = await api.get('/teams');
      setTeams(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTeams();
  }, []);

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
    } else if (name === 'prize') {
      setMatch(prev => ({
        ...prev,
        prize: parseFloat(value)
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
      console.log("Creating match with data:", match);
      await api.post('/matches/add', match);
      alert('Match created successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to create match.');
    }
  };


  return (
    <Container>
      <Card className="shadow-sm mx-auto p-4" style={{ maxWidth: '600px' }}>
        <h3 className="text-center mb-4">Create New Match</h3>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group controlId="homeTeamId">
                <Form.Label>Home Team</Form.Label>
                <Form.Select name="homeTeamId" onChange={handleChange} required>
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
                <Form.Select name="awayTeamId" onChange={handleChange} required>
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
            <Form.Control type="date" name="date" onChange={handleChange} required />
          </Form.Group>

          <Form.Group controlId="prize">
            <Form.Label>Prize ($)</Form.Label>
            <Form.Control type="number" name="prize" onChange={handleChange} required />
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
                  <Form.Control
                    type="number"
                    name={section}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            ))}
          </Row>

          <div className="text-center mt-4">
            <Button variant="primary" type="submit">Create Match</Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default CreateMatch;
