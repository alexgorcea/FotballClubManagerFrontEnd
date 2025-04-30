import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';

function PlayerDetailsCard({player}){
    const placeholderImage = "https://via.placeholder.com/300x300";

    return (
        <Card className="text-center h-100">
            <Card.Body>
                <Image src={player.imageUrl || placeholderImage}/>
                <p></p>
                <Card.Title>{player.name}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>Position: <b>{player.position}</b></ListGroup.Item>
                <ListGroup.Item>Date of Birth: <b>{player.dateOfBirth}</b></ListGroup.Item>
                <ListGroup.Item>Citizenship: <b>{player.nationality}</b></ListGroup.Item>
                <ListGroup.Item>Age: <b>{player.age}</b></ListGroup.Item>
                <ListGroup.Item>Height: <b>{player.height} cm</b></ListGroup.Item>
                <ListGroup.Item>Foot: <b>{player.foot}</b></ListGroup.Item>
            </ListGroup>
        </Card>
      );
}

export default PlayerDetailsCard