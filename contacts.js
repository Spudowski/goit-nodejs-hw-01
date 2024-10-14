const fs = require('fs');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

const readContacts = () => {
  const data = fs.readFileSync(contactsPath, 'utf8');
  return JSON.parse(data);
};

const writeContacts = (contacts) => {
  fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  return readContacts();
};

const getContactById = async (id) => {
  const contacts = readContacts();
  return contacts.find(contact => contact.id === id);
};

const addContact = async (id, name, email, phone) => {
  const contacts = readContacts();
  const newContact = { id, name, email, phone };
  contacts.push(newContact);
  writeContacts(contacts);
  return newContact;
};

const removeContact = async (id) => {
  let contacts = readContacts();
  contacts = contacts.filter(contact => contact.id !== id);
  writeContacts(contacts);
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};

