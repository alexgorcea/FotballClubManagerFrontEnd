import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge'

function PlayerDetailsCard({ ranking, currentMarketValue }) {

    const formattedCurrentMarketValue = new Intl.NumberFormat('de-DE').format(currentMarketValue);
    return (
        <Card className="shadow-sm rounded-4 border-0 text-center h-100 mx-auto" style={{ width: '320px' }}>
            <Card.Header className="bg-secondary text-white rounded-top-4 fs-5">Ranking</Card.Header>

            <Card.Body className="pb-0">
                <Card.Title className="fs-6">Current Market Value</Card.Title>
                <p className="fw-semibold fs-5">
                    {new Intl.NumberFormat('de-DE').format(currentMarketValue)} €
                </p>
            </Card.Body>

            <ListGroup className="list-group-flush">
                {Object.entries(ranking).map(([key, value]) => (
                    <ListGroup.Item key={key} className="d-flex justify-content-between">
                        <span>{key}</span>
                        <Badge bg="secondary">#{value}</Badge>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Card>

    );
}

export default PlayerDetailsCard