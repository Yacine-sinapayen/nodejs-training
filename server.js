// j'importe le package http qui va nous permettre de créer un 
// serveur
const http = require('http');

// Maintenant que j'ai accès au package http je peux 
// créer un serveur en appelant la éthode createServer du package http
// Cette méthode prend comme argu la fonction qui sera appeler
// à chaque requête reçu par le serveur.
const server = http.createServer((req, res) => {
    res.end('voila la réponse du serveur');
});

// Maintenant le serveur doit écouter 
// et attendre les requête envoyées