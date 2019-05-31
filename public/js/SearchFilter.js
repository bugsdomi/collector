// ************************************************************************
// ***      SearchFilter : Objet de saisie des aparamtres de filtrage   ***
// ***                                                                  ***
// *** Objet : SearchFilter                                             ***
// ***                                                                  ***
// *** Cet objet sert à afficher :                                      ***
// ***   - Des champs de saisie pour filtrer les affichages des listes  ***
// ***      d'amis, de membres ou autres (à définir)                    ***
// ***      - Un court texte de description de la modale                ***
// ***                                                                  ***
// ***  Nécessite :                                                     ***
// ***      Rien                                                        ***
// ***                                                                  ***
// ************************************************************************

function SearchFilter(){};        // Fonction constructeur exportée

// ---------------------------------------------------------------------------------------------------------------------------
// Composant Filtre afin de choisir les membres dans les listes en fonction de critères "Pseudo et/ou Prénom et/ou Nom"
// Les paramètres sont :
//   Les données de la modale contenant le filtre             : displayModalDatas 
//   Le Pseudo qui va servir de référence pour les filtrages  : myPseudo
//   Le mesasge envoyé au serveur pour réafficher la liste complète (non filtrée) : msgRestoreFullList
//   Le mesasge envoyé au serveur pour rafficher la liste filtrée                 : msgFilteredList
// ---------------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------------------
// Affichage des champs de saisie nécessaires pour la recherche 
// des membres, d'amis ou autres listes du même type (Pseudo et/ou Prénom et/ou nom)
// --------------------------------------------------------------
SearchFilter.prototype.displaySearchFilter = function(pSearchFilterParams){  
	var lineHTML = {};						// Structure HTML générée pour le titre et la ligne de présentation de la fenêtre

	lineHTML.vSearchContainer = window.document.createElement('div');
	pSearchFilterParams.displayModalDatas.modalListTitle.appendChild(lineHTML.vSearchContainer);

	lineHTML.vSearchContainer.setAttribute('id', 'idFilterFields');
	lineHTML.vSearchContainer.setAttribute('class', 'container mb-2');

	lineHTML.vSearchRow = window.document.createElement('div');
	lineHTML.vSearchContainer.appendChild(lineHTML.vSearchRow);
	lineHTML.vSearchRow.setAttribute('class', 'row');

	lineHTML.vFieldSearch = window.document.createElement('div');
	lineHTML.vSearchRow.appendChild(lineHTML.vFieldSearch);
	lineHTML.vFieldSearch.setAttribute('class', 'col-12 px-0');

	lineHTML.vGroupSearch = window.document.createElement('div');
	lineHTML.vFieldSearch.appendChild(lineHTML.vGroupSearch);
	lineHTML.vGroupSearch.setAttribute('class', 'input-group input-group-sm border rounded');

	lineHTML.vInputPseudo = window.document.createElement('input');
	lineHTML.vGroupSearch.appendChild(lineHTML.vInputPseudo);
	lineHTML.vInputPseudo.setAttribute('id', 'idSearchPseudo');
	lineHTML.vInputPseudo.setAttribute('class', 'form-control');
	lineHTML.vInputPseudo.setAttribute('type', 'text');
	lineHTML.vInputPseudo.setAttribute('placeholder', 'Pseudo');

	lineHTML.vInputFirstName = window.document.createElement('input');
	lineHTML.vGroupSearch.appendChild(lineHTML.vInputFirstName);
	lineHTML.vInputFirstName.setAttribute('id', 'idSearchFirstName');
	lineHTML.vInputFirstName.setAttribute('class', 'form-control');
	lineHTML.vInputFirstName.setAttribute('type', 'text');
	lineHTML.vInputFirstName.setAttribute('placeholder', 'Prénom');

	lineHTML.vInputName = window.document.createElement('input');
	lineHTML.vGroupSearch.appendChild(lineHTML.vInputName);
	lineHTML.vInputName.setAttribute('id', 'idSearchName');
	lineHTML.vInputName.setAttribute('class', 'form-control');
	lineHTML.vInputName.setAttribute('type', 'text');
	lineHTML.vInputName.setAttribute('placeholder', 'Nom');

	lineHTML.vClearSearch = window.document.createElement('div');
	lineHTML.vGroupSearch.appendChild(lineHTML.vClearSearch);
	lineHTML.vClearSearch.setAttribute('class', 'input-group-append');

	lineHTML.vBtnClearSearch = window.document.createElement('button');
	lineHTML.vClearSearch.appendChild(lineHTML.vBtnClearSearch);
	lineHTML.vBtnClearSearch.setAttribute('id', 'idClearFilterFields');
	lineHTML.vBtnClearSearch.setAttribute('class', 'btn btn-sm border pushBtnFilters');

	lineHTML.vIIconClearSearch = window.document.createElement('i');
	lineHTML.vBtnClearSearch.appendChild(lineHTML.vIIconClearSearch);
	lineHTML.vIIconClearSearch.setAttribute('class', 'fa fa-fw fa-times');

	lineHTML.vBtnRunSearch = window.document.createElement('button');
	lineHTML.vClearSearch.appendChild(lineHTML.vBtnRunSearch);
	lineHTML.vBtnRunSearch.setAttribute('id', 'idRunSearch');
	lineHTML.vBtnRunSearch.setAttribute('class', 'btn btn-sm border pushBtnFilters');

	lineHTML.vIIconRunSearch = window.document.createElement('i');
	lineHTML.vBtnRunSearch.appendChild(lineHTML.vIIconRunSearch);
	lineHTML.vIIconRunSearch.setAttribute('class', 'fa fa-fw fa-search');

  vDataToTransmit = 
  {
    myPseudo            : pSearchFilterParams.myPseudo,
    webSocketConnection : pSearchFilterParams.webSocketConnection,
		msgRestoreFullList	: pSearchFilterParams.msgRestoreFullList,
    msgFilteredList			: pSearchFilterParams.msgFilteredList,
	}

	lineHTML.vBtnRunSearch.addEventListener('click', this.searchFilteredList);
	lineHTML.vBtnRunSearch.datas = vDataToTransmit;
	lineHTML.vIIconRunSearch.datas = vDataToTransmit;

	lineHTML.vBtnClearSearch.addEventListener('click', this.restoreFullList);
	lineHTML.vBtnClearSearch.datas = vDataToTransmit;
  lineHTML.vIIconClearSearch.datas = vDataToTransmit;
}

