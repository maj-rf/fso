const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const helper = require('./test_helper');
const Blog = require('../models/blog');

// timed-out??
beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialData);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('get all blogs', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(helper.initialData.length);
});

test('blogs should have a unique identifier property id', async () => {
  const response = await api.get('/api/blogs');
  for (const obj of response.body) {
    expect(obj.id).toBeDefined();
  }
});

test('a new blog can be added via POST', async () => {
  const newBlog = {
    title: 'Friends',
    author: 'Joey Tribbiani',
    url: 'https://friends.com/',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const currentBlogs = await helper.blogsInDB();
  expect(currentBlogs).toHaveLength(helper.initialData.length + 1);
  const titles = currentBlogs.map((blog) => blog.title);
  expect(titles).toContain('Friends');
});

afterAll(async () => {
  await mongoose.connection.close();
});
