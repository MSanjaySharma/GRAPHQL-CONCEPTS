import { GraphQLServer } from "graphql-yoga";

// Types in GraphQL =>
// Scalar types - String, Boolean, Int, Float, ID

// user data
const users = [
  { id: "id_1", name: "aBc", email: "abc@gmail.com", age: 3 },
  { id: "id_2", name: "pQr", email: "pqr@gmail.com" },
  { id: "id_3", name: "xYz", email: "xyz@gmail.com" },
];

const blogs = [
  {
    id: "blog_1",
    title: "Football legends",
    body: "7 vs 13 it is!!!",
    published: false,
  },
  {
    id: "blog_2",
    title: "Alpha treatment",
    body: "A breakthrough in cancer treatment",
    published: false,
  },
  {
    id: "blog_3",
    title: "Programming for everybody",
    body: "Learn the right way",
    published: false,
  },
];

//type definitions (application schema)
const typeDefs = `
    type Query {
        greeting(name: String, company: String): String!
        add(a: Float!, b: Float!): Float!
        addArray(nums: [Float!]!): Float!
        grades: [Int!]!
        userDetails: User!
        users(search: String): [User!]!
        blogDetails: Blog!
        blogs(search: String): [Blog!]!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Blog {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`;

//resolvers
const resolvers = {
  Query: {
    greeting(parent, args, ctx, info) {
      if (args.name && args.company) {
        return `Hello ${args.name} welcome to ${args.company}!!!`;
      } else {
        return `Hello !!!`;
      }
    },
    add(parent, args, ctx, info) {
      if (args.a && args.b) {
        //`Sum of ${args.a} and ${args.b} is ${args.a + args.b}`;
        return args.a + args.b;
      }
    },
    addArray(parent, args, ctx, info) {
      if (args.nums.length === 0) {
        return 0;
      } else {
        return args.nums.reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        });
      }
    },
    grades(parent, args, ctx, info) {
      return [99, 88, 67];
    },
    users(parent, args, ctx, info) {
      if (!args.search) {
        return users;
      } else {
        return users.filter((user) => {
          return user.name.toLowerCase().includes(args.search.toLowerCase());
        });
      }
    },
    userDetails(parent, args, ctx, info) {
      return {
        id: "userId_1",
        name: "GXP",
        email: "gxp@gmail.com",
        age: 31,
      };
    },
    blogs(parent, args, ctx, info) {
      if (!args.search) {
        return blogs;
      } else {
        const search = args.search;
        return blogs.filter((blog) => {
          return blog.title.includes(search) || blog.body.includes(search);
        });
      }
    },
    blogDetails(parent, args, ctx, info) {
      return {
        id: "blogId_1",
        title: "Example Blog",
        body: "This is example content",
        published: false,
      };
    },
  },
};
const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

const port = 4000;

server.start(() => {
  console.log(
    `\x1b[94mServer is running on port ${port}\x1b[39m\n\x1b[94mvisit\x1b[39m \x1b[96mhttp://localhost:${port}\x1b[39m`
  );
});
