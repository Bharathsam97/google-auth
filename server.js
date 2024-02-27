const express = require('express');
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
require('dotenv').config();
const helmet = require('helmet');
const MongoStore = require('connect-mongo');
const authRoutes = require('./src/routes/auth');
const userRoutes = require('./src/routes/user');
require('./config/passport.js');
const path = require('path');



const app = express();

app.use(helmet());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const mongoStore = MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: 'sessions', // You can specify the name of the collection
});


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mongoStore,
    cookie: {
        secure: false, // Use only with HTTPS
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
}));


app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

// Set the views directory (optional if your views are in a different folder)
app.set('views', path.join(__dirname, 'views'));

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/user/profile');
    } else {
        res.render('login'); // Render the login.ejs template for unauthenticated users.
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
