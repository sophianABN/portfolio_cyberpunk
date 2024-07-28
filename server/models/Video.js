// models/Video.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
});

module.exports = mongoose.model('Video', VideoSchema);
