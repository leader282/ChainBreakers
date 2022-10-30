import {
  MARKETBUY,
  MARKETSELL,
  LIMITBUY,
  LIMITSELL,
  CURRPRICE,
  ADDUSER,
  UPDATEUSER,
  SELL,
  ORDER,
  ADDTRANS,
  SETPRICE,
} from "../actions/count.actions";
import axios from "axios";
import PriorityQueue from "js-priority-queue";
function buycomp(a, b) {
  if (a.price == b.price) return b.order_id > a.order_id;
  else return a.price > b.price;
}
function sellcomp(a, b) {
  if (a.price == b.price) return b.order_id > a.order_id;
  else return a.price < b.price;
}
var copynotice = [];
var msg = "";
function queue(list, element, comp) {
  // creating object from queue element
  // var qElement = new QElement(element, priority);
  var contain = false;
  // console.log(element, "queue");
  // iterating through the entire
  // item array to add element at the
  // correct location of the Queue
  for (var i = 0; i < list.length; i++) {
    if (comp(list[i], element)) {
      // Once the correct location is found it is
      // enqueued
      list.splice(i, 0, element);
      contain = true;
      break;
    }
  }

  // if the element have the highest priority
  // it is added at the end of the queue
  if (!contain) {
    list.push(element);
  }
}
function dequeue(list, comp) {
  if (list.length == 0) return -1;
  else return list.pop();
}
function transact(
  list,
  trans,
  buyInd,
  sellInd,
  price,
  quantity,
  buyorder,
  sellorder
) {
  list[sellInd].quantity -= parseInt(quantity);
  list[sellInd].fiat += parseInt(price) * parseInt(quantity);
  list[buyInd].quantity += parseInt(quantity);
  list[buyInd].fiat -= parseInt(price) * parseInt(quantity);

  trans.push({
    buyer: list[buyInd].user_id,
    seller: list[sellInd].user_id,
    price: price,
    quantity: quantity,
    buyorder: buyorder,
    sellorder: sellorder,
  });
  msg =
    list[buyInd].name +
    " bought " +
    quantity +
    " stocks from " +
    list[sellInd].name +
    " at $" +
    price;
  copynotice.push({ message: msg });

  console.log("transaction occuring", list, trans);
  return [list, trans];
}

