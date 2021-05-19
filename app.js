var express = require('express');
var app = express();
require('dotenv').config();
var db = require('./db');
var user = require('./controllers/usercontroller');
var game = require('./controllers/gamecontroller')


db.sync();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use('/api/auth', user);
app.use(require('./middleware/validate-session'))
app.use('/api/game', game);
app.listen(process.env.PORT, function() {
    console.log(`App is listening on ${process.env.PORT}`);
})
