const connection = require('../config/connection');
const Thought = require('../models/Thought');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const handleError = (err) => console.error(err);

const thoughtData = [
  {
    thoughtText: 'This is a sample thought 1',
    username: 'jaytriemert',
    reactions: [
      {
        reactionBody: 'Sample reaction 1',
        username: 'studiotect',
        reactionId: new ObjectId(),
        createdAt: new Date(),
      },
      {
        reactionBody: 'Sample reaction 2',
        username: 'johndoe',
        reactionId: new ObjectId(),
        createdAt: new Date(),
      },
    ],
    createdAt: new Date(),
  },
  {
    thoughtText: 'This is a sample thought 2',
    username: 'studiotect',
    reactions: [
      {
        reactionBody: 'Sample reaction 3',
        username: 'jaytriemert',
        reactionId: new ObjectId(),
        createdAt: new Date(),
      },
      {
        reactionBody: 'Sample reaction 4',
        username: 'johndoe',
        reactionId: new ObjectId(),
        createdAt: new Date(),
      },
    ],
    createdAt: new Date(),
  },
  {
    thoughtText: 'This is a sample thought 3',
    username: 'johndoe',
    reactions: [
      {
        reactionBody: 'Sample reaction 5',
        username: 'jaytriemert',
        reactionId: new ObjectId(),
        createdAt: new Date(),
      },
      {
        reactionBody: 'Sample reaction 6',
        username: 'studiotect',
        reactionId: new ObjectId(),
        createdAt: new Date(),
      },
    ],
    createdAt: new Date(),
  },
];

async function populateThought() {
  try {
    // Establish the database connection
    await connection;

    const collection = await Thought.find({});
    if (collection.length === 0) {
      await Thought.insertMany(thoughtData);
      console.log('Thoughts seeded successfully');
    } else {
      console.log('Thoughts collection already populated');
    }
  } catch (err) {
    handleError(err);
  } finally {
    // Close the database connection
    connection.close();
  }
}

populateThought();