const Query = {
  helloWorld: (parent, args, context) => "Hello World",
  categories: (parent, args, { db }) => db.categories,
  category: (parent, { id }, { db }) =>
    db.categories.find((category) => category.id === id),
  products: (parent, { filter }, { db }) => {
    let filteredProducts = db.products;
    if (filter) {
      if (filter.onSale) {
        filteredProducts = filteredProducts.filter((product) => product.onSale);
      }
      if (filter.avgRating) {
        if ([1, 2, 3, 4, 5].includes(filter.avgRating)) {
          filteredProducts = filteredProducts.filter((product) => {
            let numberOfRatingsPerProduct = 0;
            let productAvgRating = db.reviews.reduce((acc, current) => {
              if (current.productId === product.id) {
                numberOfRatingsPerProduct++;
                return acc + current.rating;
              }
              return acc;
            }, 0);
            if (numberOfRatingsPerProduct) {
              productAvgRating = productAvgRating / numberOfRatingsPerProduct;
            }
            return productAvgRating >= filter.avgRating;
          });
        }
      }
    }

    return filteredProducts;
  },
  product: (parent, { id }, { db }) =>
    db.products.find((product) => product.id === id),
};
export default Query;
