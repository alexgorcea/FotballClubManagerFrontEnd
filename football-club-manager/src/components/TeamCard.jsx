import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack'
import { Link } from 'react-router-dom';

function TeamCard({ team }) {
  const formattedCurrentMarketValue = new Intl.NumberFormat('de-DE').format(team.currentMarketValue);
  return (
    <Card className="shadow-sm rounded-4 border-0 text-center h-100 mx-auto" style={{ width: '320px'}}>
      <Card.Header as="h5" className="bg-secondary text-white rounded-top-4">
        {team.name}
      </Card.Header>

      <Card.Body className="pb-0">
        <Image
          src={team.image}
          alt={team.name}
          fluid
          className="rounded mb-3"
          style={{ maxHeight: '120px', objectFit: 'contain' }}
        />
      </Card.Body>

      <ListGroup className="list-group-flush">
        <ListGroup.Item className="d-flex justify-content-between">
          <span className="text-muted">President</span>
          <span className="fw-medium">{team.president}</span>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between">
          <span className="text-muted">Stadium</span>
          <span className="fw-medium">{team.stadiumName}</span>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between">
          <span className="text-muted">Market Value</span>
          <span className="fw-medium">{formattedCurrentMarketValue} €</span>
        </ListGroup.Item>
      </ListGroup>

      <Card.Body>
        <Stack gap={2}>
          <Button
            variant="outline-primary"
            as={Link}
            to={`/teams/${team.id}?teamName=${encodeURIComponent(team.name)}`}
          >
            See Players
          </Button>
        </Stack>
      </Card.Body>
    </Card>

  );
}

export default TeamCard;