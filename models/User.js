const mongoose = require('mongoose');

/* uniqueValidator va être un plugin que l'on va appliquer 
à notre schéma user afin que les errues générées par MongoDb soieent plus simple à comprendre. */
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    /*'unique:true' permet de rendre impossible une onscription avec 
    2 fois la même adresse */
    email: { type: String, required: true, unique: true },
    /*Le MP sera un hash de type sting */
    password: { type: String, required: true}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);