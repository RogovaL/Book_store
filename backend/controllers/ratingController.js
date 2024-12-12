import ratingModel from "../models/ratingModel.js";

// Add rating for a book
const addRating = async (req, res) => {
  const { bookId, userId, rating } = req.body;
console.log("ADD RATING", req.body);
  try {
    const existingRating = await ratingModel.findOne({ bookId, userId });
    if (existingRating) {
      // Update the existing rating
      existingRating.rating = rating;
      await existingRating.save();
      return res.json({ success: true, message: "Rating updated" });
    }

    // Create a new rating
    const newRating = new ratingModel({ bookId, userId, rating });
    await newRating.save();
    res.json({ success: true, message: "Rating added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error adding rating" });
  }
};

// Get ratings for a book
const getRatingsForBook = async (req, res) => {
  const { bookId } = req.params;

  try {
    const ratings = await ratingModel.find({ bookId });
    res.json({ success: true, data: ratings });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching ratings" });
  }
};

export { addRating, getRatingsForBook };