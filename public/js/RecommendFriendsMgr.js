// ************************************************************************
// ***      RecommendFriendsMgr : Objet gérant les recommandations      ***
// ***                                                                  ***
// *** Objet : RecommendFriendsMgr                                      ***
// ***                                                                  ***
// *** Cet objet  :                                                     ***
// ***   - Recherche et affiche les recommandations possibles           ***
// ***   - Exécute les recommandations le cas échéant                   ***
// ***                                                                  ***
// ***  Nécessite :                                                     ***
// ***      Rien                                                        ***
// ***                                                                  ***
// ************************************************************************

function RecommendFriendsMgr(pMemberClient){   						// Fonction constructeur exportée
	this.memberClient = pMemberClient;
};

// *****************************************************************************
// 											Gestion des recommandations
// *****************************************************************************


// --------------------------------------------------------------
// Entête de la liste des recommandations
// --------------------------------------------------------------
RecommendFriendsMgr.prototype.displayHeaderRecommendations= function(pFriend, pDivDropDown){
	var vlineHTML = {};					

	vlineHTML.vHdrARecoFriend = window.document.createElement('a');
	pDivDropDown.appendChild(vlineHTML.vHdrARecoFriend);
	vlineHTML.vHdrARecoFriend.setAttribute('id', 'idHdrAnchorRecoFriend'+pFriend.indexFriendToRecommend);
	vlineHTML.vHdrARecoFriend.setAttribute('href', '#');
	vlineHTML.vHdrARecoFriend.setAttribute('class', 'container list-group-item m-0 py-0');

	vlineHTML.vHdrDivRowRecoFriend = window.document.createElement('div');
	vlineHTML.vHdrARecoFriend.appendChild(vlineHTML.vHdrDivRowRecoFriend);
	vlineHTML.vHdrDivRowRecoFriend.setAttribute('id', 'idHdrDivRowRecoFriend'+pFriend.indexFriendToRecommend);
	vlineHTML.vHdrDivRowRecoFriend.setAttribute('class', 'row bg-success text-light');
	vlineHTML.vHdrDivRowRecoFriend.setAttribute('style', 'cursor: default;');

	if (pFriend.recommendableFriendsList.length > 0){
		vlineHTML.vHdrDivRowRecoFriend.setAttribute('class', 'row bg-success text-light');
	} else {
		vlineHTML.vHdrDivRowRecoFriend.setAttribute('class', 'row bg-primary text-light');
	}

	vlineHTML.vHdrDivAvatarRecoFriend = window.document.createElement('div');
	vlineHTML.vHdrDivRowRecoFriend.appendChild(vlineHTML.vHdrDivAvatarRecoFriend);
	vlineHTML.vHdrDivAvatarRecoFriend.setAttribute('class', 'col-2 containerAvatarToken p-0 text-center withNoScaling');

	vlineHTML.vHdrImgRecoFriend = window.document.createElement('img');
	vlineHTML.vHdrDivAvatarRecoFriend.appendChild(vlineHTML.vHdrImgRecoFriend);
	vlineHTML.vHdrImgRecoFriend.setAttribute('class', 'avatarToken tokenSize32 m-1');
	vlineHTML.vHdrImgRecoFriend.setAttribute('alt', 'Membre');
	vlineHTML.vHdrImgRecoFriend.setAttribute('src', 'static/images/members/'+pFriend.friendPhoto);
	
	vlineHTML.vHdrDivRecoFriend = window.document.createElement('div');
	vlineHTML.vHdrDivRowRecoFriend.appendChild(vlineHTML.vHdrDivRecoFriend);
	vlineHTML.vHdrDivRecoFriend.setAttribute('id', 'idHdrDivRecoFriend'+pFriend.indexFriendToRecommend);
	vlineHTML.vHdrDivRecoFriend.setAttribute('class', 'col-10 align-self-center px-0');
	vlineHTML.vHdrDivRecoFriend.setAttribute('style', 'font-size: 0.9rem; font-weight:bold;');

	if (pFriend.recommendableFriendsList.length > 0){
		vlineHTML.vHdrDivRecoFriend.innerHTML = ' Recommander '+pFriend.friendPseudo+' à :';
	} else {
		vlineHTML.vHdrDivRecoFriend.innerHTML = pFriend.friendPseudo+' n\'a pas d\'ami à qui être recommandé';	
	}
}

