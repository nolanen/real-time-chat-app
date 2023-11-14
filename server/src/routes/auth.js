const router = require("express").Router()
const db = require("../db.js")
const authorization = require("../middleware/authorization.js")
const AuthController = require("../controllers/auth.js")
const authController = new AuthController(db)

const baseURL = "/auth"

router.post(`${baseURL}/register`, async (req, res) => authController.register(req, res))

router.post(`${baseURL}/login`, async (req, res) => authController.login(req, res))

router.post(`${baseURL}/check-auth`, authorization, (req, res) => res.send(true))

module.exports = router