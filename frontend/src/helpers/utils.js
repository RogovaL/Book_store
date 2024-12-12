export const calculateAverageRating = (ratings) => {
    const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    return ratings.length > 0 ? totalRating / ratings.length : 0;
};

export const checkIfBookInOrders = (orders, bookId) => {
    return orders.some((order) => order.items.some((item) => item._id === bookId));
};
