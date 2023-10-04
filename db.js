const mongoose = require("mongoose");

const MONGO_URI = `mongodb://mongo:27017`;

const USER_SCHEMA = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  timestamp: Date
});

const CONTACT_SCHEMA = mongoose.Schema({
  user: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  phone: String,
  timestamp: Date
});

mongoose.connect(MONGO_URI, {
  dbName: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  pass: process.env.DATABASE_PASSWORD,
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    throw err;
  });

const User = mongoose.model("users", USER_SCHEMA);
const Contact = mongoose.model("contacts", CONTACT_SCHEMA);

module.exports = {
  User,
  Contact,
};
