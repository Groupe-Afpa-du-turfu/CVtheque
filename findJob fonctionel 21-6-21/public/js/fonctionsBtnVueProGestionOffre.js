/*Fct pour modifier "l'action" du formulaire 
lors du clic sur un bouton (utilisé sur formulaire "professionnelGestionOffre.ejs" )
*/
function modifAction(url) {
    document.formulaire.action = url;
    document.formulaire.submit();
}; //EO Fct


/*Fct pour désactiver les boutons tant qu'une selectionRadio n'à pas été cliquée :
 */
function disableBtn() {
    // formulaire est l'id du "form" de la vue concernée, on ecoute l'evenement sur ce formulaire :
    formulaire.addEventListener('input', () => {
        if (selectionRadio = true) {
            document.getElementById("button1").removeAttribute('disabled');
            document.getElementById("button2").removeAttribute('disabled');
            document.getElementById("button3").removeAttribute('disabled');
        } else {
            document.getElementById("button1").setAttribute('disabled', 'disabled');
            document.getElementById("button2").setAttribute('disabled', 'disabled');
            document.getElementById("button3").setAttribute('disabled', 'disabled');
        }
    });
} //EO Fct
// Permet de lire et activer la fonction lors du chargement de la page
window.onload = disableBtn;