const CountReducer = (
  state = {
    buy: [],
    sell: [],
    users: [],
    marketprice: [],
    transaction: [],
    orders: [],
    notices: [],
  },
  action
) => {
  var userlist = state.users.map(a => {
    return { ...a };
  });
  var u;

  switch (action.type) {
    case MARKETSELL:
      //new market sell order
      u = userlist.find(el => {
        return el.user_id == action.user_id;
      });
      msg =
        u.name +
        " placed a market sell order of " +
        action.quantity +
        " stocks";
      copynotice.push({
        message: msg,
      });
      var sellnew = state.sell.map(a => {
        return { ...a };
      });
      console.log("marketsell", sellnew);
      queue(
        sellnew,
        {
          order_id: action.order_id,
          quantity: action.quantity,
          user_id: action.user_id,
          price: Number(0),
          market: true,
        },
        sellcomp
      );

      return Object.assign({}, state, {
        sell: sellnew,
        notices: copynotice,
      });

    case MARKETBUY:
      //new market sell order
      u = userlist.find(el => {
        return el.user_id == action.user_id;
      });
      msg =
        u.name + " placed a market buy order of " + action.quantity + " stocks";
      copynotice.push({
        message: msg,
      });
      var buynew = state.buy.map(a => {
        return { ...a };
      });
      queue(
        buynew,
        {
          order_id: action.order_id,
          quantity: action.quantity,
          user_id: action.user_id,
          price: Number(Infinity),
          market: true,
        },
        buycomp
      );
      return Object.assign({}, state, {
        buy: buynew,
        notices: copynotice,
      });

    case LIMITBUY:
      //limit buy order can lead to transactions when there is limit sell orders below it or market sell orders pending
      u = userlist.find(el => {
        return el.user_id == action.user_id;
      });
      msg =
        u.name +
        " placed a limit buy order of " +
        action.quantity +
        " stocks at $" +
        action.price;
      copynotice.push({
        message: msg,
      });
      var buynew = state.buy.map(a => {
        return { ...a };
      });

      queue(
        buynew,
        {
          order_id: action.order_id,
          quantity: action.quantity,
          user_id: action.user_id,
          price: action.price,
          market: false,
        },
        buycomp
      );
      // console.log("limit order", buynew);
      return Object.assign({}, state, {
        buy: buynew,
        notices: copynotice,
      });

    case LIMITSELL:
      //limit sell order can lead to transactions when there is limit buy orders above it or any market buy orders pending
      u = userlist.find(el => {
        return el.user_id == action.user_id;
      });
      msg =
        u.name +
        " placed a limit sell order of " +
        action.quantity +
        " stocks at $" +
        action.price;
      copynotice.push({
        message: msg,
      });
      var sellnew = state.sell.map(a => {
        return { ...a };
      });
      // console.log("marketsell", sellnew);
      queue(
        sellnew,
        {
          order_id: action.order_id,
          quantity: action.quantity,
          user_id: action.user_id,
          price: action.price,
          market: false,
        },
        sellcomp
      );

      return Object.assign({}, state, {
        sell: sellnew,
        notices: copynotice,
      });

    case ORDER:
      var sellnew = state.sell.map(a => {
        return { ...a };
      });
      var buynew = state.buy.map(a => {
        return { ...a };
      });
      // console.log(sellnew, buynew, "buy");
      var modusers = state.users.map(a => {
        return { ...a };
      });

      // var quantity = action.quantity;

      var trans = state.transaction.map(a => {
        return { ...a };
      });
      var mprice = state.marketprice.map(a => {
        return { ...a };
      });
      var i = 0;
      var price = 0;
      var qty;
      var flag = false;
      console.log(buynew, sellnew);
      while (buynew.length > 0 && sellnew.length > 0) {
        // console.log(buynew, sellnew, "inside loop");
        // buynew=buynew.dequeue();
        // sellnew= sellnew.dequeue();
        var topbuy = buynew.pop(); //highest buy order
        var topsell = sellnew.pop(); //lowest sell order
        var sellInd = modusers.findIndex(
          user => parseInt(user.user_id) === parseInt(topsell.user_id)
        );
        var buyInd = modusers.findIndex(
          user => parseInt(user.user_id) === parseInt(topbuy.user_id)
        );
        console.log(buynew, sellnew, topbuy, topsell);
        if (modusers[buyInd].fiat == 0) {
          queue(sellnew, topsell, sellcomp);
          continue;
        }
        // console.log(topbuy);
        if (topbuy.price >= topsell.price) {
          flag = true;
          if (topbuy.market && !topsell.market) price = topsell.price;
          else if (!topbuy.market && topsell.market) price = topbuy.price;
          else if (!topbuy.market && !topsell.market)
            price =
              topbuy.order_id > topsell.order_id ? topbuy.price : topsell.price;
          else {
            console.log(
              "here",
              state.marketprice[state.marketprice.length - 1]
            );
            //check infinity case for market orders
            price = state.marketprice[state.marketprice.length - 1];
          }
          if (topbuy.quantity > topsell.quantity) {
            console.log("1");
            if (modusers[buyInd].fiat < price * topsell.quantity) {
              qty = parseInt(modusers[buyInd].fiat / price);
            } else qty = topsell.quantity;
            if(qty!=0)
            {
            [modusers, trans] = transact(
              modusers,
              trans,
              buyInd,
              sellInd,
              price,
              qty,
              topbuy.order_id,
              topsell.order_id
            );
            topbuy.quantity -= qty;
            topsell.quantity = 0;
            }
          } else {
            console.log("2");

            if (modusers[buyInd].fiat < price * topbuy.quantity) {
              qty = parseInt(modusers[buyInd].fiat / price);
            } else qty = topbuy.quantity;
            if(qty!=0)
            {
            [modusers, trans] = transact(
              modusers,
              trans,
              buyInd,
              sellInd,
              price,
              qty,
              topbuy.order_id,
              topsell.order_id
            );
            topsell.quantity -= qty;
            topbuy.quantity = 0;
            }
            // console.log(modusers, trans, "in trans loop 2");
          }
          if (topbuy.quantity != 0) queue(buynew, topbuy, buycomp);
          if (topsell.quantity != 0) queue(sellnew, topsell, sellcomp);
          // console.log(trans, "in trans loop ");
        } else {
          queue(buynew, topbuy, buycomp);
          queue(sellnew, topsell, sellcomp);
          break;
        }
      }
      // console.log(buynew, sellnew, modusers, trans, "buy and sell ");
      console.log(price, "in order");
      mprice.push({ curr_price: price, step: 0 });
      if (!flag) return state;
      else {
        console.log(copynotice);
        var tbody = {
          trans: trans,
        };
        axios({
          method: "POST",
          url: "http://127.0.0.1:8000/api/transaction",
          data: tbody,
        })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            if (error.response) {
              console.log(error.response);
              console.log(error.response.status);
              console.log(error.response.headers);
            }
          });
        var pbody = {
          prices: mprice,
        };
        axios({
          method: "POST",
          url: "http://127.0.0.1:8000/api/price",
          data: pbody,
        })
          .then(response => {
            console.log(response.data, "price data");
            // response.data.forEach(price => {
            //   dispatch(setprice(price.curr_price, price.step));
            // });
          })
          .catch(error => {
            if (error.response) {
              console.log(error.response);
              console.log(error.response.status);
              console.log(error.response.headers);
            }
          });
        // copynotice.push({ message: "yeah" });
        console.log(buynew,sellnew,"transaction done");
        return Object.assign({}, state, {
          sell: sellnew,
          buy: buynew,
          users: modusers,
          transaction: trans,
          marketprice: mprice,
          notices: copynotice,
        });
      }

    case SETPRICE:
      var nprice = [...state.marketprice];

      console.log(nprice, "nprice");
      nprice.push({
        curr_price: action.curr_price,
        step: action.step,
      });

      return Object.assign({}, state, {
        marketprice: nprice,
      });

    case CURRPRICE:
      return {
        curr_price: action.value,
      };
    case ADDUSER:
      return Object.assign({}, state, {
        users: [
          ...state.users,
          {
            name: action.name,
            quantity: action.quantity,
            fiat: action.fiat,
            user_id: action.user_id,
          },
        ],
      });
    case ADDTRANS:
      console.log("Addtras", action.buyer);
      var t = state.transaction.map(a => {
        return { ...a };
      });
      t.push({
        buyer: action.buyer,
        seller: action.seller,
        price: action.price,
        quantity: action.quantity,
        buyorder: action.buyorder,
        sellorder: action.sellorder,
      });
      return Object.assign({}, state, {
        transaction: t,
      });

    case UPDATEUSER:
      const usersnew = state.users.forEach(el => {
        if (el.id == action.id) {
          el.name = action.name;
          el.quantity = action.quantity;
          el.fiat = action.fiat;
        }
      });
      return {
        users: usersnew,
      };
    default:
      return state;
  }
};

export default CountReducer;
