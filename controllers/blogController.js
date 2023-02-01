const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const getTokenFrom = (request) => {
  const auth = request.get('authorization');
  if (auth && auth.startsWith('Bearer ')) {
    return auth.replace('Bearer ', '');
  }
  return null;
};
blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body;
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  if (!decodedToken.id) {
    return response
      .status(401)
      .json({ error: 'Unauthorized. Invalid token or user does not exists.' });
  }
  if (!title || !author) {
    return response.status(400).json({ error: 'Missing title or author.' });
  }
  const user = await User.findById(decodedToken.id);
  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: user._id,
  });
  const result = await blog.save();
  user.blogs = user.blogs.concat(result._id);
  await user.save();
  response.status(201).json(result);
});

blogRouter.delete('/:id', async (request, response) => {
  const id = request.params.id;
  await Blog.findByIdAndDelete(id);
  response.status(204).end();
});

blogRouter.put('/:id', async (request, response) => {
  const id = request.params.id;
  const update = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
  };
  await Blog.findByIdAndUpdate(id, update, {
    new: true,
    runValidators: true,
    context: 'query',
  });
  response.status(202).end();
});

module.exports = blogRouter;
