const router = require("express").Router()
const authorization = require("../middleware/authorization")
const db = require("../db")
const ChatController = require("../controllers/chat")

const chatController = new ChatController(db)

const baseURL = "/chat"

router.get(`${baseURL}`, authorization, async(req, res) => chatController.getChats(req, res))
router.get(`${baseURL}/:id`, authorization, async(req, res) => chatController.getChatMessages(req, res))
router.get(`${baseURL}/:with_user/exists`, authorization, async(req, res) => chatController.checkIfChatExists(req, res))
router.post(`${baseURL}/:contact_id`, authorization, async(req, res) => chatController.createChat(req, res))



module.exports = router