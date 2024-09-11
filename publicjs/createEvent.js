const mongoose = require('mongoose');
const User = require('../models/User'); // Adjust path if needed

mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const createUser = async () => {
  try {
    const user = new User({
      username: 'testuser',
      password: 'password123', // Make sure to hash the password in production
    });
    await user.save();
    console.log('User created successfully!');
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    mongoose.disconnect();
  }
};

createUser();
