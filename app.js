// app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); 
const User = require('./model/User'); // Import the User model

dotenv.config(); 

const app = express();
const port = 3000;


app.use(express.json());

app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

// Define a route to create a new user
app.post('/users', async (req, res) => {
  try {
    const { name, email, text } = req.body;

    if (!name || !email || !text) {
      return res.status(400).json({ error: 'Name, email, and text are required' });
    }

    const user = new User({ name, email, text });
    await user.save();

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user', details: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
