import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import BookItem from "../../components/BookItem/BookItem";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      console.log(response.data.data);
      setData(response.data.data); // отримуємо дані замовлень
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders(); // завантажуємо замовлення при наявності токена
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>Моя бібліотека</h2>
      <div className="container">
        {data.length > 0 ? (
          data.map((order, index) => (
            <div key={index} className="my-orders-order">
              <h3>Замовлення #{index + 1}</h3>
              <div className="my-orders-books">
                {/* Перебір всіх книг у замовленні */}
                {order.items.map((item, index) => (
                  <BookItem
                    key={index}
                    id={item._id}
                    price={item.price}
                    image={item.image}
                    title={item.title}
                    category={item.category}
                    author={item.author}
                    publishYear={item.publishYear}
                    isOwnerView={true}
                    displayOrder="column"
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>У вас немає замовлень.</p>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
