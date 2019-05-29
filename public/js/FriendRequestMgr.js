// ************************************************************************
// ***      FriendRequestMgr : Gestionnaire des demandes d'amis         ***
// ***                                                                  ***
// *** Objet : FriendRequestMgr                                         ***
// ***                                                                  ***
// *** Cet objet sert à gérer toutes les fonctions liées aux demandes 	***
// *** d'amis:																													***
// ***  - L'affichage intelligent (filtré en fonction du statut des 		***
// ***    membres)                                          						***
// ***  - La sélection du membre a inviter                              ***
// ***  - La création de la demande d'ami en BDD                        ***
// ***  - La suppression du membre invité de la liste                   ***
// ***                                                                  ***
// ***  Nécessite :                                                     ***
// ***      Rien                                                        ***
// ***                                                                  ***
// ************************************************************************

function FriendRequestMgr(pMemberClient){                              // Fonction constructeur exportée
  this.memberClient = pMemberClient;
};   						

// --------------------------------------------------------------
// 				Gestion des demandes d'amis
// --------------------------------------------------------------

// --------------------------------------------------------------
// Cette fonction alimente un objet avec des créations dans le DOM 
// des lignes HTML pour chaque membre pouvant devenir ami
// --------------------------------------------------------------
function AddPotentialFriendLines(item, index, pModalMgrFriendListGroup) {
	this.lineHTML = {};						// Structure HTML générée pour chaque ligne de membre

	this.friend = item;
	this.index = index;

	this.lineHTML.vA = window.document.createElement('a');
	pModalMgrFriendListGroup.appendChild(this.lineHTML.vA);
	this.lineHTML.vA.setAttribute('id', 'idAddFriendAnchor'+index);
	this.lineHTML.vA.setAttribute('href', '#');
	this.lineHTML.vA.setAttribute('class', 'zonedLines border list-group-item list-group-item-action list-group-item-white');
	
	this.lineHTML.vDivRow = window.document.createElement('div');
	this.lineHTML.vA.appendChild(this.lineHTML.vDivRow);
	this.lineHTML.vDivRow.setAttribute('class', 'row');
	this.lineHTML.vDivRow.setAttribute('style', 'cursor: default;');

	this.lineHTML.vDivAvatar = window.document.createElement('div');
	this.lineHTML.vDivRow.appendChild(this.lineHTML.vDivAvatar);
	this.lineHTML.vDivAvatar.setAttribute('class', 'col-2 containerAvatarToken text-center py-1 px-0 text-right align-self-center');

	this.lineHTML.vImg = window.document.createElement('img');
	this.lineHTML.vDivAvatar.appendChild(this.lineHTML.vImg);
	this.lineHTML.vImg.setAttribute('class', 'avatarToken tokenSize50 mx-0');
	this.lineHTML.vImg.setAttribute('id', 'idImgPotentialFriends'+index);
	this.lineHTML.vImg.setAttribute('alt', 'Membre pouvant devenir ami');
	this.lineHTML.vImg.setAttribute('src', 'static/images/members/' + item.etatCivil.photo);
	this.lineHTML.vImg.setAttribute('title', 'Invitation envoyée');
	this.lineHTML.vImg.setAttribute('data-content', 'Vous avez demandé à être ami avec '+item.pseudo);
	this.lineHTML.vImg.setAttribute('data-toggle', 'popover');
	this.lineHTML.vImg.setAttribute('data-placement', 'right');
	this.lineHTML.vImg.setAttribute('data-boundary', 'viewport');

	this.lineHTML.vDivPseudo = window.document.createElement('div');
	this.lineHTML.vDivRow.appendChild(this.lineHTML.vDivPseudo);
	this.lineHTML.vDivPseudo.setAttribute('class', 'col-3 px-0 text-center align-self-center font-size-120');
	this.lineHTML.vDivPseudo.innerHTML = item.pseudo;

	this.lineHTML.vDivPseudo = window.document.createElement('div');
	this.lineHTML.vDivRow.appendChild(this.lineHTML.vDivPseudo);
	this.lineHTML.vDivPseudo.setAttribute('class', 'col-2 px-0 text-center align-self-center font-size-120');
	this.lineHTML.vDivPseudo.innerHTML = item.etatCivil.firstName;

	this.lineHTML.vDivPseudo = window.document.createElement('div');
	this.lineHTML.vDivRow.appendChild(this.lineHTML.vDivPseudo);
	this.lineHTML.vDivPseudo.setAttribute('class', 'col-3 px-0 text-center align-self-center font-size-120');
	this.lineHTML.vDivPseudo.innerHTML = item.etatCivil.name;
	
	this.lineHTML.vDivFA = window.document.createElement('div');
	this.lineHTML.vDivRow.appendChild(this.lineHTML.vDivFA);
	this.lineHTML.vDivFA.setAttribute('class', 'col-2 px-0 pl-0 text-left align-self-center');

	this.lineHTML.vBtn = window.document.createElement('button');
	this.lineHTML.vDivFA.appendChild(this.lineHTML.vBtn);
	this.lineHTML.vBtn.setAttribute('id', 'idBtnPotentialFriends'+index);
	this.lineHTML.vBtn.setAttribute('type', 'button');
	this.lineHTML.vBtn.setAttribute('class', 'btn btn-outline-success btn-sm');

	this.lineHTML.vIFA = window.document.createElement('i');
	this.lineHTML.vBtn.appendChild(this.lineHTML.vIFA);
	this.lineHTML.vIFA.setAttribute('id', 'idIFAPotentialFriends'+index);
	this.lineHTML.vIFA.setAttribute('class', 'fa fa-user-plus fa-2x text-dark');
}

