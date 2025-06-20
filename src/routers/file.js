const router = require("express").Router()
const authMiddleware = require("../../policies/authMiddelware")
const upload = require("../../utils/service/multer")
const { fileUpload } = require("../controller/file")

router.post("/upload", authMiddleware, upload.single('pdf'), fileUpload)

module.exports = router