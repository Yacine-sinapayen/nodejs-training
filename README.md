# Pour lancer le serveur 
"nodemon sever" 
Cette commande va écouter notre serveur en permanence même après
une modification d'un fichier et va redémarrer le serveur automatiquement. 

"node server" est l'ancienne commende qu'il fait à chaque fois relancer.

* Thunder client permet de tester mes requêtes directement dans mon IDE.

# Installation de nodemon

"npm install -g nodemon"

# Installation d'express

"npm install express --save"

# Notions backend

## Les middlewares

Fonctions qui capturent et traitent les requêtes envoyées vers notre serveur nous permettant de contrôler très précisément comment notre serveur doit réagir à chaque type de requête.

C'est une fonctions dans une app express qui reçoit la req et resp qui les gère et qui peut ensuoite passer l'execution à un prochain middleware avec la fonction "next".

## ParseInt()
La fonction parseInt() convertit le premier argument en une chaîne, l'analyse et renvoie un entier ou NaN . Si la valeur renvoyée n'est pas NaN , ce sera l'entier représentant le nombre contenu dans la chaîne dans la base donnée.2
