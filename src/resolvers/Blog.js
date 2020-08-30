const Blog = {
  author(parent, args, { db }, info) {
    return db.users.find((user) => {
      return user.id === parent.author;
    });
  },

  comments(parent, args, { db }, info) {
    return db.comments.filter((comment) => {
      return comment.blog === parent.id;
    });
  },
};

export { Blog as default };
