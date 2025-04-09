const express = require("express")
const { RegisterUser } = require("../controllers/auth-controller")
const router = express.Router()

router.post('/register', RegisterUser)

module.exports = router