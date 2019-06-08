// ************************************************************************
// ***      FriendPopUpMenu : Affichage d'un popup menu                 ***
// ***                                                                  ***
// *** Objet : FriendPopUpMenu                                          ***
// ***                                                                  ***
// *** Cet objet sert à gérer toutes les fonctions liées au menu Popup :***
// ***  - La Micro-fiche ami                                            ***
// ***  - L'Accès au profil d'un ami                                    ***
// ***  - La suppression d'un ami                                       ***
// ***  - La gestion ddes recommandation                                ***
// ***                                                                  ***
// ***  Nécessite :                                                     ***
// ***      Rien                                                        ***
// ***                                                                  ***
// ************************************************************************

function FriendPopUpMenu(pMemberClient){                              // Fonction constructeur exportée
  this.memberClient = pMemberClient;
};   						

// -----------------------------------------------------------------------------
// Option de menu "Voir le Profil d'un ami"
// -----------------------------------------------------------------------------
FriendPopUpMenu.prototype.prepareMenuviewFriend = function(pFriend, pDivDropDown){
	var vlineHTML = {};						
	var vDataToTransmit = null;

	vlineHTML.vHdrAViewFriend = window.document.createElement('a');
	pDivDropDown.appendChild(vlineHTML.vHdrAViewFriend);
	vlineHTML.vHdrAViewFriend.setAttribute('href', '#');
	vlineHTML.vHdrAViewFriend.setAttribute('class', 'container list-group-item  list-group-item-action list-group-item-white m-0 py-0');
	vlineHTML.vHdrAViewFriend.setAttribute('style', 'border-bottom: 1px solid black;');

	vlineHTML.vHdrDivRowViewFriend = window.document.createElement('div');
	vlineHTML.vHdrAViewFriend.appendChild(vlineHTML.vHdrDivRowViewFriend);
	vlineHTML.vHdrDivRowViewFriend.setAttribute('class', 'row');
	vlineHTML.vHdrDivRowViewFriend.setAttribute('style', 'cursor: default;');

	vlineHTML.vHdrDivAvatarViewFriend = window.document.createElement('div');
	vlineHTML.vHdrDivRowViewFriend.appendChild(vlineHTML.vHdrDivAvatarViewFriend);
	vlineHTML.vHdrDivAvatarViewFriend.setAttribute('class', 'col-2 containerAvatarToken p-0 text-center withNoScaling');

	vlineHTML.vHdrImgViewFriend = window.document.createElement('img');
	vlineHTML.vHdrDivAvatarViewFriend.appendChild(vlineHTML.vHdrImgViewFriend);
	vlineHTML.vHdrImgViewFriend.setAttribute('class', 'avatarToken tokenSize32 m-1');
	vlineHTML.vHdrImgViewFriend.setAttribute('alt', 'Membre');
	vlineHTML.vHdrImgViewFriend.setAttribute('src', 'static/images/members/'+pFriend.friendPhoto);
	
	vlineHTML.vHdrDivViewFriend = window.document.createElement('div');
	vlineHTML.vHdrDivRowViewFriend.appendChild(vlineHTML.vHdrDivViewFriend);
	vlineHTML.vHdrDivViewFriend.setAttribute('class', 'col-7 align-self-center px-0');
	vlineHTML.vHdrDivViewFriend.setAttribute('style', 'font-size: 0.9rem; font-weight:bold;');
	vlineHTML.vHdrDivViewFriend.innerHTML = ' Voir le profil de '+pFriend.friendPseudo;

	vlineHTML.vHdrDivBtnViewFriend = window.document.createElement('div');
	vlineHTML.vHdrDivRowViewFriend.appendChild(vlineHTML.vHdrDivBtnViewFriend);
	vlineHTML.vHdrDivBtnViewFriend.setAttribute('class', 'col-3 text-center align-self-center px-0');

	vlineHTML.vHdrBtnViewFriend = window.document.createElement('button');
	vlineHTML.vHdrDivBtnViewFriend.appendChild(vlineHTML.vHdrBtnViewFriend);
	vlineHTML.vHdrBtnViewFriend.setAttribute('type', 'button');
	vlineHTML.vHdrBtnViewFriend.setAttribute('class', 'btn btn-outline-success btn-sm');

	vlineHTML.vHdrIFAViewFriend = window.document.createElement('i');
	vlineHTML.vHdrBtnViewFriend.appendChild(vlineHTML.vHdrIFAViewFriend);
	vlineHTML.vHdrIFAViewFriend.setAttribute('id', 'idHdrIFAViewFriend'+pFriend.indexFriendToRecommend);
	vlineHTML.vHdrIFAViewFriend.setAttribute('class', 'fa fa-eye text-dark');

	vDataToTransmit = 
	{
		myFriend					: this.memberClient.vMyFriendList[pFriend.indexFriendToRecommend],
		actionBtn  				: vlineHTML.vHdrIFAViewFriend.id,
    indexFriendToView : pFriend.indexFriendToRecommend,
    thisContext       : this,
	}

	vlineHTML.vHdrBtnViewFriend.addEventListener('mouseover', vMemberClient.changeBtnTxtColOver);
	vlineHTML.vHdrBtnViewFriend.addEventListener('mouseout', vMemberClient.changeBtnTxtColOut);
	vlineHTML.vHdrBtnViewFriend.addEventListener('click', this.viewFriend);				// Voir la fiche d'un ami
	vlineHTML.vHdrBtnViewFriend.datas = vDataToTransmit;
	vlineHTML.vHdrIFAViewFriend.datas = vDataToTransmit;
}

