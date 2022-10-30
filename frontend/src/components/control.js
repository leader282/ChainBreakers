import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { Provider, useSelector, useDispatch } from "react-redux";
// import axios from "axios";
import {
  marketbuy,
  marketsell,
  limitbuy,
  limitsell,
  updateuser,
  addUser,
  orderdispatch,
  setprice,
} from "../store/actions/count.actions";
import store from "../store";
import axios from "axios";
const Control = () => {
  const dispatch = useDispatch();
  const buy = useSelector(state => state.buy);
  const sell = useSelector(state => state.sell);
  const users = useSelector(state => state.users);
  const trans = useSelector(state => state.transaction);
  const prices = useSelector(state => state.marketprice);
  // function createTrans() {
  //   var tbody = {
  //     trans: trans,
  //   };
  //   return axios({
  //     method: "POST",
  //     url: "http://127.0.0.1:8000/api/transaction",
  //     data: tbody,
  //   }).catch(error => {
  //     if (error.response) {
  //       console.log(error.response);
  //       console.log(error.response.status);
  //       console.log(error.response.headers);
  //     }
  //   });
  // }

  // useEffect(() => {
  //   createTrans();
  // }, [trans]);
  // function createPrice() {
  //   var pbody = {
  //     prices: prices,
  //   };
  //   return axios({
  //     method: "POST",
  //     url: "http://127.0.0.1:8000/api/price",
  //     data: pbody,
  //   })
  //     .then(response => {
  //       console.log(response.data, "price data");
  //       // response.data.forEach(price => {
  //       //   dispatch(setprice(price.curr_price, price.step));
  //       // });
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
  //   createPrice();
  // }, [prices]);

  function createOrder({ buy, user_id, market, quantity, price }) {
    var body = {
      // user,quantity,buy,market,price
      user: parseInt(user_id),
      quantity: quantity,
      buy: buy,
      market: market,
      price: price,
    };
    // console.log(body.user, typeof body.user);

    axios({
      method: "POST",
      url: "http://127.0.0.1:8000/api/order",
      data: body,
    })
      .then(response => {
        const order = response.data;
        console.log("success in control", order);
        if (order.market) {
          if (order.buy) {
            dispatch(marketbuy(order.quantity, order.user, order.order_id));
          } else
            dispatch(marketsell(order.quantity, order.user, order.order_id));
        } else {
          if (order.buy)
            dispatch(
              limitbuy(order.quantity, order.price, order.user, order.order_id)
            );
          else
            dispatch(
              limitsell(order.quantity, order.price, order.user, order.order_id)
            );
        }
        dispatch(orderdispatch());

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

  function handleSubmit(event) {
    event.preventDefault();
    var buy = event.target[0].value === "buy";
    var market = event.target[2].value === "market";
    var price =
      event.target[4].value === "" && market
        ? buy
          ? -2
          : 0
        : event.target[4].value;
    const data = {
      buy: buy,
      user_id: event.target[1].value,
      market: market,
      quantity: event.target[3].value,
      price: price,
    };
    var cuser = users.find(el => {
      return el.user_id === parseInt(event.target[1].value);
    });
    console.log(cuser, users, parseInt(event.target[1].value));
    if (!market && buy && cuser.fiat < price * event.target[3].value)
      alert("Not enough money");
    else if (!market && !buy && cuser.quantity < event.target[3].value)
      alert("Not enough Stocks");
    else createOrder(data);
  }
  // console.log("users in control", users);
  // console.log(buy, sell, "in buy sell");
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Title style={{ marginBottom: -10, marginTop: 5 }}>
        Trade Panel
      </Card.Title>
      <hr />
      <Form onSubmit={e => handleSubmit(e)}>
        <Form.Group as={Col} controlId="formGridBUY">
          <Form.Label>BUY/SELL</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option value="buy">BUY</option>
            <option value="sell">SELL</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridUser">
          <Form.Label>Select User</Form.Label>
          <Form.Select defaultValue="Select User">
            {users
              ? users.map(function (user) {
                  var list = [];
                  list.push(
                    <option key={user.user_id} value={user.user_id}>
                      {user.name}
                    </option>
                  );
                  return list;
                })
              : [
                  <option key="0" value="0">
                    No Users Present!
                  </option>,
                ]}
            {/* <option value="buy">User1</option>
            <option value="sell">User2</option> */}
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridOrder">
          <Form.Label>Order Type</Form.Label>
          <Form.Select defaultValue="Select User">
            <option value="limit">Limit Order</option>
            <option value="market">Market Order</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicQuantity">
          <Form.Label>Stock Amount</Form.Label>
          <Form.Control type="number" min="1" name="amount" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicFiat">
          <Form.Label>At Price</Form.Label>
          <Form.Control type="number" step="0.1" min="0" name="price" />
        </Form.Group>
        <Button variant="primary" type="submit" style={{ marginBottom: 10 }}>
          Place Order
        </Button>
      </Form>
    </Card>
  );
};

export default Control;
