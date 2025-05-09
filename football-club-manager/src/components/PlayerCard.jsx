import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';

function PlayerCard({player}){
    const placeholderImage = "https://via.placeholder.com/300x300";

    return (
        <Card className="text-center" style={{ width: '18rem' }}>
            <Card.Body>
                <Image src={player.imageUrl || placeholderImage}/>
                <p></p>
                <Card.Title>{player.name}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>Position: <b>{player.position}</b></ListGroup.Item>
                <ListGroup.Item>Date of Birth: <b>{player.dateOfBirth}</b></ListGroup.Item>
            </ListGroup>
            <Card.Body>
                <Button variant="primary" as={Link} to={`/players/${player.playerId}`} state={{player}}>Details</Button>
            </Card.Body>
        </Card>
      );
}

export default PlayerCard