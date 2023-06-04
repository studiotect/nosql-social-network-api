const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const Thought = require('./models/Thought');
const connection = require('./config/connection');

// Create Express app
const app = express();

// Set up JSON parsing for request bodies
app.use(express.json());

// Connect to MongoDB database
async function connectToDatabase() {
  try {
    await connection;
    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;

    // Drop the database before syncing models (optional)
    // await db.dropDatabase();

    // Sync Mongoose models to the database
    await Promise.all([User.syncIndexes(), Thought.syncIndexes()]);
    console.log('Mongoose models synced to the database');

    // Populate the User and Thought models if necessary
    await populateData();

    // Set up routes
    setupRoutes();

    // Start the server
    const port = 3000;
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

// Function to populate the User and Thought models
async function populateData() {
  try {
    // Check if the User collection is empty
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      // Perform User model population here
      await populateUsers();
      console.log('Users seeded successfully');
    } else {
      console.log('Users collection already populated');
    }

    // Check if the Thought collection is empty
    const thoughtCount = await Thought.countDocuments();
    if (thoughtCount === 0) {
      // Perform Thought model population here
      await populateThoughts();
      console.log('Thoughts seeded successfully');
    } else {
      console.log('Thoughts collection already populated');
    }
  } catch (err) {
    console.error('Error populating data:', err);
  }
}

// Function to populate the User model
async function populateUsers() {
  const users = [
    {
      username: 'john123',
      email: 'john@example.com',
      thoughts: [],
      friends: [],
    },
    {
      username: 'jane456',
      email: 'jane@example.com',
      thoughts: [],
      friends: [],
    },
    // Add more user objects as needed
  ];

  await User.create(users);
}

// Function to populate the Thought model
async function populateThoughts() {
  const thoughts = [
    {
      thoughtText: 'This is a sample thought 1',
      username: 'john123',
      reactions: [],
      createdAt: new Date(),
    },
    {
      thoughtText: 'This is a sample thought 2',
      username: 'jane456',
      reactions: [],
      createdAt: new Date(),
    },
    // Add more thought objects as needed
  ];

  await Thought.create(thoughts);
}

// Set up routes
function setupRoutes() {
  // Get all users
  app.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error('Error getting users:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // Get a user by ID
  app.get('/users/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.json(user);
      }
    } catch (error) {
      console.error('Error getting user:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // Create a new user
  app.post('/users', async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // Get all thoughts
  app.get('/thoughts', async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (error) {
      console.error('Error getting thoughts:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // Get thoughts by user ID
  app.get('/users/:id/thoughts', async (req, res) => {
    try {
      const thoughts = await Thought.find({ username: req.params.id });
      res.json(thoughts);
    } catch (error) {
      console.error('Error getting thoughts:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // Get a thought by ID
  app.get('/thoughts/:id', async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.id);
      if (!thought) {
        res.status(404).json({ error: 'Thought not found' });
      } else {
        res.json(thought);
      }
    } catch (error) {
      console.error('Error getting thought:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
}

// Create a new thought
app.post('/thoughts', async (req, res) => {
  try {
    const newThought = await Thought.create(req.body);
    res.json(newThought);
  } catch (error) {
    console.error('Error creating thought:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a user
app.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a thought
app.put('/thoughts/:id', async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedThought);
  } catch (error) {
    console.error('Error updating thought:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a user
app.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.json(deletedUser);
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a thought
app.delete('/thoughts/:id', async (req, res) => {
  try {
    const deletedThought = await Thought.findByIdAndDelete(req.params.id);
    res.json(deletedThought);
  } catch (error) {
    console.error('Error deleting thought:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


// Call the connectToDatabase function to start the application
connectToDatabase();
