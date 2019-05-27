// ************************************************************************
// ***      MicroFicheMember : Objet Micro-fiche des membres            ***
// ***                                                                  ***
// *** Objet : MicroFicheMember                                         ***
// ***                                                                  ***
// *** Cet objet sert à afficher :                                      ***
// ***   - Les informations de bases du membre                          ***
// ***   - Les amis du membre                                           ***
// ***                                                                  ***
// ***  Nécessite :                                                     ***
// ***      Rien                                                        ***
// ***                                                                  ***
// ************************************************************************

function MicroFicheMember(pMember, pDivDropDown){   						// Fonction constructeur exportée
	this.member 					= pMember;
	this.divDropDown 			= pDivDropDown;
	this.friendsOfMember	= [];
	this.lastMicroFiche 	= 0;									// N0 de al dernière MicroFiche affichée

}

	// ---------------------------------------------------------------------------------------------------------------------------
	// Filtrage de tous les membres confirmés
	// ---------------------------------------------------------------------------------------------------------------------------
	MicroFicheMember.prototype.filterConfirmedFriends = function(pItem){
		return pItem.pendingFriendRequest === cstAmiConfirme;
	};

// -----------------------------------------------------------------------------
// Micro-fiche d'un ami
// Cette méthode affiche les données de bases d'un membre et sa liste d'amis
// -----------------------------------------------------------------------------
MicroFicheMember.prototype.displayMicroFicheMember = function(){

	var vlineHTML = {};						// Structure HTML générée pour chaque ligne de membre

	vlineHTML.vDiv = window.document.createElement('div');
	this.divDropDown.appendChild(vlineHTML.vDiv);
	vlineHTML.vDiv.setAttribute('href', '#');
	vlineHTML.vDiv.setAttribute('class', 'container list-group-item m-0 p-0 list-group-item-warning');
	vlineHTML.vDiv.setAttribute('style', 'border-bottom: 1px solid black;');

	while ($('#idDivMicroFiche'+this.lastMicroFiche).length > 0) { 
    this.lastMicroFiche++
	}
	vlineHTML.vDiv.setAttribute('id', 'idDivMicroFiche'+this.lastMicroFiche);

	// S'il ne s'agit pas de la micro-fiche principale, (et donc c'est une Micro-fiche d'un ami indirect), je l'efface au bout de 10sec
	if (this.lastMicroFiche > 0){					
		setTimeout(() => {
			this.removeLinesOfDropDownMenu(vlineHTML.vDiv)				// Suppression de la microfiche
		},cstDelayClosingMicroFiche);																
	}

	vlineHTML.vDivRow = window.document.createElement('div');
	vlineHTML.vDiv.appendChild(vlineHTML.vDivRow);
	vlineHTML.vDivRow.setAttribute('class', 'row mx-0');
	vlineHTML.vDivRow.setAttribute('style', 'cursor: default;');

	vlineHTML.vDivCol = window.document.createElement('div');
	vlineHTML.vDivRow.appendChild(vlineHTML.vDivCol);
	vlineHTML.vDivCol.setAttribute('class', 'col-4 mx-0 px-0 withNoScaling align-self-center');
	
	vlineHTML.vImg = window.document.createElement('img');
	vlineHTML.vDivCol.appendChild(vlineHTML.vImg);
	vlineHTML.vImg.setAttribute('class', 'm-1');
	vlineHTML.vImg.setAttribute('alt', 'Membre');
	vlineHTML.vImg.setAttribute('src', 'static/images/members/'+this.member.friendPhoto);
	vlineHTML.vImg.setAttribute('style', 'width:110px; height: auto;');
	
	vlineHTML.vDivProfil = window.document.createElement('div');
	vlineHTML.vDivRow.appendChild(vlineHTML.vDivProfil);
	vlineHTML.vDivProfil.setAttribute('class', 'col-8 text-center mx-0 px-0');
	vlineHTML.vDivProfil.setAttribute('style', 'font-size: 0.9rem; font-weight:bold;');

	vlineHTML.vDivPseudo = window.document.createElement('div');
	vlineHTML.vDivProfil.appendChild(vlineHTML.vDivPseudo);
	vlineHTML.vDivPseudo.setAttribute('class', 'p-0 mb-2 font-size-120');
	vlineHTML.vDivPseudo.innerHTML = this.member.friendPseudo;

	vlineHTML.vDivRowFirstName = window.document.createElement('div');
	vlineHTML.vDivProfil.appendChild(vlineHTML.vDivRowFirstName);
	vlineHTML.vDivRowFirstName.setAttribute('class', 'row mx-0 mb-2 px-0');

	vlineHTML.vDivColFirstName = window.document.createElement('div');
	vlineHTML.vDivRowFirstName.appendChild(vlineHTML.vDivColFirstName);
	vlineHTML.vDivColFirstName.setAttribute('class', 'col-sm-4 mx-0 px-0 text-left');
	vlineHTML.vDivColFirstName.setAttribute('style', 'font-size: 0.9rem; font-weight: normal;');
	vlineHTML.vDivColFirstName.innerHTML = 'Prénom :';

	vlineHTML.vDivColFirstName = window.document.createElement('div');
	vlineHTML.vDivRowFirstName.appendChild(vlineHTML.vDivColFirstName);
	vlineHTML.vDivColFirstName.setAttribute('class', 'col-sm-8 font-weight-bold text-left px-0');

	if (!this.member.friendFirstName){
		vlineHTML.vDivColFirstName.innerHTML = 'Non renseigné';
	} else {
		vlineHTML.vDivColFirstName.innerHTML = this.member.friendFirstName;
	}

	vlineHTML.vDivRowName = window.document.createElement('div');
	vlineHTML.vDivProfil.appendChild(vlineHTML.vDivRowName);
	vlineHTML.vDivRowName.setAttribute('class', 'row mx-0 mb-auto px-0');

	vlineHTML.vDivColName = window.document.createElement('div');
	vlineHTML.vDivRowName.appendChild(vlineHTML.vDivColName);
	vlineHTML.vDivColName.setAttribute('class', 'col-sm-4 mx-0 px-0 text-left');
	vlineHTML.vDivColName.setAttribute('style', 'font-size: 0.9rem; font-weight: normal;');
	vlineHTML.vDivColName.innerHTML = 'Nom :';

	vlineHTML.vDivColName = window.document.createElement('div');
	vlineHTML.vDivRowName.appendChild(vlineHTML.vDivColName);
	vlineHTML.vDivColName.setAttribute('class', 'col-sm-8 font-weight-bold text-left px-0');

	if (!this.member.friendName){
		vlineHTML.vDivColName.innerHTML = 'Non renseigné';
	} else {
		vlineHTML.vDivColName.innerHTML = this.member.friendName;
	}

	// Affiche la carte des amis de mon ami, ou des amis d'un ami de mon ami, etc, etc, etc...
	vlineHTML.vDivBorderFriendsOfmyFriend = window.document.createElement('div');
	vlineHTML.vDiv.appendChild(vlineHTML.vDivBorderFriendsOfmyFriend);
	vlineHTML.vDivBorderFriendsOfmyFriend.setAttribute('class', 'rounded');
	vlineHTML.vDivBorderFriendsOfmyFriend.setAttribute('style', 'border-top: 1px black solid;');

	vlineHTML.vDivCardFriendsOfmyFriend = window.document.createElement('div');
	vlineHTML.vDivBorderFriendsOfmyFriend.appendChild(vlineHTML.vDivCardFriendsOfmyFriend);
	vlineHTML.vDivCardFriendsOfmyFriend.setAttribute('class', 'card border-warning');

	vlineHTML.vDivHeaderFriendsOfmyFriend = window.document.createElement('div');
	vlineHTML.vDivCardFriendsOfmyFriend.appendChild(vlineHTML.vDivHeaderFriendsOfmyFriend);
	vlineHTML.vDivHeaderFriendsOfmyFriend.setAttribute('class', 'card-header py-0 bg-warning');

	vlineHTML.vDivTitleFriendOfmyFriend = window.document.createElement('h5');
	vlineHTML.vDivHeaderFriendsOfmyFriend.appendChild(vlineHTML.vDivTitleFriendOfmyFriend);
	vlineHTML.vDivTitleFriendOfmyFriend.setAttribute('class', 'card-title');
	vlineHTML.vDivTitleFriendOfmyFriend.setAttribute('style', 'color: black; font-size: 0.9rem; font-weight:bold;');
	vlineHTML.vDivTitleFriendOfmyFriend.innerHTML = 'Amis de ' + this.member.friendPseudo;

	vlineHTML.vDivBodyFriendOfmyFriend = window.document.createElement('div');
	vlineHTML.vDivCardFriendsOfmyFriend.appendChild(vlineHTML.vDivBodyFriendOfmyFriend);
	vlineHTML.vDivBodyFriendOfmyFriend.setAttribute('class', 'card-body py-2 px-1');
	vlineHTML.vDivBodyFriendOfmyFriend.setAttribute('style', 'border: 1px black solid; min-height: 50px;');

	// Début de l'affichage des avatars des amis de mon ami, ou des amis d'un ami de mon ami, etc, etc, etc...
	vlineHTML.vUL = window.document.createElement('ul');
	vlineHTML.vDivBodyFriendOfmyFriend.appendChild(vlineHTML.vUL);
	vlineHTML.vUL.setAttribute('class', 'p-0 m-0');
	vlineHTML.vUL.setAttribute('style', 'list-style: none;');

	// Filtrage des membres confirmés uniquement
	this.member.friendsOfMyFriend.filter(this.filterConfirmedFriends).forEach((item, index) => {
			new AddFriendsOfMembers(this, item, index, vlineHTML.vUL);
	})
}

