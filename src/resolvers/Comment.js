const Comment = {
  author(parent, args, { db }, info) {
    return db.users.find((user) => {
      return user.id === parent.author;
    });
  },

  blog(parent, arg, { db }, info) {
    return db.blogs.find((blog) => {
      return blog.id === parent.blog;
    });
  },
};

export { Comment as default };
