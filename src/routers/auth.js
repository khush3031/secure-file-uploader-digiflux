const router = require("express").Router()
const authController = require("../controller/auth")
const authMiddleware = require("../../policies/authMiddelware")
const { login, register } = require("../../utils/validation/auth")
const validate = require("../../policies/validate")

router.post("/register", validate(register), authController.register)
router.post("/login", validate(login), authController.login)

module.exports = router