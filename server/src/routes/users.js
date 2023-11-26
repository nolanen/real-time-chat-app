const router = require("express").Router()
const UsersController = require("../controllers/users")
const db = require("../db")
const authorization = require("../middleware/authorization")

const usersController = new UsersController(db)

const baseURL = "/users"
router.get(`${baseURL}/profile`, authorization, async(req, res) => usersController.getProfile(req, res))
router.get(`${baseURL}/:user_id`, authorization, async(req, res) => usersController.getUser(req,res))
router.get(`${baseURL}/profile-image/:user_id`, async(req, res) => usersController.getProfileImage(req, res))
router.get(`${baseURL}`, authorization, async(req, res) => usersController.getUsers(req, res))
router.post(`${baseURL}/profile`, authorization, async(req, res) => usersController.updateProfile(req, res))


module.exports = router