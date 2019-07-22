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
	vlineHTML.vDivCardBorder.setAttribute('style', 'display: none;');


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

	vlineHTML.vDivCancelInvit = window.document.createElement('div');
	vlineHTML.vDivRowCancelInvit.appendChild(vlineHTML.vDivCancelInvit);
	vlineHTML.vDivCancelInvit.setAttribute('class', 'col-7 align-self-center px-0');
// XXXXX
// vlineHTML.vDivCancelInvit.setAttribute('style', 'font-size: 0.9rem; font-weight:bold;');
	vlineHTML.vDivCancelInvit.setAttribute('style', 'font-size: 0.9rem;');
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
	vlineHTML.vImg .setAttribute('id', 'idImgInvitAvatar'+vActiveProfile+index);
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
	vlineHTML.vBtnCancelInvit.addEventListener('click', this.askConfirmDeleteInvit.bind(this));						// Suppression d'une invitation
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
	vlineHTML.vImg .setAttribute('id', 'idImgInvitAvatar'+vActiveProfile+index);
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

// -----------------------------------------------------------------------------
// Modale de confirmation de Suppression d'une invitation
// -----------------------------------------------------------------------------
InvitationsCard.prototype.displayModalConfirmDeleteInvit = function(pMyEventDatas){
	var vLineHTML = {};		
	var vWorkingSpace = document.getElementById('idWorkingSpace');

	// <div id="idModalConfirm" class="modal px-0" data-keyboard="false" data-focus="true" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="idAriaModalConfirm" aria-hidden="true" style="z-index: 1060;">
	vLineHTML.vDivModalConfirmDeleteInvit = window.document.createElement('div');
	vWorkingSpace.appendChild(vLineHTML.vDivModalConfirmDeleteInvit);
	vLineHTML.vDivModalConfirmDeleteInvit.setAttribute('id', 'idModalConfirmDeleteInvit');
	vLineHTML.vDivModalConfirmDeleteInvit.setAttribute('class', 'modal px-0');
	vLineHTML.vDivModalConfirmDeleteInvit.setAttribute('data-keyboard', 'false');
	vLineHTML.vDivModalConfirmDeleteInvit.setAttribute('data-focus', 'true');
	vLineHTML.vDivModalConfirmDeleteInvit.setAttribute('tabindex', '-1');
	vLineHTML.vDivModalConfirmDeleteInvit.setAttribute('role', 'dialog');
	vLineHTML.vDivModalConfirmDeleteInvit.setAttribute('data-backdrop', 'static');
	vLineHTML.vDivModalConfirmDeleteInvit.setAttribute('aria-labelledby', 'idAriaModalConfirmDeleteInvit');
	vLineHTML.vDivModalConfirmDeleteInvit.setAttribute('aria-hidden', 'true');
	vLineHTML.vDivModalConfirmDeleteInvit.setAttribute('style', 'z-index: 1060;');

	// <div class="modal-dialog modal-dialog-centered" role="document">
	vLineHTML.vDivModalDialogConfirmDeleteInvit = window.document.createElement('div');
	vLineHTML.vDivModalConfirmDeleteInvit.appendChild(vLineHTML.vDivModalDialogConfirmDeleteInvit);
	vLineHTML.vDivModalDialogConfirmDeleteInvit.setAttribute('class', 'modal-dialog modal-dialog-centered');
	vLineHTML.vDivModalDialogConfirmDeleteInvit.setAttribute('role', 'document');
	
	// <div class="modal-content">
	vLineHTML.vDivModalContentConfirmDeleteInvit = window.document.createElement('div');
	vLineHTML.vDivModalDialogConfirmDeleteInvit.appendChild(vLineHTML.vDivModalContentConfirmDeleteInvit);
	vLineHTML.vDivModalContentConfirmDeleteInvit.setAttribute('class', 'modal-content');

	// <div id="idModalConfirmHeader" class="modal-header border-bottom bg-warning text-dark">
	vLineHTML.vModalConfirmDeleteInvitHeader = window.document.createElement('div');
	vLineHTML.vDivModalContentConfirmDeleteInvit.appendChild(vLineHTML.vModalConfirmDeleteInvitHeader);
	vLineHTML.vModalConfirmDeleteInvitHeader.setAttribute('class', 'modal-header border-bottom bg-warning text-dark');

	// <h5 id="idModalConfirmTitle" class="modal-title">
	vLineHTML.vH5ModalHeaderConfirmDeleteInvit = window.document.createElement('h5');
	vLineHTML.vModalConfirmDeleteInvitHeader.appendChild(vLineHTML.vH5ModalHeaderConfirmDeleteInvit);
	vLineHTML.vH5ModalHeaderConfirmDeleteInvit.setAttribute('class', 'modal-title');
	
	// <i class="fa fa-question-circle"></i>
	vLineHTML.vIModalHeaderConfirmDeleteInvit = window.document.createElement('i');
	vLineHTML.vH5ModalHeaderConfirmDeleteInvit.appendChild(vLineHTML.vIModalHeaderConfirmDeleteInvit);
	vLineHTML.vIModalHeaderConfirmDeleteInvit.setAttribute('class', 'fa fa-question-circle');
	vLineHTML.vH5ModalHeaderConfirmDeleteInvit.innerHTML += ' Confirmation';
	
	// <div class="modal-body">
	vLineHTML.vDivModalBodyConfirmDeleteInvit = window.document.createElement('div');
	vLineHTML.vDivModalContentConfirmDeleteInvit.appendChild(vLineHTML.vDivModalBodyConfirmDeleteInvit);
	vLineHTML.vDivModalBodyConfirmDeleteInvit.setAttribute('class', 'modal-body');
	
	// <form id="idModalConfirmForm" class="mb-4 mx-auto d-block">
	vLineHTML.vFormModalBodyConfirmDeleteInvit = window.document.createElement('form');
	vLineHTML.vDivModalBodyConfirmDeleteInvit.appendChild(vLineHTML.vFormModalBodyConfirmDeleteInvit);
	vLineHTML.vFormModalBodyConfirmDeleteInvit.setAttribute('id', 'idModalConfirmDeleteInvitForm');
	vLineHTML.vFormModalBodyConfirmDeleteInvit.setAttribute('class', 'mb-4 mx-auto d-block');

	// <img src="static/images/favicon.png" class="mb-4 mx-auto d-block" alt="Logo du site \'Collect\'Or" width="auto" height="72px">
	vLineHTML.vImgModalBodyConfirmDeleteInvit = window.document.createElement('img');
	vLineHTML.vDivModalBodyConfirmDeleteInvit.appendChild(vLineHTML.vImgModalBodyConfirmDeleteInvit);
	vLineHTML.vImgModalBodyConfirmDeleteInvit.setAttribute('src', 'static/images/favicon.png');
	vLineHTML.vImgModalBodyConfirmDeleteInvit.setAttribute('class', 'mb-4 mx-auto d-block');
	vLineHTML.vImgModalBodyConfirmDeleteInvit.setAttribute('alt', 'Logo du site \'Collect\'Or');
	vLineHTML.vImgModalBodyConfirmDeleteInvit.setAttribute('width', 'auto');
	vLineHTML.vImgModalBodyConfirmDeleteInvit.setAttribute('height', '72px');

	// <div id="idModalConfirmSubTitleAndText" class="mb-3 font-weight-normal text-center">
	vLineHTML.vH3ModalBodyConfirmDeleteInvit = window.document.createElement('div');
	vLineHTML.vDivModalBodyConfirmDeleteInvit.appendChild(vLineHTML.vH3ModalBodyConfirmDeleteInvit);
	vLineHTML.vH3ModalBodyConfirmDeleteInvit.setAttribute('class', 'mb-3 font-weight-normal text-center');
	vLineHTML.vH3ModalBodyConfirmDeleteInvit.innerHTML = 	'<h5>Vous allez supprimer une invitation</h5><br />'+ 
																												'<p>Êtes-sûr de vouloir supprimer l\'invitation que vous avez faite à '+pMyEventDatas.friendPseudo+' ?</p>';

	// <div class="modal-footer">
	vLineHTML.vDivModalFooterConfirmDeleteInvit = window.document.createElement('div');
	vLineHTML.vDivModalContentConfirmDeleteInvit.appendChild(vLineHTML.vDivModalFooterConfirmDeleteInvit);
	vLineHTML.vDivModalFooterConfirmDeleteInvit.setAttribute('class', 'modal-footer');

	// <button id="idModalConfirmBtnRefuse" class="btn-danger">Refuser</button>
	vLineHTML.vBtnRefuseConfirmDeleteInvit = window.document.createElement('button');
	vLineHTML.vDivModalFooterConfirmDeleteInvit.appendChild(vLineHTML.vBtnRefuseConfirmDeleteInvit);
	vLineHTML.vBtnRefuseConfirmDeleteInvit.setAttribute('id', 'idBtnRefuseConfirmDeleteInvit');
	vLineHTML.vBtnRefuseConfirmDeleteInvit.setAttribute('class', 'btn btn-danger');
	vLineHTML.vBtnRefuseConfirmDeleteInvit.innerHTML = 'Refuser';

	// <button id="idModalConfirmBtnAccept" class="btn-success">Confirmer</button>
	vLineHTML.vBtnAcceptConfirmDeleteInvit = window.document.createElement('button');
	vLineHTML.vDivModalFooterConfirmDeleteInvit.appendChild(vLineHTML.vBtnAcceptConfirmDeleteInvit);
	vLineHTML.vBtnAcceptConfirmDeleteInvit.setAttribute('id', 'idBtnAcceptConfirmDeleteInvit');
	vLineHTML.vBtnAcceptConfirmDeleteInvit.setAttribute('class', 'btn btn-success');
	vLineHTML.vBtnAcceptConfirmDeleteInvit.innerHTML = 'Accepter';

	vLineHTML.vBtnRefuseConfirmDeleteInvit.addEventListener('click', this.refuseDeleteInvit.bind(this),false);
	vLineHTML.vBtnAcceptConfirmDeleteInvit.addEventListener('click', this.acceptDeleteInvit.bind(this),false);
	vLineHTML.vBtnAcceptConfirmDeleteInvit.datas = pMyEventDatas;
}

