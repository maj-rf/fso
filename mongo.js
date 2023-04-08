const mongoose = require('mongoose');

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://admin:${password}@cluster0.kqutwhf.mongodb.net/?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

const init = async () => {
  try {
    await mongoose.connect(url);
    if (process.argv.length === 3) {
      const people = await Person.find({});
      people.map((person) => console.log(person.name, person.number));
      mongoose.connection.close();
      return;
    }
    const person = new Person({
      name,
      number,
    });
    await person.save();
    console.log(`added ${name} number ${number} to phonebook`);
    return mongoose.connection.close();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

init();
