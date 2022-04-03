const express = require('express')
const router = express.Router()

const { getUsers, addUser, getOneUser, deleteUser } = require('../controllers/usersController')
const { validate, registerValidator } = require('../validator/user')

router.get('/', getUsers)
router.get('/:id', getOneUser)
router.delete('/:id', deleteUser)
router.post('/', registerValidator(), validate, addUser)

module.exports = router
