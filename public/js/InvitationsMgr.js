// ************************************************************************
// ***      InvitationsMgr : Gestionnaire des invitations               ***
// ***                                                                  ***
// *** Objet : InvitationsMgr                                           ***
// ***                                                                  ***
// *** Cet objet sert à gérer toutes les fonctions liées aux invitations***
// ***  - L'affichage intelligent (eventuellement filtré) des membres   ***
// ***    membres)                                          						***
// ***                                                                  ***
// ***  Nécessite :                                                     ***
// ***      DisplayModalHeader                                          ***
// ***                                                                  ***
// ************************************************************************

function InvitationsMgr(pMemberClient){                              // Fonction constructeur exportée
  this.memberClient = pMemberClient;
};   						
// --------------------------------------------------------------
//           Gestion des invitations
// --------------------------------------------------------------

// --------------------------------------------------------------
// Cette fonction alimente un objet avec des créations dans le DOM 
// des lignes HTML pour chaque invitation en attente à valider
// --------------------------------------------------------------
function AddInvitLines(item, index, pModalMgrFriendListGroup) {
	this.lineHTML = {};		
	this.friend = item;
	this.index = index;

	this.lineHTML.vA = window.document.createElement('a');
	pModalMgrFriendListGroup.appendChild(this.lineHTML.vA);
	this.lineHTML.vA.setAttribute('id', 'idInvitAnchor'+index);
	this.lineHTML.vA.setAttribute('href', '#');
	this.lineHTML.vA.setAttribute('class', 'zonedLines border list-group-item list-group-item-action list-group-item-white');
	
	this.lineHTML.vDivRow = window.document.createElement('div');
	this.lineHTML.vA.appendChild(this.lineHTML.vDivRow);
	this.lineHTML.vDivRow.setAttribute('class', 'row');
	this.lineHTML.vDivRow.setAttribute('style', 'cursor: default;');

	this.lineHTML.vDivAvatar = window.document.createElement('div');
	this.lineHTML.vDivRow.appendChild(this.lineHTML.vDivAvatar);
	this.lineHTML.vDivAvatar.setAttribute('class', 'col-3 containerAvatarToken py-1 text-center align-self-center');

	this.lineHTML.vImg = window.document.createElement('img');
	this.lineHTML.vDivAvatar.appendChild(this.lineHTML.vImg);
	this.lineHTML.vImg.setAttribute('class', 'avatarToken tokenSize50 mx-1');
	this.lineHTML.vImg.setAttribute('id', 'idImgInvitAvatarToken'+index);
	this.lineHTML.vImg.setAttribute('alt', 'Membre demandant à devenir ami');
	this.lineHTML.vImg.setAttribute('src', 'static/images/members/' + item.friendPhoto);
	this.lineHTML.vImg.setAttribute('data-toggle', 'popover');
	this.lineHTML.vImg.setAttribute('data-placement', 'right');
	this.lineHTML.vImg.setAttribute('data-boundary', 'viewport');

	this.lineHTML.vDivPseudo = window.document.createElement('div');
	this.lineHTML.vDivRow.appendChild(this.lineHTML.vDivPseudo);
	this.lineHTML.vDivPseudo.setAttribute('class', 'col-6 align-self-center px-0 font-size-120');

	var friendPair = item.friendPseudo.split('/')
	if (friendPair.length === 1){													// S'il ne s'agit pas d'une recommandation, donc c'est une invitation directe
		this.lineHTML.vDivPseudo.innerHTML = item.friendPseudo;
	} else {																											//
		this.lineHTML.vDivPseudo.innerHTML = friendPair[1]+'<font size="+0"> recommande </font>'+friendPair[0];
	}
	
	this.lineHTML.vDivFA = window.document.createElement('div');
	this.lineHTML.vDivRow.appendChild(this.lineHTML.vDivFA);
	this.lineHTML.vDivFA.setAttribute('class', 'col-3 text-center align-self-center pl-0');

	this.lineHTML.vBtnUp = window.document.createElement('button');
	this.lineHTML.vDivFA.appendChild(this.lineHTML.vBtnUp);
	this.lineHTML.vBtnUp.setAttribute('id', 'idBtnUpInvit'+index);
	this.lineHTML.vBtnUp.setAttribute('type', 'button');
	this.lineHTML.vBtnUp.setAttribute('class', 'btn btn-outline-success btn-sm mr-2');

	this.lineHTML.vIFAUp = window.document.createElement('i');
	this.lineHTML.vBtnUp.appendChild(this.lineHTML.vIFAUp);
	this.lineHTML.vIFAUp.setAttribute('id', 'idIFAUpInvit'+index);
	this.lineHTML.vIFAUp.setAttribute('class', 'fa fa-thumbs-o-up fa-2x text-dark');

	this.lineHTML.vBtnDown = window.document.createElement('button');
	this.lineHTML.vDivFA.appendChild(this.lineHTML.vBtnDown);
	this.lineHTML.vBtnDown.setAttribute('id', 'idBtnDownInvit'+index);
	this.lineHTML.vBtnDown.setAttribute('type', 'button');
	this.lineHTML.vBtnDown.setAttribute('class', 'btn btn-outline-danger btn-sm');

	this.lineHTML.vIFADown = window.document.createElement('i');
	this.lineHTML.vBtnDown.appendChild(this.lineHTML.vIFADown);
	this.lineHTML.vIFADown.setAttribute('id', 'idIFADownInvit'+index);
	this.lineHTML.vIFADown.setAttribute('class', 'fa fa-thumbs-o-down fa-2x text-dark');
}

