// ------------------------------------------------------------------------
// ---      InvitationsCard : Gestionnaire des invitations lancées      ---
// ---                                                                  ---
// --- Objet : InvitationsCard                                          ---
// ---                                                                  ---
// --- Cet objet sert à gérer toutes les fonctions liées aux invitations---
// ---  - L'affichage des invitations                                   ---
// ---  - La possibilité de les annuler                                 ---
// ---                                                                  ---
// ---  Nécessite :                                                     ---
// ---      Rien                                                        ---
// ---                                                                  ---
// ------------------------------------------------------------------------

function InvitationsCard(pMemberClient){                              // Fonction constructeur exportée
  this.memberClient = pMemberClient;
};   						

// ------------------------------------------------------------------------------
//                     Carte "Invitations lancées"                            
// ------------------------------------------------------------------------------
InvitationsCard.prototype.displayInvitSentCard = function(){
	var vlineHTML = {};						

	// Détermination du point de montage, selon que l'on est sur la fiche du membre principal ou celle d'un de ses amis
	if (vActiveProfile === cstMainProfileActive){
		var vDivMountPointProfile = document.getElementById('idDivMountPointMainProfile');
	} else {
		var vDivMountPointProfile = document.getElementById('idDivMountPointFriendProfile');
	}

// <div id="idInvitSentCard" class="card border-warning mb-4">
	vlineHTML.vDivCardBorder = window.document.createElement('div');
	vDivMountPointProfile.appendChild(vlineHTML.vDivCardBorder);
	vlineHTML.vDivCardBorder.setAttribute('id', 'idInvitSentCard'+vActiveProfile);
	vlineHTML.vDivCardBorder.setAttribute('class', 'card border-warning mb-4');

// ------------------------------------------------------------------------------
//                      Entête de la carte "Invitations lancées"                        
// ------------------------------------------------------------------------------
// 	<div class="card-header bg-warning border-bottom border-warning">
	vlineHTML.vDivCardHeader = window.document.createElement('div');
	vlineHTML.vDivCardBorder.appendChild(vlineHTML.vDivCardHeader);
	vlineHTML.vDivCardHeader.setAttribute('class', 'card-header bg-warning border-bottom border-warning py-0 pb-1');

// 		<div class="container">
	vlineHTML.vDivContAvatToken = window.document.createElement('div');
	vlineHTML.vDivCardHeader.appendChild(vlineHTML.vDivContAvatToken);
	vlineHTML.vDivContAvatToken.setAttribute('class', 'container');

// 			<div class="row">
	vlineHTML.vDivRow1 = window.document.createElement('div');
	vlineHTML.vDivContAvatToken.appendChild(vlineHTML.vDivRow1);
	vlineHTML.vDivRow1.setAttribute('class', 'row');

// 		<h5 class="card-title mx-0">Invitations envoyées aux membres suivants </h5>
	vlineHTML.vH5 = window.document.createElement('h5');
	vlineHTML.vDivRow1.appendChild(vlineHTML.vH5);
	vlineHTML.vH5.setAttribute('class', 'col-4 px-0 my-0 align-self-center');
	
	vlineHTML.vH5.innerHTML='Mes invitations';


// ------------------------------------------------------------------------------
// Inclusion du champs de filtrage
// ------------------------------------------------------------------------------
	var vFilterParams = 
	{
		mountPoint							: vlineHTML.vDivRow1,
		colWidth								: 'col-8',
		idFilterField						: 'idFilteredInvits',
		placeHolderFilterField	: 'Filtrer les invitations',
		idClearBtn							: 'idClearInvitsFilter',
		listToFilter						: this.memberClient.vMyInvitSentList,
		idLiOfAVatars						: 'idMyInvitSentLi',
	}
	new SearchFilter().displayFilter(vFilterParams);												

// ------------------------------------------------------------------------------
//                      Corps de la carte "Invitations lancées"                         
// ------------------------------------------------------------------------------
// 	<div class="card-body" style="border: 1px black solid;">
	vlineHTML.vDivCardBody = window.document.createElement('div');
	vlineHTML.vDivCardBorder.appendChild(vlineHTML.vDivCardBody);
	vlineHTML.vDivCardBody.setAttribute('class', 'card-body');
	vlineHTML.vDivCardBody.setAttribute('style', 'border: 1px black solid;');

// 		<div class="row">
	vlineHTML.vDivRow1 = window.document.createElement('div');
	vlineHTML.vDivCardBody.appendChild(vlineHTML.vDivRow1);
	vlineHTML.vDivRow1.setAttribute('class', 'row');

// 			<div class="col-md-12 px-0 text-dark">
	vlineHTML.vDivCol1 = window.document.createElement('div');
	vlineHTML.vDivRow1.appendChild(vlineHTML.vDivCol1);
	vlineHTML.vDivCol1.setAttribute('class', 'col-md-12 px-0 text-dark');

// 				<ul id="idInvitSentUL" class="p-0 m-0" style="list-style: none;">
	vlineHTML.vULSent = window.document.createElement('ul');
	vlineHTML.vDivCol1.appendChild(vlineHTML.vULSent);
	vlineHTML.vULSent.setAttribute('id', 'idInvitSentUL'+vActiveProfile);
	vlineHTML.vULSent.setAttribute('class', 'p-0 m-0');
	vlineHTML.vULSent.setAttribute('style', 'list-style: none;');

	this.fillInvitSentCard();
}

