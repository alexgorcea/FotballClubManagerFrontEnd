import { useEffect, useState } from "react"
import TeamCard from "../components/TeamCard";
import api from '../api/axiosConfig';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Teams(){
    const [teams,setTeams] = useState();

    const getTeams = async () =>{
        try
        {
            const response = await api.get('/teams');
            setTeams(response.data);

        }catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        getTeams();
    }, [])

    return(
        <Container fluid>
            <h2 className="d-flex justify-content-center">Teams</h2>
            <Row className="g-4 justify-content-center">
                {Array.isArray(teams) && teams.map(team => (
                    <Col key = {team.id} className="d-flex justify-content-center" xs={12} sm={6} md={4} lg={3}>
                        <TeamCard key = {team.id} team={team} />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default Teams