const { Command } = require("commander");
const { listContacts, addContact, removeContact, getContactById, } = require('./contacts');

const program = new Command();

program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone")

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            const contacts = await listContacts();
            console.table(contacts);
            break;
        
        case "get":
            const contact = await getContactById(id);
            if (contact) {
                console.log(contact)
            } else {
                console.log(`Contact with id ${id} not found.`);
            }
            break;
        
        case "add":
            if (name && email && phone) {
                await addContact(id, name, email, phone);
                console.log(`Added new contact: ${name}`);
            } else {
                console.log("Missing parameters: name, email or phone.");
            }
            break;
        
        case "remove":
            await removeContact(id);
            console.log(`Removed contact with id ${id}`);
            break;
        
        default:
            console.warn("\x1B[31m Unknown action type!")
    }
}

invokeAction(argv);