const conDb = require("./mysql.connection");
const format = require("../helper/format")

// constructor
const Contacts = function(contacts) {
  format.name(contacts.nome, (res) => {
    this.nome = res
  });
  format.phoneNumber(contacts.celular, (res) => {
    this.celular = res
  });
};

Contacts.create = (newcontacts, result) => {
  conDb.query("INSERT INTO contacts SET ?", newcontacts, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created contacts: ", { id: res.insertId, ...newcontacts });
    result(null, { id: res.insertId, ...newcontacts });
  });
};

Contacts.findById = (contactsId, result) => {
  conDb.query(`SELECT * FROM contacts WHERE id = ?`,contactsId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found contacts: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found contacts with the id
    result({ kind: "not_found" }, null);
  });
};

Contacts.getAll = result => {
  conDb.query("SELECT * FROM contacts", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("contacts: ", res);
    result(null, res);
  });
};

Contacts.updateById = (id, contacts, result) => {
  conDb.query(
    "UPDATE contacts SET nome = ?, celular = ? WHERE id = ?",
    [contacts.nome, contacts.celular, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found contacts with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated contacts: ", { id: id, ...contacts });
      result(null, { id: id, ...contacts });
    }
  );
};

Contacts.remove = (id, result) => {
  conDb.query("DELETE FROM contacts WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found contacts with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted contacts with id: ", id);
    result(null, res);
  });
};

Contacts.removeAll = result => {
  conDb.query("DELETE FROM contacts", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} contacts`);
    result(null, res);
  });
};

module.exports = Contacts;