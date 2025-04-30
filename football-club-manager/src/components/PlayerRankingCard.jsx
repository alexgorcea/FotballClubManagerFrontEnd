import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function PlayerDetailsCard({ranking, currentMarketValue}){

    const formattedCurrentMarketValue = new Intl.NumberFormat('de-DE').format(currentMarketValue);
    return(
        <Card className="text-center h-100">
            <Card.Header as="h5" className="bg-secondary text-light">
                Ranking
            </Card.Header>
            <Card.Body>
                <Card.Title>Current Market Value: {formattedCurrentMarketValue} €</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
                {Object.entries(ranking).map(([key,value]) => (
                    <ListGroup.Item key={key}>
                        {key}: <b>#{value}</b>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Card>
    );
}

export default PlayerDetailsCard