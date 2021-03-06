/* Require dependencies */
const express = require('express');
const { projects } = require('./data.json');
const path = require('path');
const port = process.env.PORT || 3000;

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

/* About route */
app.get('/about', (req, res) => {
  res.render('about', { projects });
});

/* Projects route */
app.get('/projects/:id', (req, res) => {
  const projectId = req.params.id;
  const project = projects.find( ( { id } ) => id === +projectId);
        res.render('project', { project });
});

/* Error handler */
app.use((req, res, next) => {
  const err = new Error('Oops! Page not found');
  console.log(err);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status || 500);
  res.render('error');
});

/* Set up local host */
app.listen(port, () => {
    console.log('Application running on port');
});