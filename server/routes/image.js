const express = require('express');
const router = express.Router();

const Image = require('../models/Image');
const checkJwt = require('../middleware/auth');
const upload = require('../middleware/upload');


// Route pour uploader une image
router.post('/upload', checkJwt, upload.single('image'), async (req, res) => {
  try {
    const newImage = new Image({
      title: req.body.title,
      url: req.file.location
    });
    await newImage.save();
    res.status(201).json(newImage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route pour récupérer toutes les images
router.get('/', async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;