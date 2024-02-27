const express = require('express');
const passport = require('passport');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] })
);


router.get('/google/callback',
passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/user/profile');
  }
);

router.get('/logout', userController.logout);

module.exports = router;
