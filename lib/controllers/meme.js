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

  });
