import { useParams, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import api from '../api/axiosConfig';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MarketValueChart from '../components/MarketValueChart'
import PlayerDetailsCard from "../components/PlayerDetailsCard";
import PlayerRankingCard from "../components/PlayerRankingCard"

function Details(){
    const {playerId} = useParams()
    const [marketValueData,setMarketValueData] = useState();

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
        <Container className="my-5" fluid>
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