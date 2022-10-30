import React, { useState, useEffect } from "react";
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
// import Table from "react-bootstrap/Table";
import { Provider, useSelector, useDispatch } from "react-redux";
import {
  marketbuy,
  marketsell,
  limitbuy,
  limitsell,
  updateuser,
  addUser,
  setprice,
} from "../store/actions/count.actions";
import store from "../store";
import axios from "axios";


const Graph = () => {
  const dispatch = useDispatch();

  function getPrice() {
    axios({
      method: "GET",
      url: "http://127.0.0.1:8000/api/price",
    })
      .then(response => {
        const data = response.data;
        // console.log("success", data);
        data.forEach(el => {
          dispatch(setprice(el.curr_price, 0));
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
    getPrice();
  }, []);

  const prices = useSelector(state => state.marketprice);
  var labels = [...prices.keys()];
  var data = prices.map(el => el.curr_price);
  console.log(data, labels);
  return (
    <>
      <h1 style={{ marginTop: 30 }}>Graph</h1>
      <Chart
        type="line"
        datasetIdKey="id"
        height={200}
        data={{
          labels: labels,
          datasets: [
            {
              id: 1,
              label: "",
              data: data,
            },
          ],
        }}
      />
    </>
  );
};

export default Graph;