// -----------------------------------------------------------------------------
// Cette fonction remplit la carte "Mes invitations lancées" sur ma page de profil
// -----------------------------------------------------------------------------
InvitationsCard.prototype.fillInvitSentCard = function(){
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
				document.getElementById('idInvitSentCard'+vActiveProfile).style.display = 'block';	// S'il y a des invitations en attente, affiche la carte des invitations en attente
				this.memberClient.vInvitSentCardVisible = true;
			}
			this.addInvitSentIntoCard(vMyinvitSent);								// et je la peuple avec mes invitations en attente
		}
	});
};

// -----------------------------------------------------------------------------
// Cette fonction ajoute une invitation sur la carte "Invitations lancées" de la 
// page de profil et prépare son sous-menu PopUp pour les éventuelles annulations
// Mais UNIQUEMENT si je suis sur le profil principal
// -----------------------------------------------------------------------------
InvitationsCard.prototype.addInvitSentIntoCardWithDropDown = function(pMyInvitSent){
	var vlineHTML = {};									
	var vInvitSentLocal = 
	{
		friendEmail  	: pMyInvitSent.friendEmail,
		friendPseudo 	: pMyInvitSent.friendPseudo,
		friendPhoto 	: pMyInvitSent.friendPhoto,
	}

	vULSent = document.getElementById('idInvitSentUL'+vActiveProfile);

	this.memberClient.vMyInvitSentList.push(vInvitSentLocal);
	var index = (this.memberClient.vMyInvitSentList.length-1);

	vlineHTML.vLi = window.document.createElement('li');
	vULSent.appendChild(vlineHTML.vLi);
	vlineHTML.vLi.setAttribute('id', 'idMyInvitSentLi'+vActiveProfile+index);
	vlineHTML.vLi.setAttribute('class', 'dropdown dropright friendList withScaling');

	vlineHTML.vA = window.document.createElement('a');
	vlineHTML.vLi.appendChild(vlineHTML.vA);
	vlineHTML.vA.setAttribute('href', '#');
	vlineHTML.vA.setAttribute('class', 'btn-sm dropdown-toggle dropdown-toggle-split px-0');
	vlineHTML.vA.setAttribute('style', 'color: white;');
	vlineHTML.vA.setAttribute('data-toggle', 'dropdown');

	vlineHTML.vDivDropDown = window.document.createElement('div');
	vlineHTML.vA.appendChild(vlineHTML.vDivDropDown);
	vlineHTML.vDivDropDown.setAttribute('id', 'idMyInvitSentDropDown'+vActiveProfile+index);
	vlineHTML.vDivDropDown.setAttribute('class', 'dropdown-menu py-0');
	vlineHTML.vDivDropDown.setAttribute('style', 'width: 300px; border: 1px solid black;');


	// ----------------------------
	// Annuler une invitation lancée (Seulement si je suis sur le profil principal)
	// ----------------------------
	vlineHTML.vACancelInvit = window.document.createElement('a');
	vlineHTML.vDivDropDown.appendChild(vlineHTML.vACancelInvit);
	vlineHTML.vACancelInvit.setAttribute('id', 'idAnchorCancelInvit'+vActiveProfile+index);
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
	vlineHTML.vImgCancelInvit .setAttribute('id', 'idImgCancelInvit'+vActiveProfile+index);
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
	vlineHTML.vIFACancelInvit.setAttribute('id', 'idIFACancelInvit'+vActiveProfile+index);
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
		myPseudo 			: this.memberClient.member.pseudo,
		myEmail 			: this.memberClient.member.email,
		friendPseudo	: this.memberClient.vMyInvitSentList[index].friendPseudo,
		friendEmail		: this.memberClient.vMyInvitSentList[index].friendEmail,
		actionBtn  		: vlineHTML.vIFACancelInvit.id,
		thisContext   : this,
	}

	vlineHTML.vBtnCancelInvit.addEventListener('mouseover', vMemberClient.changeBtnTxtColOver);
	vlineHTML.vBtnCancelInvit.addEventListener('mouseout', vMemberClient.changeBtnTxtColOut);
	vlineHTML.vBtnCancelInvit.addEventListener('click', this.cancelInvitation);						// Suppression d'une invitation
	vlineHTML.vBtnCancelInvit.datas = vDataToTransmit;
	vlineHTML.vIFACancelInvit.datas = vDataToTransmit;

	// Pour empêcher la fermeture de DropDownMenu lorsque l'on clique quelque part dedans (Comportement par défaut)
	$('#'+vlineHTML.vDivDropDown.id).on("click.bs.dropdown", (event) => { 
		event.stopPropagation(); 
		event.preventDefault(); 
	});

	// Ajoute la déclaration d'évenements à chaque PopOver, ToolTip DropDown
	vToolBox.InitPopOverAndToolTipAndDropDown();
}

