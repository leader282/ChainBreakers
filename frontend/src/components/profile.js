import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { addUser } from "../store/actions/count.actions";
import axios from "axios";
// import { addUser } from "../store/actions/count.actions";
import { Provider, useSelector, useDispatch } from "react-redux";
const Profile = () => {
  const dispatch = useDispatch();
  function createUser(data) {
    axios({
      method: "POST",
      url: "http://127.0.0.1:8000/api/profile",
      data: data,
    })
      .then(response => {
        const profile = response.data;
        console.log("success in profile", profile);
        dispatch(
          addUser(profile.name, profile.quantity, profile.fiat, profile.user_id)
        );
        // update in database
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  const handleSubmit = event => {
    event.preventDefault();
    var name = event.target.value[0];
    var quantity = parseInt(event.target.value[1]);
    var fiat = event.target.value[1];
    var data = {
      name: name,
      quant: quantity,
      fiat: fiat,
    };
    console.log(data, "handlesubmit");
    createUser(data);
  };

  return (
    <Form onSubmit={e => handleSubmit(e)}>
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
};

export default Profile;
