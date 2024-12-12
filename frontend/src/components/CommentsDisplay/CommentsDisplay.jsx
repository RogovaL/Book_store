import React, { useEffect, useState } from "react";
import { fetchCommentsByBookId, fetchUsersByIds, addComment, deleteComment } from "../../helpers/commentHelpers";
import { fetchUserByToken } from "../../helpers/apiHelpers";
import CommentItem from "../CommentItem/CommentItem";
import "./CommentsDisplay.css";

const CommentsDisplay = ({ bookId, url, token }) => {
  const [comments, setComments] = useState([]); // Стан для зберігання коментарів
  const [newComment, setNewComment] = useState(""); // Стан для нового коментаря
  const [users, setUsers] = useState({}); // Стан для зберігання даних користувачів
  const [user, setUser] = useState(null); // Стан для зберігання поточного користувача

  // Виконуємо запит на сервер для отримання коментарів та користувачів
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Отримуємо коментарі за id книги
        const fetchedComments = await fetchCommentsByBookId(url, bookId);
        setComments(fetchedComments);

        // Отримуємо ids користувачів для кожного коментаря
        const userIds = fetchedComments.map(comment => comment.userId);
        const usersData = await fetchUsersByIds(url, userIds);
        setUsers(usersData);

        // Якщо є токен, отримуємо дані поточного користувача
        if (token) {
          const fetchedUser = await fetchUserByToken(url, token);
          setUser(fetchedUser);
        }
      } catch (error) {
        console.error("Помилка при отриманні даних:", error);
      }
    };

    fetchData();
  }, [bookId, url, token]); // Завантажуємо дані при зміні bookId, url або token

  // Обробник для відправлення нового коментаря
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment) return; // Якщо коментар порожній, не відправляємо

    try {
      // Додаємо новий коментар на сервер
      const newCommentData = await addComment(url, token, bookId, user._id, newComment);
      if (newCommentData) {
        setComments([...comments, newCommentData]); // Оновлюємо список коментарів
        setNewComment(""); // Очищаємо поле вводу
      }
    } catch (error) {
      console.error("Помилка при відправці коментаря:", error);
    }
  };

  // Обробник для видалення коментаря
  const handleCommentDelete = async (commentId) => {
    try {
      // Видаляємо коментар з сервера
      const success = await deleteComment(url, token, commentId);
      if (success) {
        setComments(comments.filter(comment => comment._id !== commentId)); // Оновлюємо список коментарів
      }
    } catch (error) {
      console.error("Помилка при видаленні коментаря:", error);
    }
  };

  return (
    <div className="comments-section">
      <h2>Коментарі</h2>
      <div className="comment-list">
        {comments.length > 0 ? (
          comments.map((comment) => (
            // Для кожного коментаря рендеримо компонент CommentItem
            <CommentItem
              key={comment._id}
              comment={comment}
              user={user}
              users={users}
              handleCommentDelete={handleCommentDelete}
            />
          ))
        ) : (
          // Якщо немає коментарів
          <p>Коментарів поки немає.</p>
        )}
      </div>

      {token && (
        <div className="add-comment">
          <h3>Додати коментар</h3>
          <form onSubmit={handleCommentSubmit}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)} // Оновлюємо значення нового коментаря
              placeholder="Напишіть ваш коментар..."
              required
            ></textarea>
            <button className="btn" type="submit">Надіслати</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CommentsDisplay;
