import { useEffect, useState } from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import axios from '../api/axiosConfig';

function ShoppingCart() {
  const [boughtTickets, setBoughtTickets] = useState([]);

  const fetchTickets = async () => {
    try {
      const response = await axios.get('/tickets/my');
      setBoughtTickets(response.data);
    } catch (error) {
      console.error("Eroare la obținerea biletelor cumpărate:", error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleDelete = async (ticketId) => {
    try {
      await axios.delete(`/tickets/${ticketId}`);
      fetchTickets();
    } catch (error) {
      console.error("Eroare la ștergerea biletului:", error);
    }
  };

  const total = boughtTickets.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Card className="m-4 shadow">
      <Card.Header className="fs-5 fw-bold">Shopping Cart</Card.Header>

      <ListGroup variant="flush">
        {boughtTickets.length === 0 ? (
          <ListGroup.Item>No tickets found</ListGroup.Item>
        ) : (
          boughtTickets.map((item, index) => (
            <ListGroup.Item key={item.id || index} className="d-flex justify-content-between align-items-center">
              <div>
                <strong>{item.matchTitle}</strong>: {item.quantity} x {item.seat} - €{item.price}
              </div>
              <Button variant="outline-danger" size="sm" onClick={() => handleDelete(item.id)}>
                Remove
              </Button>
            </ListGroup.Item>
          ))
        )}
        {boughtTickets.length > 0 && (
          <ListGroup.Item className="text-end fw-bold">Total: €{total.toFixed(2)}</ListGroup.Item>
        )}
      </ListGroup>
    </Card>
  );
}

export default ShoppingCart;
