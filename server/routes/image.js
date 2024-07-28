const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');
const Image = require('../models/Image');
const checkJwt = require('../middleware/auth');

// Configuration du client S3
const s3Client = new S3Client({
  endpoint: process.env.MINIO_ENDPOINT,
  region: process.env.REGION, // Remplacez par votre région si nécessaire
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY,
    secretAccessKey: process.env.MINIO_SECRET_KEY,
  },
  forcePathStyle: true,
});

// Configuration de multer-s3
const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.MINIO_BUCKET,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `images/${Date.now().toString()}-${file.originalname}`);
    }
  })
});

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