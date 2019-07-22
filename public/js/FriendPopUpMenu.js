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
// ***      MicroFicheMember                                            ***
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
// XXXXX
// vlineHTML.vHdrDivViewFriend.setAttribute('style', 'font-size: 0.9rem; font-weight:bold;');
	vlineHTML.vHdrDivViewFriend.setAttribute('style', 'font-size: 0.9rem;');
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
// "Supprimer un ami"
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
//
// vlineHTML.vHdrImgDelFriend.setAttribute('data-toggle', 'popover');
// vlineHTML.vHdrImgDelFriend.setAttribute('data-placement', 'right');
// vlineHTML.vHdrImgDelFriend.setAttribute('title', 'Suppression d\'un ami');
// vlineHTML.vHdrImgDelFriend.setAttribute('data-content', 'Vous n\'êtes plus ami avec '+pFriend.friendPseudo);
// vlineHTML.vHdrImgDelFriend.setAttribute('data-boundary', 'viewport');

	vlineHTML.vHdrDivDelFriend = window.document.createElement('div');
	vlineHTML.vHdrDivRowDelFriend.appendChild(vlineHTML.vHdrDivDelFriend);
	vlineHTML.vHdrDivDelFriend.setAttribute('class', 'col-7 align-self-center px-0');
// XXXXX
// vlineHTML.vHdrDivDelFriend.setAttribute('style', 'font-size: 0.9rem; font-weight:bold;');
	vlineHTML.vHdrDivDelFriend.setAttribute('style', 'font-size: 0.9rem;');
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
	vlineHTML.vHdrBtnDelFriend.addEventListener('click', this.askConfirmDeleteFriend.bind(this));						// Suppression d'un ami
	vlineHTML.vHdrBtnDelFriend.datas = vDataToTransmit;
	vlineHTML.vHdrIFADelFriend.datas = vDataToTransmit;
}