// --------------------------------------------------------------
// On a reçu une liste d'invitations à traiter
// Ajout dynamique des membres demandeurs dans le DOM sur la modale
// d'affichage des invitations
// --------------------------------------------------------------
InvitationsMgr.prototype.displayWaitingInvitation = function(pWaitingInvit, pDisplayWaitingInvitationData){
	document.getElementById('idModalMgrFriendDialog').classList.remove('modal-lg');

	// Préparation et ouverture de la fenêtre modale de sélection des invitations à traiter
	var vModalHeaderParams = 
	{
		displayModalDatas : pDisplayWaitingInvitationData,
		modalId 					: '#idModalMgrFriend',
		modalTitle 				: '<i class="fa fa-fw fa-check"></i>'+' Validation d\'amis',
		modalDesc					: 'Validez les membres avec qui vous acceptez de devenir ami',
	}
	new DisplayModalHeader().displayModalHeader(vModalHeaderParams);

	// Création dynamique des lignes HTML et création des EventListener pour activer les opération de validation ou de rejet
	var vInvitAvailable = [];
	pWaitingInvit.forEach((item, index) => {
		// Ajoute les éléments d'une ligne vide dans le tableau des invitations
		vInvitAvailable.push(new AddInvitLines(item, index, pDisplayWaitingInvitationData.modalListGroup));	

		var vDataToTransmit = {
			member					: this.memberClient.member,
			friendEmail  		: item.friendEmail,
			friendPseudo 		: item.friendPseudo,
			friendPhoto 		: item.friendPhoto,
			actionBtn				: vInvitAvailable[index].lineHTML.vIFAUp.id,
      indexInvitation	: index,
      thisContext     : this,
		}

		// StackOverflow : https://stackoverflow.com/questions/256754/how-to-pass-arguments-to-addeventlistener-listener-function - 
		// "Why not just get the arguments from the target attribute of the event?"
		// Cette façon de procéder pour les 4 lignes qui suivent permet de passer des paramètres à la fonction appelée et surtout de pouvoir "Remove" les Listeners
		vInvitAvailable[index].lineHTML.vBtnUp.addEventListener('click', this.acceptInvitation,false);
		vInvitAvailable[index].lineHTML.vBtnUp.datas = vDataToTransmit;
		vInvitAvailable[index].lineHTML.vIFAUp.datas = vDataToTransmit;

		vInvitAvailable[index].lineHTML.vBtnUp.addEventListener('mouseover', vMemberClient.changeBtnTxtColOver,false);
		vInvitAvailable[index].lineHTML.vBtnUp.datas = vDataToTransmit;

		vInvitAvailable[index].lineHTML.vBtnUp.addEventListener('mouseout', vMemberClient.changeBtnTxtColOut,false);
		vInvitAvailable[index].lineHTML.vBtnUp.datas = vDataToTransmit;

		var vDataToTransmit = {
			member					: this.memberClient.member,
			friendEmail  		: item.friendEmail,
			friendPseudo 		: item.friendPseudo,
			friendPhoto 		: item.friendPhoto,
			actionBtn				: vInvitAvailable[index].lineHTML.vIFADown.id,
      indexInvitation	: index,
      thisContext     : this,
		}

		vInvitAvailable[index].lineHTML.vBtnDown.addEventListener('click', this.refuseInvitation,false);
		vInvitAvailable[index].lineHTML.vBtnDown.datas = vDataToTransmit;
		vInvitAvailable[index].lineHTML.vIFADown.datas = vDataToTransmit;

		vInvitAvailable[index].lineHTML.vBtnDown.addEventListener('mouseover', vMemberClient.changeBtnTxtColOver,false);
		vInvitAvailable[index].lineHTML.vBtnDown.datas = vDataToTransmit;

		vInvitAvailable[index].lineHTML.vBtnDown.addEventListener('mouseout', vMemberClient.changeBtnTxtColOut,false);
		vInvitAvailable[index].lineHTML.vBtnDown.datas = vDataToTransmit;
	});
};

