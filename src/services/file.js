const File = require("../models/file")
const pdfParse = require('pdf-parse');
const fs = require('fs')

const parseUploadFile = async (req) => {
    try {
        if (!req.file) return { flag: false, status: 400, errMsg: 'No PDF file uploaded.' }
        const filePath = req.file.path

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
        return { flag: true, message: "Fileuploaded successfully.", status: 200, data: { document, extractedTextLength: extractedText.length, extractedTextPreview: extractedText.substring(0, 200) + (extractedText.length > 200 ? '...' : '') } }
    } catch (error) {
        console.error("Error - uploadFile ", error)
        return { flag: false, errMsg: "Error while upload a file.", status: 500 }
    }
}

module.exports = { parseUploadFile }