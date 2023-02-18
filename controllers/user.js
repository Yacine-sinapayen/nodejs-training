/* Nous allons enregistrer et lire des User dans ce 
middleware donc je vais importer le modèle 
correspondant. */
const { hash } = require("bcrypt");
const User = require("../models/User");

/* import du package de cryptage bcrypt */
const bcrypt = require("../models/User");

/* ---------- MIDDLEWARE SIGNUP ----------
Cette méthode nous permet la création de nouveau user
à partir de l'inscription faite depuis l'app frontend.

1 - nous appelons la fonction de hachage de bcrypt qui va :  
    - En 1er argu récupérer le mdp du corp de la requête qui sera envoyé par le front-end.
    - En 2nd le salt(saler) qui va déterminer cmb de fois on effectue l'algo de hachage. PLus c'est élevé plus c'est long.

    Il s'agit d'une fonction asynchrone qui renvoie une Promise dans laquelle nous recevons le hash généré qui va ensuite nous permettre d'enregistrer le user dans la BDD;

    - Si ça marche .then() : 
            - Je récupère le hash du mdp.
            - Je créer ce new user grâce à notre modèle mongoose. Je lui passe l'adresse email du corp de la req et le hash du password.
        - Et enfin j'utilise la méthode user.save pour l'enregsitrer dans ma bdd. 
            - Dans le then il y a un status 201 qui correspond à une création de ressource.
    - Sion je récupère l'errur dans mon catch()

En résumé : 
- Je hash le mdp via bcrypt
- Si ça marche je créais un lew user avec l'email et le pawword du corp de la req
    - je l'enregistre dans ma bdd
- Si ça ne marche pas je récupère l'erreur. 

Nous créons un utilisateur et l'enregistrons dans la base de données, en renvoyant une réponse de réussite en cas de succès, et des erreurs avec le code d'erreur 500 (erreur server) en cas d'échec. 
*/
exports.signup = (req, res, next) => {
  /* 1- On va hascher le mdp */
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      /* j'enregistre le user que je viens de créer dans ma bdd */
      user.save()
        .then(() => res.status(201).json({ message: "utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {};