// -----------------------------------------------------------------------------
// Voir la fiche d'un Ami
// -----------------------------------------------------------------------------
FriendPopUpMenu.prototype.viewFriend = function(event){
	document.getElementById(event.target.datas.actionBtn).removeEventListener('mouseover', event.target.datas.thisContext.memberClient.changeBtnTxtColOver);						
	document.getElementById(event.target.datas.actionBtn).removeEventListener('mouseout', event.target.datas.thisContext.memberClient.changeBtnTxtColOut);						
	document.getElementById(event.target.datas.actionBtn).removeEventListener('click', event.target.datas.thisContext.viewFriend);	

	var vFriendToView = {
		friendEmail: event.target.datas.myFriend.friendEmail,
	}
	
	webSocketConnection.emit('getCompleteRecordOfMyFriend',vFriendToView);
}







// -----------------------------------------------------------------------------
// Option de menu "Supprimer un ami"
// -----------------------------------------------------------------------------
FriendPopUpMenu.prototype.prepareMenuDeleteFriend = function(pFriend, pDivDropDown){
  var vlineHTML = {};						
  var vDataToTransmit = null;

	vlineHTML.vHdrADelFriend = window.document.createElement('a');
	pDivDropDown.appendChild(vlineHTML.vHdrADelFriend);
	vlineHTML.vHdrADelFriend.setAttribute('href', '#');
	vlineHTML.vHdrADelFriend.setAttribute('class', 'container list-group-item  list-group-item-action list-group-item-white m-0 py-0');
	vlineHTML.vHdrADelFriend.setAttribute('style', 'border-bottom: 1px solid black;');

	vlineHTML.vHdrDivRowDelFriend = window.document.createElement('div');
	vlineHTML.vHdrADelFriend.appendChild(vlineHTML.vHdrDivRowDelFriend);
	vlineHTML.vHdrDivRowDelFriend.setAttribute('class', 'row');
	vlineHTML.vHdrDivRowDelFriend.setAttribute('style', 'cursor: default;');

	vlineHTML.vHdrDivAvatarDelFriend = window.document.createElement('div');
	vlineHTML.vHdrDivRowDelFriend.appendChild(vlineHTML.vHdrDivAvatarDelFriend);
	vlineHTML.vHdrDivAvatarDelFriend.setAttribute('class', 'col-2 containerAvatarToken p-0 text-center withNoScaling');

	vlineHTML.vHdrImgDelFriend = window.document.createElement('img');
	vlineHTML.vHdrDivAvatarDelFriend.appendChild(vlineHTML.vHdrImgDelFriend);
	vlineHTML.vHdrImgDelFriend.setAttribute('id', 'idHdrImgDelFriend'+pFriend.indexFriendToRecommend);
	vlineHTML.vHdrImgDelFriend.setAttribute('class', 'avatarToken tokenSize32 m-1');
	vlineHTML.vHdrImgDelFriend.setAttribute('alt', 'Membre');
	vlineHTML.vHdrImgDelFriend.setAttribute('src', 'static/images/members/'+pFriend.friendPhoto);
	vlineHTML.vHdrImgDelFriend.setAttribute('data-toggle', 'popover');
	vlineHTML.vHdrImgDelFriend.setAttribute('data-placement', 'right');
	vlineHTML.vHdrImgDelFriend.setAttribute('title', 'Suppression d\'un ami');
	vlineHTML.vHdrImgDelFriend.setAttribute('data-content', 'Vous n\'êtes plus ami avec '+pFriend.friendPseudo);
	vlineHTML.vHdrImgDelFriend.setAttribute('data-boundary', 'viewport');

	vlineHTML.vHdrDivDelFriend = window.document.createElement('div');
	vlineHTML.vHdrDivRowDelFriend.appendChild(vlineHTML.vHdrDivDelFriend);
	vlineHTML.vHdrDivDelFriend.setAttribute('class', 'col-7 align-self-center px-0');
	vlineHTML.vHdrDivDelFriend.setAttribute('style', 'font-size: 0.9rem; font-weight:bold;');
	vlineHTML.vHdrDivDelFriend.innerHTML = ' Supprimer '+pFriend.friendPseudo+' de mes amis';

	vlineHTML.vHdrDivBtnDelFriend = window.document.createElement('div');
	vlineHTML.vHdrDivRowDelFriend.appendChild(vlineHTML.vHdrDivBtnDelFriend);
	vlineHTML.vHdrDivBtnDelFriend.setAttribute('class', 'col-3 text-center align-self-center px-0');

	vlineHTML.vHdrBtnDelFriend = window.document.createElement('button');
	vlineHTML.vHdrDivBtnDelFriend.appendChild(vlineHTML.vHdrBtnDelFriend);
	vlineHTML.vHdrBtnDelFriend.setAttribute('type', 'button');
	vlineHTML.vHdrBtnDelFriend.setAttribute('class', 'btn btn-outline-danger btn-sm');

	vlineHTML.vHdrIFADelFriend = window.document.createElement('i');
	vlineHTML.vHdrBtnDelFriend.appendChild(vlineHTML.vHdrIFADelFriend);
	vlineHTML.vHdrIFADelFriend.setAttribute('id', 'idHdrIFADelFriend'+pFriend.indexFriendToRecommend);
	vlineHTML.vHdrIFADelFriend.setAttribute('class', 'fa fa-user-times text-dark');

	vDataToTransmit = 
	{
		myPseudo 			: this.memberClient.member.pseudo,
		myEmail 			: this.memberClient.member.email,
		friendPseudo  : pFriend.friendPseudo,
		friendEmail		: pFriend.friendEmail,
    actionBtn  		: vlineHTML.vHdrIFADelFriend.id,
    thisContext   : this,
	}

	vlineHTML.vHdrBtnDelFriend.addEventListener('mouseover', this.memberClient.changeBtnTxtColOver);
	vlineHTML.vHdrBtnDelFriend.addEventListener('mouseout', this.memberClient.changeBtnTxtColOut);
	vlineHTML.vHdrBtnDelFriend.addEventListener('click', this.deleteFriend);						// Suppression d'un ami
	vlineHTML.vHdrBtnDelFriend.datas = vDataToTransmit;
	vlineHTML.vHdrIFADelFriend.datas = vDataToTransmit;
}

