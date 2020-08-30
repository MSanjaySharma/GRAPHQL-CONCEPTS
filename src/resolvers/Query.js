const Query = {
  greeting(parent, args, { db }, info) {
    if (args.name && args.company) {
      return `Hello ${args.name} welcome to ${args.company}!!!`;
    } else {
      return `Hello !!!`;
    }
  },

  users(parent, args, { db }, info) {
    if (!args.search) {
      return db.users;
    } else {
      return db.users.filter((user) => {
        return user.name.toLowerCase().includes(args.search.toLowerCase());
      });
    }
  },

  blogs(parent, args, { db }, info) {
    if (!args.search) {
      return db.blogs;
    } else {
      const search = args.search;
      return db.blogs.filter((blog) => {
        return blog.title.includes(search) || blog.body.includes(search);
      });
    }
  },

  comments(parent, args, { db }, info) {
    return db.comments;
  },
};

export { Query as default };
