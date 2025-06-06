import { useParams, useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import api from '../../api/axiosConfig';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import MarketValueChart from '../../components/MarketValueChart'
import PlayerDetailsCard from "../../components/PlayerDetailsCard";
import PlayerRankingCard from "../../components/PlayerRankingCard"

function Details(){
    const {playerId} = useParams()
    const [marketValueData,setMarketValueData] = useState();

    const navigate = useNavigate();
    const location = useLocation();
    const player = location.state?.player;

    const getMarketValueData = async () => {
        try{
            const response = await api.get(`marketvalue/${playerId}`);
            setMarketValueData(response.data)
        }catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        getMarketValueData();
    },[]);

    return(
        <Container className="py-5 px-3" fluid>
            <Button variant="secondary" onClick={() => navigate('/teams')}>← Back to Team Players</Button>
            <h2 className="text-center text-white fw-bold display-5 mb-2">{player?.name}</h2>
            <p className="text-center text-light mb-4 fst-italic">
              Player profile, rankings and market evolution
            </p>
            <Row className="g-4 justify-content-center">
                <Col xs="auto">
                    <PlayerDetailsCard player={player} />
                </Col> 
                <Col xs="auto">
                    <PlayerRankingCard ranking={marketValueData?.ranking || []} currentMarketValue={marketValueData?.marketValue || []} />
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <MarketValueChart marketValueHistory={marketValueData?.marketValueHistory || []}/>
                </Col>
            </Row>
        </Container>
    );

}

export default Details
