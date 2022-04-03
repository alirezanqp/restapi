const express = require('express')
const router = express.Router()

const { getUsers, addUser } = require('../controllers/usersController')

const { validate, registerValidator } = require('../validator/user')

router.get('/', getUsers)
router.post('/', registerValidator(), validate, addUser)

module.exports = router
