import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Profile = () => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicQuantity">
        <Form.Label>Quantity</Form.Label>
        <Form.Control type="number" step="1" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicFiat">
        <Form.Label>Fiat</Form.Label>
        <Form.Control type="number" step="0.1" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Profile;