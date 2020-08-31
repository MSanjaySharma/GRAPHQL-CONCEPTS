const Subscription = {
  comment: {
    subscribe(parent, { blogId }, { db, pubsub }, info) {
      const blog = db.blogs.find(
        (blog) => blog.id === blogId && blog.published
      );

      if (!blog) {
        throw new Error("Blog not Found");
      }

      return pubsub.asyncIterator(`comment ${blogId}`);
    },
  },

  blog: {
    subscribe(parent, args, { pubsub }, info) {
      return pubsub.asyncIterator("blog");
    },
  },
};

export { Subscription as default };
