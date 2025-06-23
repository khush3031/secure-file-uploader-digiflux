const File = require("../models/file")
const pdfParse = require('pdf-parse');
const fs = require('fs')

const parseUploadFile = async (req) => {
    try {
        if (!req.file) return { flag: false, status: 400, errMsg: 'No PDF file uploaded.' }
        const filePath = req.file.path

        const isLimitExceed = await File.countDocuments({ uploadedBy: req.user._id })
        if(isLimitExceed >= 5) return { flag: false, errMsg: "User file upload exceed, kindly contact admin.", status: 400 }
        const pdfBuffer = fs.readFileSync(filePath);
        const pdfData = await pdfParse(pdfBuffer);
        const extractedText = pdfData.text
        if (!extractedText || extractedText.trim().length === 0) {
            // Clean up the uploaded file
            fs.unlinkSync(filePath);
            return { flag: false, status: 400, errMsg: 'No text could be extracted from the PDF.' }
        }
        const document = await File.create({
            filename: req.file.filename,
            originalName: req.file.originalname,
            size: req.file.size,
            mimetype: req.file.mimetype,
            extractedText: extractedText,
            uploadedBy: req.user._id
        });
        fs.unlinkSync(filePath)
        return { flag: true, message: "File uploaded successfully.", status: 200, data: { document, extractedTextLength: extractedText.length, extractedTextPreview: extractedText.substring(0, 200) + (extractedText.length > 200 ? '...' : '') } }
    } catch (error) {
        console.error("Error - uploadFile ", error)
        return { flag: false, errMsg: "Error while upload a file.", status: 500 }
    }
}

const softDelete = async (id, user) => {
    try {
        if(!id) ({ flag: false, errMsg: "No file selected.", status: 400 })
        await File.updateOne({ _id: id }, { deletedAt: new Date(), deletedBy: user._id })
        return { flag: true, message: "File is deleted successfully." }
    } catch (error) {
        console.error("Error - deleteFile ", error)
        return { flag: false, errMsg: "Error while deleting a file.", status: 500 }
    }
}

const getAll = async(userId) => {
    try {
        return { flag: true, message: "File fetched successfully.", data: await File.find({ uploadedBy: userId, deletedAt: { $exists: false } }) }
    } catch (error) {
        console.error("Error - listFile ", error)
        return { flag: false, errMsg: "Error while listing a file.", status: 500 }
    }
}

module.exports = { 
    parseUploadFile,
    softDelete,
    getAll
}