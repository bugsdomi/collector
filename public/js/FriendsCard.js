// ************************************************************************
// ***      FriendsCard  : Affichage de la "Carte des amis"             ***
// ***                                                                  ***
// *** Objet : FriendsCard                                              ***
// ***                                                                  ***
// *** Cet objet sert à gérer toutes les fonctions liées aux amis       ***
// ***  - L'affichage intelligent (eventuellement filtré) des membres   ***
// ***  - L'affichage des amis                                          ***
// ***  - La possibilité de visiter                                     ***
// ***  - La possibilité de les supprimer                               ***
// ***                                                                  ***
// ***  Nécessite :                                                     ***
// ***      Rien                                                        ***
// ***                                                                  ***
// ************************************************************************

function FriendsCard (pMemberClient){                              // Fonction constructeur exportée
  this.memberClient = pMemberClient;
};   						

// -----------------------------------------------------------------------------
// Gestion de la liste des amis
// Filtrage des amis
// -----------------------------------------------------------------------------
FriendsCard.prototype.filterFriends = function(pFilteredFriends){
	this.memberClient.vMyFriendList.forEach((item, index) => {
		if (item.friendPseudo.toUpperCase().startsWith(pFilteredFriends)){
			document.getElementById('idMyFriendLi'+index).classList.remove('d-none');
		} else {
			document.getElementById('idMyFriendLi'+index).classList.add('d-none');
		}
	});
}

// -----------------------------------------------------------------------------
// Cette fonction affiche la carte "Mes Amis" sur ma page de profil
// -----------------------------------------------------------------------------
FriendsCard.prototype.displayFriendsCard = function(pFriendInfo){
	var vMyFriend = 
	{
		friendEmail  			: null,
		friendPseudo 			: null,
		friendPhoto 			: null,
	}

	this.memberClient.member.amis.forEach((item) => {																					// Pour chacun de mes amis en BDD
		if (item.pendingFriendRequest === cstAmiConfirme){													// Si la personne est un ami confirmé, je l'ajoute à ma liste
			vMyFriend.friendEmail 			= item.friendEmail;
			vMyFriend.friendPseudo 			= item.friendPseudo;
			vMyFriend.friendPhoto 			= item.friendPhoto;

			this.addFriendIntoCard(vMyFriend, pFriendInfo);
		}
	});
};

// -----------------------------------------------------------------------------
// Cette fonction ajoute un Ami sur la carte "Amis" de la page de profil 
// et prépare son sous-menu PopUp pour les recommandations d'amis
// -----------------------------------------------------------------------------
FriendsCard.prototype.addFriendIntoCard = function(pMyFriend, pFriendInfo){

	var vFriendLocal = 
	{
		friendEmail  			: pMyFriend.friendEmail,
		friendPseudo 			: pMyFriend.friendPseudo,
		friendPhoto 			: pMyFriend.friendPhoto,
	}

	this.memberClient.vMyFriendList.push(vFriendLocal);
	var index = (this.memberClient.vMyFriendList.length-1);

	var vlineHTML = {};						// Structure HTML générée pour chaque ligne de membre
	
	vlineHTML.vLi = window.document.createElement('li');
	pFriendInfo.vFriendUL.appendChild(vlineHTML.vLi);
	vlineHTML.vLi.setAttribute('id', 'idMyFriendLi'+index);
	vlineHTML.vLi.setAttribute('class', 'dropdown dropright friendList withScaling');

	vlineHTML.vA = window.document.createElement('a');
	vlineHTML.vLi.appendChild(vlineHTML.vA);
	vlineHTML.vA.setAttribute('href', '#');
	vlineHTML.vA.setAttribute('class', 'btn-sm dropdown-toggle dropdown-toggle-split px-0');
	vlineHTML.vA.setAttribute('style', 'color: white;');
	vlineHTML.vA.setAttribute('data-toggle', 'dropdown');

	vlineHTML.vDivDropDown = window.document.createElement('div');
	vlineHTML.vA.appendChild(vlineHTML.vDivDropDown);
	vlineHTML.vDivDropDown.setAttribute('id', 'idMyDropDown'+index);
	vlineHTML.vDivDropDown.setAttribute('class', 'dropdown-menu py-0');

	// Z-Index pour ne pas cacher la partie basse de la Micro-fiche avec la barre de bas d'écran
	// vlineHTML.vDivDropDown.setAttribute('style', 'width: 350px; border: 1px solid black; visibility: hidden; z-index: 1035;'); 
	vlineHTML.vDivDropDown.setAttribute('style', 'width: 350px; border: 1px solid black; visibility: hidden;'); 
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
	vlineHTML.vImg.setAttribute('class', 'avatarToken tokenSize50');
	vlineHTML.vImg.setAttribute('alt', 'Ami');
	vlineHTML.vImg.setAttribute('src', 'static/images/members/'+pMyFriend.friendPhoto);
	vlineHTML.vImg.setAttribute('data-toggle', 'tooltip');
	vlineHTML.vImg.setAttribute('data-placement', 'top');
	vlineHTML.vImg.setAttribute('data-title', pMyFriend.friendPseudo);

	// Pour empêcher la fermeture de DropDownMenu lorsque l'on clique quelque part dedans (Comportement par défaut)
	$('#'+vlineHTML.vDivDropDown.id).on("click.bs.dropdown", (event) => { 
		event.stopPropagation(); 
		event.preventDefault(); 
	});

	// A l'ouverture du DropDownMenu, on créée dynamiquement tous ses sous-éléments (les amis-cibles des recommandations)dans le DOM
	$('#'+vlineHTML.vLi.id).on('shown.bs.dropdown', () => {
		vRecommendFriendsMgr.searchFriendsNotAlreadyInvitWithTargetFriend(index);
	});
	
	// A la fermeture du DropDownMenu, on detruit tous ses sous-éléments dans le DOM
	$('#'+vlineHTML.vLi.id).on('hidden.bs.dropdown', () => {
		vlineHTML.vDivDropDown.style.visibility = 'hidden';			// Pour cacher la PopUp et eviter d'avoir l'affichage en 2 steps (cadre plat, puis contenu) à la réouverture
		vRecommendFriendsMgr.removeLinesOfDropDownMenu(vlineHTML.vDivDropDown);
	});

	// Ajoute la déclaration d'évenements à chaque PopOver, ToolTip DropDown
	vToolBox.InitPopOverAndToolTipAndDropDown();
};