// --------------------------------------------------------------
// Cette fonction crée les lignes d'amis à qui on peut recommander 
// l'ami  sélectionné
// --------------------------------------------------------------
function AddTargetFriendsforRecommendLines(pItem, pIndex, pDivContain, pRecommendedFriendPseudo) {
	this.lineHTML = {};					
	this.friend = pItem; 
	this.index = pIndex;

	this.lineHTML.vA = window.document.createElement('a');
	pDivContain.appendChild(this.lineHTML.vA);
	this.lineHTML.vA.setAttribute('id', 'idRecommendAnchor'+pIndex);
	this.lineHTML.vA.setAttribute('href', '#');
	this.lineHTML.vA.setAttribute('class', 'container zonedLines border list-group-item list-group-item-action list-group-item-white');

	this.lineHTML.vDivRow = window.document.createElement('div');
	this.lineHTML.vA.appendChild(this.lineHTML.vDivRow);
	this.lineHTML.vDivRow.setAttribute('class', 'row');
	this.lineHTML.vDivRow.setAttribute('style', 'cursor: default;');

	this.lineHTML.vDivAvatar = window.document.createElement('div');
	this.lineHTML.vDivRow.appendChild(this.lineHTML.vDivAvatar);
	this.lineHTML.vDivAvatar.setAttribute('class', 'col-3 containerAvatarToken p-0 text-center withNoScaling');

	this.lineHTML.vImg = window.document.createElement('img');
	this.lineHTML.vDivAvatar.appendChild(this.lineHTML.vImg);
	this.lineHTML.vImg.setAttribute('id', 'idRecommendImg'+pIndex);
	this.lineHTML.vImg.setAttribute('class', 'avatarToken tokenSize32 m-1');
	this.lineHTML.vImg.setAttribute('alt', 'Amis à qui je peux recommander un ami');
	this.lineHTML.vImg.setAttribute('src', 'static/images/members/'+pItem.friendPhoto);
	this.lineHTML.vImg.setAttribute('data-toggle', 'popover');
	this.lineHTML.vImg.setAttribute('data-placement', 'right');
	this.lineHTML.vImg.setAttribute('title', 'Recommandation envoyée');
	this.lineHTML.vImg.setAttribute('data-content', 'Vous avez recommandé '+pRecommendedFriendPseudo+' à '+pItem.friendPseudo);
	this.lineHTML.vImg.setAttribute('data-boundary', 'viewport');

	this.lineHTML.vDivPseudo = window.document.createElement('div');
	this.lineHTML.vDivRow.appendChild(this.lineHTML.vDivPseudo);
	this.lineHTML.vDivPseudo.setAttribute('class', 'col-6 align-self-center px-0');
	this.lineHTML.vDivPseudo.setAttribute('style', 'font-size: 0.8rem;');
	this.lineHTML.vDivPseudo.innerHTML = pItem.friendPseudo;

	this.lineHTML.vDivFA = window.document.createElement('div');
	this.lineHTML.vDivRow.appendChild(this.lineHTML.vDivFA);
	this.lineHTML.vDivFA.setAttribute('class', 'col-3 text-center align-self-center px-0');

	this.lineHTML.vBtn = window.document.createElement('button');
	this.lineHTML.vDivFA.appendChild(this.lineHTML.vBtn);
	this.lineHTML.vBtn.setAttribute('type', 'button');
	this.lineHTML.vBtn.setAttribute('class', 'btn btn-outline-success btn-sm');

	this.lineHTML.vIFA = window.document.createElement('i');
	this.lineHTML.vBtn.appendChild(this.lineHTML.vIFA);
	this.lineHTML.vIFA.setAttribute('id', 'idIFAFriendTorecommend'+pIndex);
	this.lineHTML.vIFA.setAttribute('class', 'fa fa-user-plus text-dark');
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
RecommendFriendsMgr.prototype.displayRecommendationLines = function(pRecommendableFriends, pDivContain){
	var vTargetFriendForRecommend = [];

	pRecommendableFriends.recommendableFriendsList.forEach((item, index) => {
		// Ajoute les éléments d'une ligne vide dans le tableau des éléments
		vTargetFriendForRecommend.push(new AddTargetFriendsforRecommendLines(item, index, pDivContain, pRecommendableFriends.friendPseudo));	

		var vDataToTransmit = {
			memberClient						: this.memberClient,
			friendEmail 						: pRecommendableFriends.friendEmail,
			friendPseudo 						: pRecommendableFriends.friendPseudo,
			friendPhoto 						: pRecommendableFriends.friendPhoto,
			friendFirstName					: pRecommendableFriends.friendFirstName,
			friendName 							: pRecommendableFriends.friendName,
			friendsOfMyFriend				: pRecommendableFriends.friendsOfMyFriend,
			indexFriendToRecommend	: pRecommendableFriends.indexFriendToRecommend,
			indexTargetFriend				: index,
			dataToTransmit  				: vTargetFriendForRecommend[index],
      actionBtn								: vTargetFriendForRecommend[index].lineHTML.vIFA.id,
      thisContext             : this,
		}

		vTargetFriendForRecommend[index].lineHTML.vBtn.addEventListener('click', this.sendRecommendation,false);
		vTargetFriendForRecommend[index].lineHTML.vBtn.datas = vDataToTransmit;
		vTargetFriendForRecommend[index].lineHTML.vIFA.datas = vDataToTransmit;

		vTargetFriendForRecommend[index].lineHTML.vBtn.addEventListener('mouseover', vMemberClient.changeBtnTxtColOver,false);
		vTargetFriendForRecommend[index].lineHTML.vBtn.datas = vDataToTransmit;

		vTargetFriendForRecommend[index].lineHTML.vBtn.addEventListener('mouseout', vMemberClient.changeBtnTxtColOut,false);
		vTargetFriendForRecommend[index].lineHTML.vBtn.datas = vDataToTransmit;
	});

	// Affichage de la PopUp dès qu'elle est entièrement constituée (pour éviter l'effat "Affichage en 2 steps")
	document.getElementById('idMyDropDown'+vActiveProfile+pRecommendableFriends.indexFriendToRecommend).style.visibility = 'visible';
};

// --------------------------------------------------------------
// Envoi d'une recommandation d'un ami(A) à un autre ami(B) pour 
// qu'ils deviennent amis (Une seule demande par ami):
// Bascule la couleur de l'icône "Ajout d'amis"
// Si le receveur est connecté, son nombre d'invitations evoluera en temps réel
// --------------------------------------------------------------
RecommendFriendsMgr.prototype.sendRecommendation = function(event){
	// Bascule Look des boutons et de leur texte, puis désactive les boutons 
	event.target.datas.dataToTransmit.lineHTML.vBtn.classList.replace('btn-outline-success','btn-success'); 
	event.target.datas.dataToTransmit.lineHTML.vIFA.classList.replace('text-dark','text-light'); 
	event.target.datas.dataToTransmit.lineHTML.vBtn.classList.add('active'); 
	event.target.datas.dataToTransmit.lineHTML.vBtn.classList.add('disabled'); 

	// Neutralise les events et force le curseur en mode par défaut pour ne pas réactiver des lignes de recommandation deja utilisées
	event.target.datas.dataToTransmit.lineHTML.vA.classList.add('neutralPointer'); 

	// Suppression des Listeners
	event.target.datas.dataToTransmit.lineHTML.vBtn.removeEventListener('click', event.target.datas.thisContext.sendRecommendation,false);
	event.target.datas.dataToTransmit.lineHTML.vBtn.removeEventListener('mouseover', event.target.datas.thisContext.memberClient.changeBtnTxtColOver,false);
	event.target.datas.dataToTransmit.lineHTML.vBtn.removeEventListener('mouseout', event.target.datas.thisContext.memberClient.changeBtnTxtColOut,false);

	var vFriendToAdd = {
		myEmail 						:	event.target.datas.memberClient.member.email,
		myPseudo						:	event.target.datas.memberClient.member.pseudo,										    // C'est moi qui recommande l'ami 'FriendPseudo'
		myPhoto							:	event.target.datas.memberClient.member.etatCivil.photo,
		friendEmail 			 	: event.target.datas.friendEmail,
		friendPseudo 				: event.target.datas.friendPseudo,							// Ami recommandé par moi
		friendPhoto  				: event.target.datas.friendPhoto,
		targetFriendEmail  	: event.target.datas.dataToTransmit.friend.friendEmail,
		targetFriendPseudo	: event.target.datas.dataToTransmit.friend.friendPseudo,		// Ami à qui je recommande un ami (La cible)
		targetFriendPhoto  	: event.target.datas.dataToTransmit.friend.friendPhoto,
		indexFriendToRecommend	: event.target.datas.indexFriendToRecommend,
		indexTargetFriend 			: event.target.datas.indexTargetFriend,
	}

	webSocketConnection.emit('recommendationSent', vFriendToAdd);  
}

// -----------------------------------------------------------------------------
// Cette fonction va demander au serveur de lui fournir une liste d'amis à qui 
// je peux recommander mon ami
// 
// La recommandation ne peut fonctionner qu'à partir du moment où on a au moins 2 amis
// En effet, pour recommander un ami "A" à un ami "B", il faut au minimum 2 amis.
// 
// lorsqu'on a cliqué sur l'avatar d'un ami :
// On affiche tous mes autres amis sauf :
// - L'ami vers qui je vais envoyer les recommandations
// - ceux qui n'ont pas déjà une recommandation par moi-même en cours
// -----------------------------------------------------------------------------
RecommendFriendsMgr.prototype.searchFriendsNotAlreadyInvitWithTargetFriend = function(pMember, pIndex){
	vRecommendFriendsList = {
		friendEmail 						: pMember.vMyFriendList[pIndex].friendEmail,
		friendPseudo 						: pMember.vMyFriendList[pIndex].friendPseudo,
		friendPhoto 						: pMember.vMyFriendList[pIndex].friendPhoto,
		myFriendList 						: pMember.vMyFriendList,
		indexFriendToRecommend 	: pIndex,
	}

	// Demande au serveur de vérifier si MES amis ne sont pas déjà dans un processus d'invitation avec l'Ami-cible (celui à qui on veut recommander des amis)
	webSocketConnection.emit('searchFriendsNotAlreadyInvitWithTargetFriend', vRecommendFriendsList);   		
}

// --------------------------------------------------------------
// Affichage d'une Notification de recommandation envoyée par 
// le serveur après les MAJ réussies de la BDD et l'envoi du mail
// --------------------------------------------------------------
RecommendFriendsMgr.prototype.displayNotifRecommendationSent = function(pFriendToAdd){   
	var vImgTarget = '#'+'idRecommendImg'+pFriendToAdd.indexTargetFriend;

	// Je créée les 3 variables ci-dessous pour figer leur valeur, et eviter qu'une ligne ne soit effacée sur la liste des amis-cibles, si l'utilisateur change d'ami à recommander avant que le processus de notification PopOver + Suppression de ligne ne soit terminée (et supprime donc une ligne sur le mauvais DropDown Menu)
	var vElem = document.getElementById('idRecommendAnchor'+pFriendToAdd.indexTargetFriend);
	var vIndexFriendToRecommend = pFriendToAdd.indexFriendToRecommend;
	var vFriendPseudo = pFriendToAdd.friendPseudo;

	$(vImgTarget).popover('show');																		// Affiche la notification d'envoi de la recommandation d'ami

	setTimeout(function(){
		$(vImgTarget).popover('hide');
	},cstDelayClosingPopover);																				// Ferme la notif après un délai de quelques secondes

	setTimeout(() => {
		this.deleteLineRecommendationSent(vElem, vIndexFriendToRecommend, vFriendPseudo)
	},cstDelayClosingPopover + 500);																	// Supprime la ligne après un délai après la fermeture de la PopOver
};

// --------------------------------------------------------------
// Supprime la ligne à partir de laquelle on a envoyé une recommandation
// S'il n'y a plus de lignes, je ferme la DropDownMenu
// --------------------------------------------------------------
RecommendFriendsMgr.prototype.deleteLineRecommendationSent = function(pElem, pIndexFriendToRecommend, pFriendPseudo){
	if (pElem){
		var vParentNode = pElem.parentNode;
		vParentNode.removeChild(pElem);

		if (!vParentNode.firstChild) {										// S'il n'y a plus de lignes de recommandation alors
		// $('#'+pDropDownMenuId).dropdown('toggle');     // Fermeture du DropDownMenu (Gardé pour Historique)

			// Chgt de la couleur du fond du titre de la liste des amis-target en jaune
			document.getElementById('idHdrDivRowRecoFriend'+pIndexFriendToRecommend).classList.replace('bg-success','bg-primary');  

			// Changement du titre de la liste des amis-target
			var vTitleListFriendsToRecommend = document.getElementById('idHdrDivRecoFriend'+pIndexFriendToRecommend);
			var vOldInnerHTML = vTitleListFriendsToRecommend.innerHTML.split(" Recommander")
			vTitleListFriendsToRecommend.innerHTML = vOldInnerHTML[0] + ' '+ pFriendPseudo +' n\'a plus d\'ami à qui être recommandé';
		}
	}
}

// -----------------------------------------------------------------------------
// Suppression de tous les éléments de la liste des amis recommandables
// à la fermeture du sous-menu
// -----------------------------------------------------------------------------
RecommendFriendsMgr.prototype.removeLinesOfDropDownMenu = function(pDivDropDown){
	vToolBox.clearAllOpenedPopOverAndToolTip();

	while (pDivDropDown.firstChild) {
		pDivDropDown.removeChild(pDivDropDown.firstChild);
	}
}
