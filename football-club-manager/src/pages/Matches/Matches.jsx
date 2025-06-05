import { useState, useEffect } from "react";
import api from '../../api/axiosConfig';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MatchCard from "../../components/MatchCard";
import {useAuth} from "../../context/AuthContext";
import { Button } from "react-bootstrap";

function Matches(){

    const [matches,setMatches] = useState();
    const {user} = useAuth();

    const getMatches = async () => {
        try{
            const response = await api.get('/matches');
            setMatches(response.data);
        }catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        getMatches();
    },[])

    return(
        <Container fluid className="py-5 px-3">
            <h2 className="text-center text-white fw-bold display-5 mb-2">Matches</h2>
            <p className="text-center text-light mb-4 fst-italic">
              View upcoming and past matches from LaLiga.
            </p>
            {user?.roles?.includes("ROLE_ADMIN") && (
                <div className="text-center mb-4">
              <Button href="/matches/create" variant="primary">Create Match</Button>
            </div>
            )}
            <Row className="g-4 justify-content-center">
                {Array.isArray(matches) && matches.map(match => (
                    <Col key={match.matchId} className="d-flex justify-content-center" xs={12} sm={6} md={4} lg={3}>
                        <MatchCard match={match} />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default Matches;