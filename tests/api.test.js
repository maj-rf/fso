const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const helper = require('./test_helper');
const Blog = require('../models/blog');
const bcrypt = require('bcrypt');
const User = require('../models/user');

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

describe('User tests', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ username: 'root', name: 'root', passwordHash });

    await user.save();
  });

  test('create valid user', async () => {
    const initialUsers = await helper.usersInDb();
    const newUser = {
      username: 'newUser',
      name: 'newUser',
      password: 'randompass',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const currentUsers = await helper.usersInDb();
    expect(currentUsers).toHaveLength(initialUsers.length + 1);

    const usernames = currentUsers.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('invalid user with missing credentials', async () => {
    const newUser = {
      username: 'blue',
    };

    const response = await api.post('/api/users').send(newUser);
    expect(response.statusCode).toBe(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
