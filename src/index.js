import { GraphQLServer } from "graphql-yoga";

import { resolvers } from "./resolvers";

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
});

const port = 4000;

server.start(() => {
  console.log(
    `\x1b[94mServer is running on port ${port}\x1b[39m\n\x1b[94mvisit\x1b[39m \x1b[96mhttp://localhost:${port}\x1b[39m`
  );
});
