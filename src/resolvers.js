import { users, blogs, comments } from "./datasets";
import { nanoid } from "nanoid";

//resolvers
export const resolvers = {
  //QUERIES
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
    comments(parent, args, ctx, info) {
      return comments;
    },
  },

  //MUTATIONS
  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailCheck = users.some((user) => user.email === args.email);
      if (emailCheck) {
        throw new Error(`Email already in Use`);
      }

      const user = {
        id: nanoid(),
        name: args.name,
        email: args.email,
        age: args.age,
      };

      users.push(user);

      return user;
    },
    createBlog(parent, args, ctx, info) {
      const checkUser = users.some((user) => user.id === args.author);

      if (!checkUser) {
        throw new Error(`Invalid User`);
      }

      const blog = {
        id: nanoid(),
        title: args.title,
        body: args.body,
        published: args.published,
        author: args.author,
      };

      blogs.push(blog);

      return blog;
    },
    createComment(parent, args, ctx, info) {
      const checkUser = users.some((user) => user.id === args.author);
      const checkBlog = blogs.some(
        (blog) => blog.id === args.blog && blog.published
      );

      if (!checkUser || !checkBlog) {
        throw new Error(`Invalid User or Blog`);
      }

      const comment = {
        id: nanoid(),
        text: args.text,
        author: args.author,
        blog: args.blog,
      };

      return comment;
    },
  },

  //REFERENCES
  Blog: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.blog === parent.id;
      });
    },
  },
  User: {
    blogs(parent, args, ctx, info) {
      return blogs.filter((blog) => {
        return blog.author === parent.id;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.author === parent.id;
      });
    },
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
    blog(parent, arg, ctx, info) {
      return blogs.find((blog) => {
        return blog.id === parent.blog;
      });
    },
  },
};
