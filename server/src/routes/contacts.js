const router = require("express").Router()
const authorization = require("../middleware/authorization")
const db = require("../db")
const ContactsController = require("../controllers/contacts")

const contactsController = new ContactsController(db)

const baseURL = "/contacts"

router.get(`${baseURL}`, authorization, async(req, res) => contactsController.getContacts(req, res))
router.get(`${baseURL}/:user_id`, authorization, async(req, res) => contactsController.getContact(req, res))
router.post(`${baseURL}/:contact_id`, authorization, async(req, res) => contactsController.createContact(req, res))

module.exports = router