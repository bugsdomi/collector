// ************************************************************************
// ***      DisplayModalHeader : Objet Entête des modales               ***
// ***                                                                  ***
// *** Objet : DisplayModalHeader                                       ***
// ***                                                                  ***
// *** Cet objet sert à afficher :                                      ***
// ***   - Les entêtes de modales avec                                  ***
// ***      - Le titre de la modale précédé d'une icône                 ***
// ***      - Un court texte de description de la modale                ***
// ***                                                                  ***
// ***  Nécessite :                                                     ***
// ***      InitHeaderColor                                             ***
// ***                                                                  ***
// ************************************************************************

function DisplayModalHeader(){};   						// Fonction constructeur exportée

// ---------------------------------------------------------------------------------------------------------------------------
// Affichage d'un header de modale 
// Les paramètres sont :
// L'objet DOM de la modale     : modalHeader
// L'identifiant de la modale   : modalId
// Le titre de la modale        : modalTitle
// La description de la modale  : modalDesc
// ---------------------------------------------------------------------------------------------------------------------------
DisplayModalHeader.prototype.displayModalHeader = function(pModalHeaderParams){
  var vModalHeaderColorParams = 
  {
    activeColor : 'bg-warning',
    modalHeader : pModalHeaderParams.displayModalDatas.modalHeader,
  }
  new InitHeaderColor().initHeaderColor(vModalHeaderColorParams);

  $(pModalHeaderParams.modalId).modal('show');      // Ouverture de la modale                                     

  var lineHTML = {};						      // Structure HTML générée pour le titre et la ligne de présentation de la fenêtre

  lineHTML.vH5 = window.document.createElement('h5');
  var parentDiv1 = pModalHeaderParams.displayModalDatas.modalExitBtn.parentNode;
  parentDiv1.insertBefore(lineHTML.vH5, pModalHeaderParams.displayModalDatas.modalExitBtn);
  lineHTML.vH5.setAttribute('class', 'modal-title');
  lineHTML.vH5.innerHTML = pModalHeaderParams.modalTitle;

  lineHTML.vH6 = window.document.createElement('h6');
  var parentDiv2 = pModalHeaderParams.displayModalDatas.modalListGroup.parentNode;
  parentDiv2.insertBefore(lineHTML.vH6, pModalHeaderParams.displayModalDatas.modalListGroup);
  lineHTML.vH6.setAttribute('class', 'text-center');
  lineHTML.vH6.innerHTML = pModalHeaderParams.modalDesc;
}