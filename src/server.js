require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const ReCaptcha = require('./utils/reCaptcha.util');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('home', {
    g_sitekey: process.env.RECAPTCHA_SITE_KEY,
  });
});

app.post('/validate', async (req, res) => {
  const token = req.body['g-recaptcha-response'];

  const reCaptcha = new ReCaptcha();
  const response = await reCaptcha.validate(token);

  res.render('validate-response', { response })
});

app.use((req, res, next) => {
  res.status(404).render('page-not-found');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