// --------------------------------------------------------------
// Envoi d'une acceptation d'invitation pour devenir ami au serveur (Une seule demande par ami):
// Bascule la couleur de l'icône "Accord d'amis"
// --------------------------------------------------------------
InvitationsMgr.prototype.acceptInvitation = function(event){
	var vBtnUp = document.getElementById('idBtnUpInvit' + event.target.datas.indexInvitation);
	var vBtnDown = document.getElementById('idBtnDownInvit' + event.target.datas.indexInvitation);
	
	vBtnUp.classList.replace('btn-outline-success','btn-success'); 
	document.getElementById('idIFAUpInvit' + event.target.datas.indexInvitation).classList.replace('text-dark','text-light'); 
	vBtnUp.classList.add('active'); 
	vBtnUp.classList.add('disabled'); 
	vBtnDown.classList.add('disabled'); 

	// Neutralise les events et force le curseur en mode par défaut pour ne pas réactiver des lignes d'invitations deja utilisées
	document.getElementById('idInvitAnchor' + event.target.datas.indexInvitation).classList.add('neutralPointer'); 

	vBtnUp.removeEventListener('click', event.target.datas.thisContext.acceptInvitation,false);
	vBtnUp.removeEventListener('mouseover', event.target.datas.thisContext.memberClient.changeBtnTxtColOver,false);
	vBtnUp.removeEventListener('mouseout', event.target.datas.thisContext.memberClient.changeBtnTxtColOut,false);

	vBtnDown.removeEventListener('click', event.target.datas.thisContext.refuseInvitation,false);
	vBtnDown.removeEventListener('mouseover', event.target.datas.thisContext.memberClient.changeBtnTxtColOver,false);
	vBtnDown.removeEventListener('mouseout', event.target.datas.thisContext.memberClient.changeBtnTxtColOut,false);

	var vSelectedInvit = {
		myEmail 			: event.target.datas.member.email,
		myPseudo			:	event.target.datas.member.pseudo,
		myPhoto				: event.target.datas.member.etatCivil.photo,
		friendEmail  	: event.target.datas.friendEmail,
		friendPseudo 	: event.target.datas.friendPseudo,
		friendPhoto 	: event.target.datas.friendPhoto,
		indexInvitation : event.target.datas.indexInvitation,
	}
	webSocketConnection.emit('acceptInvitation', vSelectedInvit);  
}

// --------------------------------------------------------------
// - Affichage d'une Notification d'acceptation d'ami envoyée par 
// 	 le serveur après les MAJ réussies de la BDD
// - Ajout de l'avatar de mon nouvel ami dans ma liste d'amis
// --------------------------------------------------------------
InvitationsMgr.prototype.displayNotifInvitationValided = function(pSelectedInvit, pNotifInvitValidedData){
	var idImg = 'idImgInvitAvatarToken' + pSelectedInvit.indexInvitation;
	var vImg = document.getElementById(idImg);

	vImg.setAttribute('title', 'Invitation acceptée');
	vImg.setAttribute('data-content', 'Vous êtes désormais ami avec ' + vToolBox.splitFriendFromCombo(pSelectedInvit.friendPseudo));

	$('#'+idImg).popover('show');

	setTimeout(function(){
		$('#'+idImg).popover('hide')
	},cstDelayClosingPopover);     																	// Fermeture temporisée de la PopOver

	setTimeout(() => {
		this.deleteLineInvitProcessed(pSelectedInvit, pNotifInvitValidedData.modalListGroup)
	},cstDelayClosingPopover+500);																	// Supprime la ligne après un délai de quelques secondes

	vULFriend = document.getElementById('idFriendUL'+vActiveProfile);
	vFriendsCard.addFriendIntoCard(pSelectedInvit, vULFriend);						// Ajout de mon nouvel ami dans la carte "Mes amis"
};