// -----------------------------------------------------------------------------
// Modale de confirmation de Suppression d'un Ami
// -----------------------------------------------------------------------------
FriendPopUpMenu.prototype.displayModalConfirmDeleteFriend = function(pMyEventDatas){
	var vLineHTML = {};		
	var vWorkingSpace = document.getElementById('idWorkingSpace');

	// <div id="idModalConfirm" class="modal px-0" data-keyboard="false" data-focus="true" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="idAriaModalConfirm" aria-hidden="true" style="z-index: 1060;">
	vLineHTML.vDivModalConfirmDeleteFriend = window.document.createElement('div');
	vWorkingSpace.appendChild(vLineHTML.vDivModalConfirmDeleteFriend);
	vLineHTML.vDivModalConfirmDeleteFriend.setAttribute('id', 'idModalConfirmDeleteFriend');
	vLineHTML.vDivModalConfirmDeleteFriend.setAttribute('class', 'modal px-0');
	vLineHTML.vDivModalConfirmDeleteFriend.setAttribute('data-keyboard', 'false');
	vLineHTML.vDivModalConfirmDeleteFriend.setAttribute('data-focus', 'true');
	vLineHTML.vDivModalConfirmDeleteFriend.setAttribute('tabindex', '-1');
	vLineHTML.vDivModalConfirmDeleteFriend.setAttribute('role', 'dialog');
	vLineHTML.vDivModalConfirmDeleteFriend.setAttribute('data-backdrop', 'static');
	vLineHTML.vDivModalConfirmDeleteFriend.setAttribute('aria-labelledby', 'idAriaModalConfirmDeleteFriend');
	vLineHTML.vDivModalConfirmDeleteFriend.setAttribute('aria-hidden', 'true');
	vLineHTML.vDivModalConfirmDeleteFriend.setAttribute('style', 'z-index: 1060;');

	// <div class="modal-dialog modal-dialog-centered" role="document">
	vLineHTML.vDivModalDialogConfirmDeleteFriend = window.document.createElement('div');
	vLineHTML.vDivModalConfirmDeleteFriend.appendChild(vLineHTML.vDivModalDialogConfirmDeleteFriend);
	vLineHTML.vDivModalDialogConfirmDeleteFriend.setAttribute('class', 'modal-dialog modal-dialog-centered');
	vLineHTML.vDivModalDialogConfirmDeleteFriend.setAttribute('role', 'document');
	
	// <div class="modal-content">
	vLineHTML.vDivModalContentConfirmDeleteFriend = window.document.createElement('div');
	vLineHTML.vDivModalDialogConfirmDeleteFriend.appendChild(vLineHTML.vDivModalContentConfirmDeleteFriend);
	vLineHTML.vDivModalContentConfirmDeleteFriend.setAttribute('class', 'modal-content');

	// <div id="idModalConfirmHeader" class="modal-header border-bottom bg-warning text-dark">
	vLineHTML.vModalConfirmDeleteFriendHeader = window.document.createElement('div');
	vLineHTML.vDivModalContentConfirmDeleteFriend.appendChild(vLineHTML.vModalConfirmDeleteFriendHeader);
	vLineHTML.vModalConfirmDeleteFriendHeader.setAttribute('class', 'modal-header border-bottom bg-warning text-dark');

	// <h5 id="idModalConfirmTitle" class="modal-title">
	vLineHTML.vH5ModalHeaderConfirmDeleteFriend = window.document.createElement('h5');
	vLineHTML.vModalConfirmDeleteFriendHeader.appendChild(vLineHTML.vH5ModalHeaderConfirmDeleteFriend);
	vLineHTML.vH5ModalHeaderConfirmDeleteFriend.setAttribute('class', 'modal-title');
	
	// <i class="fa fa-question-circle"></i>
	vLineHTML.vIModalHeaderConfirmDeleteFriend = window.document.createElement('i');
	vLineHTML.vH5ModalHeaderConfirmDeleteFriend.appendChild(vLineHTML.vIModalHeaderConfirmDeleteFriend);
	vLineHTML.vIModalHeaderConfirmDeleteFriend.setAttribute('class', 'fa fa-question-circle');
	vLineHTML.vH5ModalHeaderConfirmDeleteFriend.innerHTML += ' Confirmation';
	
	// <div class="modal-body">
	vLineHTML.vDivModalBodyConfirmDeleteFriend = window.document.createElement('div');
	vLineHTML.vDivModalContentConfirmDeleteFriend.appendChild(vLineHTML.vDivModalBodyConfirmDeleteFriend);
	vLineHTML.vDivModalBodyConfirmDeleteFriend.setAttribute('class', 'modal-body');
	
	// <form id="idModalConfirmForm" class="mb-4 mx-auto d-block">
	vLineHTML.vFormModalBodyConfirmDeleteFriend = window.document.createElement('form');
	vLineHTML.vDivModalBodyConfirmDeleteFriend.appendChild(vLineHTML.vFormModalBodyConfirmDeleteFriend);
	vLineHTML.vFormModalBodyConfirmDeleteFriend.setAttribute('id', 'idModalConfirmDeleteFriendForm');
	vLineHTML.vFormModalBodyConfirmDeleteFriend.setAttribute('class', 'mb-4 mx-auto d-block');

	// <img src="static/images/favicon.png" class="mb-4 mx-auto d-block" alt="Logo du site \'Collect\'Or" width="auto" height="72px">
	vLineHTML.vImgModalBodyConfirmDeleteFriend = window.document.createElement('img');
	vLineHTML.vDivModalBodyConfirmDeleteFriend.appendChild(vLineHTML.vImgModalBodyConfirmDeleteFriend);
	vLineHTML.vImgModalBodyConfirmDeleteFriend.setAttribute('src', 'static/images/favicon.png');
	vLineHTML.vImgModalBodyConfirmDeleteFriend.setAttribute('class', 'mb-4 mx-auto d-block');
	vLineHTML.vImgModalBodyConfirmDeleteFriend.setAttribute('alt', 'Logo du site \'Collect\'Or');
	vLineHTML.vImgModalBodyConfirmDeleteFriend.setAttribute('width', 'auto');
	vLineHTML.vImgModalBodyConfirmDeleteFriend.setAttribute('height', '72px');

	// <div id="idModalConfirmSubTitleAndText" class="mb-3 font-weight-normal text-center">
	vLineHTML.vH3ModalBodyConfirmDeleteFriend = window.document.createElement('div');
	vLineHTML.vDivModalBodyConfirmDeleteFriend.appendChild(vLineHTML.vH3ModalBodyConfirmDeleteFriend);
	vLineHTML.vH3ModalBodyConfirmDeleteFriend.setAttribute('class', 'mb-3 font-weight-normal text-center');
	vLineHTML.vH3ModalBodyConfirmDeleteFriend.innerHTML = '<h5>Vous allez supprimer un ami</h5><br />' + 
																												'<p>Êtes-sûr de vouloir supprimer '+pMyEventDatas.friendPseudo+' de vos amis ?</p>';

	// <div class="modal-footer">
	vLineHTML.vDivModalFooterConfirmDeleteFriend = window.document.createElement('div');
	vLineHTML.vDivModalContentConfirmDeleteFriend.appendChild(vLineHTML.vDivModalFooterConfirmDeleteFriend);
	vLineHTML.vDivModalFooterConfirmDeleteFriend.setAttribute('class', 'modal-footer');

	// <button id="idModalConfirmBtnRefuse" class="btn-danger">Refuser</button>
	vLineHTML.vBtnRefuseConfirmDeleteFriend = window.document.createElement('button');
	vLineHTML.vDivModalFooterConfirmDeleteFriend.appendChild(vLineHTML.vBtnRefuseConfirmDeleteFriend);
	vLineHTML.vBtnRefuseConfirmDeleteFriend.setAttribute('id', 'idBtnRefuseConfirmDeleteFriend');
	vLineHTML.vBtnRefuseConfirmDeleteFriend.setAttribute('class', 'btn btn-danger');
	vLineHTML.vBtnRefuseConfirmDeleteFriend.innerHTML = 'Refuser';

	// <button id="idModalConfirmBtnAccept" class="btn-success">Confirmer</button>
	vLineHTML.vBtnAcceptConfirmDeleteFriend = window.document.createElement('button');
	vLineHTML.vDivModalFooterConfirmDeleteFriend.appendChild(vLineHTML.vBtnAcceptConfirmDeleteFriend);
	vLineHTML.vBtnAcceptConfirmDeleteFriend.setAttribute('id', 'idBtnAcceptConfirmDeleteFriend');
	vLineHTML.vBtnAcceptConfirmDeleteFriend.setAttribute('class', 'btn btn-success');
	vLineHTML.vBtnAcceptConfirmDeleteFriend.innerHTML = 'Accepter';

	vLineHTML.vBtnRefuseConfirmDeleteFriend.addEventListener('click', this.refuseDeleteFriend.bind(this),false);
	vLineHTML.vBtnAcceptConfirmDeleteFriend.addEventListener('click', this.acceptDeleteFriend.bind(this),false);
	vLineHTML.vBtnAcceptConfirmDeleteFriend.datas = pMyEventDatas;
}

