const router = require("express").Router()
const authMiddleware = require("../../policies/authMiddelware")
const upload = require("../../utils/service/multer")
const { fileUpload, softDelete, getAll } = require("../controller/file")

router.post("/upload", authMiddleware, upload.single('pdf'), fileUpload)
router.put("/soft-delete", authMiddleware, softDelete)
router.get("/list", authMiddleware, getAll)

module.exports = router