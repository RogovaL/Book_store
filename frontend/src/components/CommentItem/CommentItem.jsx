import React from "react";
import "./CommentItem.css";

const CommentItem = ({ comment, user, users, handleCommentDelete }) => {
  return (
    <div key={comment._id} className="comment-item card">
      <p className="comment-text">{comment.comment}</p>
      <small className="comment-author">
        Автор: {users[comment.userId] ? users[comment.userId].name : "Ви"}
      </small>
      {user && user._id === comment.userId && (
        <button className="delete-button" onClick={() => handleCommentDelete(comment._id)}>Видалити</button>
      )}
    </div>
  );
};

export default CommentItem;
