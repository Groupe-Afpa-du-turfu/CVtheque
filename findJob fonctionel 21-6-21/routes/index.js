const express = require('express');
const router = express.Router();
var mysql = require("mysql");

/* -------------------------------------------------------------- Route lié au deux -----------------------------------------------------------------------*/

router.get('/', (req, res) => { // Route de la home page
    res.render('index', { title: 'Jobdate', lien1: 'Lien Vers Section Pro' });
});

router.get('/actu', (req, res) => { // Route des actus
    res.render('actu', );
});

//----------------------------------------------
const bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator");
const urlencodedParser = bodyParser.urlencoded({ extended: false });



/**********************/
/***** FORMULAIRE *****/
/**********************/

/** connexion BDD */

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "essai1",
});

/** GET **/
router.get("/formulaire", function(req, res, next) {
    const alert = undefined;
    const ok = undefined;
    res.render("formulaire");
});

router.post(
    "/formulaire",
    urlencodedParser, [
        // on ajoute des contraintes aux différent champs

        check("name", "name is required").notEmpty(), //notEmpty: on ne veut pas que le champs soit vide
        check("firstName", "firstName is required").notEmpty(),
        check("phoneNumber", "conform phonenumber is required").matches(
            /^(01|02|03|04|05|06|07|08)[0-9]{8}/gi
        ),
        check("mail", "mail is required").isEmail(),
        check("message", "message is required").notEmpty(),
    ],
    function(req, res) {

        //On récupère les champs du formulaires dans des variables
        const name = req.body.name;
        const firstName = req.body.firstName;
        const phoneNumber = req.body.phoneNumber;
        const mail = req.body.mail;
        const message = req.body.message;

        //vérification des contraintes check.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const alert = errors.array();
            res.render("formulaire", { alert });
        } else {
            connection.query(
                "Insert into mail (name,firstName,phoneNumber,mail,message) VALUES ('" +
                name +
                "','" +
                firstName +
                "','" +
                phoneNumber +
                "','" +
                mail +
                "','" +
                message +
                "')",
                function(err, result) {
                    if (err) throw err;
                }
            );
            const ok = "ok";
            res.render("formulaire", { ok });
        }
    }
);


//----------------------------------------------



module.exports = router; // permet de rendre le fichier index.js visible ailleurs