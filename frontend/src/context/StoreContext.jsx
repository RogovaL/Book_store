import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000"; // URL бекенду API
  const [token, setToken] = useState("");
  const [book_list, setBookList] = useState([]);

  // Додавання товару в кошик
  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
    }));

    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/add`,
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Помилка при додаванні в кошик:", error);
      }
    }
  };

  // Видалення товару з кошика
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId] > 1) {
        updatedCart[itemId] -= 1;
      } else {
        delete updatedCart[itemId];
      }
      return updatedCart;
    });

    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/remove`,
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Помилка при видаленні з кошика:", error);
      }
    }
  };

  // Обчислення загальної суми кошика
  const getTotalCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
      const book = book_list.find((b) => b._id === itemId);
      return book ? total + book.price * quantity : total;
    }, 0);
  };

  // Завантаження списку книг
  const fetchBookList = async () => {
    try {
      const response = await axios.get(`${url}/api/books/list`);
      setBookList(response.data.data);
    } catch (error) {
      console.error("Помилка при завантаженні списку книг:", error);
    }
  };

  // Завантаження даних кошика з бекенду
  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        `${url}/api/cart/get`,
        {},
        { headers: { token } }
      );
      setCartItems(response.data.cartData || {});
    } catch (error) {
      console.error("Помилка при завантаженні даних кошика:", error);
    }
  };

  // Оформлення замовлення
  const placeOrder = async (orderData) => {
    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token },
      });

      if (response.data.success) {
        alert("Книги успішно куплені!"); // Повідомлення про успішну покупку
        setCartItems({});
        window.location.href = "http://localhost:5173/myorders"; // Перенаправлення на сторінку з замовленнями
      } else {
        alert("Сталася помилка. Спробуйте пізніше."); // Повідомлення про помилку
      }
    } catch (error) {
      console.error("Помилка при оформленні замовлення:", error);
      alert("Сталася помилка. Спробуйте пізніше."); // Повідомлення про помилку
    }
  };

  // Завантаження початкових даних
  useEffect(() => {
    const loadData = async () => {
      await fetchBookList();

      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
        await loadCartData(savedToken);
      }
    };

    loadData();
  }, []);

  const contextValue = {
    book_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    placeOrder,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
