import React from "react";
import Table from "react-bootstrap/Table";
import { Provider, useSelector, useDispatch } from "react-redux";
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
import { useState, useEffect } from "react";
// axios.defaults.baseURL = "http://localhost";
// axios.defaults.port = 8000;
const Book = () => {
  const buy = useSelector(state => state.buy);
  const sell = useSelector(state => state.sell);
  const dispatch = useDispatch();

  function getOrders() {
    axios({
      method: "GET",
      url: "http://127.0.0.1:8000/api/order",
    })
      .then(response => {
        const data = response.data;
        console.log("success order data", data);
        data.forEach(order => {
          if (order.market) {
            if (order.buy) {
              dispatch(marketbuy(order.quantity, order.user, order.order_id));
            } else
              dispatch(marketsell(order.quantity, order.user, order.order_id));
          } else {
            if (order.buy)
              dispatch(
                limitbuy(
                  order.quantity,
                  order.price,
                  order.user,
                  order.order_id
                )
              );
            else
              dispatch(
                limitsell(
                  order.quantity,
                  order.price,
                  order.user,
                  order.order_id
                )
              );
          }
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
    getOrders();
  }, []);

  function table() {
    var list = [];
    var j, p;
    var blist = [],
      slist = [];
    p = 0;
    var sellnew = sell.map(a => {
      return { ...a };
    });
    var buynew = buy.map(a => {
      return { ...a };
    });

    var buynew = buynew.filter(el => !el.market);
    var sellnew = sellnew.filter(el => !el.market);
    console.log(buy, sell, buynew, sellnew, "table");
    var nbuys = buynew.length;
    var nsells = sellnew.length;
    // if (nbuys == 0 && nsells == 0) return [];
    if (nbuys > 0) blist.push(buynew[0]);
    if (nsells > 0) slist.push(sellnew[0]);

    for (j = 1; j < nbuys; j++) {
      if (buynew[j].price == buynew[j - 1].price) {
        blist[p].quantity += buynew[j].quantity;
      } else {
        blist.push(buynew[j]);
        p++;
      }
    }
    p = 0;
    for (j = 1; j < nsells; j++) {
      if (sellnew[j].price == sellnew[j - 1].price) {
        slist[p].quantity += sellnew[j].quantity;
      } else {
        slist.push(sellnew[j]);
        p++;
      }
    }
    nbuys = blist.length;
    nsells = slist.length;
    slist.reverse();
    var maxn = 15;
    if(maxn < nsells) maxn = nsells;
    else if(maxn < nbuys) maxn = nbuys;
    for (j = 0, p = 0; j < maxn; j++, p++) {
      console.log("Hello")
      list.push(
        <tr key={j + "book"} style={{height: 30}}>
          <td scope="row" colSpan="2">
            {j < nbuys ? blist[j].quantity : " "}
          </td>
          <td style={{color: "#7FFF00"}}>{j < nbuys ? blist[j].price : " "}</td>
          <td scope="row" colSpan="2" style={{color: "red"}}>
            {p < nsells ? slist[p].price : " "}
          </td>
          <td>{p < nsells ? slist[p].quantity : " "}</td>
        </tr>
      );
    }
    // for (j = 0, p = 0; j < nbuys || p < nsells; j++, p++) {
    //   while (j < nbuys && !buy[j].market) j++;
    //   while (p < nsells && !sell[p].market) p++;

    //   list.push(
    //     <tr key={j + "book"}>
    //       <th scope="row" colSpan="2">
    //         {j < nbuys ? buy[j].quantity : ""}
    //       </th>
    //       <td>{j < nbuys ? buy[j].price : ""}</td>
    //       <th scope="row" colSpan="2">
    //         {p < nsells ? sell[p].price : ""}
    //       </th>
    //       <td>{p < nsells ? sell[p].quantity : ""}</td>
    //     </tr>
    //   );
    // }
    // console.log(list);
    return list;
  }
  return (
    <>
      <h1 style={{ marginTop: 30, marginBottom: 40 }}>Order Book</h1>
      <div style={{maxHeight: 435, overflow: "scroll"}}>
        <Table responsive striped bordered hover variant="dark">
          <thead>
            <tr>
              <th scope="col" colSpan="4" style={{color: "#7FFF00"}}>
                Buy
              </th>
              <th scope="col" colSpan="4" style={{color: "red"}}>
                Sell
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" colSpan="2">
                Quantity
              </th>
              <th>Price</th>
              <th scope="row" colSpan="2">
                Price
              </th>
              <th>Quantity</th>
            </tr>
            {table()}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Book;
