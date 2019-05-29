// ************************************************************************
// ***      InvitationsCard : Gestionnaire des invitations lancées      ***
// ***                                                                  ***
// *** Objet : InvitationsCard                                          ***
// ***                                                                  ***
// *** Cet objet sert à gérer toutes les fonctions liées aux invitations***
// ***  - L'affichage des invitations                                   ***
// ***  - La possibilité de les annuler                                 ***
// ***                                                                  ***
// ***  Nécessite :                                                     ***
// ***      Rien                                                        ***
// ***                                                                  ***
// ************************************************************************

function InvitationsCard(pMemberClient){                              // Fonction constructeur exportée
  this.memberClient = pMemberClient;
};   						

// -----------------------------------------------------------------------------
// Cette fonction affiche la carte "Mes invitations lancées" sur ma page de profil
// -----------------------------------------------------------------------------
InvitationsCard.prototype.displayInvitSentCard = function(pInvitSentInfo){

	var vMyinvitSent = 
	{
		friendEmail  	: null,
		friendPseudo 	: null,
		friendPhoto 	: null,
	}

	this.memberClient.member.amis.forEach((item, index) => {																					// Pour chacun de mes amis en BDD
		if (item.pendingFriendRequest === cstInvitEncours){													// Si la personne a reçu une invitation de ma part je l'ajoute à ma liste
			vMyinvitSent.friendEmail = item.friendEmail;
			vMyinvitSent.friendPseudo = item.friendPseudo;
			vMyinvitSent.friendPhoto = item.friendPhoto;

			if (!this.memberClient.vInvitSentCardVisible){
				pInvitSentInfo.vInvitSentCard.style.display = 'block';								// S'il y a des invitations en attente, affiche la carte des invitations en attente
				this.memberClient.vInvitSentCardVisible = true;
			}
			this.addInvitSentIntoCard(vMyinvitSent, pInvitSentInfo);								// et je la peuple avec mes invitations en attente
		}
	});
};

