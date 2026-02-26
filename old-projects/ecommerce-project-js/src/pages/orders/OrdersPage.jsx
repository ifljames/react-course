import axios from "axios";
import { useState, useEffect } from "react";
import { Header } from "../../components/Header";
import { OrdersGrid } from "./OrdersGrid";
import "./OrdersPage.css";

export function OrdersPage({ cart, loadCart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrderData = async () => {
      const response = await axios.get("/api/orders?expand=products");
      setOrders(response.data);
    };

    fetchOrderData();
  }, []);

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/images/orders-favicon.png" />
      <title>Orders</title>

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <OrdersGrid orders={orders} loadCart={loadCart} />
      </div>
    </>
  );
}
