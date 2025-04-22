const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // For password hashing
const bodyParser = require('body-parser');

// MongoDB URI
const mongoURI = 'mongodb://127.0.0.1:27017/dataset';

// Initialize the Express app
const app = express();
const port = 5000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Define the User schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.log('Error connecting to MongoDB:', err);
  });

// Endpoint to fetch all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send('Error fetching users');
  }
});

// Endpoint for user sign up
app.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User with this email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
    });

    // Save the new user to MongoDB
    await newUser.save();
    res.status(201).send('User signed up successfully');
  } catch (err) {
    console.error('Error signing up user:', err);
    res.status(500).send('Error signing up user');
  }
});

// Start the server
async function startServer() {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

startServer().then(() => {
console.log("server started");
}).catch((err) => {
console.error("Error: ",err);
});
