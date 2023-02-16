// on import express
const express = require("express");

// const app qui sera notre application
const app = express();

// j'importe mongoose
const mongoose = require("mongoose");

// j'importe mon modèle
const Thing = require("./models/Thing");

// connexion à ma bdd
mongoose
  .connect(
    "mongodb+srv://sapienyaya:TYHv9rPmkITiDUU6974@cluster0.7lcq5st.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// Ce middleware intercepte toutes les requetes ayant un "content-type json". Il nous donne accès à 'req.body'. À l'ancienne cela se faisait via le package 'body-parser'
app.use(express.json());

// Ce middleware ne prend pas d'adresse en premier paramètre, afin de s'appliquer à toutes les routes.
app.use((req, res, next) => {
  // Ce header permet d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;
  res.setHeader("Access-Control-Allow-Origin", "*");

  // On donne l'autorisation d'utiliser certains headers
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );

  // On l'autorisation d'utiliser ceratines méthodes
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, PATH, OPTIONS"
  );
  next();
});

app.post("/api/stuff", (req, res, next) => {
  /* Code test pour voir si l'api focntionnée au départ
    console.log(req.body);
    "Un code HTTP de 201 représente généralement une création de données réussie."
    res.status(201).json({
         message: 'objet créé !'
    }); */

  /* La version actuel du front renvoi un id lors de la création d'un 'thing' <=> produit, or mongodb génère un id automatiquement donc nous allons le suprimer du corp de la requête que nous renvoi le front.*/
  delete req.body._id;

  /* Création d'une nouvelle instance de Thing */
  const thing = new Thing({
    /* spread opérator pour récupérer le corp de la requête */
    ...req.body,
  });

  /* J'enregistre l'objet dans la bdd et retourne un promise. Dans le then même si la requête se passe bien il faut renvoyer quelque chose sinon la requête expire 
R : La méthode save() renvoie une Promise. */
  thing.save()
    .then(() => res.status(201).json({ message: "Objet enregsitré !" }))
    .catch((error) => res.status(400).json({ error }));
});

/* Nous utilisons la méthode get() pour répondre uniquement aux demandes GET à cet endpoint ;
- Nous utilisons deux-points : en face du segment dynamique de la route pour la rendre accessible en tant que paramètre ;
- Nous utilisons ensuite la méthode findOne() dans notre modèle Thing pour trouver le Thing unique ayant le même _id que le paramètre de la requête ;
- Ce Thing est ensuite retourné dans une Promise et envoyé au front-end ;
- Si aucun Thing n'est trouvé ou si une erreur se produit, nous envoyons une erreur 404 au front-end, avec l'erreur générée. */
app.get('/api/stuff/:id', (req, res, next) => {
    Thing.findOne({ _id: req.params.id})
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
})

/* Je passe à ma méthode "use" un nouvelle argu qui est un string correspondant à la route pour laquelle nous souhaitons enregistrer cet élément de middleware */
app.get("/api/stuff", (req, res, next) => {
  /* nous utilisons la méthode find() dans notre modèle Mongoose afin de renvoyer un tableau contenant tous les Things dans notre base de données. */
  Thing.find()
  .then(things => res.status(200).json(things))
  .catch(error => res.status(400).json({ error }));
});

// On va exporter notre const app pour y avoir accès depuis les autres projets
module.exports = app;
