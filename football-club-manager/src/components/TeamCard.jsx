import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

function TeamCard({team}){
    return (
        <Card className="text-center" style={{ width: '18rem' }}>
            <Card.Body>
                <Image src={team.image} rounderCircle/>
                <p></p>
                <Card.Title>{team.name}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>President: {team.president}</ListGroup.Item>
                <ListGroup.Item>Stadium: {team.stadiumName}</ListGroup.Item>
                <ListGroup.Item>Market value: {team.currentMarketValue} EUR</ListGroup.Item>
            </ListGroup>
            <Card.Body>
                <Button variant="primary">See Players</Button>
            </Card.Body>
        </Card>
      );
}

export default TeamCard;