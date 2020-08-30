import { nanoid } from "nanoid";

const Mutation = {
  createUser(parent, args, { db }, info) {
    const emailCheck = db.users.some((user) => user.email === args.data.email);
    if (emailCheck) {
      throw new Error(`Email already in Use`);
    }

    const user = {
      id: nanoid(),
      ...args.data,
    };

    db.users.push(user);

    return user;
  },

  updateUser(parent, { id, data }, { db }, info) {
    const user = db.users.find((user) => user.id === id);

    if (!user) {
      throw new Error("User not Found");
    }

    if (typeof data.email === "string") {
      const emailCheck = db.users.some((user) => user.email === data.email);
      if (emailCheck) {
        throw new Error(`Email already in Use`);
      }
      user.email = data.email;
    }

    if (typeof data.name === "string") {
      user.name = data.name;
    }

    if (typeof data.age !== "undefined") {
      user.age = data.age;
    }

    return user;
  },

  deleteUser(parent, args, { db }, info) {
    const userIndex = db.users.findIndex((user) => user.id === args.id);

    if (userIndex === -1) {
      throw new Error("User not found");
    }

    const deletedUsers = db.users.splice(userIndex, 1);

    db.blogs = db.blogs.filter((blog) => {
      const match = blog.author === args.id;

      if (match) {
        db.comments = db.comments.filter((comment) => comment.blog !== blog.id);
      }

      return !match;
    });

    db.comments = db.comments.filter((comment) => comment.author !== args.id);

    return deletedUsers[0];
  },

  createBlog(parent, args, { db }, info) {
    const checkUser = db.users.some((user) => user.id === args.author);

    if (!checkUser) {
      throw new Error(`Invalid User`);
    }

    const blog = {
      id: nanoid(),
      ...args.data,
    };

    db.blogs.push(blog);

    return blog;
  },

  updateBlog(parent, args, { db }, info) {
    const { id, data } = args;
    const blog = db.blogs.find((blog) => blog.id === id);

    if (!blog) {
      throw new Error("No Such blog exists");
    } else {
      if (typeof data.title === "string") {
        blog.title = data.title;
      }
      if (typeof data.body === "string") {
        blog.body = data.body;
      }
      if (typeof data.published === "boolean") {
        blog.published = data.published;
      }
    }

    return blog;
  },

  deleteBlog(parent, args, { db }, info) {
    const blogIndex = db.blogs.findIndex((blog) => blog.id === args.id);

    if (blogIndex === -1) {
      throw new Error("Blog not found");
    }

    const deletedBlogs = db.blogs.splice(blogIndex, 1);

    db.comments = db.comments.filter((comment) => comment.blog !== args.id);

    return deletedBlogs[0];
  },

  createComment(parent, args, { db, pubsub }, info) {
    const checkUser = db.users.some((user) => user.id === args.data.author);

    const checkBlog = db.blogs.some(
      (blog) => blog.id === args.data.blog && blog.published
    );

    if (!checkUser || !checkBlog) {
      throw new Error(`Invalid User or Blog`);
    }

    const comment = {
      id: nanoid(),
      ...args.data,
    };

    console.log(comment);

    pubsub.publish(`comment ${args.data.blog}`, { comment });

    return comment;
  },

  updateComment(parent, args, { db }, info) {
    const { id, data } = args;
    const comment = db.comments.find((comment) => comment.id === id);

    console.log(comment);

    if (!comment) {
      throw new Error("No such comments exists");
    }

    comment.text = data.text;

    return comment;
  },

  deleteComment(parent, args, { db }, info) {
    const commentIndex = db.comments.findIndex(
      (comment) => comment.id === args.id
    );

    if (commentIndex === -1) {
      throw new Error("Comment not found");
    }

    const deletedComments = db.comments.splice(commentIndex, 1);

    return deletedComments[0];
  },
};

export { Mutation as default };
