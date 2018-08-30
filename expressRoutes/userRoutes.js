const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


/*router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('jwt') == null) {
            next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            })
        } else {
            let user = JSON.parse(localStorage.getItem('user'))
            if(to.matched.some(record => record.meta.is_admin)) {
                    next({ name: 'DisplayItem'})
            }else {
                next()
            }
        }
    } else if(to.matched.some(record => record.meta.guest)) {
        if(localStorage.getItem('jwt') == null){
            next()
        }
        else{
            next({ name: 'userboard'})
        }
    }else {
        next()
    }
})*/

//export default {

  // User object will let us check authentication status
  router.post('/signup', function(req, res) {
     console.log('Inside user post' + JSON.stringify(req.body));
     bcrypt.hash(req.body.password, 10, function(err, hash){
       console.log('Inside bcrypt.hash() => ' + JSON.stringify(err));
        if(err) {
           return res.status(500).json({
              error: err
           });
        }
        else {
           const user = new User({
              _id: new  mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
           });
           user.save().then(function(result) {
              console.log(result);
              res.status(200).json({
                 success: 'New user has been created'
              });
           }).catch(error => {
              res.status(500).json({
                 error: err
              });
           });
        }
     });
  });

router.post('/signin', function(req, res){
   User.findOne({email: req.body.email})
   .exec()
   .then(function(user) {
      bcrypt.compare(req.body.password, user.password, function(err, result){
         if(err) {
            return res.status(401).json({
               failed: 'Unauthorized Access'
            });
         }
         if(result) {
            const JWTToken = jwt.sign({
               email: user.email,
               _id: user._id
            },
            'secret',
               {
                  expiresIn: '2h'
               });
            return res.status(200).json({
               success: 'Welcome to the JWT Auth',
               token: JWTToken
            });
         }
         return res.status(401).json({
            failed: 'Unauthorized Access'
         });
      });
   })
   .catch(error => {
      res.status(500).json({
         error: error
      });
   });;
});

router.get('/logout', function(req, res) {
  console.log("entered logout method");
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return (err);
      } else {
        console.log("logged out");
        return res.redirect('/logout');
      }
    });
  }
});

//}
module.exports = router;
