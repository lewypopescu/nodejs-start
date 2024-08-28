import { nanoid } from "nanoid";

import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";

// const fs = require("fs");
// const path = require("path");

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const contactsPath = path.join(__dirname, "db", "contacts.json");

export function listContacts() {
  return new Promise((resolve, reject) => {
    fs.readFile(contactsPath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

export function getContactById(contactId) {
  return new Promise((resolve, reject) => {
    fs.readFile(contactsPath, "utf8", (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      const contacts = JSON.parse(data);
      const contact = contacts.find((contact) => contact.id === contactId);

      if (contact) {
        resolve(contact);
      } else {
        resolve(null);
      }
    });
  });
}

export function removeContact(contactId) {
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
        fs.writeFile(
          contactsPath,
          JSON.stringify(contacts, null, 2),
          (error) => {
            if (err) {
              reject(err);
            } else {
              resolve(removedContact);
            }
          }
        );
      } else {
        resolve(null);
      }
    });
  });
}

export function addContact(name, email, phone) {
  return new Promise((resolve, reject) => {
    fs.readFile(contactsPath, "utf8", (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      const contacts = JSON.parse(data);
      const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
      };
      contacts.push(newContact);

      fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(newContact);
        }
      });
    });
  });
}
