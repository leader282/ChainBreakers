import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaBell } from "react-icons/fa";
import { Provider, useSelector, useDispatch } from "react-redux";

import store from "../store";
import axios from "axios";
const Notifications = () => {
  const dispatch = useDispatch();
  const notices = useSelector(state => state.notices);

  // const prices = useSelector(state => state.marketprice);
  var msg;
  // const [flag, setflag] = useState(false);
  useEffect(() => {
    notices.forEach(el => {
      notify(el.message);
    });
  }, [notices]);

  const notify = message => toast(message);

  return (
    <div>
      {/* <FaBell onClick={notify}/> */}
      <ToastContainer />
    </div>
  );
};

export default Notifications;
