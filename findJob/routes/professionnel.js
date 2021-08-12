const express = require('express');
const router = express.Router();

// appel des fonctions qui sont dans pagesGestionOffreController :
const pagesGestionOffreController = require('../controller/pagesGestionOffreController')

/*--------------------------------------------------
|          Routes liées a "professionnel"          |
---------------------------------------------------*/

router.get('/loginProfessionnel', (req, res) => { // Route du login pro
    res.render('professionnelLogin', );
});

router.get('/registerProfessionnel', (req, res) => { // Route du register pro
    res.render('professionnelRegister', );
});

// ********************* Route HOME page pro ******************

router.get('/professionnel', (req, res) => {
    res.render('professionnelHome', { title: 'Section Accueil Pro' });
});


// ********************* Route PROFIL pro *********************

router.get('/professionnel/profil', (req, res) => {
    res.render('professionnelProfil', { title: 'Section Edition Profil Pro' });
});


// ********************* Route DEPOT offre emploi *********************
//Affichage de la page avec formulaire de depot.

router.get('/professionnel/depotoffre', (req, res) => {
    res.render('professionnelDepotOffre', { title: 'Section Dépot D\'offre' });
});


// ********************* Route CREATE offre emploi *********************

// Méthode POST (pour envoyer le formulaire de la vue 'professionnelDepotOffre') ->
router.post('/professionnel/depotoffre', pagesGestionOffreController.createOffre, (req, res) => {
    // pagesController.createGestionOffre : permet d'appeler la fct dans fichier 'pagesController'

});


// ********************* Route READ offre emploi *************************

router.get('/professionnel/gestionoffre', pagesGestionOffreController.readGestionOffre, (req, res) => { // Route de la gestion d'offre pro *

});

// ********************* Route EDIT offre emploi **********************
router.post('/professionnel/gestionoffre/edit', pagesGestionOffreController.editOffre, (req, res) => {})


// ********************* Route READ ONLY offre emploi (lecture seule) **********************
// Méthode GET (pour renvoyer les infos en lecture seule d'une offre d'emploi depuis la bdd)
router.post('/professionnel/detailOffre', pagesGestionOffreController.detailOffre, (req, res) => {

});

// ********************* Route UPDATE offre emploi **********************
// Méthode POST (pour envoyer le formulaire de la vue  ->
router.post('/professionnel/editionOffre', pagesGestionOffreController.updateOffre, (req, res) => {

});


// ----------------------------- FIN ---------------------------------


router.get('/professionnel/recherche', (req, res) => { // Route de la recherche pro *
    res.render('professionnelRecherche', { title: 'Section Recherche Candidat' });
});

router.get('/professionnel/messagerie', (req, res) => { // Route de la messagerie
    res.render('messagerie', { title: 'Section Messagerie' });
});

router.get('/professionnel/filactualite', (req, res) => { // Route fil actu *
    res.render('professionnelFilActu', { title: 'Section Fil d\'Actualité' });
});


// affichage popup provisoire :
router.get('/professionnel/publicationfilactualite', (req, res) => { // Route pop up fil actu
    res.render('professionnelFilPublicationActu', { title: 'Popup Fil d\'Actualité' });
});

// affichage popup provisoire :
router.get('/professionnel/profilCandidatVuePro', (req, res) => { // Route pop up fil actu
    res.render('profilCandidatVuePro', { title: 'Aff profil candidat coté pro' });
});

// // affichage fenetre modale1 provisoire :
// router.get('/professionnel/profilCandidatVueProPopupF-Modale', (req, res) => { // Route pop up fil actu
//     res.render('fenetre-modale', { title: 'Fenetre modale1 de seb' });
// });

// -------------------------------------------


// permet de rendre le fichier index.js visible ailleurs :
module.exports = router;