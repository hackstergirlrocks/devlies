var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");

/* GET users listing. */
require('../models/connection');
const User = require('../models/users');
const { checkBody } = require('../modules/users')

const uid2 = require('uid2');
const bcrypt = require('bcrypt');

// Récupère tous les users
router.get('/allusers', async (req, res) => {
  User.find()
    .then(data => {
      res.json({ result: true, users: data })
    })
});

// ROUTE CONNEXION-INSCRIPTION
/* Route SignUp/Inscription */
router.post('/signup', (req, res) => {
  if (!checkBody(req.body, ['email', 'username', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  // regex pour email + username (pas de caractère spéciaux)
  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const PSEUDO_REGEX = /^[A-Za-z0-9]+$/;

  console.log(req.body.username.length)
  if (req.body.username.length <= 15) {
    if (EMAIL_REGEX.test(req.body.email)) {
      if (PSEUDO_REGEX.test(req.body.username)) {
        if (req.body.password === req.body.passwordverif) {


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
                coins: 0,
                banned: 0,
                created: new Date(),
                stats: {
                  win: 0,
                  lose: 0,
                  game: 0
                },
                skins: ['basic', 'cat'],
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
        } else {
          res.json({ result: false, error: 'Password not valid' });

        }
      } else {
        res.json({ result: false, error: 'Username not valid' });

      }

    } else {
      res.json({ result: false, error: 'Email not valid' });

    }
  } else {
    res.json({ result: false, error: 'Pseudo trop big' });

  }

});


/* Route SignIn/Connexion */
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
      {
        $or: [
          { username: req.body.username },
          { email: req.body.username }
        ]
      },
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

// ROUTE SKIN
/* route récupère le Skin */
router.get('/getskin/:token', (req, res) => {
  User.findOne({ token: req.params.token })
    .then(data => {
      // console.log(data.skins);
      res.json({ result: true, skin: data.skins });
      // Aq0RVXB_ttBJFK85hXaZ4FjDgaIfUDWg
    });

});

/* route skin */
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

/* route skin */
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

router.post('/buySkin/:token', (req, res) => {
  User.findOne({ token: req.params.token })
    .then(data => {
      if (data.coins >= req.body.coins) {
        User.updateOne(
          { token: req.params.token },
          {
            $set: { coins: data.coins -= Number(req.body.coins) },
            $push: { skins: req.body.skin }
          }
        ).then(result => {
          if (result.modifiedCount > 0) {
            res.json({ result: true, message: 'Skin bien achete' });
          } else {
            res.json({ result: false, message: "Une erreur s'est produite. Reesayez.." });
          }
        })
      }
    })
})

// ROUTES CHANGEMENT
/* route changement Username */
router.put('/changeusername/:token', (req, res) => {
  if (!checkBody(req.body, ['username'])) {
    res.json({ result: false, error: 'Missing or empty username field' });
    return;
  }

  // Vérifier si le nouveau username n'est pas déjà utilisé
  User.findOne({ username: req.body.username }).then(existingUser => {
    if (existingUser) {
      res.json({ result: false, error: 'Username already taken' });
      return;
    }

    // Mettre à jour le username
    User.updateOne(
      { token: req.params.token },
      { $set: { username: req.body.username } }
    ).then(result => {
      if (result.modifiedCount > 0) {
        res.json({ result: true, message: 'Username updated successfully' });
      } else {
        res.json({ result: false, error: 'User not found' });
      }
    }).catch(error => {
      res.json({ result: false, error: error });
    });
  }).catch(error => {
    res.json({ result: false, error: error });
  });
});


/* Route changement e-mail */
router.put('/changeemail/:token', (req, res) => {
  if (!checkBody(req.body, ['email'])) {
    res.json({ result: false, error: 'Missing or empty email field' });
    return;
  }

  // Vérifier si le nouvel email n'est pas déjà utilisé
  User.findOne({ email: req.body.email }).then(existingEmail => {
    if (existingEmail) {
      res.json({ result: false, error: 'Email already taken' });
      return;
    }

    // Mettre à jour l'email
    User.updateOne(
      { token: req.params.token },
      { $set: { email: req.body.email } }
    ).then(result => {
      if (result.modifiedCount > 0) {
        res.json({ result: true, message: 'Email updated successfully' });
      } else {
        res.json({ result: false, error: 'User not found' });
      }
    }).catch(error => {
      res.json({ result: false, error: error });
    });
  }).catch(error => {
    res.json({ result: false, error: error });
  });
});


/* Route changement mot de passe */
router.put('/changepassword/:token', (req, res) => {
  if (!checkBody(req.body, ['password'])) {
    res.json({ result: false, error: 'Missing or empty password field' });
    return;
  }

  const bcrypt = require('bcrypt');
  // Crypter le nouveau mot de passe
  const hash = bcrypt.hashSync(req.body.newpassword, 10);

  // Mettre à jour le mot de passe crypté
  User.findOne({ token: req.params.token })
    .then(data => {

      // Vérifie si ancien mot de passe est égal à celui dans la bdd
      if (data && bcrypt.compareSync(req.body.password, data.password)) {
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
          res.json({ result: false, error: error });
        });
      } else {
        res.json({ result: false, error: 'Password not good' });
      }
    });
});

// ROUTE USER
/* récupère infos de l'user par rapport à son token */
router.get('/:token', (req, res) => {
  User.findOne({ token: req.params.token })
    .then(data => {
      console.log(data)
      res.json({ result: true, info: data })
    })
})

/* modifie statistique et infos après une WIN ! */
router.post('/win/:token', (req, res) => {
  User.findOne({ token: req.params.token })
    .then(data => {
      if (data) {
        User.updateOne(
          { token: req.params.token },
          {
            $set: {
              coins: data.coins += Number(req.body.coins),
              experience: data.experience += Number(req.body.experience),
              'stats.win': data.stats.win += Number(req.body.win),
              'stats.game': data.stats.game += Number(req.body.game)
            },
          }
        ).then(result => {
          if (result.modifiedCount > 0) {
            res.json({ result: true, message: 'Stats de win modifiées avec succès !' });
          } else {
            res.json({ result: false, message: "Pas de modification de stats de win..." });
          }
        })
        console.log(data);
      }
    })
})

/* modifie statistique et infos après une LOSE ! */
router.post('/lose/:token', (req, res) => {
  User.findOne({ token: req.params.token })
    .then(data => {
      if (data) {
        User.updateOne(
          { token: req.params.token },
          {
            $set: {
              coins: data.coins += Number(req.body.coins),
              experience: data.experience += Number(req.body.experience),
              'stats.lose': data.stats.lose += Number(req.body.lose),
              'stats.game': data.stats.game += Number(req.body.game)
            },
          }
        ).then(result => {
          if (result.modifiedCount > 0) {
            res.json({ result: true, message: 'Stats de lose modifiées avec succès !' });
          } else {
            res.json({ result: false, message: "Pas de modification de stats de lose..." });
          }
        })
      }
    })
})

// ROUTE AMIS
/* route pour voir ses amis */
router.get('/allfriends/:token', (req, res) => {
  User.findOne({ token: req.params.token })
    .populate('friends')
    .then(data => {
      if (data) {
        console.log('data')
        res.json({ result: true, data: data.friends })
      }
    })
})

/* route pour ajouter un ami */
router.post('/addfriend/:token', (req, res) => {
  User.updateOne({ token: req.params.token },
    { $push: { friends: new mongoose.Types.ObjectId(req.body.friends) } })
    .then(data => {
      if (data) {
        res.json({ result: true, message: 'Ami ajouté!' })
      } else {
        res.json({ result: false, message: 'Erreur dans la demande' })
      }
    })
})

/* route pour supprimer un ami */
router.post('/removefriend/:token', (req, res) => {
  User.updateOne({ token: req.params.token },
    { $pull: { friends: new mongoose.Types.ObjectId(req.body.friends) } })
    .then(data => {
      if (data) {
        res.json({ result: true, message: 'Ami supprimé!' })
      } else {
        res.json({ result: false, message: 'Erreur dans la demande' })
      }
    })
})

module.exports = router;
