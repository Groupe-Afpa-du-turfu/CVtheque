const express = require('express');
const router = express.Router();

/* -------------------------------------------------------------- Route lié a particulier -----------------------------------------------------------------*/

router.get('/loginparticulier', (req, res) => { // Route du login particulier
    res.render('particulierLogin', );
});

router.get('/registerparticulier', (req, res) => { // Route du register particulier
    res.render('particulierRegister', );
});

router.get('/particulier', (req, res) => { // Route de la home page particulier
    res.render('particulier', );
});

router.get('/particulier/profil', (req, res) => { // Route du profil particulier
    res.render('particulierProfil', );
});

router.get('/particulier/cv', (req, res) => { // Route du cv particulier
    res.render('particulierCv', );
});

router.get('/particulier/job', (req, res) => { // Route de la recherche de job
    res.render('particulierJob', );
});

router.get('/particulier/messagerie', (req, res) => { // Route de la messagerie
    res.render('messagerie', );
});

// permet de rendre le fichier index.js visible ailleurs :
module.exports = router;