import { useState, useEffect } from "react";
import api from '../api/axiosConfig';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MatchCard from "../components/MatchCard";
import { Button } from "react-bootstrap";

function Matches(){

    const [matches,setMatches] = useState();

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
        <Container fluid>
            <h2 className="d-flex justify-content-center">Matches</h2>
            <Button href="/matches/create">Create</Button>
            <Row className="g-4 justify-content-center">
                {Array.isArray(matches) && matches.map(match => (
                    <Col key = {match.matchId} className="d-flex justify-content-center" xs={12} sm={6} md={4} lg={3}>
                        <MatchCard key = {match.matchId} match={match} />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default Matches;