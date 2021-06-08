//------ Connection à la bdd : jobdate : -----
const mysql = require("mysql");
var connectiondb = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "jobdate",
});

connectiondb.connect(function(error) {
    if (!!error) {
        console.log(error);
    } else {
        console.log("Connexion à la bdd 'jobdate' réalisée !");
    }
}); //------------------- EO connect bdd ----------------------------------------


/*=======================================================
||                   CRUD : OFFRE EMPLOI               ||
=======================================================*/
/*---------------------------
|       C R E A T E         |
----------------------------*/

exports.createOffre = async(req, res, next) => {
    // on récupère les valeurs saisies dans la page 'professionnelDepotOffre'' par l'utilisateur :
    console.log(req.body);
    const intitule_poste = req.body.intitule_poste;
    const type_contrat = req.body.type_contrat;
    const prise_fct = req.body.prise_fct;
    const fin_contrat = req.body.fin_contrat;
    const lieu_exercice = req.body.lieu_exercice;
    const description_offre = req.body.description_offre;

    // id professionnel provisoire en dur :
    var id_professionnel = "1";

    // Envoi des infos de chaque variable en bdd :
    // if (errors) {
    //     console.log("Erreur de connexion a la bdd");
    // } else {
    connectiondb.query(
        "INSERT INTO depot_offre_emploi (intitule_poste, id_professionnel,type_contrat, prise_fct, fin_contrat, lieu_exercice, description_offre) VALUES ('" +
        intitule_poste + "','" +
        id_professionnel + "','" +
        type_contrat + "','" +
        prise_fct + "','" +
        fin_contrat + "','" +
        lieu_exercice + "','" +
        description_offre + "')"
    );
    // function(err, result) {
    //     if (err) throw err;
    // }

    // };
    // on redirige automatiquement vers la page 'professionnelGestionOffre' après l'envoi du formulaire :
    res.redirect('/professionnel/gestionoffre')
}

/*--------------------------------
|          R E A D  ONLY         |
--------------------------------*/

// Méthode GET (pour afficher les informations des offres '/professionnel/DetailOffre') ->

exports.detailOffre = async(req, res, next) => {
    // Je cherche l'id qui est issu de la radio box selectionnée
    selection = req.body.selectionRadio;
    console.log("sebbbb" + selection);

    connectiondb.query('SELECT * FROM `depot_offre_emploi` WHERE id = ?', [selection], (error, result) => {
        req.gestionOffre = result;
        // console.log("**************************** recap de la requete read : **********************")
        // console.log(req.gestionOffre)
        return res.render('professionnelDepotOffreDetails', { result: result, title: "Edition Offre" });

    });
}


/*---------------------------
|          R E A D          |
--------------------------*/

// Méthode GET (pour afficher les informations des offres '/professionnel/gestionoffre') ->

exports.readGestionOffre = async(req, res, next) => {

    connectiondb.query('SELECT * FROM depot_offre_emploi', (error, result) => {
        req.gestionOffre = result;
        // console.log("**************************** recap de la requete read : **********************")
        // console.log(req.gestionOffre)
        return res.render('professionnelGestionOffre', {
            title: 'Section Gestion D\'offre',
            // Renvoi des infos issues de la logique ici (c'est un READ !) :
            gestionOffre: req.gestionOffre
        });
    });
}

/*---------------------------
|          E D I T          |
--------------------------*/

//  (pour afficher les informations des offres via 1 id '/professionnel/gestionoffre') ->

exports.editOffre = async(req, res, next) => {
    // Je cherche l'id qui est issu de la radio box selectionnée
    selection = req.body.selectionRadio;
    //console.log(selection);

    connectiondb.query('SELECT * FROM `depot_offre_emploi` WHERE id = ?', [selection], (error, result) => {

        console.log("**************************** recap de la requete à éditer : **********************")
        console.log(result)

        return res.render('professionnelDepotOffreEdition', { result: result, title: "Edition Offre" });

    });
}

/*------------------------------
|          U P D A T E         |
------------------------------*/

exports.updateOffre = async(req, res, next) => {
    // on récupère les valeurs de la page édition (assez semblable au create):
    const intitule_poste = req.body.intitule_poste;
    const type_contrat = req.body.type_contrat;
    const prise_fct = req.body.prise_fct;
    const fin_contrat = req.body.fin_contrat;
    const lieu_exercice = req.body.lieu_exercice;
    const description_offre = req.body.description_offre;

    // id professionnel provisoire en dur :
    var id_professionnel = "1";

    //id a modifier dans la table (a récupérer de qq part ! url ?
    var idAmodifier = req.body.id;

    // Envoi des infos de chaque variable en bdd :
    // if (errors) {
    //     console.log("Erreur de connexion a la bdd");
    // } else {
    //console.log("---" + req.body.id + "---")
    connectiondb.query(
        "UPDATE `depot_offre_emploi` SET " +
        "`intitule_poste` = " + "'" + intitule_poste + "' ," +
        "`type_contrat` = " + "'" + type_contrat + "' ," +
        "`prise_fct` = " + "'" + prise_fct + "' ," +
        "`fin_contrat` = " + "'" + fin_contrat + "' ," +
        "`lieu_exercice` = " + "'" + lieu_exercice + "' ," +
        "`description_offre` = " + "'" + description_offre + "' " +
        "WHERE id = " + idAmodifier
    );

    // function(err, result) {
    //     if (err) throw err;
    // }
    console.log('maj effectuee !')

    // on redirige automatiquement vers la page 'professionnelGestionOffre' après l'envoi du formulaire :
    res.redirect('/professionnel/gestionoffre')

}