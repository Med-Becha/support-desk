const asyncHandler = require("express-async-Handler");

const Note = require("../models/noteModel");
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");

// @desc get notes for a ticket
// @get GET /api/tickets/:ticketId/notes
// @access private
const getNotes = asyncHandler(async (req, res) => {
  // Get user using id and jwt
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

  const ticket = await Ticket.findById(req.params.ticketId);
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("user not authenticated");
  }
  const notes = await Note.find({ ticket: req.params.ticketId });

  res.status(200).json(notes);
});

// @desc create ticket note
// @get POST /api/tickets/:ticketId/notes
// @access private
const addNote = asyncHandler(async (req, res) => {
  // Get user using id and jwt
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

  const ticket = await Ticket.findById(req.params.ticketId);
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("user not authenticated");
  }
  const note = await Note.create({
    text: req.body.text,
    isStaff: false,
    ticket: req.params.ticketId,
    user: req.user.id,
  });

  res.status(200).json(note);
});

module.exports = {
  getNotes,
  addNote,
};
