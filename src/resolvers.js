//import { users, blogs, comments } from "./datasets";
import { nanoid } from "nanoid";

// user data
let users = [
  { id: "id_1", name: "aBc", email: "abc@gmail.com", age: 3 },
  { id: "id_2", name: "pQr", email: "pqr@gmail.com" },
  { id: "id_3", name: "xYz", email: "xyz@gmail.com" },
];

let blogs = [
  {
    id: "blog_1",
    title: "Football legends",
    body: "7 vs 13 it is!!!",
    published: false,
    author: "id_2",
  },
  {
    id: "blog_2",
    title: "Alpha treatment",
    body: "A breakthrough in cancer treatment",
    published: false,
    author: "id_3",
  },
  {
    id: "blog_3",
    title: "Programming for everybody",
    body: "Learn the right way",
    published: false,
    author: "id_1",
  },
];

let comments = [
  { id: "comment_1", text: "awesome blog!!!", author: "id_3", blog: "blog_2" },
  { id: "comment_2", text: "improve needed", author: "id_2", blog: "blog_1" },
  { id: "comment_3", text: "I had a doubt", author: "id_1", blog: "blog_3" },
  {
    id: "comment_4",
    text: "This is a comment",
    author: "id_1",
    blog: "blog_2",
  },
];

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
      const emailCheck = users.some((user) => user.email === args.data.email);
      if (emailCheck) {
        throw new Error(`Email already in Use`);
      }

      const user = {
        id: nanoid(),
        name: args.data.name,
        email: args.data.email,
        age: args.data.age,
      };

      users.push(user);

      return user;
    },
    deleteUser(parent, args, ctx, info) {
      const userIndex = users.findIndex((user) => user.id === args.id);

      if (userIndex === -1) {
        throw new Error("User not found");
      }

      const deletedUsers = users.splice(userIndex, 1);

      blogs = blogs.filter((blog) => {
        const match = blog.author === args.id;

        if (match) {
          comments = comments.filter((comment) => comment.blog !== blog.id);
        }

        return !match;
      });

      comments = comments.filter((comment) => comment.author !== args.id);

      return deletedUsers[0];
    },
    createBlog(parent, args, ctx, info) {
      const checkUser = users.some((user) => user.id === args.author);

      if (!checkUser) {
        throw new Error(`Invalid User`);
      }

      const blog = {
        id: nanoid(),
        title: args.data.title,
        body: args.data.body,
        published: args.data.published,
        author: args.data.author,
      };

      blogs.push(blog);

      return blog;
    },
    createComment(parent, args, ctx, info) {
      const checkUser = users.some((user) => user.id === args.data.author);
      const checkBlog = blogs.some(
        (blog) => blog.id === args.data.blog && blog.published
      );

      if (!checkUser || !checkBlog) {
        throw new Error(`Invalid User or Blog`);
      }

      const comment = {
        id: nanoid(),
        text: args.data.text,
        author: args.data.author,
        blog: args.data.blog,
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
