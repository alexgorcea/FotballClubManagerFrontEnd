import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

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
                <ListGroup.Item>Position: {player.position}</ListGroup.Item>
                <ListGroup.Item>Date of Birth: {player.dateOfBirth}</ListGroup.Item>
                <ListGroup.Item>Age: {player.age}</ListGroup.Item>
                <ListGroup.Item>Height: {player.height}</ListGroup.Item>
                <ListGroup.Item>Foot: {player.foot}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
                <Button variant="primary">See Market Value</Button>
            </Card.Body>
        </Card>
      );
}

export default PlayerCard