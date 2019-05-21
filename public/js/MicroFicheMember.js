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

	vlineHTML.vHdrDivFastView = window.document.createElement('div');
	this.divDropDown.appendChild(vlineHTML.vHdrDivFastView);
	vlineHTML.vHdrDivFastView.setAttribute('id', 'idvHdrDivFastView');
	vlineHTML.vHdrDivFastView.setAttribute('href', '#');
	vlineHTML.vHdrDivFastView.setAttribute('class', 'container list-group-item m-0 p-0 list-group-item-warning');
	vlineHTML.vHdrDivFastView.setAttribute('style', 'border: 1px solid black;');

	vlineHTML.vHdrDivRowFastView = window.document.createElement('div');
	vlineHTML.vHdrDivFastView.appendChild(vlineHTML.vHdrDivRowFastView);
	vlineHTML.vHdrDivRowFastView.setAttribute('class', 'row mx-0');
	vlineHTML.vHdrDivRowFastView.setAttribute('style', 'cursor: default;');

	vlineHTML.vHdrDivColFastView = window.document.createElement('div');
	vlineHTML.vHdrDivRowFastView.appendChild(vlineHTML.vHdrDivColFastView);
	vlineHTML.vHdrDivColFastView.setAttribute('class', 'col-5 mx-0 px-0 withNoScaling align-self-center');
	
	vlineHTML.vHdrImgFastView = window.document.createElement('img');
	vlineHTML.vHdrDivColFastView.appendChild(vlineHTML.vHdrImgFastView);
	vlineHTML.vHdrImgFastView.setAttribute('class', 'm-1');
	vlineHTML.vHdrImgFastView.setAttribute('alt', 'Membre');
	vlineHTML.vHdrImgFastView.setAttribute('src', 'static/images/members/'+this.member.friendPhoto);
	vlineHTML.vHdrImgFastView.setAttribute('style', 'width:110px; height: auto;');
	
	vlineHTML.vHdrDivProfilFastView = window.document.createElement('div');
	vlineHTML.vHdrDivRowFastView.appendChild(vlineHTML.vHdrDivProfilFastView);
	vlineHTML.vHdrDivProfilFastView.setAttribute('class', 'col-7  text-center mx-0 px-0');
	vlineHTML.vHdrDivProfilFastView.setAttribute('style', 'font-size: 0.9rem; font-weight:bold;');

	vlineHTML.vHdrDivPseudoFastView = window.document.createElement('div');
	vlineHTML.vHdrDivProfilFastView.appendChild(vlineHTML.vHdrDivPseudoFastView);
	vlineHTML.vHdrDivPseudoFastView.setAttribute('class', 'p-0 mb-2 font-size-120');
	vlineHTML.vHdrDivPseudoFastView.innerHTML = this.member.friendPseudo;

	vlineHTML.vHdrDivRowFirstNameFastView = window.document.createElement('div');
	vlineHTML.vHdrDivProfilFastView.appendChild(vlineHTML.vHdrDivRowFirstNameFastView);
	vlineHTML.vHdrDivRowFirstNameFastView.setAttribute('class', 'row mx-0 mb-2 px-0');

	vlineHTML.vHdrDivColFirstNameFastView = window.document.createElement('div');
	vlineHTML.vHdrDivRowFirstNameFastView.appendChild(vlineHTML.vHdrDivColFirstNameFastView);
	vlineHTML.vHdrDivColFirstNameFastView.setAttribute('class', 'col-sm-4 mx-0 px-0 text-left');
	vlineHTML.vHdrDivColFirstNameFastView.setAttribute('style', 'font-size: 0.9rem; font-weight: normal;');
	vlineHTML.vHdrDivColFirstNameFastView.innerHTML = 'Prénom :';

	vlineHTML.vHdrDivColFirstNameFastView = window.document.createElement('div');
	vlineHTML.vHdrDivRowFirstNameFastView.appendChild(vlineHTML.vHdrDivColFirstNameFastView);
	vlineHTML.vHdrDivColFirstNameFastView.setAttribute('class', 'col-sm-8 font-weight-bold text-left px-0');

	if (!this.member.friendFirstName){
		vlineHTML.vHdrDivColFirstNameFastView.innerHTML = 'Non renseigné';
	} else {
		vlineHTML.vHdrDivColFirstNameFastView.innerHTML = this.member.friendFirstName;
	}

	vlineHTML.vHdrDivRowNameFastView = window.document.createElement('div');
	vlineHTML.vHdrDivProfilFastView.appendChild(vlineHTML.vHdrDivRowNameFastView);
	vlineHTML.vHdrDivRowNameFastView.setAttribute('class', 'row mx-0 mb-auto px-0');

	vlineHTML.vHdrDivColNameFastView = window.document.createElement('div');
	vlineHTML.vHdrDivRowNameFastView.appendChild(vlineHTML.vHdrDivColNameFastView);
	vlineHTML.vHdrDivColNameFastView.setAttribute('class', 'col-sm-4 mx-0 px-0 text-left');
	vlineHTML.vHdrDivColNameFastView.setAttribute('style', 'font-size: 0.9rem; font-weight: normal;');
	vlineHTML.vHdrDivColNameFastView.innerHTML = 'Nom :';

	vlineHTML.vHdrDivColNameFastView = window.document.createElement('div');
	vlineHTML.vHdrDivRowNameFastView.appendChild(vlineHTML.vHdrDivColNameFastView);
	vlineHTML.vHdrDivColNameFastView.setAttribute('class', 'col-sm-8 font-weight-bold text-left px-0');

	if (!this.member.friendName){
		vlineHTML.vHdrDivColNameFastView.innerHTML = 'Non renseigné';
	} else {
		vlineHTML.vHdrDivColNameFastView.innerHTML = this.member.friendName;
	}

	// Affiche la carte des amis de mon ami, ou des amis d'un ami de mon ami, etc, etc, etc...
	vlineHTML.vHdrDivBorderFriendsOfmyFriend = window.document.createElement('div');
	vlineHTML.vHdrDivFastView.appendChild(vlineHTML.vHdrDivBorderFriendsOfmyFriend);
	vlineHTML.vHdrDivBorderFriendsOfmyFriend.setAttribute('class', 'rounded');
	vlineHTML.vHdrDivBorderFriendsOfmyFriend.setAttribute('style', 'border-top: 1px black solid;');

	vlineHTML.vHdrDivCardFriendsOfmyFriend = window.document.createElement('div');
	vlineHTML.vHdrDivBorderFriendsOfmyFriend.appendChild(vlineHTML.vHdrDivCardFriendsOfmyFriend);
	vlineHTML.vHdrDivCardFriendsOfmyFriend.setAttribute('class', 'card border-warning');

	vlineHTML.vHdrDivHeaderFriendsOfmyFriend = window.document.createElement('div');
	vlineHTML.vHdrDivCardFriendsOfmyFriend.appendChild(vlineHTML.vHdrDivHeaderFriendsOfmyFriend);
	vlineHTML.vHdrDivHeaderFriendsOfmyFriend.setAttribute('class', 'card-header py-0 bg-warning');

	vlineHTML.vHdrDivTitleFriendOfmyFriend = window.document.createElement('h5');
	vlineHTML.vHdrDivHeaderFriendsOfmyFriend.appendChild(vlineHTML.vHdrDivTitleFriendOfmyFriend);
	vlineHTML.vHdrDivTitleFriendOfmyFriend.setAttribute('class', 'card-title');
	vlineHTML.vHdrDivTitleFriendOfmyFriend.setAttribute('style', 'color: black; font-size: 0.9rem; font-weight:bold;');
	vlineHTML.vHdrDivTitleFriendOfmyFriend.innerHTML = 'Amis de ' + this.member.friendPseudo;

	vlineHTML.vHdrDivBodyFriendOfmyFriend = window.document.createElement('div');
	vlineHTML.vHdrDivCardFriendsOfmyFriend.appendChild(vlineHTML.vHdrDivBodyFriendOfmyFriend);
	vlineHTML.vHdrDivBodyFriendOfmyFriend.setAttribute('class', 'card-body py-2 px-1');
	vlineHTML.vHdrDivBodyFriendOfmyFriend.setAttribute('style', 'border: 1px black solid; min-height: 50px;');

	// Début de l'affichage des avatars des amis de mon ami, ou des amis d'un ami de mon ami, etc, etc, etc...
	vlineHTML.vUL = window.document.createElement('ul');
	vlineHTML.vHdrDivBodyFriendOfmyFriend.appendChild(vlineHTML.vUL);
	vlineHTML.vUL.setAttribute('class', 'p-0 m-0');
	vlineHTML.vUL.setAttribute('style', 'list-style: none;');

	// Filtrage des membres confirmés uniquement
	this.friendsOfMember = this.member.friendsOfMyFriend.filter(this.filterConfirmedFriends); 

	this.friendsOfMember.forEach((item, index) => {
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
	// this.lineHTML.vLi.setAttribute('id', 'idFriendsOfMembersLi'+pIndex);
	this.lineHTML.vLi.setAttribute('class', 'friendList withScaling');

	this.lineHTML.vA = window.document.createElement('a');
	this.lineHTML.vLi.appendChild(this.lineHTML.vA);
	this.lineHTML.vA.setAttribute('href', '#');
	this.lineHTML.vA.setAttribute('class', 'btn-sm ml-1 px-0');
	this.lineHTML.vA.setAttribute('style', 'color: white;');
	
	this.lineHTML.vDivAvatar = window.document.createElement('div');
	this.lineHTML.vA.appendChild(this.lineHTML.vDivAvatar);
	// this.lineHTML.vDivAvatar.setAttribute('id', 'idFriendsOfMembersDiv'+pIndex);
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
		// context			: pThis,
		friendEmail					: pItem.friendEmail,
		indexMemberSelected : pIndex,
	}

	console.log('AddFriendsOfMembers - vDataToTransmit : ',vDataToTransmit)

	this.lineHTML.vImg.addEventListener('click', pThis.getFriendsOfMembers);				// Voir la fiche d'un ami
	this.lineHTML.vImg.datas = vDataToTransmit;











		
	// // A l'ouverture du DropDownMenu, on recherche tous les amis de l'ami sur lequel on a cliqué
	// $('#'+this.lineHTML.vLi.id).on('shown.bs.dropdown', () => {
	// 	pThis.getFriendsOfMembers(pThis, pIndex, this.lineHTML.vDivDropDown);
	// });

	// A la fermeture du DropDownMenu, on detruit tous ses sous-éléments dans le DOM
// $('#'+this.lineHTML.vLi.id).on('hidden.bs.dropdown', () => {
// this.lineHTML.vDivDropDown.style.visibility = 'hidden';			// Pour cacher la PopUp et eviter d'avoir l'affichage en 2 steps (cadre plat, puis contenu) à la réouverture
// this.removeLinesOfDropDownMenu(this.lineHTML.vDivDropDown);
// });


	// Ajoute la déclaration d'évenements à chaque PopOver, ToolTip DropDown
	vToolBox.InitPopOverAndToolTipAndDropDown();
}
// -----------------------------------------------------------------------------
// Va rechercher les amis d'un membre (ou d'un ami le cas échéant)
// -----------------------------------------------------------------------------
MicroFicheMember.prototype.getFriendsOfMembers = function(event){

console.log('getFriendsOfMembers - event : ',event)

	// document.getElementById(event.target.datas.actionBtn).removeEventListener('click', this.getFriendsOfMembers);					

	var vFriendToDelete = {
		myPseudo 			: event.target.datas.myPseudo,
		myEmail 			: event.target.datas.myEmail,
		friendPseudo 	: event.target.datas.friendPseudo,
		friendEmail 	: event.target.datas.friendEmail,
	}



console.log('getFriendsOfMembers - pIndex : ',event.target.datas.indexMemberSelected)
// console.log('getFriendsOfMembers - pThis : ',event.target.datas.pThis)

var vlineHTML = {};						// Structure HTML générée pour chaque ligne de membre



	vFriendsOfMember = {
		friendEmail 						: event.target.datas.friendEmail,
		indexMemberSelected			: event.target.datas.indexMemberSelected,
// friendPseudo 						: pThis.friendsOfMember[pIndex].friendPseudo,
// friendPhoto 						: pThis.friendsOfMember[pIndex].friendPhoto,
// hisFriendsList 					: pThis.vMyFriendList,
// indexFriend 	: pIndex,
	}
console.log('getFriendsOfMembers - vFriendsOfMember : ',vFriendsOfMember)
	// Demande au serveur de récupérer les amis du membre cliqué
	webSocketConnection.emit('getFriendsOfMember', vFriendsOfMember);   		
}
// -----------------------------------------------------------------------------
// Suppression de tous les éléments du DropDownMenu
// à la fermeture du sous-menu
// -----------------------------------------------------------------------------
MicroFicheMember.prototype.removeLinesOfDropDownMenu = function(pDivDropDown){
	while (pDivDropDown.firstChild) {
		pDivDropDown.removeChild(pDivDropDown.firstChild);
	}
}

