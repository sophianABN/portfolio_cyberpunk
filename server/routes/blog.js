const express = require('express')
const router = express.Router()
const Blog = require('../models/Blog')

const checkJwt = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/add', checkJwt, upload.single('image'), async (req, res) => {
  const blogArticle = new Blog({
    title: req.body.title,
    content: req.body.content,
    author: req.auth.name,
    image: req.file.location,
  });

  try {
    await blogArticle.save();
    res.json({ message: 'L\'article a été ajouté avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'article:', error);
    res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'article' });
  }
});

router.get('/', async (req, res) => {
  try {
    const blogArticles = await Blog.find().sort({ createdAt: -1 })
    res.json(blogArticles)
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error)
    res.status(500).json({ message: 'Erreur lors de la récupération des articles' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'ID de l\'article manquant' });
    }
    const article = await Blog.findById(id);
    if (!article) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }
    res.json(article);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'article:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'article' });
  }
});

module.exports = router
