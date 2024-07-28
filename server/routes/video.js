const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');
const Video = require('../models/Video');
const checkJwt = require('../middleware/auth');

// Configuration du client S3 (identique à image.js)
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
      cb(null, `videos/${Date.now().toString()}-${file.originalname}`);
    }
  })
});

// Route pour uploader une vidéo
router.post('/upload', checkJwt, upload.single('video'), async (req, res) => {
  try {
    const newVideo = new Video({
      title: req.body.title,
      url: req.file.location
    });
    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route pour récupérer toutes les vidéos
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;