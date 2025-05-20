import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';

function PlayerDetailsCard({ player }) {
    return (
        <Card className="shadow-sm rounded-4 border-0 text-center h-100 mx-auto" style={{ width: '320px' }}>
            <Card.Header className="bg-secondary text-white rounded-top-4 fs-5">Player</Card.Header>
            <Card.Body className="pb-0">
                <Image
                    src={player.imageUrl || "https://via.placeholder.com/300x300"}
                    alt={player.name}
                    fluid
                    className="mb-4"
                    style={{ height: '120px', width: '120px', objectFit: 'cover' }}
                />
                <Card.Title className="fs-5 fw-semibold">{player.name}</Card.Title>
            </Card.Body>

            <ListGroup className="list-group-flush">
                <ListGroup.Item className="d-flex justify-content-between"><span>Position</span><b>{player.position}</b></ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between"><span>Birth Date</span><b>{player.dateOfBirth}</b></ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between"><span>Nationality</span><b>{player.nationality}</b></ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between"><span>Age</span><b>{player.age}</b></ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between"><span>Height</span><b>{player.height} cm</b></ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between"><span>Foot</span><b>{player.foot}</b></ListGroup.Item>
            </ListGroup>
        </Card>

    );
}

export default PlayerDetailsCard