// --------------------------------------------------------------
// Affichage des lignes des amis potentiel pour l'ajout d'amis
// --------------------------------------------------------------
FriendRequestMgr.prototype.displayPotentialFriendsLines = function(pMembersFriendables, pDisplayPotentialfriendData){ 
	// Création dynamique des lignes HTML et création des EventListener pour activer les opération de demande d'ami
	var vMembersFriendables = [];

	pMembersFriendables.forEach((item, index) => {
	vMembersFriendables.push(new AddPotentialFriendLines(item, index, pDisplayPotentialfriendData.modalListGroup));	// Ajoute les éléments d'une ligne vide dans le tableau des éléments
	var vDataToTransmit = {
		member					: this.memberClient.member,
		actionBtn				: vMembersFriendables[index].lineHTML.vIFA.id,
		friendEmail  		: item.email,
		friendPseudo 		: item.pseudo,
		friendPhoto 		: item.etatCivil.photo,
		indexPotentialFriend : index,
		thisContext 		:	this,
	}

	vMembersFriendables[index].lineHTML.vBtn.addEventListener('click', this.sendInvitation,false);
	vMembersFriendables[index].lineHTML.vBtn.datas = vDataToTransmit;
	vMembersFriendables[index].lineHTML.vIFA.datas = vDataToTransmit;

	vMembersFriendables[index].lineHTML.vBtn.addEventListener('mouseover', this.memberClient.changeBtnTxtColOver,false);
	vMembersFriendables[index].lineHTML.vBtn.datas = vDataToTransmit;

	vMembersFriendables[index].lineHTML.vBtn.addEventListener('mouseout', this.memberClient.changeBtnTxtColOut,false);
	vMembersFriendables[index].lineHTML.vBtn.datas = vDataToTransmit;
	});
}

// --------------------------------------------------------------
// On a reçu une liste de membres pouvant devenir amis
// Ajout dynamique des membres dans le DOM sur la modale
// de sélection des membres pour devenir amis
// --------------------------------------------------------------
FriendRequestMgr.prototype.displayPotentialFriends = function(pMembersFriendables, pDisplayPotentialfriendData){   

	document.getElementById('idModalMgrFriendDialog').classList.add('modal-lg');
	var vModalHeaderParams = 
	{
		displayModalDatas : pDisplayPotentialfriendData,
		modalId 					: '#idModalMgrFriend',
		modalTitle 				: '<i class="fa fa-fw fa-user-plus"></i>'+' Ajout d\'amis',
		modalDesc					: 'Sélectionnez les membres avec qui vous souhaitez devenir ami',
	}
	new DisplayModalHeader().displayModalHeader(vModalHeaderParams);

	var vSearchFilterParams = 
	{
		displayModalDatas 	: pDisplayPotentialfriendData,
		myPseudo						: this.memberClient.member.pseudo,
		msgRestoreFullList	: 'askAddFriend',
		msgFilteredList			: 'searchFilteredPotentialFriends',
	}
	new SearchFilter().displaySearchFilter(vSearchFilterParams);													// Affiche les champs de recherche des membres (Pseudo et/ou Prénom et/ou Nom)
	this.displayPotentialFriendsLines(pMembersFriendables, pDisplayPotentialfriendData)		// Affiche les lignes des amis potentiels
};

