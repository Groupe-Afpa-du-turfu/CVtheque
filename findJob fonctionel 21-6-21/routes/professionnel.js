/*--------------------------------------------------
|          Appel des fonctions necessaires :       |
---------------------------------------------------*/
const express = require('express');
const router = express.Router();
// Utilisation de "express-validator" et utilisation de deux fonctions (via 2 variables) : 
const { check, validationResult } = require("express-validator");
const validator = require("validator");

const bodyParser = require("body-parser");

// appel des fichiers extérieurs (controller etc...) :
const pagesGestionOffreController = require('../controller/pagesGestionOffreController');
const { empty } = require('statuses');

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

router.get('/professionnel/depotoffre', (req, res, next) => {
    // creation d'une variable pour préparer la gestion d'erreur au niveau des contraintes appliquées aux inputs (lié au formulaire également)
    const alert = undefined;
    res.render('professionnelDepotOffre', { title: 'Section Dépot D\'offre' });
});

/*---------------------------------------------------------------
|                           C R E A T E                         |
|                       (Route CREATE offre emploi)             |
----------------------------------------------------------------*/

// Méthode POST (pour envoyer le formulaire de la vue 'professionnelDepotOffre') ->
/* Passage des parametres : 
1) route,
2) [tableau de controles sur inputs avec check ("express-validator*")], 
3) function(res,res){ Toute la logique du CREATE est ici !} 

* : Liste des contrôles possibles : https://github.com/validatorjs/validator.js#validators

*/
router.post('/professionnel/depotoffre', [
        check("intitule_poste", "L'intitulé du poste est requis").notEmpty(),
        check("type_contrat", "Le type de contrat est requis").notEmpty(),
        check("prise_fct", "La date de prise de fonctions est requise").notEmpty(),
        check("fin_contrat", "La date de fin de contrat est requise").notEmpty(),
        check("lieu_exercice", "Le lieu d'exercice est requis").notEmpty(),
        check("description_offre", "La description de l'offre est requise").notEmpty()
    ],
    function(req, res) {

        // on récupère les valeurs saisies dans la page 'professionnelDepotOffre.ejs' par l'utilisateur :
        const intitule_poste = req.body.intitule_poste;
        const type_contrat = req.body.type_contrat;
        const prise_fct = req.body.prise_fct;
        const fin_contrat = req.body.fin_contrat;
        const lieu_exercice = req.body.lieu_exercice;
        const description_offre = req.body.description_offre;
        //console.log(req.body);

        //vérification des contraintes check. (creation d'une variable "errors" dans laquelle le resultat des "check" est stocké)
        const errors = validationResult(req);

        // //Verif des infos avec module "validator" :
        // var validator_intitule_poste = validator.blacklist(intitule_poste, '\\[\\]').escape(intitule_poste);
        // console.log("Retour d'info du ctrl sur champ \"intitule_poste\" = " + validator_intitule_poste);

        // id_professionnel en dur en attendant la realisation des données de session :
        var id_professionnel = "1";

        // Requete encapsulee dans une variable :
        let reqSql = "INSERT INTO depot_offre_emploi (intitule_poste, id_professionnel,type_contrat, prise_fct, fin_contrat, lieu_exercice, description_offre) VALUES ('" +
            intitule_poste + "','" +
            id_professionnel + "','" +
            type_contrat + "','" +
            prise_fct + "','" +
            fin_contrat + "','" +
            lieu_exercice + "','" +
            description_offre + "')";

        //------------------ Connection à la bdd : jobdate : -----------
        const mysql = require("mysql");
        const { stringify } = require("qs");
        var connectiondb = mysql.createConnection({
            host: process.env.SQL_SERVER,
            user: process.env.SQL_USER,
            password: process.env.SQL_PASSWORD,
            database: process.env.SQL_DATABASE,
        });
        connectiondb.connect(function(error) {
            if (error) {
                console.log(error);
            } else {
                console.log("Connexion à la bdd 'jobdate' réalisée pour \"create\" !");
            }
        }); //------------------- EO connect bdd ------------------------

        //Recuperation des inputs pour permettre l'affichage des erreurs en même temps que de garder les inputs des champs dejà renseignés :
        var result = [{
            intitule_poste: req.body.intitule_poste,
            type_contrat: req.body.type_contrat,
            prise_fct: req.body.prise_fct,
            fin_contrat: req.body.fin_contrat,
            lieu_exercice: req.body.lieu_exercice,
            description_offre: req.body.description_offre
        }];

        console.log("--------Récap des donnees de renseignées par le User---------");
        console.log(result);
        console.log("--------FIN Récap des donnees de renseignées par le User----------");

        if (!errors.isEmpty()) {
            const alert = errors.array();
            console.log(alert);

            /*ci dessous renvoi des données vers une "nouvelle" vue "professionnelDepotOffreSiErreur.ejs" 
            (ré-injection des 1eres valeurs renseignées par le user) : */
            res.render("professionnelDepotOffreSiCheckNoOk", {
                title: 'Section Depot Offre',
                //ici passer les infos pour renvoyer les données déjà renseignées en 1ere insertion user,
                result: result,
                alert
            });
        } else {
            connectiondb.query(reqSql,
                function(err, result) {
                    if (err) throw err;
                });
            // Redirection vers la page 'professionnelGestionOffre' après l'envoi du formulaire :
            res.redirect('/professionnel/gestionoffre');
        }
    }
);