// -----------------------------------------------------------------------------
// Suppression d'un Ami
// - Dans la base de donnée
// - Suppression des avatars mutuels dans la liste des amis
// - Fermeture définitive de la PopUp Menu
// -----------------------------------------------------------------------------
FriendPopUpMenu.prototype.deleteFriend = function(event){
	document.getElementById(event.target.datas.actionBtn).removeEventListener('mouseover', event.target.datas.thisContext.memberClient.changeBtnTxtColOver);						
	document.getElementById(event.target.datas.actionBtn).removeEventListener('mouseout', event.target.datas.thisContext.memberClient.changeBtnTxtColOut);						
	document.getElementById(event.target.datas.actionBtn).removeEventListener('click', event.target.datas.thisContext.deleteFriend);					

	var vFriendToDelete = {
		myPseudo 			: event.target.datas.myPseudo,
		myEmail 			: event.target.datas.myEmail,
		friendPseudo 	: event.target.datas.friendPseudo,
		friendEmail 	: event.target.datas.friendEmail,
	}

	webSocketConnection.emit('deleteFriendOfMine',vFriendToDelete);
}

// -----------------------------------------------------------------------------
// Suppression d'un Ami
// - 1) Affichage d'une notification
// - Suppression de mon ex-ami du tableau de mes amis
// - Fermeture définitive de la PopUp Menu
// - Suppression de l'avatar et de tous ses sous-elements (Popup-Menu, Lignes de reco, etc...) de mon ex-ami de ma liste d'amis
// -----------------------------------------------------------------------------
FriendPopUpMenu.prototype.removeFriendFromMyFriendList = function(pFriendToDelete){
	var idImg = 'idHdrImgDelFriend' + pFriendToDelete.indexFriendToDelete;
	$('#'+idImg).popover('show');

	setTimeout(function(){
		$('#'+idImg).popover('hide');
	},cstDelayClosingPopover);     																	// Fermeture temporisée de la PopOver

	setTimeout(() => {
		this.refreshMyFriendList(pFriendToDelete);
	},cstDelayClosingPopover+500);																	// Supprime l'Avatar et ferme la PopUp après un délai de quelques secondes
};

