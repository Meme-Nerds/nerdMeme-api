const Content = require('../../models/Content');
const settings = require('./settings');
const images = require('./images');
const quotes = require('./quotes');
const authors = require('./authors');

const allData = [settings, images, quotes, authors];

const seedData = (masterArr) => {
  masterArr.forEach(dataArr => {
    dataArr.forEach(world => 
      world.content.forEach(content => {
        return Content.insert(world.world, content);
      }));
  });
};

seedData(allData);
