const express = require('express');
const router = express.Router();


/* -------------------------------------------------------------- Route lié au deux -----------------------------------------------------------------------*/

router.get('/', (req, res) => { // Route de la home page
    res.render('index', { title: 'jobdate', title2: 'jobbadd' });
});

router.get('/actu', (req, res) => { // Route des actus
    res.render('actu', );
});


module.exports = router; // permet de rendre le fichier index.js visible ailleurs