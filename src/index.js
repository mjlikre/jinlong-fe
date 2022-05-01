import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import { Provider } from "react-redux";

import App from "./App";
import SignIn from "./components/signin";
import SignUp from "./components/signup";
import Main from "./components/main";
import Sales from "./components/sales";
import Inventory from "./components/inventory";
import Providers from "./components/providers";
import Purchases from "./components/purchases";
import Purchase from "./components/purchases/purchase/purchase";
import Clients from "./components/clients";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/main" element={<Main />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/providers" element={<Providers />} />
        <Route path="/purchases" element={<Purchases />}>
          <Route path=":purchaseId/:index" element={<Purchase />} />
          <Route path=":purchaseId" element={<Purchase />} />
        </Route>
        <Route path="/clients" element={<Clients />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
