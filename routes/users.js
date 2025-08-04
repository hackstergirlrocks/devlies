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
      const newToken = uid2(32);
      const newUser = new User({
        token: newToken,
        username: req.body.username,
        email: req.body.email,
        password: hash,
        skin_use: "basic",
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
        skins: ['basic'],
        friends: [],
        settings: {
          sound_music: 0,
          sound_effect: 0
        }

      });

      newUser.save().then(data => {
        res.json({ result: true, token: newToken, skin: data.skin_use, username: data.username });
      });
    } else {
      // * Utilisateur déja inscrit * //
      res.json({ result: false, error: 'User already registered' });
    }
  });
});


//* Skin *//
router.get('/getskin/:token', (req, res) => {
  User.findOne({ token: req.params.token })
    .then(data => {
      console.log(data.skins);
      res.json({ result: true, skin: data.skins });
      // Aq0RVXB_ttBJFK85hXaZ4FjDgaIfUDWg
    });

});


router.post('/sakeSkin', (req, res) => {
  User.findOne({ token: req.body.token })
    .then(data => {
      if (data) {
        User.updateOne(
          { token: req.body.token },
          { skin_use: req.body.skin }
        ).then(() => {

          User.find().then(data => {
       res.json({ result: true, skin: req.body.skin });

          });

        });
      } else {
      res.json({ result: false });

      }

    });
});

router.post('/addskin', (req, res) => {

  if (!checkBody(req.body, ['skin', 'token'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  User.updateOne(
    { token: req.body.token },
    {
      $addToSet: { skins: req.body.skin }
    }
  ).then(data => {
    if (data != 0) {
      User.findOne({ token: req.body.token })
        .then(data => {
          if (data) {
            res.json({ result: true, skin: data.skins });
          } else {
            res.json({ result: false });
          }
          // Aq0RVXB_ttBJFK85hXaZ4FjDgaIfUDWg
        });
    } else {
      res.json({ result: false });
    }
  });
});
/* POST SignIn */

router.post('/signin', (req, res) => {
  const newToken = uid2(32);
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
    User.updateOne(
      { username: req.body.username },
      { token: newToken }
    ).then(() => {
      if (data && bcrypt.compareSync(req.body.password, data.password)) {
        res.json({ result: true, token: newToken, skin: data.skin_use, username: data.username });
      }
    });
    if (!data) {
      res.json({ result: false, error: 'User not found' });
      console.log('ff')
    }
  });
});

router.put('/changeusername/:token', (req, res) => {
  if (!checkBody(req.body, ['username'])) {
    res.json({ result: false, error: 'Missing or empty username field' });
    return;
  }

  const { username } = req.body;

  // Vérifier si le nouveau username n'est pas déjà utilisé
  User.findOne({ username: username }).then(existingUser => {
    if (existingUser) {
      res.json({ result: false, error: 'Username already taken' });
      return;
    }

    // Mettre à jour le username
    User.updateOne(
      { token: req.params.token },
      { $set: { username: username } }
    ).then(result => {
      if (result.modifiedCount > 0) {
        res.json({ result: true, message: 'Username updated successfully' });
      } else {
        res.json({ result: false, error: 'User not found' });
      }
    }).catch(error => {
      res.json({ result: false, error: 'Database error' });
    });
  }).catch(error => {
    res.json({ result: false, error: 'Database error' });
  });
});


/* PUT update email */
router.put('/changeemail/:token', (req, res) => {
  if (!checkBody(req.body, ['email'])) {
    res.json({ result: false, error: 'Missing or empty email field' });
    return;
  }

  const { email } = req.body;

  // Vérifier si le nouvel email n'est pas déjà utilisé
  User.findOne({ email: email }).then(existingUser => {
    if (existingUser) {
      res.json({ result: false, error: 'Email already taken' });
      return;
    }

    // Mettre à jour l'email
    User.updateOne(
      { token: req.params.token },
      { $set: { email: email } }
    ).then(result => {
      if (result.modifiedCount > 0) {
        res.json({ result: true, message: 'Email updated successfully' });
      } else {
        res.json({ result: false, error: 'User not found' });
      }
    }).catch(error => {
      res.json({ result: false, error: 'Database error' });
    });
  }).catch(error => {
    res.json({ result: false, error: 'Database error' });
  });
});

/* PUT update password */
router.put('/changepassword/:token', (req, res) => {
  if (!checkBody(req.body, ['password'])) {
    res.json({ result: false, error: 'Missing or empty password field' });
    return;
  }

  const { password } = req.body;
  const bcrypt = require('bcrypt');

  // Crypter le nouveau mot de passe
  const hash = bcrypt.hashSync(password, 10);

  // Mettre à jour le mot de passe crypté
  User.updateOne(
    { token: req.params.token },
    { $set: { password: hash } }
  ).then(result => {
    if (result.modifiedCount > 0) {
      res.json({ result: true, message: 'Password updated successfully' });
    } else {
      res.json({ result: false, error: 'User not found' });
    }
  }).catch(error => {
    res.json({ result: false, error: 'Database error' });
  });
});



module.exports = router;