// -----------------------------------------------------------------------------
// Cette fonction ajoute une invitation sur la carte "Invitations lancées" de la 
// page de profil et prépare son sous-menu PopUp pour les éventuelles annulations
// -----------------------------------------------------------------------------
InvitationsCard.prototype.addInvitSentIntoCard = function(pMyInvitSent, pInvitSentInfo){

	var vInvitSentLocal = 
	{
		friendEmail  	: pMyInvitSent.friendEmail,
		friendPseudo 	: pMyInvitSent.friendPseudo,
		friendPhoto 	: pMyInvitSent.friendPhoto,
	}

	this.memberClient.vMyInvitSentList.push(vInvitSentLocal);
	var index = (this.memberClient.vMyInvitSentList.length-1);

	var vlineHTML = {};									// Structure HTML générée pour chaque ligne de membre

	vlineHTML.vLi = window.document.createElement('li');
	pInvitSentInfo.vInvitSentUL.appendChild(vlineHTML.vLi);
	vlineHTML.vLi.setAttribute('id', 'idMyInvitSentLi'+index);
	vlineHTML.vLi.setAttribute('class', 'dropdown dropright friendList withScaling');

	vlineHTML.vA = window.document.createElement('a');
	vlineHTML.vLi.appendChild(vlineHTML.vA);
	vlineHTML.vA.setAttribute('href', '#');
	vlineHTML.vA.setAttribute('class', 'btn-sm dropdown-toggle dropdown-toggle-split px-0');
	vlineHTML.vA.setAttribute('style', 'color: white;');
	vlineHTML.vA.setAttribute('data-toggle', 'dropdown');

	vlineHTML.vDivDropDown = window.document.createElement('div');
	vlineHTML.vA.appendChild(vlineHTML.vDivDropDown);
	vlineHTML.vDivDropDown.setAttribute('id', 'idMyInvitSentDropDown'+index);
	vlineHTML.vDivDropDown.setAttribute('class', 'dropdown-menu py-0');
	vlineHTML.vDivDropDown.setAttribute('style', 'width: 300px; border: 1px solid black;');



	// ----------------------------
	// Annuler une invitation lancée
	// ----------------------------
	vlineHTML.vACancelInvit = window.document.createElement('a');
	vlineHTML.vDivDropDown.appendChild(vlineHTML.vACancelInvit);
	vlineHTML.vACancelInvit.setAttribute('id', 'idAnchorCancelInvit'+index);

	vlineHTML.vACancelInvit.setAttribute('href', '#');
	vlineHTML.vACancelInvit.setAttribute('class', 'container list-group-item  list-group-item-action list-group-item-white m-0 py-0');
	vlineHTML.vACancelInvit.setAttribute('style', 'border-bottom: 1px solid black;');

	vlineHTML.vDivRowCancelInvit = window.document.createElement('div');
	vlineHTML.vACancelInvit.appendChild(vlineHTML.vDivRowCancelInvit);
	vlineHTML.vDivRowCancelInvit.setAttribute('class', 'row');
	vlineHTML.vDivRowCancelInvit.setAttribute('style', 'cursor: default;');

	vlineHTML.vDivAvatarCancelInvit = window.document.createElement('div');
	vlineHTML.vDivRowCancelInvit.appendChild(vlineHTML.vDivAvatarCancelInvit);
	vlineHTML.vDivAvatarCancelInvit.setAttribute('class', 'col-2 containerAvatarToken p-0 text-center withNoScaling');

	vlineHTML.vImgCancelInvit = window.document.createElement('img');
	vlineHTML.vDivAvatarCancelInvit.appendChild(vlineHTML.vImgCancelInvit);
	vlineHTML.vImgCancelInvit .setAttribute('id', 'idImgCancelInvit'+index);
	vlineHTML.vImgCancelInvit.setAttribute('class', 'avatarToken tokenSize32 m-1');
	vlineHTML.vImgCancelInvit.setAttribute('alt', 'Membre');
	vlineHTML.vImgCancelInvit.setAttribute('src', 'static/images/members/'+pMyInvitSent.friendPhoto);
	vlineHTML.vImgCancelInvit.setAttribute('data-toggle', 'popover');
	vlineHTML.vImgCancelInvit.setAttribute('data-placement', 'right');
	vlineHTML.vImgCancelInvit.setAttribute('title', 'Suppression d\'une invitation');
	vlineHTML.vImgCancelInvit.setAttribute('data-content', 'Vous supprimé l\'invitation envoyée à '+pMyInvitSent.friendPseudo);
	vlineHTML.vImgCancelInvit.setAttribute('data-boundary', 'viewport');

	vlineHTML.vDivCancelInvit = window.document.createElement('div');
	vlineHTML.vDivRowCancelInvit.appendChild(vlineHTML.vDivCancelInvit);
	vlineHTML.vDivCancelInvit.setAttribute('class', 'col-7 align-self-center px-0');
	vlineHTML.vDivCancelInvit.setAttribute('style', 'font-size: 0.9rem; font-weight:bold;');
	vlineHTML.vDivCancelInvit.innerHTML = ' Annuler l\'invit de '+pMyInvitSent.friendPseudo;

	vlineHTML.vDivBtnCancelInvit = window.document.createElement('div');
	vlineHTML.vDivRowCancelInvit.appendChild(vlineHTML.vDivBtnCancelInvit);
	vlineHTML.vDivBtnCancelInvit.setAttribute('class', 'col-3 text-center align-self-center px-0');

	vlineHTML.vBtnCancelInvit = window.document.createElement('button');
	vlineHTML.vDivBtnCancelInvit.appendChild(vlineHTML.vBtnCancelInvit);
	vlineHTML.vBtnCancelInvit.setAttribute('type', 'button');
	vlineHTML.vBtnCancelInvit.setAttribute('class', 'btn btn-outline-danger btn-sm');

	vlineHTML.vIFACancelInvit = window.document.createElement('i');
	vlineHTML.vBtnCancelInvit.appendChild(vlineHTML.vIFACancelInvit);
	vlineHTML.vIFACancelInvit.setAttribute('id', 'idIFACancelInvit'+index);
	vlineHTML.vIFACancelInvit.setAttribute('class', 'fa fa-envelope text-dark');

	vlineHTML.vDivAvatar = window.document.createElement('div');
	vlineHTML.vA.appendChild(vlineHTML.vDivAvatar);
	vlineHTML.vDivAvatar.setAttribute('class', 'containerAvatarToken py-1 text-center align-self-center');

	vlineHTML.vImg = window.document.createElement('img');
	vlineHTML.vDivAvatar.appendChild(vlineHTML.vImg);
	vlineHTML.vImg.setAttribute('class', 'avatarToken tokenSize50');
	vlineHTML.vImg.setAttribute('alt', 'Ami');
	vlineHTML.vImg.setAttribute('src', 'static/images/members/'+pMyInvitSent.friendPhoto);
	vlineHTML.vImg.setAttribute('data-toggle', 'tooltip');
	vlineHTML.vImg.setAttribute('data-placement', 'top');
	vlineHTML.vImg.setAttribute('data-title', pMyInvitSent.friendPseudo);

	vDataToTransmit = 
	{
		myPseudo 						: this.memberClient.member.pseudo,
		myEmail 						: this.memberClient.member.email,
		friendPseudo				: this.memberClient.vMyInvitSentList[index].friendPseudo,
		friendEmail					: this.memberClient.vMyInvitSentList[index].friendEmail,
    actionBtn  					: vlineHTML.vIFACancelInvit.id,
    thisContext         : this,
	}

	vlineHTML.vBtnCancelInvit.addEventListener('mouseover', this.memberClient.changeBtnTxtColOver);
	vlineHTML.vBtnCancelInvit.addEventListener('mouseout', this.memberClient.changeBtnTxtColOut);
	vlineHTML.vBtnCancelInvit.addEventListener('click', this.cancelInvitation);						// Suppression d'un ami
	vlineHTML.vBtnCancelInvit.datas = vDataToTransmit;
	vlineHTML.vIFACancelInvit.datas = vDataToTransmit;

	// Pour empêcher la fermeture de DropDownMenu lorsque l'on clique quelque part dedans (Comportement par défaut)
	$('#'+vlineHTML.vDivDropDown.id).on("click.bs.dropdown", (event) => { 
		event.stopPropagation(); 
		event.preventDefault(); 
	});

	// Ajoute la déclaration d'évenements à chaque PopOver, ToolTip DropDown
	vToolBox.InitPopOverAndToolTipAndDropDown();
};

