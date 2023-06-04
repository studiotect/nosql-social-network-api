const connection = require('../config/connection');
const User = require('../models/User');

const handleError = (err) => console.error(err);

async function populateUser() {
  try {
    await connection;

    const collection = await User.find({});
    if (collection.length === 0) {
      const user1 = await User.create({
        username: 'jaytriemert',
        email: 'jay@gmail.com',
        thoughts: [],
        friends: []
      });

      const user2 = await User.create({
        username: 'studiotect',
        email: 'studio@gmail.com',
        thoughts: [],
        friends: []
      });

      const user3 = await User.create({
        username: 'johndoe',
        email: 'john@example.com',
        thoughts: [],
        friends: []
      });

      user1.friends.push(user2, user3);
      user2.friends.push(user1);
      user3.friends.push(user1);

      await Promise.all([user1.save(), user2.save(), user3.save()]);

      console.log('Inserted sample seed data for users');
    } else {
      console.log('Users collection already populated');
    }
  } catch (err) {
    handleError(err);
  } finally {
    // Close the database connection
    connection.close();
  }
}

populateUser();
