// ------------------------------------------------------------------------
// ---      FriendsCard  : Affichage de la "Carte des amis"             ---
// ---                                                                  ---
// --- Objet : FriendsCard                                              ---
// ---                                                                  ---
// --- Cet objet sert à gérer toutes les fonctions liées aux amis       ---
// ---  - L'affichage intelligent (eventuellement filtré) des membres   ---
// ---  - L'affichage des amis                                          ---
// ---  - La possibilité de visiter                                     ---
// ---  - La possibilité de les supprimer                               ---
// ---                                                                  ---
// ---  Nécessite :                                                     ---
// ---      Rien                                                        ---
// ---                                                                  ---
// ------------------------------------------------------------------------

function FriendsCard (pMemberClient){                              // Fonction constructeur exportée
  this.memberClient = pMemberClient;
};   						

// ------------------------------------------------------------------------------
//                               Création de la Carte "Amis"                     
// ------------------------------------------------------------------------------
FriendsCard.prototype.displayFriendsCard = function(){
	var vlineHTML = {};						

	// Détermination du point de montage, selon que l'on est sur la fiche du membre principal ou celle d'un de ses amis
	if (vActiveProfile === cstMainProfileActive){
		var vDivMountPointProfile = document.getElementById('idDivMountPointMainProfile');
	} else {
		var vDivMountPointProfile = document.getElementById('idDivMountPointFriendProfile');
	}

// <div class="card border-warning mb-4">
	vlineHTML.vDivCardBorder = window.document.createElement('div');
	vDivMountPointProfile.appendChild(vlineHTML.vDivCardBorder);
	vlineHTML.vDivCardBorder.setAttribute('class', 'card border-warning mb-4');

// ------------------------------------------------------------------------------
//                      Entête de la carte "Amis"                        
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

// 				<h5 class="col-2 px-0 my-0 align-self-center">Amis</h5>
	vlineHTML.vH5 = window.document.createElement('h5');
	vlineHTML.vDivRow1.appendChild(vlineHTML.vH5);
	vlineHTML.vH5.setAttribute('class', 'col-2 px-0 my-0 align-self-center');
	vlineHTML.vH5.innerHTML='Amis';

// ------------------------------------------------------------------------------
// Inclusion du champs de filtrage
// ------------------------------------------------------------------------------
	var vFilterParams = 
	{
		mountPoint							: vlineHTML.vDivRow1,
		colWidth								: 'col-10',
		idFilterField						: 'idFilteredFriends',
		placeHolderFilterField	: 'Filtrer les amis',
		idClearBtn							: 'idClearFriendsFilter',
		listToFilter						: this.memberClient.vMyFriendList,
		idLiOfAVatars						: 'idMyFriendLi',
	}
	new SearchFilter().displayFilter(vFilterParams);												

// ------------------------------------------------------------------------------
//                      Corps de la carte "Amis"                         
// ------------------------------------------------------------------------------
// 	<div class="card-body" style="border: 1px black solid;">
	vlineHTML.vDivCardBody = window.document.createElement('div');
	vlineHTML.vDivCardBorder.appendChild(vlineHTML.vDivCardBody);
	vlineHTML.vDivCardBody.setAttribute('class', 'card-body');
	vlineHTML.vDivCardBody.setAttribute('style', 'border: 1px black solid;');

// 		<div class="row">
	vlineHTML.vDivRow2 = window.document.createElement('div');
	vlineHTML.vDivCardBody.appendChild(vlineHTML.vDivRow2);
	vlineHTML.vDivRow2.setAttribute('class', 'row');

// 			<div class="col-md-12 px-0 text-dark">
	vlineHTML.vDivCol2 = window.document.createElement('div');
	vlineHTML.vDivRow2.appendChild(vlineHTML.vDivCol2);
	vlineHTML.vDivCol2.setAttribute('class', 'col-md-12 px-0 text-dark');

// 				<ul id="idFriendUL" class="p-0 m-0" style="list-style: none;">
	vlineHTML.vULFriend = window.document.createElement('ul');
	vlineHTML.vDivCol2.appendChild(vlineHTML.vULFriend);
	vlineHTML.vULFriend.setAttribute('id', 'idFriendUL'+vActiveProfile);
	vlineHTML.vULFriend.setAttribute('class', 'p-0 m-0');
	vlineHTML.vULFriend.setAttribute('style', 'list-style: none;');

	this.fillFriendsCard();
}

