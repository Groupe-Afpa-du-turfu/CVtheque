// import des modules et creation de l'app express
const express = require('express');
const path = require('path');
const app = express();
const ejs = require('ejs');
const var_dump = require('var_dump');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');



// Permet de lire les req.body (pour chercher les infos en )
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// ici je dit a l'app d'utiliser le contenu du dossier public et je définis la view engine
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
app.set('view engine', 'ejs');

// définition des routes
app.use('/', require('./routes')); //par defaut il cherche le fichier index
app.use('/', require('./routes/professionnel'));
app.use('/', require('./routes/particulier'));
app.use('/', require('./routes/users'));

//Demarrage du serveur
app.listen(3000, () => {
    console.log(`Server started on Port 3000`);
});