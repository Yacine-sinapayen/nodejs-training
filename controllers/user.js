/* Nous allons enregistrer et lire des User dans ce 
middleware donc je vais importer le modèle 
correspondant. */
const User = require("../models/User");

/* import du package de cryptage bcrypt */
const bcrypt = require('bcrypt');

/* import du package jsonwebtoken 
Ce package va nous permettre de creer des token et de les vérifier. */
const jwt = require('jsonwebtoken');

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
    - Je l'enregistre dans ma bdd
- Si ça ne marche pas je récupère l'erreur.  
*/

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

/* ---------- MIDDLEWARE LOGIN ---------- */
/* Je vais vérifier dans ce middleware si l'utilisateur 
existe dans notre bdd et si le mot de passe correspond à 
cette utilisateur.
  1 - "User.findOne" : Nous utilisons ce modèle Mongoose 
  pour vérifier que l'e-mail entré par l'utilisateur 
  correspond à un utilisateur existant de la base de données :
    - "User.findOne.then() => if" Si user n'existe pas, nous 
    renvoyons une erreur401 Unauthorized.
    - User.findOne.then() => else : e-mail correspond à un 
    utilisateur existant:
      - "bcrypt.compare" Nous utilisons la fonction compare 
      de bcrypt pour comparer : 1er argu le mot de passe 
      entré par l'utilisateur, 2nd argu : avec le hash 
      enregistré dans la base de données :
        - bcrypt.compare.then.if(false) : si la 
          comparaison ==='false' je renvoie un msg d'erreur
        - bcrypt.compare.then.else(true) je renvoie une reponse(200)    
          json avec : 
          - ID utilisateur.
          - token.jwt.sign Nous utilisons la fonction sign de     
            jsonwebtoken pour chiffrer un nouveau token : 
            - 1er argu : les données que l'on veut encoder à  
              l'interieur du token <=> payload = création objet avec userID qui sera l'id de l'utilisateur du user. Comme ça on est sûr que cette req <=> bien au userId 1 ligne plus haut.
            - 2 eme argu : clès secrète pour l'ancodage (dans notre cas simple pour le développement). En prod chaîne de carractère bcp plus longue et aléatoire pour sécu.
            - 3 eme argu = configuration pour donnée une durée au token
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
              res.status(401)
                .json({ message: "Paire identifiant/mot de passe incorrecte" });
            } else {
              res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                  { userId: user._id },
                  'RANDOM_TOKEN_SECRET_TEST',
                  { expiresIn: '24h' }
                ),
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
