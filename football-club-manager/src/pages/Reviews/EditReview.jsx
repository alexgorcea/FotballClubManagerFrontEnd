import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Form, Button, Card, Row, Col, Container } from 'react-bootstrap';
import api from '../../api/axiosConfig';

function EditReview() {
    const { matchId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const matchTeams = location.state?.matchTeams;
    const [match, setMatch] = useState();

    const [formData, setFormData] = useState({
        homeTeamScore: 0,
        awayTeamScore: 0,
        winnerTeamId: '',
        spectators: {
            northSeats: 0,
            eastSeats: 0,
            southSeats: 0,
            westSeats: 0,
            vipSeats: 0
        },
        ticketEarning: {
            northSeatsEarning: 0,
            eastSeatsEarning: 0,
            southSeatsEarning: 0,
            westSeatsEarning: 0,
            vipSeatsEarning: 0
        }
    });

    const fetchReview = async () => {
        try {
            const response1 = await api.get(`/reviews/${matchId}`);
            setFormData(response1.data);
        } catch (error) {
            console.error('Failed to load review', error);
            alert('Could not load review.');
        }
    };

    const getMatch = async () => {
        try {
            const response2 = await api.get(`/matches/${matchId}`);
            setMatch(response2.data)
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getMatch();
        fetchReview();
    }, [matchId]);


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
            await api.post(`/reviews/edit/${match.reviewId}`, formData);
            alert('Review updated successfully!');
            navigate(`/review/${matchId}`, { state: { matchTeams } });
        } catch (error) {
            console.error(error);
            alert('Failed to update review.');
        }
    };

    return (
        <Container>
            <Button variant="secondary" onClick={() => navigate('/matches')}>← Back</Button>
            <Card className="shadow-sm mx-auto p-4" style={{ maxWidth: '600px' }}>
                <Card.Title className="fs-4 fw-bold text-center mb-4">
                    Edit Review
                </Card.Title>

                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>{matchTeams?.homeTeam?.name || 'Home'} Score</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={formData.homeTeamScore}
                                    onChange={(e) => handleChange(null, 'homeTeamScore', e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>{matchTeams?.awayTeam?.name || 'Away'} Score</Form.Label>
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
                            Update Review
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>

    );
}

export default EditReview;
