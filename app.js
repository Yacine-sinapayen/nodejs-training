// on import express
const express = require('express');

// const app qui sera notre application
const app = express();

app.use((req, res, next) => {
    console.log('Requête reçue')
    // renvoi vers le prochain middleware
    next();
})

// modification du code de la res http pour test
app.use((req, res, next) => {
    res.status(201);
    next();
})

app.use((req, res, next) => {
    res.json({ message : 'votre requête a bien été reçue !'})
    next();
})

app.use((req, res) => {
    console.log('Réponse envoyée avec succès !');
})

// On va exporter notre const app pour y avoir accès depuis les autres projets
module.exports = app;