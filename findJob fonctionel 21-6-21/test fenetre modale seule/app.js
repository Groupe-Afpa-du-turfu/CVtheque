// Definition de la boite modal : ouverte ou fermée ? :
let modal = null;

// -------  OpenModal est une fonction qui prend en parametre le evenements : e : --------
const openModal = function(e) {
        e.preventDefault()
            // Sur le lien, je récupere l'attribut href  avec :e.target.getAttribute('href').
        const target = document.querySelector(e.target.getAttribute('href'));
        // Ici on va modifier les code html du modal :
        //Mettre la cible (qui est dans le html au niveau du modal qui est en "display : none") à null, ce qui permet l'affichage du modal !
        target.style.display = null;
        // Rendre la fenetre visible en supprimant l'attribut : (possible egalement de le faire passer à false)
        target.removeAttribute('aria-hidden');
        // idem sur aria-modal avec passage à true :
        target.setAttribute('aria-modal', 'true');
        modal = target;
        // En ecoute d'evenement au click pour fermer le modal avec fct closeModal
        modal.addEventListener('click', closeModal);
        //a l'ouverture de la boite modal, faire une query sur js-modal-close, ecouter le click et lancer fct closeModal 
        modal.querySelector('.js-modal-close').addEventListener('click', closeModal);
        // Stopper la propagation, permet d'eviter de fermer la fenetre en cliquant n'importe où :
        modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
    } //EO Fct openModal


// OpenModal est une fonction qui prend en parametre le evenements : e :
const closeModal = function(e) {
        // Ici on va remodifier les code html du modal pour qu'il soit a nouveau caché :
        if (modal === null) return
        e.preventDefault();
        modal.style.display = "none";
        modal.setAttribute('aria-hidden', 'true');
        modal.removeAttribute('aria-modal');
        modal.removeEventListener('click', closeModal)
        modal.querySelector('.js-modal-close').removeEventListener('click', closeModal);
        modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);

        modal = null;

    } //EO Fct closeModal

// FONCTION pour stopper la propagation, permet d'eviter de fermer la fenetre en cliquant n'importe où :
const stopPropagation = function(e) {
    e.stopPropagation();
}

//Appel des éléments qui ont la classe js-modal et for each "lien" execute ... :
document.querySelectorAll('.js-modal').forEach(a => {
    // sur le lien, ecoute les evenement de type click, execute la fonction "openModal"
    a.addEventListener('click', openModal);

})