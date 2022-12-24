const asyncHandler = require("express-async-Handler");

const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");

// @desc get user tickets
// @get /api/tickets
// @access private
const getTickets = asyncHandler(async (req, res) => {
  // Get user using id and jwt
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

  const tickets = await Ticket.find({ user: req.user.id });

  res.status(200).json(tickets);
});

// @desc get user ticket
// @get /api/tickets/:id
// @access private
const getTicket = asyncHandler(async (req, res) => {
  // Get user using id and jwt
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("not authenticated");
  }
  res.status(200).json(ticket);
});

// @desc get user tickets
// @post /api/tickets
// @access private
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(400);
    throw new Error("please provide a description and a product");
  }
  // Get user using id and jwt
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: "new",
  });

  res.status(201).json(ticket);
});

// @desc delete user ticket
// @get delete /api/tickets/:id
// @access private
const deleteTicket = asyncHandler(async (req, res) => {
  // Get user using id and jwt
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("not authenticated");
  }
  await ticket.remove();
  res.status(200).json({ success: true });
});

// @desc update ticket
// @get put /api/tickets/:id
// @access private
const updateTicket = asyncHandler(async (req, res) => {
  // Get user using id and jwt
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("not authenticated");
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {new: true})
  res.status(200).json(updatedTicket);
});




module.exports = {
  createTicket,
  getTickets,
  getTicket,
  updateTicket,
  deleteTicket
};
