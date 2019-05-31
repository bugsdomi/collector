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
function AddMemberListLines(item, index, pModalMemberListGroup){
	this.lineHTML = {};						// Structure HTML générée pour chaque ligne de membre

	this.friend = item;
	this.index = index;

	this.lineHTML.vA = window.document.createElement('a');
	pModalMemberListGroup.appendChild(this.lineHTML.vA);
	this.lineHTML.vA.setAttribute('id', 'idAddFriendAnchor'+index);
	this.lineHTML.vA.setAttribute('href', '#');
	this.lineHTML.vA.setAttribute('class', 'zonedLines border list-group-item list-group-item-action list-group-item-white');
	
	this.lineHTML.vDivRow = window.document.createElement('div');
	this.lineHTML.vA.appendChild(this.lineHTML.vDivRow);
	this.lineHTML.vDivRow.setAttribute('class', 'row mx-0');
	this.lineHTML.vDivRow.setAttribute('style', 'cursor: default;');

	this.lineHTML.vDivAvatar = window.document.createElement('div');
	this.lineHTML.vDivRow.appendChild(this.lineHTML.vDivAvatar);
	this.lineHTML.vDivAvatar.setAttribute('class', 'col-2 containerAvatarToken py-1 px-0 text-center align-self-center');

	this.lineHTML.vImg = window.document.createElement('img');
	this.lineHTML.vDivAvatar.appendChild(this.lineHTML.vImg);
	this.lineHTML.vImg.setAttribute('class', 'avatarToken tokenSize50 mx-0');
	this.lineHTML.vImg.setAttribute('id', 'idImgPotentialFriends'+index);
	this.lineHTML.vImg.setAttribute('alt', 'Membre inscrit à Collect\'Or');
	this.lineHTML.vImg.setAttribute('src', 'static/images/members/' + item.etatCivil.photo);

	this.lineHTML.vDivPseudo = window.document.createElement('div');
	this.lineHTML.vDivRow.appendChild(this.lineHTML.vDivPseudo);
	this.lineHTML.vDivPseudo.setAttribute('class', 'col-3 px-0 text-center align-self-center font-size-120');
	this.lineHTML.vDivPseudo.innerHTML = item.pseudo;

	this.lineHTML.vDivFirstName = window.document.createElement('div');
	this.lineHTML.vDivRow.appendChild(this.lineHTML.vDivFirstName);
	this.lineHTML.vDivFirstName.setAttribute('class', 'col-2 px-0 text-center align-self-center font-size-120');
	this.lineHTML.vDivFirstName.innerHTML = item.etatCivil.firstName;

	this.lineHTML.vDivName = window.document.createElement('div');
	this.lineHTML.vDivRow.appendChild(this.lineHTML.vDivName);
	this.lineHTML.vDivName.setAttribute('class', 'col-2 px-0 text-center align-self-center font-size-120');
	this.lineHTML.vDivName.innerHTML = item.etatCivil.name;

	this.lineHTML.vDivInscription = window.document.createElement('div');
	this.lineHTML.vDivRow.appendChild(this.lineHTML.vDivInscription);
	this.lineHTML.vDivInscription.setAttribute('class', 'col-3 px-0 text-center align-self-center font-size-80');
	this.lineHTML.vDivInscription.innerHTML = 'Inscrit le ' + vToolBox.setFormatDateJJMMAAA(item.dateCreation);

	this.lineHTML.vDivMicroFiche = window.document.createElement('div');
	this.lineHTML.vDivRow.appendChild(this.lineHTML.vDivMicroFiche);
	this.lineHTML.vDivMicroFiche.setAttribute('id', 'idDivMicroFiche'+index);
	this.lineHTML.vDivMicroFiche.setAttribute('class', 'd-none py-0');
	this.lineHTML.vDivMicroFiche.setAttribute('style', 'position: absolute; width: 350px; border: 1px solid black; '); 

	item.friendsOfMyFriend 	= item.amis;
	item.friendEmail  			= item.email;
	item.friendPseudo 			= item.pseudo;
	item.friendPhoto 				= item.etatCivil.photo;

	var vMicroFicheParams = {
		simpleMicroFiche 	: cstSimpleMicroFiche,
		index							: index,
	};

	new MicroFicheMember(item).displayMicroFicheMember(this.lineHTML.vDivMicroFiche, vMicroFicheParams);
}

