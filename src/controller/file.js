const fileUploadService = require("../services/file")

const fileUpload = async(req, res) => {
    try {
        const resp = await fileUploadService.parseUploadFile(req)
        if(!resp.flag) return res.status(resp.status).json({ code: "Error", message: resp.errMsg })
        else return res.status(200).json({ message: resp.message, data: resp.data })
    } catch (error) {
        console.error("Error - while uploading a file (controller) ", error)
        return res.status(500).json({ code: "ERROR", message: "Internal server error" })
    }
}

const softDelete = async(req, res) => {
    try {
        const resp = await fileUploadService.softDelete(req.id, req.user)
        if(!resp.flag) return res.status(resp.status).json({ code: "Error", message: resp.errMsg })
        else return res.status(200).json({ message: resp.message })
    } catch (error) {
        console.error("Error - while deleting a file (controller) ", error)
        return res.status(500).json({ code: "ERROR", message: "Internal server error" })
    }
}

const getAll = async(req, res) => {
    try {
        const resp = await fileUploadService.getAll(req.user._id)
        if(!resp.flag) return res.status(resp.status).json({ code: "Error", message: resp.errMsg })
        else return res.status(200).json({ message: resp.message, data: resp.data })
    } catch (error) {
        console.error("Error - while listing a file (controller) ", error)
        return res.status(500).json({ code: "ERROR", message: "Internal server error" })
    }
}
 
module.exports = { 
    fileUpload,
    softDelete,
    getAll
}