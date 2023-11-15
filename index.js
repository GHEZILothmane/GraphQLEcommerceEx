import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./schema";
import Query from "./resolvers/Query";
import Category from "./resolvers/Category";
import Product from "./resolvers/Product";
import Mutation from "./resolvers/Mutation";
import db from "./db";

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Category,
    Product,
  },
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: () => ({
    db,
  }),
});
console.log(`Server listening at: ${url}`);
