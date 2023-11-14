class ContactsController {
    constructor(db) {
        this.db = db
    }

    async getContact(req, res) {
        try {
            const {user_id} = req.params
            const contact = await this.db.query("SELECT * FROM users WHERE user_id = $1", [user_id])
            if(contact.rows.length === 0) {
                res.send("Error")
            }

            res.send(contact.rows[0])
        } catch (error) {
            
        }
    }

    async getContacts(req, res) {
        try {
            const {user_name} = req.query
            const contacts = await this.db.query("SELECT U.user_id, U.user_name FROM users U LEFT JOIN User_Contacts UC ON U.user_id = UC.contact_id WHERE UC.user_id = $1 AND U.user_name ILIKE $2", [req.user.id, `%${user_name}%`])
            res.send(contacts.rows)
        } catch (error) {
            
        }
    }

    async createContact(req, res) {
        try {
            const {contact_id} = req.params
            const newContact = await this.db.query("INSERT INTO user_contacts(user_id, contact_id) VALUES($1, $2) RETURNING *", [req.user.id, contact_id])
            console.log(newContact)
            res.send(newContact.rows[0])
        } catch (error) {
            
        }
    }

    async deleteContact(req, res) {

    }

}

module.exports = ContactsController