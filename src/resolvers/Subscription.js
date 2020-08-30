const Subscription = {
  count: {
    subscribe(parent, args, { pubsub }, info) {
      let count = 0;

      setInterval(() => {
        count++;
        pubsub.publish("count", {
          count,
        });
      }, 1000);

      return pubsub.asyncIterator("count");
    },
  },

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
};

export { Subscription as default };
