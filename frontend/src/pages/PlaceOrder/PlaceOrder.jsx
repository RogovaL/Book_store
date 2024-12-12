import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext.jsx";
import "./PlaceOrder.css";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, book_list, cartItems, placeOrder } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleOrderSubmit = (event) => {
    event.preventDefault();

    if (getTotalCartAmount() === 0) {
      alert("Ваш кошик порожній!");
      return;
    }

    let orderItems = [];
    book_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({
          ...item,
          quantity: cartItems[item._id],
        });
      }
    });

    const orderData = {
      userId: token,
      items: orderItems,
      amount: getTotalCartAmount() + 2, // Додати вартість доставки
      address: data,
    };

    console.log('PlaceOrder orderData', orderData);
    placeOrder(orderData);
  };

  return (
    <form onSubmit={handleOrderSubmit} className="place-order">
      <div className="place-order-left">
        <p className="title">Інформація про доставку</p>
        <div className="multi-fields">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="Ім'я"
          />
          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Прізвище"
          />
        </div>

        <input
          required
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Електронна пошта"
        />
        <input
          required
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Вулиця"
        />

        <div className="multi-fields">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="Місто"
          />
          <input
            required
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="Область"
          />
        </div>

        <div className="multi-fields">
          <input
            required
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            type="text"
            placeholder="Zip код"
          />
          <input
            required
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Країна"
          />
        </div>
        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Телефон"
        />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Замовлення</h2>
          <div>
            <div className="cart-total-details">
              <p>Ціна доставки</p>
              <p>{getTotalCartAmount() === 0 ? 0 : 2}₴</p>
            </div>{" "}
            <hr />
            <div className="cart-total-details">
              <b>Загально</b>
              <b>
                {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}₴
              </b>
            </div>
          </div>
          <button type="submit">Оплатити</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
