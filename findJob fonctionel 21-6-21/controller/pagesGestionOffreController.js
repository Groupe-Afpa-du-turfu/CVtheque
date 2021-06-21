//Appel du module 'express-validator' : Ici on ne prends que 2 fonctions de 'express-validator' :

const bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator");
const urlencodedParser = bodyParser.urlencoded({ extended: false });


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
    if (!!error) {
        console.log(error);
    } else {
        console.log("Connexion à la bdd 'jobdate' réalisée !");
    }
});
//------------------- EO connect bdd ------------------------


/*=======================================================
||                   CRUD : OFFRE EMPLOI               ||
=======================================================*/
/*---------------------------
|       C R E A T E         |
----------------------------*/

// exports.createOffre = async(req, res, next) => {

//     urlencodedParser,

//     // Application des contraintes aux différent champs :

//     console.log("Je suis avant les ctrl");

//     [check("intitule_poste", "L'intitulé du poste est requis").notEmpty(), //notEmpty: on ne veut pas que le champ soit vide
//         check("type_contrat", "Le type de contrat est requis").notEmpty(),
//         check("prise_fct", "La date de prise de fonctions est requise").notEmpty(),
//         check("fin_contrat", "La date de fin de contrat est requise").notEmpty(),
//         check("lieu_exercice", "Le lieu d'exercice est requis").notEmpty(),
//         check("description_offre", "La description de l'offre est requise").notEmpty(),
//         /*Autres exemples :
//         check("phoneNumber", "conform phonenumber is required").matches(
//             /^(01|02|03|04|05|06|07|08)[0-9]{8}/gi
//         ),
//         check("mail", "mail is required").isEmail(),*/
//     ],
//     console.log("Je suis apres les ctrl"),

//     function(req, res) {

//         // on récupère les valeurs saisies dans la page 'professionnelDepotOffre' par l'utilisateur :

//         const intitule_poste = req.body.intitule_poste;
//         const type_contrat = req.body.type_contrat;
//         const prise_fct = req.body.prise_fct;
//         const fin_contrat = req.body.fin_contrat;
//         const lieu_exercice = req.body.lieu_exercice;
//         const description_offre = req.body.description_offre;
//         console.log(req.body);

//         //vérification des contraintes check. (creation d'une variable "errors" dans laquelle le resultat des "check" est stocké)
//         const errors = validationResult(req);
//         console.log(errors);
//         // id_professionnel en dur en attendant la realisation des données de session :
//         var id_professionnel = "1";

//         // Requete encapsulee dans une variable :
//         let reqSql = "INSERT INTO depot_offre_emploi (intitule_poste, id_professionnel,type_contrat, prise_fct, fin_contrat, lieu_exercice, description_offre) VALUES ('" +
//             intitule_poste + "','" +
//             id_professionnel + "','" +
//             type_contrat + "','" +
//             prise_fct + "','" +
//             fin_contrat + "','" +
//             lieu_exercice + "','" +
//             description_offre + "')";

//         if (!errors.isEmpty()) {
//             const alert = errors.array();
//             console.log(alert);
//             res.render("formulaire", { alert });
//         } else {
//             connectiondb.query(reqSql,
//                 function(err, result) {
//                     if (err) throw err;
//                 });
//             //const ok = "ok";
//             // on redirige automatiquement vers la page 'professionnelGestionOffre' après l'envoi du formulaire :
//             res.redirect('/professionnel/gestionoffre', /*{ ok }*/ );

//         }
//     }
// }

/*-----------------------------------------------------------------------
|          R E A D  ONLY : 1 offre emploi avec tous les champs !        |
------------------------------------------------------------------------*/

// Méthode GET (pour afficher les informations des offres '/professionnel/DetailOffre') ->

exports.detailOffre = async(req, res, next) => {
    // Je cherche l'id qui est issu de la radio box selectionnée
    selection = req.body.selectionRadio;
    console.log(selection);
    let reqSql = 'SELECT *, DATE_FORMAT(`prise_fct`, ' + '\'%d/%m/%Y\'' + ') AS `prise_fct`, DATE_FORMAT(`fin_contrat`, ' + '\'%d/%m/%Y\'' + ') AS `fin_contrat` FROM `depot_offre_emploi` WHERE id =' + selection;

    connectiondb.query(reqSql, function(err, result) {
        if (err) throw err;
        console.log(result);
        req.gestionOffre = result;
        console.log("************ recap de la requete READ ONLY ALL CHAMPS : *********")
        console.log(req.gestionOffre)
        return res.render('professionnelDepotOffreDetails', { result: result, title: "Edition Offre" });
    });
}


/*------------------------------------------------------------------------------------------------------
|          R E A D  : Affiche TOUTE la table `depot_offre_emploi` d'un seul id_professionnel            |
-------------------------------------------------------------------------------------------------------*/

// Méthode GET (pour afficher les informations des offres '/professionnel/gestionoffre') ->

