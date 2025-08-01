var express = require('express');
var router = express.Router();

/* GET users listing. */

require('../models/connection');
const User = require('../models/users');
const { checkBody } = require('../modules/users')

const uid2 = require('uid2');
const bcrypt = require('bcrypt');

//* Route SignUp *//
router.post('/signup', (req, res) => {
  if (!checkBody(req.body, ['email', 'username', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  // * Si l'utilisateur n'est pas déja inscrit, ajout à la BDD * //
  User.findOne({ username: req.body.username } || { email: req.body.email }).then(data => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);
      const newUser = new User({
        token: uid2(32),
        username: req.body.username,
        email: req.body.email,
        password: hash,
        skin_use: "skin-basic",
        level: 1,
        experience: 0,
        group: 0,
        vip: 0,
        banned: 0,
        created: new Date(),
        stats: {
          win: 0,
          lose: 0,
          game: 0
        },
        skins: [],
        friends: [],
        settings: {
          sound_music: 0,
          sound_effect: 0
        }
     
    });

    newUser.save().then(data => {
      res.json({ result: true, data: data });
    });
  } else {
    // * Utilisateur déja inscrit * //
    res.json({ result: false, error: 'User already registered' });
  }
  });
});


/* POST SignIn */

router.post('/signin', (req, res) => {
  if (!checkBody(req.body, ['username', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }
  User.findOne({ 
    $or: [
      { username: req.body.username }, 
      { email: req.body.username }
    ]
  }).then(data => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true });
    } else {
      res.json({ result: false, error: 'User not found' });
    }
  });
});


module.exports = router;
