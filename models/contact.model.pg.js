const conDb = require("./pg.connection");

// constructor
const Contacts = function(contacts) {
  this.nome = contacts.nome;
  this.celular = contacts.celular;
};

Contacts.create = (newcontacts, result) => {
  conDb.query("INSERT INTO contacts(nome, celular) VALUES($1, $2) RETURNING *", Object.values(newcontacts), (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created contacts: ", { id: res.rows[0].id, ...newcontacts });
    result(null, { id: res.rows[0].id, ...newcontacts });
  });
};

Contacts.findById = (contactsId, result) => {
  conDb.query(`SELECT * FROM contacts WHERE id = $1`, [contactsId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.rows.length) {
      console.log("found contacts: ", res.rows[0]);
      result(null, res.rows[0]);
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
    "UPDATE contacts SET nome = $1, celular = $2 WHERE id = $3",
    [contacts.nome, contacts.celular, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.rowCount == 0) {
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
  conDb.query("DELETE FROM contacts WHERE id = $1", [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.rowCount == 0) {
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