// --------------------------------------------------------------
// Créée les avatars des amis des amis et/ou membres et leur attache 
// un DropDown Menu
// --------------------------------------------------------------
function AddFriendsOfMembers(pThis, pItem, pIndex, pUL) {
	this.lineHTML = {};					// Structure HTML générée pour chaque ligne de membre
	this.friend = pItem; 
	this.index = pIndex;

	this.lineHTML.vLi = window.document.createElement('li');
	pUL.appendChild(this.lineHTML.vLi);
	this.lineHTML.vLi.setAttribute('class', 'friendList withScaling');

	this.lineHTML.vA = window.document.createElement('a');
	this.lineHTML.vLi.appendChild(this.lineHTML.vA);
	this.lineHTML.vA.setAttribute('href', '#');
	this.lineHTML.vA.setAttribute('class', 'btn-sm ml-1 px-0');
	this.lineHTML.vA.setAttribute('style', 'color: white;');
	
	this.lineHTML.vDivAvatar = window.document.createElement('div');
	this.lineHTML.vA.appendChild(this.lineHTML.vDivAvatar);
	this.lineHTML.vDivAvatar.setAttribute('class', 'containerAvatarToken py-1 text-center align-self-center');

	this.lineHTML.vImg = window.document.createElement('img');
	this.lineHTML.vDivAvatar.appendChild(this.lineHTML.vImg);
	this.lineHTML.vImg.setAttribute('class', 'avatarToken tokenSize32');
	this.lineHTML.vImg.setAttribute('style', 'margin-left: 4px;');
	this.lineHTML.vImg.setAttribute('alt', 'Ami');
	this.lineHTML.vImg.setAttribute('src', 'static/images/members/'+pItem.friendPhoto);
	this.lineHTML.vImg.setAttribute('data-toggle', 'tooltip');
	this.lineHTML.vImg.setAttribute('data-placement', 'top');
	this.lineHTML.vImg.setAttribute('data-title', pItem.friendPseudo);

	vDataToTransmit = 
	{
		friendEmail	: pItem.friendEmail,
	}

	this.lineHTML.vImg.addEventListener('click', pThis.getFriendsOfMembers);			// Voir la fiche d'un ami indirect ou d'un membre (qui est ami avec l'ami d'un ami, etc, etc..)
	this.lineHTML.vImg.datas = vDataToTransmit;

	// Ajoute la déclaration d'évenements à chaque PopOver, ToolTip DropDown
	vToolBox.InitPopOverAndToolTipAndDropDown();
}
// -----------------------------------------------------------------------------
// Va rechercher les amis d'un membre (ou d'un ami le cas échéant)
// -----------------------------------------------------------------------------
MicroFicheMember.prototype.getFriendsOfMembers = function(event){
	vFriendsOfMember = {
		friendEmail : event.target.datas.friendEmail,
	}

	// Demande au serveur de récupérer les amis du membre cliqué
	webSocketConnection.emit('getFriendsOfMember', vFriendsOfMember);   		
}
// -----------------------------------------------------------------------------
// Suppression de tous les éléments du DropDownMenu
// à la fermeture du sous-menu
// -----------------------------------------------------------------------------
MicroFicheMember.prototype.removeLinesOfDropDownMenu = function(pDivDropDown){

	// Suppression des éléments de la micro-fiche
	while (pDivDropDown.firstChild) {
		pDivDropDown.removeChild(pDivDropDown.firstChild);
	}
	// et à la fin, suppression du parent
	pDivDropDown.parentNode.removeChild(pDivDropDown);
}

