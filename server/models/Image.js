// models/Image.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
});

module.exports = mongoose.model('Image', ImageSchema);
