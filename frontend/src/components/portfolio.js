import React from "react";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Provider, useSelector, useDispatch } from "react-redux";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {
  marketbuy,
  marketsell,
  limitbuy,
  limitsell,
  updateuser,
  addUser,
} from "../store/actions/count.actions";
import store from "../store";
import axios from "axios";

// axios.defaults.baseURL = "http://localhost";
// axios.defaults.port = 8000;

const Portfolio = () => {
  const dispatch = useDispatch();

  function getProfiles() {
    axios({
      method: "GET",
      url: "http://127.0.0.1:8000/api/profile",
    })
      .then(response => {
        const data = response.data;
        // console.log("success", data);
        data.forEach(el => {
          dispatch(addUser(el.name, el.quant, el.fiat, el.user_id));
        });
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  useEffect(() => {
    getProfiles();
  }, []);

  const users = useSelector(state => state.users);
  // console.log("users", users);
  const users1 = [
    {
      user_id: 1,
      name: "user1",
      quantity: 1000,
      fiat: 1000,
    },
    {
      user_id: 2,
      name: "user2",
      quantity: 1200,
      fiat: 1100,
    },
    {
      user_id: 3,
      name: "user1",
      quantity: 1300,
      fiat: 1200,
    },
  ];

  return (
    <>
      <h1 style={{ marginTop: 30, marginBottom: 30}}>User Portfolio</h1>
      <div style={{maxHeight: 350, overflow: "scroll"}}>
        <Table responsive striped bordered hover variant="dark" size="sm">
          <thead>
            <tr>
              <th>User name</th>
              <th>Stocks</th>
              <th>Fiat $</th>
            </tr>
          </thead>
          <tbody>
            {users
              ? users.map(function (user) {
                  var list = [];
                  list.push(
                    <tr key={user.user_id}>
                      <td>{user.name}</td>
                      <td>{user.quantity}</td>
                      <td>{user.fiat}</td>
                    </tr>
                  );
                  return list;
                })
              : []}
          </tbody>
        </Table>
      </div>
      <div>
        <Form>
          <Table responsive striped bordered hover size="sm">
                <tbody>
                  <tr>
                    <td>
                    <Form.Group className="mb-3" controlId="formBasicName">
                      <Form.Control type="text" placeholder="Enter name" />
                    </Form.Group>
                    </td>
                    <td>
                    <Form.Group className="mb-3" controlId="formBasicQuantity">
                      <Form.Control type="number" step="1" placeholder="Enter quantity" />
                    </Form.Group>
                    </td>
                    <td>
                    <Form.Group className="mb-3" controlId="formBasicFiat">
                      <Form.Control type="number" step="0.1" placeholder="Enter fiat" />
                    </Form.Group>
                    </td>
                  </tr>
                </tbody>
          </Table>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Portfolio;
