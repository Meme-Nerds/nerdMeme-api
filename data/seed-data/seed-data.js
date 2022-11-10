const Content = require('../../lib/models/content');
const pool = require('../../lib/utils/pool');
const fs = require('fs');
const settings = require('./settings');
const images = require('./images');
const quotes = require('./quotes');
const authors = require('./authors');

const allData = [settings, images, quotes, authors];

pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));

const seedData = (masterArr) => {
  Promise.all(
    masterArr.forEach(dataArr => {
      dataArr.forEach(world => 
        world.data.forEach(content => {
          return Content.initialInsert(
            world.category, 
            world.world,
            content);
        }));
    }));
};

seedData(allData);
