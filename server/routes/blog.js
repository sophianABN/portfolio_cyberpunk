const express = require('express')
const router = express.Router()
const Blog = require('../models/Blog')

const checkJwt = require('../middleware/auth');
const upload = require('../middleware/upload');

// Cette route reste protégée
router.post('/add', checkJwt, upload.single('image'), async (req, res) => {
  try {
    const blogArticle = new Blog({
      title: req.body.title,
      content: req.body.content,
      author: req.auth.name,
      image: req.file ? req.file.location : null, // Vérification de l'existence du fichier
    });

    await blogArticle.save();
    res.json({ message: 'L\'article a été ajouté avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'article:', error);
    res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'article' });
  }
});

// Ces routes sont maintenant accessibles à tous
router.get('/', async (req, res) => {
  try {
    const blogArticles = await Blog.find().sort({ updatedAt: -1 })
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

// Route pour mettre à jour un article
router.put('/:id', checkJwt, upload.single('image'), async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      content: req.body.content
    }
    if (req.file) {
      updateData.image = req.file.location
    }
    const updatedArticle = await Blog.findOneAndUpdate(
      { _id: req.params.id },
      updateData,
      { new: true }
    )
    res.json(updatedArticle)
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'article:', error)
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'article' })
  }
})

// Route pour supprimer un article
router.delete('/:id', checkJwt, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id)
    res.json({ message: 'Article supprimé avec succès' })
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'article:', error)
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'article' })
  }
})


module.exports = router