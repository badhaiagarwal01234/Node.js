const express = require("express")
const router = express.Router()
const userController = require('../Controller/UserController')

router.post("/save",userController.createUser)

router.get("/getAll",userController.getAllUser)

module.exports = router;