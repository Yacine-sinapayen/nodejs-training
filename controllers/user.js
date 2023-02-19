/* Nous allons enregistrer et lire des User dans ce 
middleware donc je vais importer le modèle 
correspondant. */
const User = require("../models/User");

/* import du package de cryptage bcrypt */
const bcrypt = require("../models/User");

/* ---------- MIDDLEWARE SIGNUP ----------
Cette méthode nous permet la création de nouveau user
à partir de l'inscription faite depuis l'app frontend.

1 - nous appelons la fonction de hachage de bcrypt qui va :  
    - En 1er argu récupérer le mdp du corp de la requête qui sera envoyé par le front-end.
    - En 2nd on va déterminer le nombre de fois on l'on va saler(selt) le mdp. Plus c'est élevé plus c'est long.

    Il s'agit d'une fonction asynchrone qui renvoie une Promise dans laquelle nous recevons le hash généré.;

    - Si ça marche .then() : 
            - Je récupère le hash du mdp.
            - Je créer une const "user" qui va stocker notre "new User" et ses infos grâce à notre modèle mongoose. Je lui passe l'adresse email du corp de la req et le hash du password.
        - Et enfin j'utilise la méthode user.save pour l'enregsitrer dans ma bdd. 
            - Dans le then() il y a un status 201 qui correspond à une création de ressource.
    - Sinon je récupère l'erreur dans mon catch()

En résumé : 
- Je hash le mdp via bcrypt
- Si ça marche je créais un new User avec un email et pawword.
    - je l'enregistre dans ma bdd
- Si ça ne marche pas je récupère l'erreur.  
*/

exports.signup = (req, res, next) => {
  /* 1- On va hascher le mdp */
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      /* j'enregistre le user que je viens de créer dans ma bdd */
      user
        .save()
        .then(() => res.status(201).json({ message: "utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

/* ---------- MIDDLEWARE LOGIN ---------- */
/* Je vais vérifier dans ce middleware si l'utilisateur existe dans notre bdd et si le mot de passe correspond à cette utilisateur.
  1 - "User.findOne" : Nous utilisons ce modèle Mongoose pour vérifier que l'e-mail entré par l'utilisateur correspond à un utilisateur existant de la base de données :
    - "User.findOne.then() => if" Si user n'existe pas, nous renvoyons une erreur401 Unauthorized.
    - User.findOne.then() => else : e-mail correspond à un utilisateur existant:
      - "bcrypt.compare" Nous utilisons la fonction compare de bcrypt pour comparer : 1er argu le mot de passe entré par l'utilisateur, 2nd argu : avec le hash enregistré dans la base de données :
        - bcrypt.compare.then()=> if(!valid) : si la comparaison ==='false' je renvoie un msg d'erreur
        - bcrypt.compare.then()=> else : S'ils correspondent, les informations d'identification de notre utilisateur sont valides. Dans ce cas, nous renvoyons une réponse 200 contenant l'ID utilisateur et un token. Ce token est une chaîne générique pour l'instant, mais nous allons le modifier et le crypter dans le prochain chapitre
*/
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res.status(401).json({ message: "Paire identifiant/mot de passe incorrecte" });
      } else {
        bcrypt.compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              res
                .status(401)
                .json({ message: "Paire identifiant/mot de passe incorrecte" });
            } else {
              res.status(200).json({
                userId: user._id,
                token: "TOKEN",
              });
            }
          })
          .catch((error) => {
            res.status(500).json({ error });
          });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
