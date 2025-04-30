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
            <Row className="g-4 align-items-stretch">
                <Col md={3} className="d-flex">
                    <div className="w-100">
                        <PlayerDetailsCard player={player} />
                    </div>
                </Col> 
                <Col md={7} className="d-flex">
                    <div className="w-100">
                        <MarketValueChart marketValueHistory={marketValueData?.marketValueHistory || []}/>
                    </div>
                </Col>
                <Col md={2} className="d-flex">
                    <div className="w-100">
                        <PlayerRankingCard ranking={marketValueData?.ranking || []} currentMarketValue={marketValueData?.marketValue || []} />
                    </div>
                </Col>
            </Row>
        </Container>
    );

}

export default Details