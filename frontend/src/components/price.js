// import React from "react";
// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
// import ListGroup from "react-bootstrap/ListGroup";
// import { Provider, useSelector, useDispatch } from "react-redux";
// import {
//   marketbuy,
//   marketsell,
//   limitbuy,
//   limitsell,
//   updateuser,
//   addUser,
// } from "../store/actions/count.actions";
// import store from "../store";

// const Price = () => {
//   const dispatch = useDispatch();
//   const buy = useSelector(state => state.buy);
//   const sell = useSelector(state => state.sell);

//   return (
//     <Card style={{ width: "18rem" }}>
//       <Card.Header>Current Market Price</Card.Header>
//       <ListGroup variant="flush">
//         <ListGroup.Item>Cras justo odio</ListGroup.Item>
//         <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
//         <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
//       </ListGroup>
//       <Button variant="primary">Go somewhere</Button>
//     </Card>
//   );
// };

// export default Price;

// import Card from "react-bootstrap/Card";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";

// const Price = () => {
//   return (
//     <Row>
//       <h2>Current Market Price</h2>
//       <Row>
//         <Card>
//           <Card.Body>
//             <Card.Title>Current Buying Price</Card.Title>
//             <Card.Text>NA</Card.Text>
//           </Card.Body>
//         </Card>
//         <Card>
//           <Card.Body>
//             <Card.Title>Current Selling Price</Card.Title>
//             <Card.Text>NA</Card.Text>
//           </Card.Body>
//         </Card>
//       </Row>
//     </Row>
//   );
// };

// export default Price;

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
//separate buying and selling prices
import { Provider, useSelector, useDispatch } from "react-redux";
import { setprice } from "../store/actions/count.actions";
import axios from "axios";
// import { addTrans } from "../store/actions/count.actions";
import { useEffect } from "react";
const Price = () => {
  const dispatch = useDispatch();

  // function getPrice() {
  //   axios({
  //     method: "GET",
  //     url: "http://127.0.0.1:8000/api/price",
  //   })
  //     .then(response => {
  //       console.log(response.data, "price data");
  //       response.data.forEach(price => {
  //         dispatch(setprice(price.curr_price, price.step));
  //       });
  //     })
  //     .catch(error => {
  //       if (error.response) {
  //         console.log(error.response);
  //         console.log(error.response.status);
  //         console.log(error.response.headers);
  //       }
  //     });
  // }

  // useEffect(() => {
  //   getPrice();
  // }, []);

  // const trans = useSelector(state => state.transaction);
  const prices = useSelector(state => state.marketprice);
  console.log(prices);

  return (
    <Row>
      {/* <h2>Current Market Price</h2> */}

      <Card>
        <Card.Body>
          <Card.Title>Current Market Price</Card.Title>
          <Card.Text>
            {prices.length != 0 ? prices.at(-1).curr_price : "NA"}
          </Card.Text>
        </Card.Body>
      </Card>
    </Row>
  );
};

export default Price;
