export const ADD = "ADD";
export const addOne = () => ({ type: ADD });

export const SUB = "SUB";
export const subOne = () => ({ type: SUB });

export const ADDSOME = "ADDSOME";
export const addSome = value => ({
  type: ADDSOME,
  payload: value,
});

export const CURRPRICE = "CURRPRICE";
export const currprice = value => ({
  type: CURRPRICE,
  value: value,
});

export const RESET = "RESET";
export const reset = () => ({ type: RESET });

export const LIMITBUY = "LIMITBUY";
export const limitbuy = (quantity, price, user, order_id) => ({
  type: LIMITBUY,
  quantity: quantity,
  price: price,
  user_id: user,
  order_id: order_id,
  // username: username,
});
export const MARKETBUY = "MARKETBUY";
export const marketbuy = (quantity, user, order_id) => ({
  type: MARKETBUY,
  quantity: quantity,
  user_id: user,
  order_id: order_id,
});

export const LIMITSELL = "LIMITSELL";
export const limitsell = (quantity, price, user, order_id) => ({
  type: LIMITSELL,
  quantity: quantity,
  price: price,
  user_id: user,
  order_id: order_id,
});
export const MARKETSELL = "MARKETSELL";
export const marketsell = (quantity, user, order_id) => ({
  type: MARKETSELL,
  quantity: quantity,
  user_id: user,
  order_id: order_id,
});

export const ORDER = "ORDER";
export const orderdispatch = () => ({
  type: ORDER,
});
export const SELL = "SELL";
export const sell = () => ({
  type: SELL,
});

export const ADDUSER = "ADDUSER";
export const addUser = (name, quantity, fiat, user_id) => ({
  type: ADDUSER,
  name: name,
  quantity: quantity,
  fiat: fiat,
  user_id: user_id,
});
export const ADDTRANS = "ADDTRANS";
export const addTrans = (
  buyer,
  seller,
  price,
  quantity,
  sellorder,
  buyorder
) => ({
  type: ADDTRANS,
  buyer: buyer,
  seller: seller,
  price: price,
  quantity: quantity,
  buyorder: buyorder,
  sellorder: sellorder,
});

export const UPDATEUSER = "UPDATEUSER";
export const updateuser = (name, quantity, fiat, id) => ({
  type: UPDATEUSER,
  name: name,
  id: id,
  quantity: quantity,
  fiat: fiat,
});
export const SETPRICE = "SETPRICE";
export const setprice = (curr_price, step) => ({
  type: SETPRICE,
  curr_price: curr_price,
  step: step,
});
