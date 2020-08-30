const User = {
  blogs(parent, args, { db }, info) {
    return db.blogs.filter((blog) => {
      return blog.author === parent.id;
    });
  },

  comments(parent, args, { db }, info) {
    return db.comments.filter((comment) => {
      return comment.author === parent.id;
    });
  },
};

export { User as default };
