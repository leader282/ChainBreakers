import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
// import Blogs from "./pages/Blogs";
// import Contact from "./pages/Contact";
import NoPage from "./pages/Nopage";
import store from "./store/index";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
// require("dotenv").config();
// axios.defaults.baseURL = process.env.REACT_APP_URL;
// process.env.REACT_APP_URL = "http://localhost:8000";
console.log(process.env);
// export default function App() {
//  return (
//    <BrowserRouter>
//      <Routes>
//        <Route path="/" element={<Layout />}>
//          <Route index element={<Dashboard />} />
//          <Route path="*" element={<NoPage />} />
//        </Route>
//      </Routes>
//    </BrowserRouter>
//  );
// }
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
// ReactDOM.render(

//       <div>hello</div>,
//   document.getElementById("root")
// );
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