// -----------------------------------------------------------------------------
// Refus de la Suppression d'une invitation
// -----------------------------------------------------------------------------
InvitationsCard.prototype.refuseDeleteInvit = function(event){
	this.destroyConfirmDeleteInvit();
}

// -----------------------------------------------------------------------------
// Suppression d'une invitation
// - Dans la base de donnée
// - Suppression des avatars mutuels dans la liste des amis
// - Fermeture définitive de la PopUp Menu
// -----------------------------------------------------------------------------
InvitationsCard.prototype.acceptDeleteInvit = function(event){
	this.destroyConfirmDeleteInvit();

	var vInvitSentToDelete = {
		myPseudo 			: event.target.datas.myPseudo,
		myEmail 			: event.target.datas.myEmail,
		friendPseudo 	: event.target.datas.friendPseudo,
		friendEmail 	: event.target.datas.friendEmail,
	}
	webSocketConnection.emit('cancelInvitation',vInvitSentToDelete)
}
// -----------------------------------------------------------------------------
// Ouvre la modale de confirmation de Suppression d'une invitation
// -----------------------------------------------------------------------------
InvitationsCard.prototype.askConfirmDeleteInvit = function(event){
	var myEventDatas = event.target.datas;

	this.displayModalConfirmDeleteInvit(myEventDatas);
	$('#idModalConfirmDeleteInvit').modal('show');      // Ouverture de la modale    
}

// -----------------------------------------------------------------------------
// Suppression d'une de mes invitations en attente (car acceptée ou refusée)
// - Suppression de mon invitation envoyée du tableau de mes invitations lancées
// - Suppression de l'avatar à qui j'avais fait l'invitation et de tous ses 
// sous-elements (Popup-Menu, Lignes de reco, etc...) de ma liste d'invitations en attente
// Si plus d'invitation en attente, fermeture de la carte des invitations en attente
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
	vToolBox.clearAllOpenedPopOverAndToolTip();
}

// --------------------------------------------------------------
// Ferme la modale de confirmation et la 
// détruit dans le DOM
// --------------------------------------------------------------
InvitationsCard.prototype.destroyConfirmDeleteInvit = function(){
	var vModalConfirmDeleteInvit = 'idModalConfirmDeleteInvit';
	$('#'+vModalConfirmDeleteInvit).modal('hide');     // Fermeture de la modale                                     

	var elem = document.getElementById(vModalConfirmDeleteInvit);
	if (elem){
		elem.parentNode.removeChild(elem);
	}
}
