const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./backend/_helpers/jwt');
const errorHandler = require('./backend/_helpers/error-handler');
const path = require('path');
const sendmail = require('./backend/_helpers/mail');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//to load home page
app.use(express.static(path.join(__dirname, 'dist')));

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require(path.join(__dirname,'/backend/users/user.controller.js')));

// api routes
app.use('/catalog', require(path.join(__dirname,'/backend/catalog/catalog.controller.js')));

// global error handler
app.use(errorHandler);

app.post('/mail', sendmail);

app.get('/*', (req, res) => {

  res.sendFile(path.join(__dirname, './dist/index.html'));

});

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
