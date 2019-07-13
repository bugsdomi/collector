// ************************************************************************
// ***      InitHeaderColor : Objet Couleur intelligente des modales    ***
// ***                                                                  ***
// *** Objet : InitHeaderColor                                          ***
// ***                                                                  ***
// *** Cet objet sert à afficher :                                      ***
// ***   - Les entêtes de modales avec une couleur de fond et de texte  ***
// ***      appropriée au contexte choisi                               ***
// ***      - Un court texte de description de la modale                ***
// ***                                                                  ***
// ***  Nécessite :                                                     ***
// ***      Rien                                                        ***
// ***                                                                  ***
// ************************************************************************

function InitHeaderColor(){};   						// Fonction constructeur exportée

// ---------------------------------------------------------------------------------------------------------------------------
// Gestion des couleurs de Header de modale
// Les paramètres sont :
// La couleur de fond de l'entête de la modale  : activeColor
// L'identifiant de la modale                   : modalHeader
// ---------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// Cette fonction gère les couleurs de fond et de texte des Header des modales
// -----------------------------------------------------------------------------
InitHeaderColor.prototype.initHeaderColor = function(pModalHeaderColorParams){
	if (pModalHeaderColorParams.activeColor === "bg-warning"){
		pModalHeaderColorParams.modalHeader.classList.remove('bg-danger');
		pModalHeaderColorParams.modalHeader.classList.remove('bg-success');
		pModalHeaderColorParams.modalHeader.classList.remove('bg-info');
		pModalHeaderColorParams.modalHeader.classList.remove('text-warning');
		pModalHeaderColorParams.modalHeader.classList.remove('text-light');
		pModalHeaderColorParams.modalHeader.classList.add('bg-warning');    	    
		pModalHeaderColorParams.modalHeader.classList.add('text-dark');
		return
	}

	if (pModalHeaderColorParams.activeColor === 'bg-danger'){
		pModalHeaderColorParams.modalHeader.classList.remove('bg-success');
		pModalHeaderColorParams.modalHeader.classList.remove('bg-warning');                  
		pModalHeaderColorParams.modalHeader.classList.remove('bg-info');
		pModalHeaderColorParams.modalHeader.classList.remove('text-dark');
		pModalHeaderColorParams.modalHeader.classList.remove('text-light');
		pModalHeaderColorParams.modalHeader.classList.add('bg-danger');
		pModalHeaderColorParams.modalHeader.classList.add('text-warning');
		return
	}
	
	if (pModalHeaderColorParams.activeColor === 'bg-success'){
		pModalHeaderColorParams.modalHeader.classList.remove('bg-danger');
		pModalHeaderColorParams.modalHeader.classList.remove('bg-warning');                  
		pModalHeaderColorParams.modalHeader.classList.remove('bg-info');
		pModalHeaderColorParams.modalHeader.classList.remove('text-dark');
		pModalHeaderColorParams.modalHeader.classList.remove('text-light');
		pModalHeaderColorParams.modalHeader.classList.add('bg-success');
		pModalHeaderColorParams.modalHeader.classList.add('text-warning');
		return
	}
	if (pModalHeaderColorParams.activeColor === "bg-info"){
		pModalHeaderColorParams.modalHeader.classList.remove('bg-danger');
		pModalHeaderColorParams.modalHeader.classList.remove('bg-success');
		pModalHeaderColorParams.modalHeader.classList.remove('bg-warning');
		pModalHeaderColorParams.modalHeader.classList.remove('text-dark');
		pModalHeaderColorParams.modalHeader.classList.remove('text-warning');
		pModalHeaderColorParams.modalHeader.classList.add('bg-info');    	    
		pModalHeaderColorParams.modalHeader.classList.add('text-light');
		return
	}
}
