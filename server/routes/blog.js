const express = require('express')
const router = express.Router()
const Blog = require('../models/Blog')

router.post('/add', async (req, res) => {
  const blogArticle = new Blog({
    title: req.body.title,
    content: req.body.content,
  })

  try {
    await blogArticle.save()
    res.json({ message: 'L\'article a été ajouté avec succès' })
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'article:', error)
    res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'article' })
  }
})

router.get('/', async (req, res) => {
    try {
      const blogArticles = await Blog.find().sort({ createdAt: -1 })
      res.json(blogArticles)
    } catch (error) {
      console.error('Erreur lors de la récupération des articles:', error)
      res.status(500).json({ message: 'Erreur lors de la récupération des articles' })
    }
  })

module.exports = router
