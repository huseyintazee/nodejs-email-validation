const express = require("express")
const router = express.Router()
const validateController = require('../../../controllers/validateController')

router.post('/send-verification-email',validateController.verificationEmail)

module.exports = router