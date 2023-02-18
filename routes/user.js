const express = require('express');
const router = express.Router();
/* J'importe mon ctrl afin d'associer les différentes fonctions/middleware à mes routes */
const userCtrl = require('../controllers/user');

/* Création de nos routes d'enregistrement et d'identification. Ce sont des routes post car 
le user va envoyer les infos : mail et mdp */
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;