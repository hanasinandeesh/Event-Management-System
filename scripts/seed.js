// scripts/seed.js
const mongoose = require('mongoose');
const Event = require('../models/Event');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const events = [
  { title: 'Community Cleanup Day', description: 'A day to clean up the community.', date: new Date(), location: 'Park', type: 'Community' },
  { title: 'Art Walk', description: 'Explore local art galleries.', date: new Date(), location: 'City Center', type: 'Art' },
  { title: 'Holiday Market', description: 'Festive goods and crafts.', date: new Date(), location: 'Downtown', type: 'Market' },
  { title: 'Team-Building Retreat', description: 'Build team cohesion.', date: new Date(), location: 'Resort', type: 'Corporate' },
  { title: 'Company Picnic', description: 'Company event for fun and food.', date: new Date(), location: 'Company Lawn', type: 'Corporate' }
];

Event.insertMany(events)
  .then(() => {
    console.log('Sample events added');
    mongoose.connection.close();
  })
  .catch(err => console.error(err));
