

module.exports = app => {
    const contacts = require("../controllers/contact.controller.js");
    const auth = require("./authenticator")
  
    // Create a new contact
    app.post("/contacts", auth, contacts.create);
  
    // Retrieve all contacts
    app.get("/contacts", auth, contacts.findAll);
  
    // Retrieve a single contact with contactId
    app.get("/contacts/:contactId", auth, contacts.findOne);
  
    // Update a contact with contactId
    app.put("/contacts/:contactId", auth, contacts.update);
  
    // Delete a contact with contactId
    app.delete("/contacts/:contactId", auth, contacts.delete);
  
    // Create a new contact
    app.delete("/contacts", auth, contacts.deleteAll);
  };