// --------------------------------------------------------------
// On a clické sur la RAZ du filtre sur Pseudo et/ou prénom et/ou nom,
// on restaure l'affichage standard des membres
// --------------------------------------------------------------
SearchFilter.prototype.restoreFullList = function(event){   
	document.getElementById('idSearchPseudo').value = '',
	document.getElementById('idSearchFirstName').value = '';
	document.getElementById('idSearchName').value = '';

  var cstWithoutNewModal 	= false;	  // Dans le cadre de l'affichage filtré des membres, la modale étant deja affichée, on veut pas en ouvrir une seconde

	var vDataToTransmit = {
    myPseudo      : event.target.datas.myPseudo,
		withNewModal	: cstWithoutNewModal,
	}
	webSocketConnection.emit(event.target.datas.msgRestoreFullList, vDataToTransmit);  
}

// --------------------------------------------------------------
// Demande d'affichage des membres filtrés 
// sur Pseudo et/ou prénom et/ou nom 
// --------------------------------------------------------------
SearchFilter.prototype.searchFilteredList = function(event){  
	var vFilterParams = document.getElementById('idSearchPseudo').value + ' '
										+ document.getElementById('idSearchFirstName').value + ' '
                    + document.getElementById('idSearchName').value;

	if (vFilterParams.length > 2){ 							// "2" pour tenir compte des 2 espaces inclus entre les champs de filtrage
		vDataToTransmit = 
		{
      myPseudo            : event.target.datas.myPseudo,
			searchMemberParams 	: vFilterParams,
		}
		webSocketConnection.emit(event.target.datas.msgFilteredList,vDataToTransmit);  
	}
}
