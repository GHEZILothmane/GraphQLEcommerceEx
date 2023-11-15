const Product = {
  category: ({ categoryId }, args, { db }) =>
    db.categories.find((category) => category.id === categoryId),
  reviews: ({ id: productId }, args, { db }) =>
    db.reviews.filter((review) => review.productId === productId),
};
export default Product;
