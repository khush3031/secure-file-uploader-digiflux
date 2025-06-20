const router = require("express").Router()

router.use("/auth", require("./auth"))
router.use("/file", require("./file"))

module.exports = router