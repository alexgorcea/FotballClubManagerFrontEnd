import { useEffect, useState } from "react"
import TeamCard from "../components/TeamCard";
import api from '../api/axiosConfig';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'

function Teams() {
    const [teams, setTeams] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortByValue, setSortByValue] = useState(false);

    const getTeams = async () => {
        try {
            const response = await api.get('/teams');
            setTeams(response.data);

        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getTeams();
    }, [])

    const filteredAndSortedTeams = Array.isArray(teams) ? [...teams]
        .filter(team =>
            team.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => sortByValue
            ? b.currentMarketValue - a.currentMarketValue
            : a.name.localeCompare(b.name)
        ) : [];

    return (
        <Container fluid className="py-5 px-3 teams-section">
            <h2 className="text-center text-white fw-bold display-5 mb-2">Teams</h2>
            <p className="text-center text-light mb-4 fst-italic">
                Explore the top football clubs in La Liga.
            </p>

            <Row className="justify-content-center mb-4">
                <Col xs={12} md={6} lg={4}>
                    <Form.Control
                        type="text"
                        placeholder="Search teams by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="text-center"
                    />
                </Col>
                <Col xs="auto" className="d-flex align-items-center mt-3 mt-md-0">
                    <Form.Check
                        type="switch"
                        id="sort-switch"
                        label="Sort by market value"
                        checked={sortByValue}
                        onChange={() => setSortByValue(!sortByValue)}
                        className="text-light"
                    />
                </Col>
            </Row>

            <Row className="g-4 justify-content-center">
                {filteredAndSortedTeams.map(team => (
                    <Col key={team.id} className="d-flex justify-content-center" xs={12} sm={6} md={4} lg={3}>
                        <TeamCard team={team} />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default Teams