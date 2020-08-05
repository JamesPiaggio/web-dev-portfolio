const express = require('express');
const { projects } = require('./data.json');
const path = require('path');
const router = express.Router();

const app = express();

/* Setup view engine */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/* Add static middleware */
app.use('/static', express.static(path.join(__dirname, 'public')));

/* Root/home route */
router.get('/', (req, res) => {
  res.render('index', { projects });
});

router.get('/about', (req, res) => {
  res.render('about', { projects });
});

router.get('/:id', (req, res, next) => {
    if (projects[req.params.id]) {
        res.Render('project', { projects: project[req.params.id]});
    } else {
       console.log('something went wrong')
    }
});

app.listen(3000, () => {
    console.log('Application running on port 3000..');
});