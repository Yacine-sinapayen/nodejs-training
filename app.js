// on import express
const express = require("express");

// const app qui sera notre application
const app = express();

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

app.post('/api/stuff', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'objet créé !'
    });
});

/* Je vais créer un nouveau middleware "GET".
Je passe à ma méthode "use" un nouvelle argu qui est un string correspondant à la route pour laquelle nous souhaitons enregistrer cet élément de middleware */
app.get("/api/stuff", (req, res, next) => {
  const stuff = [
    {
      _id: "oeihfzeoi",
      title: "Mon premier objet",
      description: "Les infos de mon premier objet",
      imageUrl:
        "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
      price: 4900,
      userId: "qsomihvqios",
    },
    {
      _id: "oeihfzeomoihi",
      title: "Mon deuxième objet",
      description: "Les infos de mon deuxième objet",
      imageUrl:
        "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
      price: 2900,
      userId: "qsomihvqios",
    },
  ];
  /*Ce middleware attribut un code 200 à la res donc une resp réussi.
    Et il renvoi en resp json le tableau stuff avec nos objet à 
    l'intérieur*/
  res.status(200).json(stuff);
});

// On va exporter notre const app pour y avoir accès depuis les autres projets
module.exports = app;
