import commentModel from "../models/commentModel.js";

// Add a comment for a book
const addComment = async (req, res) => {
  const { bookId, userId, comment } = req.body;
  console.log("ADD COMMENT", req.body);

  try {
    const newComment = new commentModel({ bookId, userId, comment });
    await newComment.save();
    res.json({ success: true, message: "Comment added", data: newComment });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error adding comment" });
  }
};

// Get comments for a specific book
const getCommentsForBook = async (req, res) => {
  const { bookId } = req.params;

  try {
    const comments = await commentModel.find({ bookId });
    res.json({ success: true, data: comments });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error fetching comments" });
  }
};

// Optionally, you can add an update or delete function if needed
const updateComment = async (req, res) => {
  const { commentId } = req.params;
  const { comment } = req.body;

  try {
    const updatedComment = await commentModel.findByIdAndUpdate(
      commentId,
      { comment },
      { new: true } // Return the updated document
    );
    if (!updatedComment) {
      return res.json({ success: false, message: "Comment not found" });
    }
    res.json({ success: true, message: "Comment updated", data: updatedComment });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error updating comment" });
  }
};

// Delete a comment by commentId
const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const deletedComment = await commentModel.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.json({ success: false, message: "Comment not found" });
    }
    res.json({ success: true, message: "Comment deleted", data: deletedComment });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error deleting comment" });
  }
};

export { addComment, getCommentsForBook, updateComment, deleteComment };

