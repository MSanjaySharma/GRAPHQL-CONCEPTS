import { GraphQLServer } from "graphql-yoga";

import db from "./db";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import User from "./resolvers/User";
import Blog from "./resolvers/Blog";
import Comment from "./resolvers/Comment";

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    Mutation,
    User,
    Blog,
    Comment,
  },
  context: {
    db,
  },
});

const port = 4000;

server.start(() => {
  console.log(
    `\x1b[94mServer is running on port ${port}\x1b[39m\n\x1b[94mvisit\x1b[39m \x1b[96mhttp://localhost:${port}\x1b[39m`
  );
});
