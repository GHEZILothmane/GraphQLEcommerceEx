const typeDefs = `#graphql

type Query{
    helloWorld: String
    categories: [Category!]!
    category(id:ID!): Category
    products(filter: productFilterInput): [Product!]!
    product(id:ID!): Product
}

type Mutation {
  addCategory(input: addCategoryInput!): Category!
  addProduct(input: addProductInput!): Product!
  addReview(input: addReviewInput!): Review!
  deleteCategory(id: ID!): ID!
  deleteProduct(id: ID!): ID!
  deleteReview(id: ID!): ID!
  updateCategory(id:ID!,input: updateCategoryInput!): Category
  updateProduct(id:ID!,input: updateProductInput!): Product
  updateReview(id:ID!,input: updateReviewInput!): Review
}

#Define a product type definition 
type Product{
  id: ID!
  name: String!
  description: String!
  quantity: Int!
  image: String!
  price: Float!
  onSale: Boolean!
  category: Category
  reviews: [Review!]!
}

type Category{
  id: ID!
  name: String!
  products(filter: productFilterInput): [Product!]!
}

type Review {
  id: ID!
  date: String!
  title: String!
  comment: String!
  rating: Int!
}

input productFilterInput {
  onSale: Boolean
  avgRating: Int
}

input addCategoryInput {
  name: String!
}
input updateCategoryInput {
  name: String!
}

input addProductInput{
  name: String!
  description: String!
  quantity: Int!
  image: String!
  price: Float!
  onSale: Boolean!
  categoryId: ID! 
}

input updateProductInput{
  name: String
  description: String
  quantity: Int
  image: String
  price: Float
  onSale: Boolean
  categoryId: ID
}

input addReviewInput{
    date: String!,
    title: String!,
    comment: String!,
    rating: Int!,
    productId: ID!
}
input updateReviewInput{
    date: String,
    title: String,
    comment: String,
    rating: Int,
    productId: ID
}
`;

export default typeDefs;
