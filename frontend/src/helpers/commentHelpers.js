import axios from "axios";

// Функція для отримання коментарів по книзі
export const fetchCommentsByBookId = async (url, bookId) => {
  try {
    const response = await axios.get(`${url}/api/comment/book/${bookId}`);
    return response.data.data;
  } catch (error) {
    console.error("Помилка завантаження коментарів:", error);
    throw error;
  }
};

// Функція для отримання користувачів за їхніми ID
export const fetchUsersByIds = async (url, userIds) => {
  try {
    const userPromises = userIds.map(userId =>
      axios.get(`${url}/api/user/get/${userId}`)
    );
    const responses = await Promise.all(userPromises);
    return responses.reduce((acc, response) => {
      if (response.data.success) {
        acc[response.data.user._id] = response.data.user;
      }
      return acc;
    }, {});
  } catch (error) {
    console.error("Помилка завантаження користувачів:", error);
    throw error;
  }
};

// Функція для додавання нового коментаря
export const addComment = async (url, token, bookId, userId, newComment) => {
  try {
    const response = await axios.post(
      `${url}/api/comment/add`,
      { bookId, userId, comment: newComment },
      { headers: { token } }
    );
    return response.data.success ? response.data.data : null;
  } catch (error) {
    console.error("Помилка відправки коментаря:", error);
    throw error;
  }
};

// Функція для видалення коментаря
export const deleteComment = async (url, token, commentId) => {
  try {
    const response = await axios.delete(`${url}/api/comment/delete/${commentId}`, {
      headers: { token },
    });
    return response.data.success;
  } catch (error) {
    console.error("Помилка видалення коментаря:", error);
    throw error;
  }
};
