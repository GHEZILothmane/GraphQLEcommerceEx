import { v4 as uuidv4 } from "uuid";

const Mutation = {
  addCategory: (parent, { input }, { db }) => {
    const { name } = input;
    const newCategory = {
      id: uuidv4(),
      name: name,
    };
    db.categories.push(newCategory);
    return newCategory;
  },

  addProduct: (parent, { input }, { db }) => {
    const { name, description, quantity, image, price, onSale, categoryId } =
      input;
    const newProduct = {
      id: uuidv4(),
      name,
      description,
      quantity,
      image,
      price,
      onSale,
      categoryId,
    };
    db.products.push(newProduct);
    return newProduct;
  },

  addReview: (parent, { input }, { db }) => {
    const { date, title, comment, rating, productId } = input;
    const newReview = {
      id: uuidv4(),
      date,
      title,
      comment,
      rating,
      productId,
    };
    db.reviews.push(newReview);
    return newReview;
  },

  deleteCategory: (parent, { id: categoryId }, { db }) => {
    db.categories = db.categories.filter(
      (category) => category.id !== categoryId
    );
    // Turn categoryId to null for products that belongs to this category
    db.products = db.products.map((product) => {
      if (product.categoryId === categoryId) {
        return {
          ...product,
          categoryId: null,
        };
      }
      return product;
    });
    return categoryId;
  },

  deleteProduct: (parent, { id: productId }, { db }) => {
    db.products = db.products.filter((product) => product.id !== productId);
    // delete also its reviews
    db.reviews = db.reviews.filter((review) => review.productId !== productId);
    return productId;
  },

  deleteReview: (parent, { id: reviewId }, { db }) => {
    db.reviews = db.reviews.filter((review) => review.id !== reviewId);
    return reviewId;
  },

  updateCategory: (parent, { id: categoryId, input }, { db }) => {
    const categoryIndex = db.categories.findIndex(
      (category) => category.id === categoryId
    );
    if (categoryIndex === -1) {
      return null;
    }
    const updatedCategoy = {
      ...db.categories[categoryIndex],
      ...input,
    };
    db.categories[categoryIndex] = updatedCategoy;
    return updatedCategoy;
  },

  updateProduct: (parent, { id: productId, input }, { db }) => {
    const productIndex = db.products.findIndex(
      (product) => product.id === productId
    );
    if (productIndex === -1) {
      return null;
    }
    const updatedProduct = {
      ...db.products[productIndex],
      ...input,
    };
    db.products[productIndex] = updatedProduct;
    return updatedProduct;
  },

  updateReview: (parent, { id: reviewId, input }, { db }) => {
    const reviewIndex = db.reviews.findIndex(
      (review) => review.id === reviewId
    );
    if (reviewIndex === -1) {
      return null;
    }
    const updatedReview = {
      ...db.reviews[reviewIndex],
      ...input,
    };
    db.reviews[reviewIndex] = updatedReview;
    return updatedReview;
  },
};

export default Mutation;
