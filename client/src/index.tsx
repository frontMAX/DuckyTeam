import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import CartProvider from "./contexts/CartContext";
import { UserProvider } from "./contexts/UserContext";
import { ProductProvider } from "./contexts/product/ProductContext";
import { DeliveryProvider } from "./contexts/DeliveryContetxt";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductProvider>
        <UserProvider>
          <CartProvider>
            <DeliveryProvider>
              <App />
            </DeliveryProvider>
          </CartProvider>
        </UserProvider>
      </ProductProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