// -----------------------------------------------------------------------------
// Suppression d'un Ami (suite)
// - Apres l'affichage d'une notification
// - 2) Suppression de mon ex-ami du tableau de mes amis
// - 3) Fermeture définitive de la PopUp Menu
// - 4) Suppression de l'avatar et de tous ses sous-elements (Popup-Menu, Lignes de reco, etc...) de mon ex-ami de ma liste d'amis
// -----------------------------------------------------------------------------
FriendPopUpMenu.prototype.refreshMyFriendList = function(pFriendToDelete){
	this.memberClient.vMyFriendList.splice(pFriendToDelete.indexFriendToDelete, 1);   									// Efface l'occurence de mon ami du tableau de mes amis

	// Je régénère ma liste d'amis pour recaler les indexes attachés à chaque amis et utilisés pour les "Id" HTML:
	// Suppression de tous les avatars affichés
	var vElem = document.getElementById('idMyFriendLi'+vActiveProfile+0); // Je régénère ma liste d'amis pour recaler les indexes

	if (vElem){
		var vParentNode = vElem.parentNode;

		// Effacement des tokens de tous mes amis
		while (vParentNode.firstChild) {
			vParentNode.removeChild(vParentNode.firstChild);
		}

		var vMyFriend = 
		{
			friendEmail  			: null,
			friendPseudo 			: null,
			friendPhoto 			: null,
		}

		// Vidage et sauvegarde simultanée de ma liste d'amis (moins celui que je viens de supprimer plus haut)
		vSaveMyFriendList = this.memberClient.vMyFriendList.splice(0,this.memberClient.vMyFriendList.length);		

		vULFriend = document.getElementById('idFriendUL'+vActiveProfile);

		// Recréation des avatars de mes amis dans ma carte d'amis
		vSaveMyFriendList.forEach((item) => {													// Pour chacun de mes amis en déjà dans ma table d'amis
			vMyFriend.friendEmail 			= item.friendEmail;
			vMyFriend.friendPseudo 			= item.friendPseudo;
			vMyFriend.friendPhoto 			= item.friendPhoto;

			vFriendsCard.addFriendIntoCard(vMyFriend, vULFriend);							// Ajout de l'avatar de l'ami en cours dans ma carte d'amis
		});
	}
	vToolBox.clearAllOpenedPopOverAndToolTip();
}


// -----------------------------------------------------------------------------
// Cette fonction prépare toutes les options du menu Popup et le header pour 
// les amis à recommander
// -----------------------------------------------------------------------------
FriendPopUpMenu.prototype.preparePopupHeader = function(pFriend){
	// Obtention de la Div qui va contenir le menu popUp
	var vDivDropDown = document.getElementById('idMyDropDown'+vActiveProfile + pFriend.indexFriendToRecommend);
	var vlineHTML = {};						
	
	var vMicroFicheParams = {
		simpleMicroFiche 	: cstStackableMicroFiche,
		index							: null,
		withScalingParam	: vActiveProfile === cstMainProfileActive ? cstWithScaling : cstWithNoScaling,
	};

	new MicroFicheMember(pFriend).displayMicroFicheMember(vDivDropDown, vMicroFicheParams);

	if (vActiveProfile === cstMainProfileActive){
		this.prepareMenuviewFriend(pFriend, vDivDropDown);
		this.prepareMenuDeleteFriend(pFriend, vDivDropDown);
		vRecommendFriendsMgr.displayHeaderRecommendations(pFriend, vDivDropDown);

		vlineHTML.vDivContain = window.document.createElement('div');
		vDivDropDown.appendChild(vlineHTML.vDivContain);
		vlineHTML.vDivContain.setAttribute('id', 'idDivContain'+pFriend.indexFriendToRecommend);
		vlineHTML.vDivContain.setAttribute('style', 'max-height: 400px; overflow-y: auto');

		return vlineHTML.vDivContain;
	} else {
			vDivDropDown.style.visibility='visible';
	}
}

// -----------------------------------------------------------------------------
// Cette fonction affiche une Popup avec les amis à qui on peut recommander un ami
// La recommandation ne peut fonctionner qu'à partir du moment où on a au moins 2 amis
// En effet, pour recommander un ami "A" à un ami "B", il faut au minimum 2 amis.
// 
// lorsqu'on a cliqué sur l'avatar d'un ami :
// On affiche tous mes autres amis sauf :
// - L'ami dont je vais envoyer les recommandations
// - ceux qui n'ont pas déjà une recommandation par moi-même en cours pour cet ami
// -----------------------------------------------------------------------------
FriendPopUpMenu.prototype.displayPopUpOfMyFriend = function(pRecommendableFriends){
	// Préparation de l'entête du menu Popup
	var vDivContain = this.preparePopupHeader(pRecommendableFriends);

	if (vActiveProfile === cstMainProfileActive){
		vRecommendFriendsMgr.displayRecommendationLines(pRecommendableFriends, vDivContain);
	}
}