// -----------------------------------------------------------------------------
// Cette fonction ajoute une invitation sur la carte "Invitations lancées" de la 
// page de profil SANS sous-menu PopUp pour les éventuelles annulations
// car je suis sur le profil de mon AMi
// -----------------------------------------------------------------------------
InvitationsCard.prototype.addInvitSentIntoCardWithoutDropDown = function(pMyInvitSent){
	var vlineHTML = {};									
	var vInvitSentLocal = 
	{
		friendEmail  	: pMyInvitSent.friendEmail,
		friendPseudo 	: pMyInvitSent.friendPseudo,
		friendPhoto 	: pMyInvitSent.friendPhoto,
	}

	vULSent = document.getElementById('idInvitSentUL'+vActiveProfile);

	this.memberClient.vMyInvitSentList.push(vInvitSentLocal);
	var index = (this.memberClient.vMyInvitSentList.length-1);

	vlineHTML.vLi = window.document.createElement('li');
	vULSent.appendChild(vlineHTML.vLi);
	vlineHTML.vLi.setAttribute('id', 'idMyInvitSentLi'+vActiveProfile+index);
	vlineHTML.vLi.setAttribute('class', 'container friendList m-0 py-0');
	
	vlineHTML.vDivRowCancelInvit = window.document.createElement('div');
	vlineHTML.vLi.appendChild(vlineHTML.vDivRowCancelInvit);
	vlineHTML.vDivRowCancelInvit.setAttribute('class', 'row');
	vlineHTML.vDivRowCancelInvit.setAttribute('style', 'cursor: default;');

	vlineHTML.vDivAvatar = window.document.createElement('div');
	vlineHTML.vDivRowCancelInvit.appendChild(vlineHTML.vDivAvatar);
	vlineHTML.vDivAvatar.setAttribute('class', 'containerAvatarToken ml-1 py-0 text-center align-self-center');

	vlineHTML.vImg = window.document.createElement('img');
	vlineHTML.vDivAvatar.appendChild(vlineHTML.vImg);
	vlineHTML.vImg.setAttribute('class', 'avatarToken tokenSize50');
	vlineHTML.vImg.setAttribute('alt', 'Ami');
	vlineHTML.vImg.setAttribute('src', 'static/images/members/'+pMyInvitSent.friendPhoto);
	vlineHTML.vImg.setAttribute('data-toggle', 'tooltip');
	vlineHTML.vImg.setAttribute('data-placement', 'top');
	vlineHTML.vImg.setAttribute('data-title', pMyInvitSent.friendPseudo);

	// Ajoute la déclaration d'évenements à chaque PopOver, ToolTip DropDown
	vToolBox.InitPopOverAndToolTipAndDropDown();
}

