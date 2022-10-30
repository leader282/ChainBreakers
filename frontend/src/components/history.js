import React, { useState } from "react";
import { UnmountClosed } from "react-collapse";
import Button from "react-bootstrap/Button";
import { Provider, useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { addTrans } from "../store/actions/count.actions";
import { useEffect } from "react";
function transText(trans, users) {
  var buyInd = users.findIndex(
    user => parseInt(user.user_id) === parseInt(trans.buyer)
  );
  var sellInd = users.findIndex(
    user => parseInt(user.user_id) === parseInt(trans.seller)
  );
  // console.log(buyInd, sellInd, "trans text");

  return (
    users[buyInd].name +
    " bought " +
    trans.quantity +
    " stocks from " +
    users[sellInd].name +
    " at $" +
    trans.price
  );
}
const History = () => {
  const dispatch = useDispatch();

  // var tbody = {
  //   trans: trans,
  // };
  // return axios({
  //   method: "POST",
  //   url: "http://127.0.0.1:8000/api/transaction",
  //   data: tbody,
  // });
  function getTrans() {
    axios({
      method: "GET",
      url: "http://127.0.0.1:8000/api/transaction",
    })
      .then(response => {
        const data = response.data;
        console.log("success trans data", data);
        data.forEach(trans => {
          dispatch(
            addTrans(
              trans.buyer,
              trans.seller,
              trans.price,
              trans.quantity,
              trans.buyorder,
              trans.sellorder
            )
          );
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
    getTrans();
  }, []);

  const trans = useSelector(state => state.transaction);
  const users = useSelector(state => state.users);
  var l = trans.map(el => transText(el, users));
  const state = {
    listitems: l,
  };
  // const state = {
  //   listitems: [
  //     "List Item 1",
  //     "List Item 2",
  //     "List Item 3",
  //     "List Item 4",
  //     "List Item 5",
  //     "List Item 6",
  //   ],
  // };
  console.log("listitems", trans, state.listitems);
  const [full, setfull] = useState(false);
  const [btncontent, setbtncontent] = useState("Expand all other transactions");

  const expand = () => {
    if (full) {
      setfull(false);
      setbtncontent("Expand all other transactions");
    } else {
      setfull(true);
      setbtncontent("Close");
    }
  };
  return (
    <>
      <h2>Transaction History</h2>
      <ul className="list-group">
        {state.listitems
          .slice(-3)
          .reverse()
          .map((listitem, i) => (
            <li
              key={listitem + i}
              className="list-group-item list-group-item-primary">
              {listitem}
            </li>
          ))}
      </ul>
      <UnmountClosed isOpened={full}>
        <ul className="list-group">
          {state.listitems
            .slice(0, -3)
            .reverse()
            .map(listitem => (
              <li
                key={listitem}
                className="list-group-item list-group-item-primary">
                {listitem}
              </li>
            ))}
        </ul>
      </UnmountClosed>
      <Button variant="primary" onClick={expand} style={{ marginTop: 10 }}>
        {btncontent}
      </Button>
    </>
  );
};

export default History;
