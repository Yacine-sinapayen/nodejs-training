const Thing = require("../models/Thing");
/* Mes controlleurs vont contenir la logique métiers de mes routes. qui va être importer dans chaque routes */

/* ---------- CONTROLLERS CREATE ---------- 
J'exporte la focntion createThing pour la creation d'un objet afin 
de l'utiliser dans mon router => routes/stuff.js */
exports.createThing = (req, res, next) => {
  /* La version actuel du front renvoi un id lors de la création d'un 'thing' <=> produit, or mongodb génère un id automatiquement donc nous allons le suprimer du corp de la requête que nous renvoi le front.*/
  delete req.body._id;

  /* Création d'une nouvelle instance de Thing */
  const thing = new Thing({
    /* spread opérator pour récupérer le corp de la requête */
    ...req.body,
  });

  /* J'enregistre l'objet dans la bdd et retourne un promise. Dans le then même si la requête se passe bien il faut renvoyer quelque chose sinon la requête expire 
    R : La méthode save() renvoie une Promise. */
  thing
    .save()
    .then(() => res.status(201).json({ message: "Objet enregsitré !" }))
    .catch((error) => res.status(400).json({ error }));
};

/* ---------- CONTROLLERS PUT ----------
Méthode updateOne :
 - Le 1er argu est l'objet de comparaison qui permet de récupérer l'id qui est = à l'id envoyé dans les parmas de la req. 
 - Le 2nd argu est la nouvelle version de l'objet que je récupère via le spread operator pour récupérer les infos du corp de la requête. Nous vérifions aussi dans ce même objet que l'id = id de la requête */

exports.modifyThing = (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet modifié" }))
    .catch((error) => res.status(400).json({ error }));
};

/* ---------- CONTROLLERS DELETE ---------- */
exports.deleteThing = (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet supprimé" }))
    .catch((error) => res.status(400).json({ error }));
};

/* ---------- CONTROLLERS GET ONE ----------
Nous utilisons la méthode get() pour répondre uniquement aux demandes GET à cet endpoint ;
  - Nous utilisons deux-points : en face du segment dynamique de la route pour la rendre accessible en tant que paramètre ;
  - Nous utilisons ensuite la méthode findOne() dans notre modèle Thing pour trouver le Thing unique ayant le même _id que le paramètre de la requête ;
  - Ce Thing est ensuite retourné dans une Promise et envoyé au front-end ;
  - Si aucun Thing n'est trouvé ou si une erreur se produit, nous envoyons une erreur 404 au front-end, avec l'erreur générée. */

exports.getOneThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error }));
};

/* ---------- CONTROLLERS GET ALL ---------- 
Je passe à ma méthode "use" un nouvelle argu qui est un string correspondant à la route pour laquelle nous souhaitons enregistrer cet élément de middleware.
Nous utilisons la méthode find() dans notre modèle Mongoose afin de renvoyer un tableau contenant tous les Things dans notre base de données. */
exports.getAllThings = (req, res, next) => {
  Thing.find()
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }));
};