// ********************* Route READ offre emploi *************************

router.get('/professionnel/gestionoffre', pagesGestionOffreController.readGestionOffre, (req, res) => { // Route de la gestion d'offre pro *
});

// ********************* Route READ ONLY offre emploi (lecture seule) **********************
// Méthode GET (pour renvoyer les infos en lecture seule d'une offre d'emploi depuis la bdd)
router.post('/professionnel/detailOffre', pagesGestionOffreController.detailOffre, (req, res) => {});


/*------------------------------------------------------------------------------------------
|                               E D I T :                                                  |
|                  Récupération des données d'1 id d'offre,                                |
|   et retour des valeurs dans 1 view avec inputs préremplis avec les données requetées    |
-------------------------------------------------------------------------------------------*/
router.post('/professionnel/gestionoffre/edit', async(req, res, next) => {
    // Je cherche l'id qui est issu de la radio box selectionnée
    selection = req.body.selectionRadio;
    console.log("EDIT : Id Selectionné => " + selection);
    let reqSql = 'SELECT *,UPPER(`intitule_poste`) AS `intitule_poste`, UPPER(`type_contrat`) AS `type_contrat`, DATE_FORMAT(`prise_fct`, ' + '\'%Y-%m-%d\'' + ') AS `prise_fct`, DATE_FORMAT(`fin_contrat`, ' + '\'%Y-%m-%d\'' + ') AS `fin_contrat` FROM `depot_offre_emploi` WHERE id = ?';

    //------------------ Connexion à la bdd : jobdate : -----------
    const mysql = require("mysql");
    const { stringify } = require("qs");
    var connectiondb = mysql.createConnection({
        host: process.env.SQL_SERVER,
        user: process.env.SQL_USER,
        password: process.env.SQL_PASSWORD,
        database: process.env.SQL_DATABASE,
    });
    connectiondb.connect(function(error) {
        if (error) {
            console.log(error);
        } else {
            console.log("Connexion à la bdd 'jobdate' réalisée pour édition !");
        }
    }); //------------------- EO connect bdd ------------------------

    connectiondb.query(reqSql, [selection], (error, result) => {
        // A noter : ...(reqSql, [selection],... : dans reqSql, le "?" est remplacé par [selection]
        console.log(result);
        return res.render('professionnelDepotOffreEdition', { result: result, title: "Edition Offre" });
    });
})

