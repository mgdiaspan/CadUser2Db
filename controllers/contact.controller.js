const ContactPg = require("../models/contact.model.pg");
const ContactMysql = require("../models/contact.model.mysql");

// Create and Save a new Contact
exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const Contact = req.user.client === "macapa" ? ContactMysql : ContactPg
  // Create a contact
  const contact = new Contact({
    nome: req.body.nome,
    celular: req.body.celular
  });

  // Save contact in the database
  Contact.create(contact, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the contact."
      });
    else res.send(data);
  });
};

// Retrieve all contacts from the database.
exports.findAll = (req, res) => {
  const Contact = req.user.client === "macapa" ? ContactMysql : ContactPg;
  Contact.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving contacts."
      });
    else res.send(data);
  });
};

// Find a single contact with a contactId
exports.findOne = (req, res) => {
  const Contact = req.user.client === "macapa" ? ContactMysql : ContactPg
  Contact.findById(req.params.contactId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Contact with id ${req.params.contactId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Contact with id " + req.params.contactId
        });
      }
    } else res.send(data);
  });
};

// Update a contact identified by the contactId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const Contact = req.user.client === "macapa" ? ContactMysql : ContactPg
  Contact.updateById(
    req.params.contactId,
    new Contact(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found contact with id ${req.params.contactId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating contact with id " + req.params.contactId
          });
        }
      } else res.send(data);
    });
};

// Delete a contact with the specified contactId in the request
exports.delete = (req, res) => {
  const Contact = req.user.client === "macapa" ? ContactMysql : ContactPg
  Contact.remove(req.params.contactId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Contact with id ${req.params.contactId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Contact with id " + req.params.contactId
        });
      }
    } else res.send({ message: `Contact was deleted successfully!` });
  });
};

// Delete all contacts from the database.
exports.deleteAll = (req, res) => {
  const Contact = req.user.client === "macapa" ? ContactMysql : ContactPg
  Contact.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Contacts."
      });
    else res.send({ message: `All Contacts were deleted successfully!` });
  });
};