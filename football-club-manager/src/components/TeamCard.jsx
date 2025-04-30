import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import {Link} from 'react-router-dom';

function TeamCard({team}){
    const formattedCurrentMarketValue = new Intl.NumberFormat('de-DE').format(team.currentMarketValue);
    return (
        <Card className="text-center" style={{ width: '18rem' }}>
            <Card.Header as="h5" className="bg-secondary text-white">{team.name}</Card.Header>
            <Card.Body>
                <Image src={team.image} />
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>President: <b>{team.president}</b></ListGroup.Item>
                <ListGroup.Item>Stadium: <b>{team.stadiumName}</b></ListGroup.Item>
                <ListGroup.Item>Market value: <b>{formattedCurrentMarketValue} €</b></ListGroup.Item>
            </ListGroup>
            <Card.Body>
                <Button variant="primary" as = {Link} to = {`/teams/${team.id}?teamName=${encodeURIComponent(team.name)}`}>See Players</Button>
            </Card.Body>
        </Card>
      );
}

export default TeamCard;