// -----------------------------------------------------------------------------
// Cette fonction affiche la carte "Mes Amis" sur ma page de profil
// -----------------------------------------------------------------------------
FriendsCard.prototype.fillFriendsCard = function(){
	var vMyFriend = 
	{
		friendEmail  			: null,
		friendPseudo 			: null,
		friendPhoto 			: null,
	}

	vULFriend = document.getElementById('idFriendUL'+vActiveProfile);

	this.memberClient.member.amis.forEach((item) => {															// Pour chacun de mes amis en BDD
		if (item.pendingFriendRequest === cstAmiConfirme){													// Si la personne est un ami confirmé, je l'ajoute à ma liste
			vMyFriend.friendEmail 	= item.friendEmail;
			vMyFriend.friendPseudo	= item.friendPseudo;
			vMyFriend.friendPhoto 	= item.friendPhoto;

			this.addFriendIntoCard(vMyFriend, vULFriend);
		}
	});
};

// -----------------------------------------------------------------------------
// Cette fonction ajoute un Ami sur la carte "Amis" de la page de profil 
// et prépare son sous-menu PopUp pour les recommandations d'amis
// -----------------------------------------------------------------------------
FriendsCard.prototype.addFriendIntoCard = function(pMyFriend, pULFriend){
	var vFriendLocal = 
	{
		connected			: pMyFriend.connected,
		friendEmail  	: pMyFriend.friendEmail,
		friendPseudo 	: pMyFriend.friendPseudo,
		friendPhoto 	: pMyFriend.friendPhoto,
	}

	this.memberClient.vMyFriendList.push(vFriendLocal);
	var index = (this.memberClient.vMyFriendList.length-1);

	var vlineHTML = {};						
	vlineHTML.vLi = window.document.createElement('li');
	pULFriend.appendChild(vlineHTML.vLi);
	vlineHTML.vLi.setAttribute('id', 'idMyFriendLi'+vActiveProfile+index);
	vlineHTML.vLi.setAttribute('class', 'dropdown dropright friendList withScaling');
	vlineHTML.vLi.setAttribute('style', 'width: 60px; height: 60px');
	
	vlineHTML.vA = window.document.createElement('a');
	vlineHTML.vLi.appendChild(vlineHTML.vA);
	vlineHTML.vA.setAttribute('href', '#');
	vlineHTML.vA.setAttribute('class', 'btn-sm dropdown-toggle dropdown-toggle-split px-0');
	vlineHTML.vA.setAttribute('style', 'color: white;');
	vlineHTML.vA.setAttribute('data-toggle', 'dropdown');

	vlineHTML.vDivDropDown = window.document.createElement('div');
	vlineHTML.vA.appendChild(vlineHTML.vDivDropDown);
	vlineHTML.vDivDropDown.setAttribute('id', 'idMyDropDown'+vActiveProfile+index);
	vlineHTML.vDivDropDown.setAttribute('class', 'dropdown-menu py-0');

	// Z-Index pour ne pas cacher la partie basse de la Micro-fiche avec la barre de bas d'écran
	vlineHTML.vDivDropDown.setAttribute('style', 'width: 350px; border: 1px solid black; visibility: hidden; z-index: 1035;'); 
// 
// 
// <--- Endroit à partir duquel les lignes du menu Popup vont venir s'insérer --->
// 
// 
	vlineHTML.vDivAvatar = window.document.createElement('div');
	vlineHTML.vA.appendChild(vlineHTML.vDivAvatar);
	vlineHTML.vDivAvatar.setAttribute('class', 'containerAvatarToken py-1 text-center align-self-center');

	vlineHTML.vImg = window.document.createElement('img');
	vlineHTML.vDivAvatar.appendChild(vlineHTML.vImg);
	vlineHTML.vImg.setAttribute('id', 'idImgFriendAvatar'+vActiveProfile+index);
	vlineHTML.vImg.setAttribute('class', 'avatarToken tokenSize50');
	vlineHTML.vImg.setAttribute('alt', 'Ami');
	vlineHTML.vImg.setAttribute('src', 'static/images/members/'+pMyFriend.friendPhoto);
	vlineHTML.vImg.setAttribute('data-toggle', 'tooltip');
	vlineHTML.vImg.setAttribute('data-placement', 'top');
	vlineHTML.vImg.setAttribute('data-title', pMyFriend.friendPseudo);

	vlineHTML.vIConnectedStatus = window.document.createElement('span');
	vlineHTML.vDivAvatar.appendChild(vlineHTML.vIConnectedStatus);
	vlineHTML.vIConnectedStatus.setAttribute('id', 'idConnectedLed'+vActiveProfile+index);
// XXXXX
// vlineHTML.vIConnectedStatus.setAttribute('class', 'bg-warning');
	vlineHTML.vIConnectedStatus.setAttribute('style', 'display: inline-block; position: relative; top: -23px; left: 8px; width: 12px; height: 12px; border: 1px black solid; border-radius: 50%;');
	if (pMyFriend.connected){
		vlineHTML.vIConnectedStatus.setAttribute('class', 'bg-success');
	} else {
		vlineHTML.vIConnectedStatus.setAttribute('class', 'bg-warning');
	};

	// Pour empêcher la fermeture de DropDownMenu lorsque l'on clique quelque part dedans (Comportement par défaut)
	$('#'+vlineHTML.vDivDropDown.id).on("click.bs.dropdown", (event) => { 
		event.stopPropagation(); 
		event.preventDefault(); 
	});

	// A l'ouverture du DropDownMenu, on créée dynamiquement tous ses sous-éléments (les amis-cibles des recommandations)dans le DOM
	$('#'+vlineHTML.vLi.id).on('shown.bs.dropdown', () => {
		vRecommendFriendsMgr.searchFriendsNotAlreadyInvitWithTargetFriend(this.memberClient, index);
	});
	
	// A la fermeture du DropDownMenu, on detruit tous ses sous-éléments dans le DOM
	$('#'+vlineHTML.vLi.id).on('hidden.bs.dropdown', () => {
		vlineHTML.vDivDropDown.style.visibility = 'hidden';			// Pour cacher la PopUp et eviter d'avoir l'affichage en 2 steps (cadre plat, puis contenu) à la réouverture
		vRecommendFriendsMgr.removeLinesOfDropDownMenu(vlineHTML.vDivDropDown);
	});

	// Ajoute la déclaration d'évenements à chaque PopOver, ToolTip DropDown
	vToolBox.InitPopOverAndToolTipAndDropDown();
};



