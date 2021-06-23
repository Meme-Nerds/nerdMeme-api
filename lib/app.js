const express = require('express');
const notFoundMiddleware = require('./middleware/not-found.js');
const errorMiddleware = require('./middleware/error.js');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/meme', require('./controllers/meme'));

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
