import reduxThunk from "redux-thunk";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";

import {
  initialState as cashflowInitialState,
  reducer as cashflowReducers,
} from "./cashflow";
import {
  initialState as usersInitialState,
  reducer as usersReducers,
} from "./users";
import {
  initialState as clientInitialState,
  reducer as clientReducers,
} from "./client";
import {
  initialState as inventoryInitialState,
  reducer as inventoryReducers,
} from "./inventory";
import {
  initialState as providerInitialState,
  reducer as providerReducers,
} from "./provider";
import {
  initialState as purchasesInitialState,
  reducer as purchasesReducers,
} from "./purchases";
import {
  initialState as salesInitialState,
  reducer as salesReducers,
} from "./sales";

export const initialState = {
  users: usersInitialState,
  client: clientInitialState,
  cashflow: cashflowInitialState,
  inventory: inventoryInitialState,
  sales: salesInitialState,
  purchases: purchasesInitialState,
  provider: providerInitialState,
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let reducers = {};
reducers["user"] = usersReducers;
reducers["clients"] = clientReducers;
reducers["cashflow"] = cashflowReducers;
reducers["inventory"] = inventoryReducers;
reducers["providers"] = providerReducers;
reducers["purchase"] = purchasesReducers;
reducers["sales"] = salesReducers;

function wrapReducer(wrapped) {
  return (state, action) => {
    return wrapped(state, action);
  };
}
export const store = createStore(
  wrapReducer(combineReducers(reducers)),
  initialState,
  composeEnhancers(applyMiddleware(reduxThunk))
);
