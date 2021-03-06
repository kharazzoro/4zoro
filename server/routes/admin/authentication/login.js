const express = require('express');
const router = express.Router();
const authenticationDB = require("../../../dbClient/authentication/authentication");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy(
	(username, password, done) => {
            passportCallback= (err, user) => {                  
 			if (err) throw err;
			if (!user) {
				return done(null, false, { message: 'Unknown user' });
                  }
                  
                  successCallback= (err, isMatch) => {
				if (err) throw err;
				if (isMatch) {
 					return done(null, user);
				} else {
					return done(null, false, { message: 'Invalid password' });
				}
			}

			authenticationDB.comparePassword(password, user.password,successCallback);
            };
            
		authenticationDB.getUserByUsername(username,passportCallback);
      }));
      
      passport.serializeUser((user, done) => {  
            console.log("serialize"+user.id);
            
            done(null, user.id);
      });
      
      passport.deserializeUser((id, done) => {
            
            successCallback=(err, user) => {
                  console.log("deserialize"+user);
                  
                  done(err, user);
            }

            authenticationDB.getUserById(id, successCallback);
      });


router.get('/', (req, res) => {
      res.render('login', { layout: false })
})

router.post('/',
passport.authenticate('local', { successRedirect: '/', failureRedirect: '/admin/login', failureFlash: true }),
(req, res) => {
      res.redirect('/');
});

module.exports = router;