// XXXXX
// -----------------------------------------------------------------------------
// Suppression d'un Ami
// - 1) Affichage d'une notification
// - Suppression de mon ex-ami du tableau de mes amis
// - Fermeture définitive de la PopUp Menu
// - Suppression de l'avatar et de tous ses sous-elements (Popup-Menu, Lignes de reco, etc...) de mon ex-ami de ma liste d'amis
// -----------------------------------------------------------------------------
// FriendsCard.prototype.removeFriendFromMyFriendList = function(pFriendToDelete){
// var idImg = 'idHdrImgDelFriend' + pFriendToDelete.indexFriendToDelete;
// $('#'+idImg).popover('show');

// setTimeout(function(){
// 	$('#'+idImg).popover('hide');
// },cstDelayClosingPopover);     																	// Fermeture temporisée de la PopOver

// setTimeout(() => {
// 		this.refreshMyFriendList(pFriendToDelete);
// },cstDelayClosingPopover+500);																	// Supprime l'Avatar et ferme la PopUp après un délai de quelques secondes
// 		this.refreshMyFriendList(pFriendToDelete);
// };

// -----------------------------------------------------------------------------
// Suppression d'un Ami (suite)
// - Apres l'affichage d'une notification
// - 2) Suppression de mon ex-ami du tableau de mes amis
// - 3) Fermeture définitive de la PopUp Menu
// - 4) Suppression de l'avatar et de tous ses sous-elements (Popup-Menu, Lignes de reco, etc...) de mon ex-ami de ma liste d'amis
// -----------------------------------------------------------------------------
// FriendsCard.prototype.refreshMyFriendList = function(pFriendToDelete){


// -----------------------------------------------------------------------------
// Suppression d'un Ami 
// - 1) Suppression de mon ex-ami du tableau de mes amis
// - 2) Fermeture définitive de la PopUp Menu
// - 3) Suppression de l'avatar et de tous ses sous-elements (Popup-Menu, Lignes de reco, etc...) de mon ex-ami de ma liste d'amis
// -----------------------------------------------------------------------------
FriendsCard.prototype.removeFriendFromMyFriendList = function(pFriendToDelete){
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
			vMyFriend.connected 		= item.connected;
			vMyFriend.friendEmail 	= item.friendEmail;
			vMyFriend.friendPseudo	= item.friendPseudo;
			vMyFriend.friendPhoto 	= item.friendPhoto;
			this.addFriendIntoCard(vMyFriend, vULFriend);							// Ajout de l'avatar de l'ami en cours dans ma carte d'amis
		});
	}
	vToolBox.clearAllOpenedPopOverAndToolTip();
}