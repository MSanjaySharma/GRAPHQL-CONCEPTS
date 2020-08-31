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
    published: true,
    author: "id_2",
  },
  {
    id: "blog_2",
    title: "Alpha treatment",
    body: "A breakthrough in cancer treatment",
    published: true,
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

const comments = [
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

const db = {
  users,
  blogs,
  comments,
};

export { db as default };
