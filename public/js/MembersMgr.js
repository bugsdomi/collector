// ************************************************************************
// ***      MembersMgr : Gestionnaire des membres                       ***
// ***                                                                  ***
// *** Objet : MembersMgr                                               ***
// ***                                                                  ***
// *** Cet objet sert à gérer toutes les fonctions liées aux membres 	  ***
// *** d'amis:																													***
// ***  - L'affichage intelligent (eventuellement filtré) des membres   ***
// ***    membres)                                          						***
// ***                                                                  ***
// ***  Nécessite :                                                     ***
// ***      Rien                                                        ***
// ***                                                                  ***
// ************************************************************************

function MembersMgr(pMemberClient){                              // Fonction constructeur exportée
  this.memberClient = pMemberClient;
};   						
// --------------------------------------------------------------
// 				Gestion des membres
// --------------------------------------------------------------

// --------------------------------------------------------------
// Cette fonction alimente un objet avec des créations dans le DOM 
// des lignes HTML pour chaque membre créé dans Collect'Or
// --------------------------------------------------------------
function AddMemberListLines(item, index, modalMemberListGroup){
	this.lineHTML = {};						// Structure HTML générée pour chaque ligne de membre

	this.friend = item;
	this.index = index;

	this.lineHTML.vA = window.document.createElement('a');
	modalMemberListGroup.appendChild(this.lineHTML.vA);
	this.lineHTML.vA.setAttribute('id', 'idAddFriendAnchor'+index);
	this.lineHTML.vA.setAttribute('href', '#');
	this.lineHTML.vA.setAttribute('class', 'zonedLines border list-group-item list-group-item-action list-group-item-white');
	
	this.lineHTML.vDivRow = window.document.createElement('div');
	this.lineHTML.vA.appendChild(this.lineHTML.vDivRow);
	this.lineHTML.vDivRow.setAttribute('class', 'row');
	this.lineHTML.vDivRow.setAttribute('style', 'cursor: default;');

	this.lineHTML.vDivAvatar = window.document.createElement('div');
	this.lineHTML.vDivRow.appendChild(this.lineHTML.vDivAvatar);
	this.lineHTML.vDivAvatar.setAttribute('class', 'col-2 containerAvatarToken py-1 px-0 text-center align-self-center');

	this.lineHTML.vImg = window.document.createElement('img');
	this.lineHTML.vDivAvatar.appendChild(this.lineHTML.vImg);
	this.lineHTML.vImg.setAttribute('class', 'avatarToken tokenSize50 mx-0');
	this.lineHTML.vImg.setAttribute('id', 'idImgPotentialFriends'+index);
	this.lineHTML.vImg.setAttribute('alt', 'Membre pouvant devenir ami');
	this.lineHTML.vImg.setAttribute('src', 'static/images/members/' + item.etatCivil.photo);

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
	this.lineHTML.vDivPseudo.setAttribute('class', 'col-2 px-0 text-center align-self-center font-size-120');
	this.lineHTML.vDivPseudo.innerHTML = item.etatCivil.name;

	this.lineHTML.vDivPseudo = window.document.createElement('div');
	this.lineHTML.vDivRow.appendChild(this.lineHTML.vDivPseudo);
	this.lineHTML.vDivPseudo.setAttribute('class', 'col-3 px-0 text-center align-self-center font-size-80');
	this.lineHTML.vDivPseudo.innerHTML = 'Inscrit le ' + vToolBox.setFormatDateJJMMAAA(item.dateCreation);
}

// --------------------------------------------------------------
// Affichage du Header de la modale de la liste des membres
// --------------------------------------------------------------
MembersMgr.prototype.displayMembersLines = function(pMembers, pDisplayMembersModalData){ 
	// Création dynamique des lignes HTML 
	var vMembers = [];

	pMembers.forEach((item, index) => {
		vMembers.push(new AddMemberListLines(item, index, pDisplayMembersModalData.modalListGroup));	// Ajoute les éléments d'une ligne vide dans le tableau des éléments
	});
}

// --------------------------------------------------------------
// On a reçu une liste de membres 
// Ajout dynamique des membres dans le DOM sur la modale
// --------------------------------------------------------------
MembersMgr.prototype.displayMembers = function(pMembers, pDisplayMembersModalData){   
	var vModalHeaderParams = 
	{
		displayModalDatas : pDisplayMembersModalData,
		modalId 					: '#idModalMemberList',
		modalTitle 				: '<i class="fa fa-fw fa-th-list"></i>'+' Liste des membres déclarés',
		modalDesc					: 'Liste de tous les membres déclarés dans \'Collect\'Or\'',
	}
	new DisplayModalHeader().displayModalHeader(vModalHeaderParams);
	
	var vSearchFilterParams = 
	{
		displayModalDatas 	: pDisplayMembersModalData,
		myPseudo						: this.memberClient.member.pseudo,
		msgRestoreFullList	: 'askMemberList',
		msgFilteredList			: 'searchFilteredMembers',
	}
	new SearchFilter().displaySearchFilter(vSearchFilterParams);		// Affiche les champs de recherche des membres (Pseudo et/ou Prénom et/ou Nom)
	this.displayMembersLines(pMembers, pDisplayMembersModalData);		// Affiche les lignes des membres
};
