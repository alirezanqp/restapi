const express = require('express')
const router = express.Router()

const { getUsers, addUser, getOneUser, deleteUser, updateUser } = require('../controllers/usersController')
const { validate, registerValidator } = require('../validator/user')

router.get('/', getUsers)
router.post('/', registerValidator(), validate, addUser)
router.get('/:id', getOneUser)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router
