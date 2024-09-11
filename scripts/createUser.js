const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Adjust path if necessary

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('MongoDB connected');

  // Create a new user
  const hashedPassword = await bcrypt.hash('testpassword', 10);
  const user = new User({
    username: 'testuser',
    password: hashedPassword
  });

  await user.save();
  console.log('User created');

  mongoose.connection.close();
})
.catch(err => console.log(err));
