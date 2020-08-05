const express = require('express');
const { projects } = require('./data.json');
const path = require('path');

const app = express();
const router = express.Router();

/* Setup view engine */
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

/* Add static middleware */
app.use('/static', express.static(path.join(__dirname, 'public')));

/* Root/home route */
app.get('/', (req, res) => {
  res.render('index', { projects });
});

app.get('/about', (req, res) => {
  res.render('about', { projects });
});

app.get('/projects/:id', (req, res) => {
        res.render('project', { projects });
});

app.listen(3000, () => {
    console.log('Application running on port 3000..');
});

module.export = app;