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
            console.log(response.data);
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
            <h2 className="mb-4">Teams</h2>
            <Row>
                {Array.isArray(teams) && teams.map(team => (
                    <Col>
                        <TeamCard key = {team.id} team={team} />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default Teams