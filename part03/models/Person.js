const mongoose = require('mongoose');
require('dotenv').config();

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Contact name is required'],
    minLength: 3,
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        const split = v.split('-');
        if (split.length !== 2) return false;
        const [first, second] = split;
        if (
          (first.length !== 3 && first.length !== 2) ||
          first.length + second.length < 8 ||
          !/^\d+$/.test(second)
        ) {
          return false;
        }
        return true;
      },
      message: (props) =>
        `${props.value} is invalid. Must be at least 8 digits. If separated by '-', first part must be 2 to 3 digits`,
    },
    required: [true, 'Contact number is required'],
  },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const url = process.env.MONGO_URI;
console.log('connecting to', url);

const init = async () => {
  try {
    await mongoose.connect(url);
    console.log('connected to mongoDB');
  } catch (err) {
    console.log('error connecting to MongoDB:', err.message);
    process.exit(1);
  }
};

init();

module.exports = mongoose.model('Person', personSchema);
