import axios from "axios";

export const fetchBookById = async (url, id) => {
  console.log('object :>> ', url);
  try {
    const response = await axios.get(`${url}/api/books/get/${id}`);
    console.log('object :>> ', `${url}/api/books/get/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Помилка завантаження книги:", error);
    throw error;
  }
};

export const fetchUserByToken = async (url, token) => {
  try {
    const response = await axios.get(`${url}/api/user/get`, {
      headers: { token },
    });
    if (response.data.success) {
      return response.data.user;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("Помилка завантаження даних користувача:", error);
    throw error;
  }
};

export const fetchUserOrders = async (url, token) => {
  try {
    const response = await axios.post(`${url}/api/order/userorders`, null, {
      headers: { token },
    });
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("Помилка отримання замовлень користувача:", error);
    throw error;
  }
};

export const fetchRatingsByBookId = async (url, id) => {
  try {
    const response = await axios.get(`${url}/api/rating/book/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Помилка завантаження оцінок:", error);
    throw error;
  }
};

export const submitRating = async (url, bookId, userId, rating) => {
  try {
    const response = await axios.post(`${url}/api/rating/add`, {
      bookId,
      userId,
      rating,
    });
    return response.data.success;
  } catch (error) {
    console.error("Помилка відправки оцінки:", error);
    throw error;
  }
};

export const downloadBook = async (url, id, bookTitle) => {
  try {
    const response = await axios.get(`${url}/api/download/book/${id}`, {
      responseType: "blob",
    });
    const fileURL = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = fileURL;
    link.setAttribute("download", `${bookTitle}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Помилка завантаження файлу:", error);
    throw error;
  }
};
