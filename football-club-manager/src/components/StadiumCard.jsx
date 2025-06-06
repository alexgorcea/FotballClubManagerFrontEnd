import { useState } from 'react';
import { Button, Card, Row, Col, Image, OverlayTrigger, Popover, Form } from 'react-bootstrap';
import pitchImage from '../assets/pitch.jpg';

function StadiumCard({ matchId, onBuy, ticketPrices }) {
  const [selectedTribune, setSelectedTribune] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);

  const handleSelect = (name) => {
    setSelectedTribune(selectedTribune === name ? null : name);
    setTicketCount(1);
  };

  const handleConfirm = (name, price) => {
    if (ticketCount > 0) {
      onBuy(matchId, name, ticketCount, price);
      setSelectedTribune(null);
    }
  };

  const renderPopover = (name, price) => (
    <Popover id={`popover-${name}`}>
      <Popover.Header as="h3">{name} Tribune</Popover.Header>
      <Popover.Body>
        <Form.Group className="mb-2">
          <Form.Label>Price: €{price}</Form.Label>
          <Form.Control
            type="number"
            min={1}
            value={ticketCount}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setTicketCount(isNaN(value) ? 1 : value);
            }}
          />
        </Form.Group>
        <Button variant="success" size="sm" onClick={() => handleConfirm(name, price)}>Confirm</Button>
      </Popover.Body>
    </Popover>
  );
  return (
    <Card className="text-center">
      <Card.Body>
        <Row className="justify-content-center mb-2">
          <Col>
            <OverlayTrigger trigger="click" placement="right" overlay={renderPopover('North', ticketPrices.northSeats)} show={selectedTribune === 'North'} onToggle={() => handleSelect('North')} rootClose>
              <Button className="trapezoid-horizontal"></Button>
            </OverlayTrigger>
          </Col>
        </Row>

        <Row className="align-items-center gx-0">
          <Col xs={3} md={3} className="d-flex justify-content-center">
            <OverlayTrigger trigger="click" placement="top" overlay={renderPopover('West', ticketPrices.westSeats)} show={selectedTribune === 'West'} onToggle={() => handleSelect('West')} rootClose>
              <Button className="trapezoid-vertical rotate-left"></Button>
            </OverlayTrigger>
          </Col>
          <Col xs={6} md={6} className="d-flex justify-content-center">
            <Image src={pitchImage} alt="football field" style={{ width: '100%', height: 'auto', maxWidth: '300px' }} />
          </Col>
          <Col xs={3} md={3} className="d-flex justify-content-center">
            <OverlayTrigger trigger="click" placement="right" overlay={renderPopover('East', ticketPrices.eastSeats)} show={selectedTribune === 'East'} onToggle={() => handleSelect('East')} rootClose>
              <Button className="trapezoid-vertical rotate-right"></Button>
            </OverlayTrigger>
          </Col>
        </Row>

        <Row className="justify-content-center mt-2">
          <Col>
            <OverlayTrigger trigger="click" placement="right" overlay={renderPopover('South', ticketPrices.southSeats)} show={selectedTribune === 'South'} onToggle={() => handleSelect('South')} rootClose>
              <Button className="trapezoid-horizontal rotate-down"></Button>
            </OverlayTrigger>
          </Col>
        </Row>
        <Row className="justify-content-center mt-2">
          <Col>
            <OverlayTrigger trigger="click" placement="bottom" overlay={renderPopover('VIP', ticketPrices.vipSeats)} show={selectedTribune === 'VIP'} onToggle={() => handleSelect('VIP')} rootClose>
              <Button className="vip-class"></Button>
            </OverlayTrigger>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default StadiumCard;