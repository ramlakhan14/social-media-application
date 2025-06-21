const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const path = require('path');
const sassMiddleware = require('sass-middleware');




app.use(
  sassMiddleware({
    src: path.join(__dirname, 'assets', 'scss'),
    dest: path.join(__dirname, 'assets', 'css'),
    debug: true,
    outputStyle: 'expanded',
    prefix: '/css',
  })
);



app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// session middleware with Mongo store
app.use(session({
    name: 'codeial',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 100
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/codeial_development',
        autoRemove: 'disabled'
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// use express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});
