const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../db");

const registerUser = asyncHandler(async (req, res) => {
  const {
    username,
    email,
    password
  } = req.body;

  if (!username || !email || !password) {
    res.status(400);

    throw new Error("All fields are mandatory");
  }

  const user = await User.findOne({ email });

  if (user) {
    res.status(409);

    throw new Error("User already exists");
  };

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
    timestamp: Date.now(),
  });

  newUser.save();

  res.status(201).json(newUser);
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);

    throw new Error("Invalid credentials");
  };

  const isValid = bcrypt.compareSync(password, user.password);

  if (!isValid) {
    res.status(401);

    throw new Error("Invalid credentials");
  };

  const accessToken = jwt.sign(
    {
      user: {
        username: user.username,
        email: user.email,
        id: user._id,
      }
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  res.status(200).json({ accessToken });
});

const currentUser = asyncHandler(async (req, res) => {
  const { user } = req;

  if (!user) {
    res.status(401);

    throw new Error("User is not authorized");
  }

  res.status(200).json({ user });
});

module.exports = {
  currentUser,
  loginUser,
  registerUser,
};
