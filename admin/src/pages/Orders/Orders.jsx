import React, { useEffect, useState } from "react";
import "./Orders.css";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Failed to fetch orders.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching orders.");
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        toast.success("Order status updated.");
        fetchAllOrders();
      } else {
        toast.error("Failed to update order status.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating order status.");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="orders-container">
      <h2>Orders Page</h2>
      <div className="order-list">
        {orders.map((order) => (
          <div className="order-item" key={order._id}>
            <img src={assets.parcel_icon} alt="Parcel Icon" className="order-icon" />
            <div className="order-details">
              <p className="order-books">
                {order.items.map((item, index) => (
                  <span key={index}>
                    {item.name} x {item.quantity}
                    {index < order.items.length - 1 && ", "}
                  </span>
                ))}
              </p>
              <p className="order-customer">
                {order.address.firstName} {order.address.lastName}
              </p>
              <div className="order-address">
                <p>{order.address.street},</p>
                <p>
                  {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                </p>
              </div>
              <p className="order-phone">{order.address.phone}</p>
            </div>
            <p>Total Items: {order.items.length}</p>
            <p>Amount: ${order.amount.toFixed(2)}</p>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              className="order-status"
            >
              <option value="Processing">Processing</option>
              <option value="Out for delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