// -----------------------------------------------------------------------------
// Cette fonction ajoute une invitation sur la carte "Invitations lancées" de la 
// page de profil et prépare son sous-menu PopUp pour les éventuelles annulations
// MAIS UNIQUEMENT si je suis sur le profil principal
// -----------------------------------------------------------------------------
InvitationsCard.prototype.addInvitSentIntoCard = function(pMyInvitSent){
	if(vActiveProfile === cstMainProfileActive){
		this.addInvitSentIntoCardWithDropDown(pMyInvitSent)
	} else {
		this.addInvitSentIntoCardWithoutDropDown(pMyInvitSent)
	}
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
InvitationsCard.prototype.removeInvitSentFromMyInvitSentList = function(pInvitToDelete){
	// Tant que j'ai une opération d'annulation d'invitation encours, je neutralise tous les autres avatars pour ne pas lancer plusieurs annulations simultanement

	this.memberClient.vMyInvitSentList.forEach((item, index) => {
		if (index !== pInvitToDelete.indexInvitToDelete){
			document.getElementById('idAnchorCancelInvit'+vActiveProfile+index).classList.add('disabled')
		}
	})

	this.displayNotifInvitCanceled(pInvitToDelete);			// Affiche la notification de suppression d'invitation avant la fermeture du PopUp Menu
}

// --------------------------------------------------------------
// Affichage d'une Notification de suppression d'invitation envoyée
// --------------------------------------------------------------
InvitationsCard.prototype.displayNotifInvitCanceled = function(pInvitToDelete){
	var idImg = 'idImgCancelInvit'+vActiveProfile + pInvitToDelete.indexInvitToDelete;
	$('#'+idImg).popover('show');

	setTimeout(function(){
		$('#'+idImg).popover('hide')
	},cstDelayClosingPopover);     																	// Fermeture temporisée de la PopOver

	setTimeout(() => {
		this.refreshMyInvitList(pInvitToDelete)
	},cstDelayClosingPopover+500);																	// Supprime l'Avatar et ferme la PopUp après un délai de quelques secondes
};

// -----------------------------------------------------------------------------
// Suppression d'une Invitation
// - 1) Suppression de l'invitation du tableau de mes invitations
// - 2) Suppression de l'avatar et de tous ses sous-elements (Popup-Menu, Lignes de reco, etc...) de mon invitation de ma liste d'invitations
// -----------------------------------------------------------------------------
InvitationsCard.prototype.refreshMyInvitList = function(pInvitToDelete){
	this.memberClient.vMyInvitSentList.splice(pInvitToDelete.indexInvitToDelete, 1);   // Efface l'occurence de mon invitation du tableau de mes invitations en attente

	// Je régénère ma liste d'invitations pour recaler les indexes attachés à chaque invitation et utilisés pour les "Id" HTML:
	// Suppression de tous les avatars affichés à partir de l'avatar dont j'ai fait l'annulation
	var vElem = document.getElementById('idMyInvitSentLi'+vActiveProfile+0); 

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

				this.addInvitSentIntoCard(vMyInvitationSent);					// Ajout de l'avatar de l'invitation en cours dans ma carte d'invitations
			});
		} else {
			document.getElementById('idInvitSentCard'+vActiveProfile).style.display = 'none';	// S'il y a des invitations en attente, affiche la carte des invitations en attente
			this.memberClient.vInvitSentCardVisible = false;
		}
	}

	// Réactivation de ligne de menu permettant d'annuler une invitation
	this.memberClient.vMyInvitSentList.forEach((item, index) => {
		document.getElementById('idAnchorCancelInvit'+vActiveProfile+index).classList.remove('disabled')
	})
	vToolBox.clearAllOpenedPopOverAndToolTip();
}