// --------------------------------------------------------------
// Envoi d'une invitation pour devenir ami (Une seule demande par ami):
// Bascule la couleur de l'icône "Ajout d'amis"
// Si le receveur est connecté, son nombre d'invitations evoluera en temps réel
// --------------------------------------------------------------
FriendRequestMgr.prototype.sendInvitation = function(event){
	// Bascule Look des boutons et de leur texte, puis désactive les boutons 
	var vBtn = document.getElementById('idBtnPotentialFriends' + event.target.datas.indexPotentialFriend);
	vBtn.classList.replace('btn-outline-success','btn-success'); 
	document.getElementById('idIFAPotentialFriends' + event.target.datas.indexPotentialFriend).classList.replace('text-dark','text-light'); 
	vBtn.classList.add('active'); 
	vBtn.classList.add('disabled'); 

	// Neutralise les events et force le curseur en mode par défaut pour ne pas réactiver des lignes d'invitations deja utilisées
	document.getElementById('idAddFriendAnchor' + event.target.datas.indexPotentialFriend).classList.add('neutralPointer'); 
	
	// Suppression des Listeners
	vBtn.removeEventListener('click', event.target.datas.thisContext.sendInvitation,false);
	vBtn.removeEventListener('mouseover', event.target.datas.thisContext.memberClient.changeBtnTxtColOver,false);
	vBtn.removeEventListener('mouseout', event.target.datas.thisContext.memberClient.changeBtnTxtColOut,false);

	var vFriendToAdd = {
		myEmail 			: event.target.datas.member.email,
		myPseudo			:	event.target.datas.member.pseudo,					// Moi
		myPhoto				: event.target.datas.member.etatCivil.photo,
		friendEmail  	: event.target.datas.friendEmail,
		friendPseudo 	: event.target.datas.friendPseudo,					// Ami que j'invite
		friendPhoto  	: event.target.datas.friendPhoto,
		indexPotentialFriend : event.target.datas.indexPotentialFriend,
	}
	webSocketConnection.emit('invitationSent', vFriendToAdd);  
}

// --------------------------------------------------------------
// Supprime la ligne à partir de laquelle on a envoyé une invitation
// S'il n'y a plus de lignes, je ferme la modale
// --------------------------------------------------------------
FriendRequestMgr.prototype.deleteLineInvitSent = function(pFriendToAdd, pModalMgrFriendListGroup){
	var elem = document.getElementById('idAddFriendAnchor'+pFriendToAdd.indexPotentialFriend);

	if (elem){
		elem.parentNode.removeChild(elem);

		if (!pModalMgrFriendListGroup.firstChild) {	// S'il n'y a plus de lignes alors
			$('#idModalMgrFriend').modal('hide');     // Fermeture de la modale                                     
		}
	}
}

// --------------------------------------------------------------
// Affichage d'une Notification d'envoi d'invitation envoyée par 
// le serveur après les MAJ réussies de la BDD et l'envoi du mail
// Ajout de l'invitation envoyée dans la carte gestionnaire  
// d'invitation
// --------------------------------------------------------------
FriendRequestMgr.prototype.displayNotifInvitationSent = function(pFriendToAdd, pDisplayNotifInvitationSentData, pInvitSentInfo){   
	// Ferme la notif après un délai de quelques secondes
	$('#'+'idImgPotentialFriends'+pFriendToAdd.indexPotentialFriend).popover('show');										// Affiche la notification d'envoi de la demande d'ami

	setTimeout(function(){
		$('#'+'idImgPotentialFriends'+pFriendToAdd.indexPotentialFriend).popover('hide');
	},cstDelayClosingPopover);																				// Ferme la notif après un délai de quelques secondes

	setTimeout(() => {
		this.deleteLineInvitSent(pFriendToAdd, pDisplayNotifInvitationSentData.modalListGroup)
	},cstDelayClosingPopover + 500);																	// Supprime la ligne après un délai de quelques secondes

	if (!this.memberClient.vInvitSentCardVisible){
		pInvitSentInfo.vInvitSentCard.style.display = 'block';					// S'il y a des invitations en attente, affiche la carte des invitations en attente
		this.memberClient.vInvitSentCardVisible = true;
	}

	vInvitationsCard.addInvitSentIntoCard(pFriendToAdd, pInvitSentInfo);
}
