const express = require("express");
const { RegiterUser } = require("../controllers/UserController");
const router = express.Router();

router.post('/register', RegiterUser)

module.exports = router