import { useState, useEffect } from "react"
import api from '../api/axiosConfig';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PlayerCard from '../components/PlayerCard';
import { useParams, useLocation } from "react-router-dom";

function TeamPlayers(){
    const [teamPlayers,setTeamPlayers] = useState();

    const {teamId} = useParams();

    const location = useLocation();
    const teamName = new URLSearchParams(location.search).get('teamName');

    const getTeamPlayers = async () =>{
        try
        {
            const response = await api.get(`/players/${teamId}`);
            setTeamPlayers(response.data);
        }catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        getTeamPlayers();
    }, []);

    return(
        <Container fluid>
            <h2 className="d-flex justify-content-center">Players of {teamName}</h2>
            <Row className="g-4 justify-content-center">
                {Array.isArray(teamPlayers) && teamPlayers.map(player => (
                    <Col key = {player.playerId} className="d-flex justify-content-center" xs={12} sm={6} md={4} lg={3}>
                        <PlayerCard key = {player.playerId} player={player} />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default TeamPlayers