// --------------------------------------------------------------
// Annulation d'une invitation envoyée à un membre
// Si le receveur est connecté, son nombre d'invitations evoluera en temps réel
// --------------------------------------------------------------
InvitationsCard.prototype.cancelInvitation = function(event){
	document.getElementById(event.target.datas.actionBtn).removeEventListener('mouseover', event.target.datas.thisContext.memberClient.ChangeBtnTxtColOver);						
	document.getElementById(event.target.datas.actionBtn).removeEventListener('mouseout', event.target.datas.thisContext.memberClient.ChangeBtnTxtColOut);						
	document.getElementById(event.target.datas.actionBtn).removeEventListener('click', event.target.datas.thisContext.cancelInvitation);					

	var vInvitSentToDelete = {
		myPseudo 			: event.target.datas.myPseudo,
		myEmail 			: event.target.datas.myEmail,
		friendPseudo 	: event.target.datas.friendPseudo,
		friendEmail 	: event.target.datas.friendEmail,
	}

	webSocketConnection.emit('cancelInvitation',vInvitSentToDelete)
}

// -----------------------------------------------------------------------------
// Suppression d'une de mes invitations en attente (car acceptée ou refusée)
// - Suppression de mon invitation envoyée du tableau de mes invitations lancées
// - Suppression de l'avatar à qui j'avais fait l'invitation et de tous ses 
// sous-elements (Popup-Menu, Lignes de reco, etc...) de ma liste d'invitations en attente
// Si plus d'invitation en attente, fermeture de la carte des invitations en attente
// -----------------------------------------------------------------------------
InvitationsCard.prototype.removeInvitSentFromMyInvitSentList = function(pInvitToDelete, pInvitSentInfo){
	// Tant que j'ai une opération d'annulation d'invitation encours, je neutralise tous les autres avatars pour ne pas lancer plusieurs annulations simultanement
	this.memberClient.vMyInvitSentList.forEach((item, index) => {
		if (index !== pInvitToDelete.indexInvitToDelete){
			document.getElementById('idAnchorCancelInvit'+index).classList.add('disabled')
		}
	})
	
	this.displayNotifInvitCanceled(pInvitToDelete, pInvitSentInfo);			// Affiche la notification de suppression d'invitation avant la fermeture du PopUp Menu
}

