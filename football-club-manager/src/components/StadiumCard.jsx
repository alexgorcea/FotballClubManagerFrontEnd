import { Button, Card, Row, Col, Image } from 'react-bootstrap';
import pitchImage from '../assets/pitch.jpg';

function StadiumCard() {
  return (
    <Card className="text-center" style={{ maxWidth: '720px'}}>
        <Card.Body>
            <Row className="justify-content-center mb-2">
        <Col>
          <Button className="trapezoid-horizontal"></Button>
        </Col>
      </Row>

      <Row className="align-items-center gx-0">
        <Col xs={3} md={3} className="d-flex justify-content-center">
          <Button className="trapezoid-vertical rotate-left"></Button>
        </Col>
        <Col xs={6} md={6} className="d-flex justify-content-center">
          <Image src={pitchImage} alt="football field" style={{ width: '100%', height: 'auto', maxWidth: '300px' }} />
        </Col>
        <Col xs={3} md={3} className="d-flex justify-content-center">
          <Button className="trapezoid-vertical rotate-right"></Button>
        </Col>
      </Row>

      <Row className="justify-content-center mt-2">
        <Col>
          <Button className="trapezoid-horizontal rotate-down"></Button>
        </Col>
      </Row>
      <Row className="justify-content-center mt-2">
        <Col>
          <Button className="vip-class"></Button>
        </Col>
      </Row>
        </Card.Body>
    </Card>
  );
};

export default StadiumCard;