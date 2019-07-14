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
	var vLineHTML = {};

	vLineHTML.vSearchContainer = window.document.createElement('div');
	pSearchFilterParams.displayModalDatas.modalListTitle.appendChild(vLineHTML.vSearchContainer);

	vLineHTML.vSearchContainer.setAttribute('id', 'idFilterFields');
	vLineHTML.vSearchContainer.setAttribute('class', 'container mb-2');

	vLineHTML.vSearchRow = window.document.createElement('div');
	vLineHTML.vSearchContainer.appendChild(vLineHTML.vSearchRow);
	vLineHTML.vSearchRow.setAttribute('class', 'row');

	vLineHTML.vFieldSearch = window.document.createElement('div');
	vLineHTML.vSearchRow.appendChild(vLineHTML.vFieldSearch);
	vLineHTML.vFieldSearch.setAttribute('class', 'col-12 px-0');

	vLineHTML.vGroupSearch = window.document.createElement('div');
	vLineHTML.vFieldSearch.appendChild(vLineHTML.vGroupSearch);
	vLineHTML.vGroupSearch.setAttribute('class', 'input-group input-group-sm border rounded');

	vLineHTML.vInputPseudo = window.document.createElement('input');
	vLineHTML.vGroupSearch.appendChild(vLineHTML.vInputPseudo);
	vLineHTML.vInputPseudo.setAttribute('id', 'idSearchPseudo');
	vLineHTML.vInputPseudo.setAttribute('class', 'form-control');
	vLineHTML.vInputPseudo.setAttribute('type', 'text');
	vLineHTML.vInputPseudo.setAttribute('placeholder', 'Pseudo');

	vLineHTML.vInputFirstName = window.document.createElement('input');
	vLineHTML.vGroupSearch.appendChild(vLineHTML.vInputFirstName);
	vLineHTML.vInputFirstName.setAttribute('id', 'idSearchFirstName');
	vLineHTML.vInputFirstName.setAttribute('class', 'form-control');
	vLineHTML.vInputFirstName.setAttribute('type', 'text');
	vLineHTML.vInputFirstName.setAttribute('placeholder', 'Prénom');

	vLineHTML.vInputName = window.document.createElement('input');
	vLineHTML.vGroupSearch.appendChild(vLineHTML.vInputName);
	vLineHTML.vInputName.setAttribute('id', 'idSearchName');
	vLineHTML.vInputName.setAttribute('class', 'form-control');
	vLineHTML.vInputName.setAttribute('type', 'text');
	vLineHTML.vInputName.setAttribute('placeholder', 'Nom');

	vLineHTML.vClearSearch = window.document.createElement('div');
	vLineHTML.vGroupSearch.appendChild(vLineHTML.vClearSearch);
	vLineHTML.vClearSearch.setAttribute('class', 'input-group-append');

	vLineHTML.vBtnClearSearch = window.document.createElement('button');
	vLineHTML.vClearSearch.appendChild(vLineHTML.vBtnClearSearch);
	vLineHTML.vBtnClearSearch.setAttribute('id', 'idClearFilterFields');
	vLineHTML.vBtnClearSearch.setAttribute('class', 'btn btn-sm border pushBtnFilters');

	vLineHTML.vIIconClearSearch = window.document.createElement('i');
	vLineHTML.vBtnClearSearch.appendChild(vLineHTML.vIIconClearSearch);
	vLineHTML.vIIconClearSearch.setAttribute('class', 'fa fa-fw fa-times');

// --------------------------------------------------------------
// Option N°1 : avec bouton de validation au lieu de la saisie à la volée
// --------------------------------------------------------------

	vLineHTML.vBtnRunSearch = window.document.createElement('button');
	vLineHTML.vClearSearch.appendChild(vLineHTML.vBtnRunSearch);
	vLineHTML.vBtnRunSearch.setAttribute('id', 'idRunSearch');
	vLineHTML.vBtnRunSearch.setAttribute('class', 'btn btn-sm border pushBtnFilters');

	vLineHTML.vIIconRunSearch = window.document.createElement('i');
	vLineHTML.vBtnRunSearch.appendChild(vLineHTML.vIIconRunSearch);
	vLineHTML.vIIconRunSearch.setAttribute('class', 'fa fa-fw fa-search');

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

	// vLineHTML.vInputPseudo.addEventListener('keyup', this.searchFilteredList);
	// vLineHTML.vInputFirstName.addEventListener('keyup', this.searchFilteredList);
	// vLineHTML.vInputName.addEventListener('keyup', this.searchFilteredList);
	// vLineHTML.vInputPseudo.datas = vDataToTransmit;
	// vLineHTML.vInputFirstName.datas = vDataToTransmit;
	// vLineHTML.vInputName.datas = vDataToTransmit;



	vLineHTML.vBtnRunSearch.addEventListener('click', this.searchFilteredList);
	vLineHTML.vBtnRunSearch.datas = vDataToTransmit;
	vLineHTML.vIIconRunSearch.datas = vDataToTransmit;

	vLineHTML.vBtnClearSearch.addEventListener('click', this.restoreFullList);
	vLineHTML.vBtnClearSearch.datas = vDataToTransmit;
  vLineHTML.vIIconClearSearch.datas = vDataToTransmit;
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
