/*Fct pour modifier "l'action" du formulaire 
lors du clic sur un bouton 
*/
function modifAction(url) {
    console.log('je suis la !');
    document.formulaire.action = url;
    document.formulaire.submit();
}; //EO Fct