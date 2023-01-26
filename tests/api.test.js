const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const helper = require('./test_helper');
const Blog = require('../models/blog');

// band aid solution for timeouts
// beforeAll(async () => {
//   await app.connectDB();
// });

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialData);
});

describe('GET methods for blog', () => {
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
});

describe('POST methods for blog', () => {
  test('a new valid blog can be added', async () => {
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

  test('missing blog title returns status 400', async () => {
    const newBlog = {
      author: 'Joey Tribbiani',
      url: 'https://friends.com/',
    };
    const response = await api.post('/api/blogs').send(newBlog);
    expect(response.statusCode).toBe(400);
  });

  test('missing blog author returns status 400', async () => {
    const newBlog = {
      title: 'Friends',
      url: 'https://friends.com/',
    };
    const response = await api.post('/api/blogs').send(newBlog);
    expect(response.statusCode).toBe(400);
  });
});

describe('DELETE methods for blog', () => {
  test('deleting a valid blog in db', async () => {
    await api.delete(`/api/blogs/${helper.initialData[0]._id}`).expect(204);
    const currentBlogs = await helper.blogsInDB();
    expect(currentBlogs).toHaveLength(helper.initialData.length - 1);
    const contents = currentBlogs.map((r) => r.id);
    expect(contents).not.toContain(helper.initialData[0]._id);
  });
});

describe('PUT methods for blog', () => {
  test('updating a valid blog in db', async () => {
    const update = {
      title: 'Superfriends',
      // author: 'Joey Tribbiani',
      // url: 'https://friends.com/',
    };
    await api
      .put(`/api/blogs/${helper.initialData[0]._id}`)
      .send(update)
      .expect(202);
    const currentBlogs = await helper.blogsInDB();
    const contents = currentBlogs.map((r) => r.title);
    expect(contents).toContain('Superfriends');
  });
});
afterAll(async () => {
  await mongoose.connection.close();
});
