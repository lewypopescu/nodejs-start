const { ifError } = require("assert");
const { isUtf8 } = require("buffer");
const { error } = require("console");
const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  return new Promise((resolve, reject) => {
    fs.readFile(contactsPath, "utf8", (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

function getContactsById(contactId) {
  return new Promise((resolve, reject) => {
    fs.readFile(contactsPath, "utf8", (error, data) => {
      if (error) {
        reject(error);
      }
      return;
    });

    const contacts = JSON.parse(data);
    const contact = contacts.find((contact) => contact.id === contactId);

    if (contact) {
      resolve(contact);
    } else {
      resolve(null);
    }
  });
}

function removeContact(contactId) {
  return new Promise((resolve, reject) => {
    fs.readFile(contactsPath, "utf8", (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      const contacts = JSON.parse(data);
      const index = contacts.findIndex((contact) => contact.id === contactId);

      if (index !== -1) {
        const removedContact = contacts.splice(index, 1)[0];
        fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(removedContact);
          }
        });
      } else {
        resolve(null);
      }
    });
  });
}
