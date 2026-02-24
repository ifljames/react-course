import axios from "axios";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import { HomePage } from "./pages/homepage/HomePage";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { OrdersPage } from "./pages/orders/OrdersPage";
import { TrackingPage } from "./pages/tracking/TrackingPage";
import { NotFound404Page } from "./pages/notfound-404/NotFound404Page";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get("/api/cart-items?expand=product").then((response) => {
      setCart(response.data);
    });
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="orders" element={<OrdersPage />} />
      <Route path="tracking" element={<TrackingPage />} />
      <Route path="*" element={<NotFound404Page />} />
    </Routes>
  );
}

export default App;
