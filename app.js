const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);

const errorController = require('./controllers/error');

const MONGO_DB_URI = 'YOUR_MONGO_DB_URL';

const app = express();
const store = new MongoStore({
    uri: MONGO_DB_URI,
    collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const userRoutes = require('./routes/user');
const frontendRoutes = require('./routes/frontend');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ 
    secret: 'authentication',
    resave: false,
    saveUninitialized: false,
    store: store
}));

app.use(userRoutes);
app.use(frontendRoutes);

app.use(errorController.get404);

mongoose.connect(
    MONGO_DB_URI
).then(result => app.listen(3000))
.catch(err => console.log(err));
// sPHMMs69X0cTO9Oy