exports.readGestionOffre = async(req, res, next) => {
    // id_professionnel en dur en attendant la realisation des données de session :
    var id_professionnel = "1";

    let reqSql = 'SELECT  `id`, UPPER(`intitule_poste`) AS `intitule_poste`, UPPER(`type_contrat`) AS `type_contrat`, DATE_FORMAT(`prise_fct`, ' + '\'%d/%m/%Y\'' + ') AS `prise_fct`, DATE_FORMAT(`fin_contrat`, ' + '\'%d/%m/%Y\'' + ') AS `fin_contrat`, `lieu_exercice` FROM `depot_offre_emploi` WHERE id_professionnel =' + id_professionnel;
    //console.log(reqSql);
    //console.log(id_professionnel);

    connectiondb.query(reqSql, (err, result) => {
        if (err) throw err;
        req.gestionOffre = result;
        //console.log("resultat -------------- " + result);
        //Pour transformer l'objet "result" en string et pouvoir lire ce qui est à l'interieur 
        //console.log("resultat -------------- " + stringify(result));
        return res.render('professionnelGestionOffre', { title: 'Section Gestion D\'offre', gestionOffre: result });
    });

}

/*------------------------------------------------------------------------------------------
|                               E D I T :                                                  |
|                  Récupération des données d'1 id d'offre,                                |
|   et retour des valeurs dans 1 view avec inputs préremplis avec les données requetées    |
-------------------------------------------------------------------------------------------*/

//  (pour afficher les informations des offres via 1 id '/professionnel/gestionoffre') ->

// exports.editOffre = async(req, res, next) => {
//     // Je cherche l'id qui est issu de la radio box selectionnée
//     selection = req.body.selectionRadio;
//     //console.log(selection);
//     let reqSql = 'SELECT * FROM `depot_offre_emploi` WHERE id = ?';

//     connectiondb.query(reqSql, [selection], (error, result) => {
//         // A noter : ...(reqSql, [selection],... : dans reqSql, le "?" est remplacé par [selection]
//         console.log(result);
//         return res.render('professionnelDepotOffreEdition', { result: result, title: "Edition Offre" });
//     });
// }

/*------------------------------
|          U P D A T E         |
------------------------------*/


// exports.updateOffre = async(req, res, next) => {
//     // on récupère les valeurs de la page édition (assez semblable au create):
//     const intitule_poste = req.body.intitule_poste;
//     const type_contrat = req.body.type_contrat;
//     const prise_fct = req.body.prise_fct;
//     const fin_contrat = req.body.fin_contrat;
//     const lieu_exercice = req.body.lieu_exercice;
//     const description_offre = req.body.description_offre;

//     //id a modifier dans la table :
//     var idAmodifier = req.body.id;

//     //var errors = req.validationErrors();

//     //Verification des inputs issus des req.body.xxxxx :
//     //var verif_intitule_poste = req.checkBody("intitule_poste", "L'intitulé du poste est requis").notEmpty().isLength({ min: 1 });
//     // var verif_intitule_poste = req.checkBody("intitule_poste", "L'intitulé du poste est requis").notEmpty().isLength({ min: 2 });
//     // req.checkBody("type_contrat", "Le type de contrat est requis").notEmpty();
//     // req.checkBody("prise_fct", "La date de prise de fonctions est requise").notEmpty();
//     // req.checkBody("fin_contrat", "La date de fin de contrat est requise").notEmpty();
//     // req.checkBody("lieu_exercice", "Le lieu d'exercice est requis").notEmpty();
//     // req.checkBody("description_offre", "La description de l'offre est requise").notEmpty();
//     //  console.log(verif);


//     //Préparation de la requete sql dans une variable :
//     let reqSql = "UPDATE `depot_offre_emploi` SET " +
//         "`intitule_poste` = " + "'" + intitule_poste + "' ," +
//         "`type_contrat` = " + "'" + type_contrat + "' ," +
//         "`prise_fct` = " + "'" + prise_fct + "' ," +
//         "`fin_contrat` = " + "'" + fin_contrat + "' ," +
//         "`lieu_exercice` = " + "'" + lieu_exercice + "' ," +
//         "`description_offre` = " + "'" + description_offre + "' " +
//         "WHERE id = " + idAmodifier;

//     //Requete SQL avec envoi de la variable contenant la requete :


//     // if (errors) {
//     //     console.log(
//     //         "---------------------------------" +
//     //         errors +
//     //         "---------------------------------"
//     //     );
//     //     console.log("Erreur de connexion a la bdd");
//     // } else {
//     connectiondb.query(reqSql, function(err, result) {
//         //     // if (err) throw err;
//     });

//     //console.log('maj effectuee !')

//     // on redirige automatiquement vers la page 'professionnelGestionOffre' après l'envoi du formulaire :
//     res.redirect('/professionnel/gestionoffre');
// }



/*------------------------------
|          D E L E T E         |
------------------------------*/

exports.deleteOffre = async(req, res, next) => {

    //id a modifier dans la table (a récupérer de qq part ! url ?
    var idAsupprimer = req.body.selectionRadio;
    // requete SQL :
    let reqSql = "DELETE FROM `depot_offre_emploi` WHERE id = " + idAsupprimer;

    // Envoi des infos de chaque variable en bdd :
    // if (errors) {
    //     console.log("Erreur de connexion a la bdd");
    // } else {
    //console.log("---" + req.body.id + "---")

    connectiondb.query(reqSql);

    // function(err, result) {
    //     if (err) throw err;
    // }
    console.log('Suppression effectuee !');

    // on redirige automatiquement vers la page 'professionnelGestionOffre' après l'envoi du formulaire :
    res.redirect('/professionnel/gestionoffre');
}