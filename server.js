const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Import cors
const app = express();
const port = 5000;

// Enable CORS for all routes
app.use(cors());

// Middleware for parsing JSON request body
app.use(express.json());

// Endpoint to fetch all users
app.get('/users', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'users.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ message: 'Failed to load users.' });
    }
    try {
      const users = JSON.parse(data);
      res.json(users);
    } catch (e) {
      console.error('Error parsing JSON:', e);
      return res.status(500).json({ message: 'Failed to parse user data.' });
    }
  });
});

// Endpoint to handle sign-up (PATCH request to add new user)
app.patch('/users', (req, res) => {
  const newUser = req.body; // Expecting { "email@example.com": { ... } }
  const filePath = path.join(__dirname, 'public', 'users.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ message: 'Failed to read users data.' });
    }
    try {
      const usersData = JSON.parse(data);
      const userKey = Object.keys(newUser)[0];

      if (usersData[userKey]) {
        return res.status(400).json({ message: 'User already exists with this email.' });
      }

      // Merge new user into the existing users
      const updatedUsers = { ...usersData, ...newUser };

      fs.writeFile(filePath, JSON.stringify(updatedUsers, null, 2), (err) => {
        if (err) {
          console.error('Error writing file:', err);
          return res.status(500).json({ message: 'Failed to save new user.' });
        }
        res.status(201).json({ message: 'User created successfully.' });
      });
    } catch (e) {
      console.error('Error parsing JSON:', e);
      return res.status(500).json({ message: 'Failed to parse or update user data.' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
