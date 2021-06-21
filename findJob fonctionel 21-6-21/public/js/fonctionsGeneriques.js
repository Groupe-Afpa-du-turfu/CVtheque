/* Fonction permettant de transformer le resultat des dates issues de la reqSql en date ISO  
pour les ré-injecter dans les inputs type="date" (de la vue édition notamment) 
*/

function convertIsoDate() {
    var date = new Date().toISOString().substring(0, 10),
        field = document.querySelector('#date');
    field.value = date;
    console.log(field.value);
}
// lecture du code desiégné au chargement de la page ! :
window.onload = convertIsoDate;