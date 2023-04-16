const bcrypt = require('bcrypt');
const userRouter = require('express').Router();
const User = require('../models/user');

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;
  if (!username || !name || !password) {
    return response
      .status(400)
      .json({ error: 'Missing username, name, or password.' });
  }
  if (username.length < 3 || password.length < 3) {
    return response.status(400).json({
      error: 'Username and Password must be at least 3 characters long',
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { user: 0 });
  response.json(users);
});

module.exports = userRouter;
