import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaBell } from "react-icons/fa";
import { Provider, useSelector, useDispatch } from "react-redux";

import store from "../store";
import axios from "axios";
const Notifications = () => {
  const dispatch = useDispatch();
  const buy = useSelector(state => state.buy);
  const sell = useSelector(state => state.sell);
  const trans = useSelector(state => state.transaction);
  const users = useSelector(state => state.users);
  // const prices = useSelector(state => state.marketprice);
  var msg;
  const [flag, setflag] = useState(false);
  useEffect(() => {
    if (flag && buy && users && users.length != 0 && buy.length != 0) {
      var i,
        idx = 0;
      for (i = 0; i < buy.length; i++) {
        if (buy[i].order_id > buy[idx].order_id) {
          idx = i;
        }
      }
      var price = buy[idx].price;
      var quantity = buy[idx].quantity;
      var market = buy[idx].market;
      var userid = buy[idx].user_id;
      console.log(users);
      var user = users.find(el => {
        return el.user_id === userid;
      });
      if (market)
        msg = user.name + " placed a market order of " + quantity + " stocks";
      else
        msg =
          user.name +
          " placed a limit order of " +
          quantity +
          " stocks at $" +
          price;

      notify(msg);
    }
    setflag(true);
  }, [buy]);

  useEffect(() => {
    if (flag && sell && users && users.length != 0 && sell.length != 0) {
      console.log(sell);
      var i,
        idx = 0;
      for (i = 0; i < sell.length; i++) {
        if (sell[i].order_id > sell[idx].order_id) {
          idx = i;
        }
      }
      var price = sell[idx].price;
      var quantity = sell[idx].quantity;
      var market = sell[idx].market;
      var userid = sell[idx].user_id;
      var user = users.find(el => {
        return el.user_id == userid;
      });
      if (market)
        msg = user.name + " placed a market order of " + quantity + " stocks";
      else
        msg =
          user.name +
          " placed a limit order of " +
          quantity +
          " stocks at $" +
          price;

      notify(msg);
    }
    setflag(true);
  }, [sell]);
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
  useEffect(() => {
    console.log(trans);
    if (flag && trans != undefined) {
      msg = transText(trans.at(-1), users);
      notify(msg);
    }
    setflag(true);
  }, [trans]);

  const notify = message => toast(message);

  return (
    <div>
      {/* <FaBell onClick={notify}/> */}
      <ToastContainer />
    </div>
  );
};

export default Notifications;