// --------------------------------------------------------------
// Affichage du Header de la modale de la liste des membres
// --------------------------------------------------------------
MembersMgr.prototype.displayMembersLines = function(pMembers, pDisplayMembersModalData){ 
	// Création dynamique des lignes HTML 
	var vMembers = [];

	pMembers.forEach((item, index) => {
		vMembers.push(new AddMemberListLines(item, index, pDisplayMembersModalData.modalListGroup));	// Ajoute les éléments d'une ligne vide dans le tableau des members

		var vDataToTransmit = {
			parentDiv	: vMembers[index].lineHTML.vDivMicroFiche,
		}

		vMembers[index].lineHTML.vDivRow.addEventListener('mouseover', this.openMicroFiche,false);
		vMembers[index].lineHTML.vDivRow.addEventListener('mousemove', this.openMicroFiche,false);
		vMembers[index].lineHTML.vDivRow.addEventListener('mouseout', this.closeMicroFiche,false);
		vMembers[index].lineHTML.vA.datas = vDataToTransmit;
		vMembers[index].lineHTML.vDivRow.datas = vDataToTransmit;
		vMembers[index].lineHTML.vDivAvatar.datas = vDataToTransmit;
		vMembers[index].lineHTML.vImg.datas = vDataToTransmit;
		vMembers[index].lineHTML.vDivPseudo.datas = vDataToTransmit;
		vMembers[index].lineHTML.vDivFirstName.datas = vDataToTransmit;
		vMembers[index].lineHTML.vDivName.datas = vDataToTransmit;
		vMembers[index].lineHTML.vDivInscription.datas = vDataToTransmit;
	});
}

// --------------------------------------------------------------
// En passant au dessus des lignes des membres, la micro-fiche du membre s'ouvre
// --------------------------------------------------------------
MembersMgr.prototype.openMicroFiche = function(event){  
	var ev = event || window.event;
	var vDistFromBodyToHoverLine = vToolBox.findPos(this, ev);

	var vBody = document.getElementById('idModalBodyMemberList');				// Cadre Body enveloppant la liste des membres
	var vBodyHeight = vBody.offsetHeight;																//Hauteur du cadre Body
	var vPosCursorFromBody = vToolBox.findPos(vBody, ev);								// Position relative de la souris par rapport au cadre Body
	var vIntElemScrollTop = vBody.scrollTop;														// Décalage en pixel de la scrollBar

	var vMFHeight = event.target.datas.parentDiv.offsetHeight;					// Hauteur de la Micro-Fiche (MF) - Varie en fonction de la taille de l'image et du nombre d'amis
	var vPosBottomMF = vPosCursorFromBody.y + vIntElemScrollTop + 25 + vMFHeight;	// Position du bas de la MF par rapport au Top du cadre Body
	var vDistFromBottomMFToBottomBody = vBodyHeight - vPosBottomMF;								// Distance entre le bas de la MF et la bas du cadre Body
	
	if (vDistFromBottomMFToBottomBody < 50 - vIntElemScrollTop){									// Si cette distance est > à 50, on fixe la MF pour qu'elle totalement visible
		var distTopBodyToTopMF = vBodyHeight - (vMFHeight + 58) + vIntElemScrollTop;
		var myTop = distTopBodyToTopMF - (vPosCursorFromBody.y - vDistFromBodyToHoverLine.y);

		event.target.datas.parentDiv.style.top =  myTop + 'px';
	} else {
		event.target.datas.parentDiv.style.top = vDistFromBodyToHoverLine.y + vIntElemScrollTop + 25 + 'px';
	}

	event.target.datas.parentDiv.style.left = vDistFromBodyToHoverLine.x + 15 + 'px';
	event.target.datas.parentDiv.classList.remove('d-none');
}

// --------------------------------------------------------------
// En quittant la ligne courante d'un membres, la micro-fiche du membre se ferme
// --------------------------------------------------------------
MembersMgr.prototype.closeMicroFiche = function(event){  
	event.target.datas.parentDiv.classList.add('d-none');
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
