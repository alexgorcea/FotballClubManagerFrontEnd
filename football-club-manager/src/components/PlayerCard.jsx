import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack'
import { Link } from 'react-router-dom';

function PlayerCard({ player }) {
  const placeholderImage = "https://via.placeholder.com/300x300";

  return (
    <Card className="shadow-sm rounded-4 border-0 text-center h-100 mx-auto" style={{ width: '320px'}}
    >
      <Card.Body className="pb-0">
        <Image
          src={player.imageUrl || placeholderImage}
          alt={player.name}
          fluid
          className="mb-3"
          style={{ height: '180px', width: '120px', objectFit: 'cover' }}
        />
        <Card.Title className="fs-5 fw-semibold">{player.name}</Card.Title>
      </Card.Body>

      <ListGroup className="list-group-flush">
        <ListGroup.Item className="d-flex justify-content-between">
          <span className="text-muted">Position</span>
          <span className="fw-medium">{player.position}</span>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between">
          <span className="text-muted">Age</span>
          <span className="fw-medium">{player.age}</span>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between">
          <span className="text-muted">Citizenship</span>
          <span className="fw-medium">{player.nationality}</span>
        </ListGroup.Item>
      </ListGroup>

      <Card.Body>
        <Stack gap={2}>
          <Button variant="outline-primary" as={Link} to={`/players/${player.playerId}`} state={{ player }}>Details</Button>
        </Stack>
      </Card.Body>
    </Card>

  );
}

export default PlayerCard