const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Create an event
router.post('/events', eventController.createEvent);

// Get all events
router.get('/events', eventController.getAllEvents);

// Get a specific event by ID
router.get('/events/:id', eventController.getEventById);

// Update an event by ID
router.put('/events/:id', eventController.updateEvent);

// Delete an event by ID
router.delete('/events/:id', eventController.deleteEvent);

module.exports = router;
