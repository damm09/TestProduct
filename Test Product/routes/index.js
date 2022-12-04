const router = require('express').Router()
const Controller = require('../controllers/controller');

router.post('/register', Controller.handleRegister)
router.post('/login', Controller.login)

module.exports = router