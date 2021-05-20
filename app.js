const express = require('express');
const app = express();
require('dotenv').config();
const db = require('./db');
const user = require('./controllers/usercontroller');
const game = require('./controllers/gamecontroller')


db.sync()
  .then(() => console.log('Models synchronization with db successfully'))
  .catch((err) => console.log(`db.sync error: ${err}`));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use('/api/auth', user);
app.use(require('./middleware/validate-session'))
app.use('/api/game', game);
app.listen(process.env.PORT, function() {
    console.log(`App is listening on ${process.env.PORT}`);
});
