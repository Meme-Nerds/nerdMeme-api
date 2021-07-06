const { Router } = require('express');
const Content = require('../models/content');
const { randomizer } = require('../utils/randomizer');

module.exports = Router()
  .get('/', async(req, res, next) => {
    try {
      const memeArr = randomizer();
      
      const { setting } = await Content.getSetting(memeArr[0]);
      const { image } = await Content.getImage(memeArr[1]);
      const { quote } = await Content.getQuote(memeArr[2]);
      const { author } = await Content.getAuthor(memeArr[3]);
      
      const meme = {
        setting,
        image,
        quote,
        author
      };

      res.send(meme);

    } catch(error) {
      next(error);
    }

  })

  .get('/content/:content', (req, res) => {
    Content.getContent(req.params.content)
      .then(content => res.send(content));
   
  })

  .delete('/content/:contentType/:id', (req, res) => {
    const { contentType, id } = req.params;
    Content.deleteContent(contentType, id)
      .then(content => res.send(content));
  })

  .put('/content/:contentType/:id', (req, res) => {
    const { contentType, id } = req.params;
    const updatedContent = req.body;
    Content.updateContent(contentType, id, updatedContent)
      .then(content => res.send(content));
  })

  .post('/content/:contentType', (req, res) => {
    Content.insert(req.params.contentType, req.body)
      .then(content => res.send(content));
  });
