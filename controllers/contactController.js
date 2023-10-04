const asyncHandler = require("express-async-handler");
const { Contact } = require("../db");

const getContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const contact = await Contact.find({ _id: id, user: userId });

  if (!contact) {
    res.status(404);

    throw new Error("Contact not found");
  }

  res.status(200).json(contact);
});

const getContacts = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const contacts = await Contact.find({ user: userId })

  res.status(200).json(contacts);
});

const createContact = asyncHandler(async (req, res) => {
  const user = req.user;

  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);

    throw new Error("All fields are mandatory");
  }

  const contact = await Contact.create({
    user: user.id,
    name,
    email,
    phone,
    timestamp: Date.now(),
  });

  contact.save();

  res.status(201).json(contact);
});

const updateContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const contact = await Contact.find({ _id: id });

  if (!contact) {
    res.status(404);

    throw new Error("Contact not found");
  };

  const { name, email, phone } = req.body;

  const newContact = await Contact
    .updateOne({
      name: name || contact.name,
      email: email || contact.email,
      phone: phone || contact.phone,
    })
    .where({
      _id: id,
      user: userId
    });

  res.status(200).send("Contact updated");
});

const deleteContact = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const result = await Contact.deleteOne({ _id: id });

  if (result.deletedCount === 0) {
    res.status(404);

    throw new Error("Contact not found");
  };

  res.status(200).send("Contact deleted");
});

module.exports = {
  getContact,
  getContacts,
  createContact,
  updateContact,
  deleteContact,
};
