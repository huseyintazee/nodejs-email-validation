const express = require("express");
const router = express.Router();
const auth = require('./v1/auth');
const validate = require('./v1/validate');

router.use('/v1/auth', auth);
router.use('/v1/validate', validate);

module.exports = router;