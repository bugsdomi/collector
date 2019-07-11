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
	var lineHTML = {};

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

// --------------------------------------------------------------
// Option N°1 : avec bouton de validation au lieu de la saisie à la volée
// --------------------------------------------------------------

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
		msgRestoreFullList	: pSearchFilterParams.msgRestoreFullList,
		msgFilteredList			: pSearchFilterParams.msgFilteredList,
		thisContext					: this,
	}

// --------------------------------------------------------------
// Option N°2 : Saisie des caractères à la volée
// --------------------------------------------------------------

	// lineHTML.vInputPseudo.addEventListener('keyup', this.searchFilteredList);
	// lineHTML.vInputFirstName.addEventListener('keyup', this.searchFilteredList);
	// lineHTML.vInputName.addEventListener('keyup', this.searchFilteredList);
	// lineHTML.vInputPseudo.datas = vDataToTransmit;
	// lineHTML.vInputFirstName.datas = vDataToTransmit;
	// lineHTML.vInputName.datas = vDataToTransmit;



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
	document.getElementById('idSearchPseudo').value = '';
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
	} else {
		event.target.datas.thisContext.restoreFullList(event);	// Les caractères de recherche ont été effacés 1 à 1, et les champs sont vides ==> Réaffichage de la liste complete
	}
}

// --------------------------------------------------------------
// Affichage d'un champs de filtrage dynamique (uniquement sur 
// les avatars des cartes), pas d'accès à la BDD
// --------------------------------------------------------------
SearchFilter.prototype.displayFilter = function(pFilterParams){
	var vlineHTML = {};

// 				<div class="col-10 px-0">
	vlineHTML.vDivCol1 = window.document.createElement('div');
	pFilterParams.mountPoint.appendChild(vlineHTML.vDivCol1);
	vlineHTML.vDivCol1.setAttribute('class', pFilterParams.colWidth + ' px-0');


	// 					<div class="input-group input-group-sm border rounded">
	vlineHTML.vDivInputGroup = window.document.createElement('div');
	vlineHTML.vDivCol1.appendChild(vlineHTML.vDivInputGroup);
	vlineHTML.vDivInputGroup.setAttribute('class', 'input-group input-group-sm border rounded');

	// 						<div class="input-group-prepend">
	vlineHTML.vDivInputGroupPrepend = window.document.createElement('div');
	vlineHTML.vDivInputGroup.appendChild(vlineHTML.vDivInputGroupPrepend);
	vlineHTML.vDivInputGroupPrepend.setAttribute('class', 'input-group-prepend');

	// 							<span class="input-group-text"><i class="fa fa-fw fa-filter"></i></span>
	vlineHTML.vSpanInputGroupPrepend = window.document.createElement('span');
	vlineHTML.vDivInputGroupPrepend.appendChild(vlineHTML.vSpanInputGroupPrepend);
	vlineHTML.vSpanInputGroupPrepend.setAttribute('class', 'input-group-text');
	vlineHTML.vSpanInputGroupPrepend.innerHTML='<i class="fa fa-fw fa-filter text-dark"></i>';

	// 						<input class="form-control" id="idFilteredFriends" type="text" placeholder="Filtrer des amis">
	vlineHTML.vDivFiltered = window.document.createElement('input');
	vlineHTML.vDivInputGroup.appendChild(vlineHTML.vDivFiltered);
	vlineHTML.vDivFiltered.setAttribute('id', pFilterParams.idFilterField + vActiveProfile);
	vlineHTML.vDivFiltered.setAttribute('class', 'form-control');
	vlineHTML.vDivFiltered.setAttribute('type', 'text');
	vlineHTML.vDivFiltered.setAttribute('placeholder', pFilterParams.placeHolderFilterField);

	// // <div class="input-group-btn">
	// 						<div class="input-group-append">
	vlineHTML.vDivInputGroupAppend = window.document.createElement('div');
	vlineHTML.vDivInputGroup.appendChild(vlineHTML.vDivInputGroupAppend);
	vlineHTML.vDivInputGroupAppend.setAttribute('class', 'input-group-append');

	// 							<button class="btn btn-sm border pushBtnFilters" id="idClearFriendsFilter" type="button">
	vlineHTML.vBtnClearInvitsFilter = window.document.createElement('button');
	vlineHTML.vDivInputGroup.appendChild(vlineHTML.vBtnClearInvitsFilter);
	vlineHTML.vBtnClearInvitsFilter.setAttribute('id', pFilterParams.idClearBtn + vActiveProfile);
	vlineHTML.vBtnClearInvitsFilter.setAttribute('class', 'btn btn-sm border pushBtnFilters');
	vlineHTML.vBtnClearInvitsFilter.setAttribute('type', 'button');

	// 								<i class="fa fa-fw fa-times"></i>
	vlineHTML.viFaTimes = window.document.createElement('i');
	vlineHTML.vBtnClearInvitsFilter.appendChild(vlineHTML.viFaTimes);
	vlineHTML.viFaTimes.setAttribute('class', 'fa fa-fw fa-times');

	// -------------------------------------------------------------------------
	// Traitement des Champs de filtrage
	// -------------------------------------------------------------------------
	vlineHTML.vDivFiltered.addEventListener('keyup', () => {
		this.filterAvatars(vlineHTML.vDivFiltered.value.toUpperCase(), pFilterParams)
	});

	vlineHTML.vBtnClearInvitsFilter.addEventListener('click', () => {
		vlineHTML.vDivFiltered.value = '';
		this.filterAvatars(vlineHTML.vDivFiltered.value.toUpperCase(), pFilterParams)
	});
}

// -----------------------------------------------------------------------------
// Filtrage des invitations
// -----------------------------------------------------------------------------
SearchFilter.prototype.filterAvatars = function(pFilteredPseudo, pFilterParams){
	pFilterParams.listToFilter.forEach((item, index) => {
		if (item.friendPseudo.toUpperCase().startsWith(pFilteredPseudo)){
			document.getElementById(pFilterParams.idLiOfAVatars + vActiveProfile + index).classList.remove('d-none');
		} else {
			document.getElementById(pFilterParams.idLiOfAVatars + vActiveProfile + index).classList.add('d-none');
		}
	});
}
