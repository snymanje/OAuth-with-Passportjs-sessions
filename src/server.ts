import express from 'express';
import passport from 'passport';
import path from 'path';

import './services/passport';
import authRouter from './routes/authRoutes';

import config from './config';

const app = express();

// Configure view engine to render EJS templates.
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(require('cookie-parser')());

app.use(express.json());
app.use(
  require('express-session')({
    secret: config.SessionSecret,
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.use('/', authRouter);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