/*------------------------------------------------------------------------------------------
|                                       U P D A T E                                        |      
|       (passe par le édit avant => ramene les infos de bdd sur le formulaire)             |
-------------------------------------------------------------------------------------------*/
// Méthode POST (pour envoyer le formulaire de la vue)  ->
/* Passage des attributs : 
1) route,
2) [tableau de controles sur inputs avec check ("express-validator")], 
3) function(res,res){ Toute la logique de l'UPDATE est ici !} 
*/
router.post('/professionnel/editionOffre', [
        check("intitule_poste", "L'intitulé du poste est requis").notEmpty(),
        check("type_contrat", "Le type de contrat est requis").notEmpty(),
        check("prise_fct", "La date de prise de fonctions est requise").notEmpty(),
        check("fin_contrat", "La date de fin de contrat est requise").notEmpty(),
        check("lieu_exercice", "Le lieu d'exercice est requis").notEmpty(),
        check("description_offre", "La description de l'offre est requise").notEmpty(),
        check("id", "id is needed").notEmpty()
    ],
    function(req, res) {

        // on récupère les valeurs de la page édition (assez semblable au create):
        const intitule_poste = req.body.intitule_poste;
        const type_contrat = req.body.type_contrat;
        const prise_fct = req.body.prise_fct;
        const fin_contrat = req.body.fin_contrat;
        const lieu_exercice = req.body.lieu_exercice;
        const description_offre = req.body.description_offre;

        //id a modifier dans la table :
        const idAmodifier = req.body.id;
        console.log("id a updater ! : " + idAmodifier);

        //vérification des contraintes check. (creation d'une variable "errors" dans laquelle le resultat des "check" est stocké)
        const errors = validationResult(req);
        console.log("Affichage des eventuelles erreurs issues de la validation : ");
        console.log(errors);

        //Préparation de la requete sql dans une variable :
        let reqSql = "UPDATE `depot_offre_emploi` SET " +
            "`intitule_poste` = " + "'" + intitule_poste + "' ," +
            "`type_contrat` = " + "'" + type_contrat + "' ," +
            "`prise_fct` = " + "'" + prise_fct + "' ," +
            "`fin_contrat` = " + "'" + fin_contrat + "' ," +
            "`lieu_exercice` = " + "'" + lieu_exercice + "' ," +
            "`description_offre` = " + "'" + description_offre + "' " +
            "WHERE id = " + idAmodifier;

        //------------------ Connexion à la bdd : jobdate : -----------
        const mysql = require("mysql");
        const { stringify } = require("qs");
        var connectiondb = mysql.createConnection({
            host: process.env.SQL_SERVER,
            user: process.env.SQL_USER,
            password: process.env.SQL_PASSWORD,
            database: process.env.SQL_DATABASE,
        });
        connectiondb.connect(function(error) {
            if (error) {
                console.log(error);
            } else {
                console.log("Connexion à la bdd 'jobdate' réalisée pour \"update\" !");
            }
        }); //------------------- EO connect bdd ------------------------

        //Recuperation des inputs pour permettre l'affichage des erreurs en même temps que de garder les inputs des champs dejà renseignés :
        var result = [{
            id: req.body.id,
            intitule_poste: req.body.intitule_poste,
            type_contrat: req.body.type_contrat,
            prise_fct: req.body.prise_fct,
            fin_contrat: req.body.fin_contrat,
            lieu_exercice: req.body.lieu_exercice,
            description_offre: req.body.description_offre
        }];

        console.log("Affichage des infos sauvegardées de la saisie user : ");
        console.log(result);
        console.log("FIN Affichage des infos sauvegardées de la saisie user : ");
        //Si erreurs suite à la verif avec express-validator :
        if (!errors.isEmpty()) {
            const alert = errors.array();
            console.log(alert);

            res.render("professionnelDepotOffreEdition.ejs", {
                result: result,
                title: 'Section Modification Offre',
                alert
            });
            //Si tout est ok faire la requete SQL
        } else {
            connectiondb.query(reqSql,
                function(err, result) {
                    if (err) throw err;
                });
        }
        // on redirige automatiquement vers la page 'professionnelGestionOffre' après l'envoi du formulaire :
        res.redirect('/professionnel/gestionoffre');
        console.log('maj effectuee !');

    });

// ********************* Route DELETE offre emploi **********************
// Méthode POST (pour envoyer le formulaire de la vue  ->
router.post('/professionnel/gestionoffre', pagesGestionOffreController.deleteOffre, (req, res) => {});

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