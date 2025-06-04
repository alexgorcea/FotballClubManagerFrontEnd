import { Card, ListGroup, Button } from 'react-bootstrap';
import { useCart } from '../context/CartContext';

function ShoppingCart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.total, 0);

  return (
    <Card className="m-4">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <span>Shopping Cart</span>
        {cart.length > 0 && (
          <Button variant="outline-danger" size="sm" onClick={clearCart}>Clear</Button>
        )}
      </Card.Header>
      <ListGroup variant="flush">
        {cart.length === 0 ? (
          <ListGroup.Item>Your cart is empty.</ListGroup.Item>
        ) : (
          cart.map((item, index) => (
            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
              <div>
                <strong>{item.tribune}</strong> – {item.quantity} × €{item.price}
              </div>
              <div>
                €{item.total}
                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="ms-2"
                  onClick={() => removeFromCart(index)}
                >
                  Remove
                </Button>
              </div>
            </ListGroup.Item>
          ))
        )}
        {cart.length > 0 && (
          <ListGroup.Item className="fw-bold text-end">Total: €{total}</ListGroup.Item>
        )}
      </ListGroup>
    </Card>
  );
}

export default ShoppingCart;