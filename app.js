// on import express
const express = require("express");
const bodyParser = require('body-parser');
// const app qui sera notre application
const app = express();
// j'importe mongoose
const mongoose = require("mongoose");

// J'importe mon router global
const stuffRoutes = require('./routes/stuff.js');
// J'importe mon router pour les utilisateurs
const userRoutes = require('./routes/user');

/* ---------- Connexion à ma bdd ----------*/ 
mongoose
  .connect(
    "mongodb+srv://sapienyaya:TYHv9rPmkITiDUU6974@cluster0.7lcq5st.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// Ce middleware intercepte toutes les requetes ayant un "content-type json". Il nous donne accès à 'req.body'. À l'ancienne cela se faisait via le package 'body-parser'
app.use(express.json());

/* ---------- CORS ----------*/
// Ce middleware gère CORS ne prend pas d'adresse en premier paramètre car il s'applique à toutes les routes.
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
    "GET, POST, PUT, DELETE, PATH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

/* ---------- INITIALISATION DES ROUTES ----------*/
app.use('/api/stuff', stuffRoutes);
app.use('/app/auth', userRoutes);

// On va exporter notre const app pour y avoir accès depuis les autres projets
module.exports = app;
