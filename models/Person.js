const mongoose = require('mongoose');
require('dotenv').config();

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const url = process.env.MONGO_URI;
console.log('connecting to', url);

const init = async () => {
  try {
    const conn = await mongoose.connect(url);
    console.log('connected to mongoDB');
  } catch (err) {
    console.log('error connecting to MongoDB:', err.message);
    process.exit(1);
  }
};

init();

module.exports = mongoose.model('Person', personSchema);