// --------------------------------------------------------------
// Affichage d'une Notification de suppression d'invitation envoyée
// --------------------------------------------------------------
InvitationsCard.prototype.displayNotifInvitCanceled = function(pInvitToDelete, pInvitSentInfo){
	var idImg = 'idImgCancelInvit' + pInvitToDelete.indexInvitToDelete;
	$('#'+idImg).popover('show');

	setTimeout(function(){
		$('#'+idImg).popover('hide')
	},cstDelayClosingPopover);     																	// Fermeture temporisée de la PopOver

	setTimeout(() => {
		this.refreshMyInvitList(pInvitToDelete, pInvitSentInfo)
	},cstDelayClosingPopover+500);																	// Supprime l'Avatar et ferme la PopUp après un délai de quelques secondes
};

// -----------------------------------------------------------------------------
// Suppression d'une Invitation
// - 1) Suppression de l'invitation du tableau de mes invitations
// - 2) Suppression de l'avatar et de tous ses sous-elements (Popup-Menu, Lignes de reco, etc...) de mon invitation de ma liste d'invitations
// -----------------------------------------------------------------------------
InvitationsCard.prototype.refreshMyInvitList = function(pInvitToDelete, pInvitSentInfo){
	this.memberClient.vMyInvitSentList.splice(pInvitToDelete.indexInvitToDelete, 1);   // Efface l'occurence de mon invitation du tableau de mes invitations en attente

	// Je régénère ma liste d'invitations pour recaler les indexes attachés à chaque invitation et utilisés pour les "Id" HTML:
	// Suppression de tous les avatars affichés à partir de l'avatar dont j'ai fait l'annulation
	var vElem = document.getElementById('idMyInvitSentLi'+0); 

	if (vElem){
		var vParentNode = vElem.parentNode;

		// Effacement des Avatars de toutes mes invitations
		while (vParentNode.firstChild) {
			vParentNode.removeChild(vParentNode.firstChild);
		}

		var vMyInvitationSent = 
		{
			friendEmail  	: null,
			friendPseudo 	: null,
			friendPhoto 	: null,
		}

		if (this.memberClient.vMyInvitSentList.length > 0){																		// S'il y a encore des invitations en attente
			// Vidage et sauvegarde simultanée de ma liste d'invitations (moins celui que je viens de supprimer plus haut)
			vSaveMyInvitSentList = this.memberClient.vMyInvitSentList.splice(0,this.memberClient.vMyInvitSentList.length);		

			// Recréation des avatars de mes invitations dans ma carte d'invitations
			vSaveMyInvitSentList.forEach((item) => {																// Pour chacune de mes invitations en déjà dans ma table d'invitations
				vMyInvitationSent.friendEmail = item.friendEmail;
				vMyInvitationSent.friendPseudo = item.friendPseudo;
				vMyInvitationSent.friendPhoto = item.friendPhoto;

				this.addInvitSentIntoCard(vMyInvitationSent, pInvitSentInfo);					// Ajout de l'avatar de l'invitation en cours dans ma carte d'invitations
			});
		} else {
			pInvitSentInfo.vInvitSentCard.style.display = 'none';										// Je cache la carte des invitations en attente puisqu'elle est vide
			this.memberClient.vInvitSentCardVisible = false;
		}
	}

	// Réactivation de ligne de menu permettant d'annuler une invitation
	this.memberClient.vMyInvitSentList.forEach((item, index) => {
		document.getElementById('idAnchorCancelInvit'+index).classList.remove('disabled')
	})
	vToolBox.clearAllOpenedPopOverAndToolTip();
}