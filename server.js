// j'importe le package http qui va nous permettre de créer un 
// serveur
const http = require('http');

// j'importe mon applicaton
const app = require('./app');

const normalizePort = val => {
    // *parseInt()
    const port = parseInt(val, 10);

    if(isNaN(port)){
        return val;
    }
    if(port >= 0){
        return port;
    }
    return false;
};

/* la fonction normalizePort renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne*/
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/*la fonction errorHandler  recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur ;*/
const errorHandler = error => {
    if(error.syscall !== 'listen'){
        throw error;
    }

    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch(error.code){
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

/* Depuis mon package http, j'initialiese un serveur avec la méthode  "createServer".
Cette méthode prend comme argu la fonction app qui sera appeler
à chaque requête reçu par le serveur. */
const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('listening on ' + bind);
});



/* Notre serveur va être écouter sur une variable d'environnement 
ou sur le port 3000 s'il est dispo*/
server.listen(port);