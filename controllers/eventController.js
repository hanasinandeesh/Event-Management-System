const Event = require('../models/event');

// Create an event
exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, location, type } = req.body; // Ensure these fields are being destructured from req.body
    const newEvent = new Event({ title, description, date, location, type });
    await newEvent.save();
    res.status(201).json({ message: 'Event successfully created', event: newEvent });
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error });
  }
};

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
};

// Get an event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event', error });
  }
};

// Update an event by ID
exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const result = await Event.findByIdAndUpdate(id, updates, { new: true });
    if (result) {
      res.status(200).json({ success: true, message: 'Event successfully updated', event: result });
    } else {
      res.status(404).json({ success: false, message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating event', error });
  }
};

// Delete an event by ID
exports.deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    await Event.findByIdAndDelete(eventId);
    res.status(200).json({ success: true, message: 'Event successfully deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting event', error });
  }
};
