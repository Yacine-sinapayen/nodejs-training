// j'importe mongoose afin de crer mon schéma de donnée
const mongoose = require('mongoose');

/* On va utiliser la focntion schéma mise à dispo par la package mongoose dans laquelle on va définir un objet.
R : mongoDb rajoute automatiqment l'id en bdd.
R: un things corespond à un produit que l'on veut vendre */
const thingSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    imageUrl: {type: String, required: true},
    userId: {type: String, required: true},
    price: {type: Number, required: true},
});

// nous exportons ce schéma en tant que modèle Mongoose appelé « Thing », le rendant par là même disponible pour notre application Express.
module.exports = mongoose.model('Thing', thingSchema);