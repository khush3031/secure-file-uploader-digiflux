const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    filename: { type: String },
    originalName: { type: String },
    size: { type: Number },
    mimetype: { type: String },
    extractedText: { type: String },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    uploadDate: { type: Date, default: Date.now }
}, {
    timestamps: true
});

module.exports = mongoose.model('file', fileSchema, 'file');