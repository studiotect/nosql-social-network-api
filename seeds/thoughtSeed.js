const Thought = require('../models/Thought');

const handleError = (err) => console.error(err);

const thoughtData = [
  {
    thoughtText: 'This is a sample thought 1',
    username: 'jaytriemert',
    reactions: [
      {
        reactionBody: 'Sample reaction 1',
        username: 'studiotect',
        createdAt: new Date()
      },
      {
        reactionBody: 'Sample reaction 2',
        username: 'johndoe',
        createdAt: new Date()
      }
    ],
    createdAt: new Date()
  },
  {
    thoughtText: 'This is a sample thought 2',
    username: 'studiotect',
    reactions: [
      {
        reactionBody: 'Sample reaction 3',
        username: 'jaytriemert',
        createdAt: new Date()
      },
      {
        reactionBody: 'Sample reaction 4',
        username: 'johndoe',
        createdAt: new Date()
      }
    ],
    createdAt: new Date()
  },
  {
    thoughtText: 'This is a sample thought 3',
    username: 'johndoe',
    reactions: [
      {
        reactionBody: 'Sample reaction 5',
        username: 'jaytriemert',
        createdAt: new Date()
      },
      {
        reactionBody: 'Sample reaction 6',
        username: 'studiotect',
        createdAt: new Date()
      }
    ],
    createdAt: new Date()
  }
];

async function populateThought() {
  try {
    const collection = await Thought.find({});
    if (collection.length === 0) {
      await Thought.insertMany(thoughtData);
      console.log('Thoughts seeded successfully');
    } else {
      console.log('Thoughts collection already populated');
    }
  } catch (error) {
    console.error('Error seeding thoughts:', error);
    process.exit(1);
  }
}

populateThought();