// --------------------------------------------------------------
// Envoi d'un refus d'invitation pour devenir ami au serveur (Une seule demande par ami):
// Bascule la couleur de l'icône "Refus d'amis"
// --------------------------------------------------------------
InvitationsMgr.prototype.refuseInvitation = function(event){
	var vBtnUp = document.getElementById('idBtnUpInvit' + event.target.datas.indexInvitation);
	var vBtnDown = document.getElementById('idBtnDownInvit' + event.target.datas.indexInvitation);

	vBtnDown.classList.replace('btn-outline-danger','btn-danger'); 
	document.getElementById('idIFADownInvit' + event.target.datas.indexInvitation).classList.replace('text-dark','text-light'); 
	vBtnDown.classList.add('active'); 
	vBtnDown.classList.add('disabled'); 
	vBtnUp.classList.add('disabled'); 

	// Neutralise les events et force le curseur en mode par défaut pour ne pas réactiver des lignes d'invitations deja utilisées
	document.getElementById('idInvitAnchor' + event.target.datas.indexInvitation).classList.add('neutralPointer'); 

	// Suppression des Listeners
	vBtnUp.removeEventListener('click', event.target.datas.thisContext.acceptInvitation,false);
	vBtnUp.removeEventListener('mouseover', event.target.datas.thisContext.memberClient.changeBtnTxtColOver,false);
	vBtnUp.removeEventListener('mouseout', event.target.datas.thisContext.memberClient.changeBtnTxtColOut,false);

	vBtnDown.removeEventListener('click', event.target.datas.thisContext.refuseInvitation,false);
	vBtnDown.removeEventListener('mouseover', event.target.datas.thisContext.memberClient.changeBtnTxtColOver,false);
	vBtnDown.removeEventListener('mouseout', event.target.datas.thisContext.memberClient.changeBtnTxtColOut,false);

	var vSelectedInvit = {
		myEmail 			: event.target.datas.member.email,
		myPseudo			:	event.target.datas.member.pseudo,
		friendEmail  	: event.target.datas.friendEmail,
		friendPseudo 	: event.target.datas.friendPseudo,
		indexInvitation : event.target.datas.indexInvitation,
	}
	webSocketConnection.emit('refuseInvitation', vSelectedInvit);  
}

// --------------------------------------------------------------
// Affichage d'une Notification de refus d'ami envoyée par 
// le serveur après les MAJ réussies de la BDD
// --------------------------------------------------------------
InvitationsMgr.prototype.displayNotifInvitationRefused = function(pSelectedInvit, pDisplayNotifInvitationRefusedData){   	
	var idImg = 'idImgInvitAvatarToken' + pSelectedInvit.indexInvitation;
	var vImg = document.getElementById(idImg);

	vImg.setAttribute('title', 'Invitation refusée');
	vImg.setAttribute('data-content', 'Vous avez décliné la demande d\'ami de '+ vToolBox.splitFriendFromCombo(pSelectedInvit.friendPseudo));

	$('#'+idImg).popover('show');

	setTimeout(function(){
		$('#'+idImg).popover('hide')
	},cstDelayClosingPopover);     // Fermeture temporisée de la PopOver

	setTimeout(() => {
		this.deleteLineInvitProcessed(pSelectedInvit, pDisplayNotifInvitationRefusedData.modalListGroup)
	},cstDelayClosingPopover+500);																		// Supprime la ligne après un délai de quelques secondes
};
	
// --------------------------------------------------------------
// Supprime la ligne à partir de laquelle on a validé ou refusé 
// une invitation.
// S'il n'y a plus de lignes, je ferme la modale
// --------------------------------------------------------------
InvitationsMgr.prototype.deleteLineInvitProcessed = function(pSelectedInvit, pModalMgrFriendListGroup){
	var elem = document.getElementById('idInvitAnchor'+pSelectedInvit.indexInvitation);
	
	if (elem){
		elem.parentNode.removeChild(elem);

		if (!pModalMgrFriendListGroup.firstChild) {	// S'il n'y a plus de lignes alors
			$('#idModalMgrFriend').modal('hide');     // Fermeture de la modale                                     
		}
	}
}