// -----------------------------------------------------------------------------
// Refus de la Suppression d'un Ami
// -----------------------------------------------------------------------------
FriendPopUpMenu.prototype.refuseDeleteFriend = function(event){
	this.destroyConfirmDeleteFriend();
}

// -----------------------------------------------------------------------------
// Suppression d'un Ami
// - Dans la base de donnée
// - Suppression des avatars mutuels dans la liste des amis
// - Fermeture définitive de la PopUp Menu
// -----------------------------------------------------------------------------
FriendPopUpMenu.prototype.acceptDeleteFriend = function(event){
	this.destroyConfirmDeleteFriend();

	var myEventDatas = event.target.datas;

	var vFriendToDelete = {
		myPseudo 			: myEventDatas.myPseudo,
		myEmail 			: myEventDatas.myEmail,
		friendPseudo 	: myEventDatas.friendPseudo,
		friendEmail 	: myEventDatas.friendEmail,
	}

	webSocketConnection.emit('deleteFriendOfMine',vFriendToDelete);
}
// -----------------------------------------------------------------------------
// Ouvre la modale de confirmation de Suppression d'un Ami
// -----------------------------------------------------------------------------
FriendPopUpMenu.prototype.askConfirmDeleteFriend = function(event){
	var myEventDatas = event.target.datas;

	this.displayModalConfirmDeleteFriend(myEventDatas);
	$('#idModalConfirmDeleteFriend').modal('show');      // Ouverture de la modale    
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

	if (vActiveProfile === cstMainProfileActive){							// Si on est sur la page du profil principal, j'affiche le Menu popUp complet
		this.prepareMenuviewFriend(pFriend, vDivDropDown);
		this.prepareMenuDeleteFriend(pFriend, vDivDropDown);

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
FriendPopUpMenu.prototype.displayPopUpOfMyFriend = function(pFriend){
	// Préparation de l'entête du menu Popup
	var vDivContain = this.preparePopupHeader(pFriend);

	if (vActiveProfile === cstMainProfileActive){
		if (this.memberClient.vMyFriendList[pFriend.indexFriendToRecommend].connected){ // Si ami connecté, on rajoute l'opion permettant de l'inviter a Tchatter
			vChatLoungesMgr.displayHeaderChatLounge(pFriend, vDivContain);
			vChatLoungesMgr.menuCreateNewLounge(pFriend, vDivContain);
			vChatLoungesMgr.displayLoungesLines(pFriend, vDivContain);
		}

		vRecommendFriendsMgr.displayHeaderRecommendations(pFriend, vDivContain);
		vRecommendFriendsMgr.displayRecommendationLines(pFriend, vDivContain);
	}
}
// --------------------------------------------------------------
// Ferme la modale de confirmation et la 
// détruit dans le DOM
// --------------------------------------------------------------
FriendPopUpMenu.prototype.destroyConfirmDeleteFriend = function(){
	var vModalConfirmDeleteFriend = 'idModalConfirmDeleteFriend';
	$('#'+vModalConfirmDeleteFriend).modal('hide');     // Fermeture de la modale                                     

	var elem = document.getElementById(vModalConfirmDeleteFriend);
	if (elem){
		elem.parentNode.removeChild(elem);
	}
}
