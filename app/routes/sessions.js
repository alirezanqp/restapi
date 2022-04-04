const express = require('express')
const { newSession } = require('../controllers/sessionsController')
const router = express.Router()

router.post('/new', newSession)

module.exports = router
