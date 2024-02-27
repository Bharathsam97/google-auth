const User = require('../models/User');

exports.getProfile = (req, res) => {
    if (req.isAuthenticated()) {
      res.render('profile', { user: req.user });
    } else {
      res.redirect('/');
    }
  };
  
  exports.logout = (req, res) => {
    req.logout((err) => {
      if (err) {
        // Handle the error, if needed
        return res.status(500).send('Logout failed');
      }
      // Clear the session and redirect after successful logout
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).send('Error destroying session');
        }
        res.redirect('/');
      });
    });
  };
  


// exports.renderProfilePage = (req, res) => {
//     if (req.isAuthenticated()) {
//         res.render('profile', { user: req.user });
//     } else {
//         res.redirect('/');
//     }
// };
