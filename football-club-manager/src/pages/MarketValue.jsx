import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import api from '../api/axiosConfig';
import { Container, Card } from "react-bootstrap";
import MarketValueChart from '../components/MarketValueChart'

function MarketValue(){
    const {playerId} = useParams()
    const [marketValue,setMarketValue] = useState();

    const getMarketValue = async () => {
        try{
            const response = await api.get(`marketvalue/${playerId}`);
            setMarketValue(response.data)
        }catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        getMarketValue();
    },[]);

    return(
        <Container className="my-4">
            <Card className="text-center">
                <Card.Header as="h5" className="bg-secondary text-light">
                    Market Value History 
                </Card.Header>
                <Card.Body>
                    <MarketValueChart marketValueHistory={marketValue?.marketValueHistory || []} />
                </Card.Body>
            </Card>
        </Container>
    )

}

export default MarketValue