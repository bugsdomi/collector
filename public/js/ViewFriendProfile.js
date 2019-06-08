// ************************************************************************
// ***      ViewFriendProfile : Affichage de la page de profil d'un ami ***
// ***                                                                  ***
// *** Objet : ViewFriendProfile                                        ***
// ***                                                                  ***
// *** Cet objet sert à gérer le profil d'un ami                        ***
// ***  - L'Affichage de son profil                                     ***
// ***  - L'Accès aux différentes fonctions de son profil               ***
// ***    (en fonction de notre propre statut (Admin ou non))           ***
// ***                                                                  ***
// ***  Nécessite :                                                     ***
// ***      Rien                                                        ***
// ***                                                                  ***
// ************************************************************************

function ViewFriendProfile(pMemberClient){                              // Fonction constructeur exportée
  this.memberClient = pMemberClient;
};   						

// -----------------------------------------------------------------------------
// Option de menu "Voir le Profil d'un ami"
// -----------------------------------------------------------------------------
ViewFriendProfile.prototype.displayFriendProfile = function(pMyFriend){

console.log('displayFriendProfile - pMyFriend 1 : ',pMyFriend);


	vActiveProfile = cstFriendProfileActive;					// Indique que l'on vient de passer en "Vue du profil de mon ami" et on va utiliser le jeu d'identifiants aletrnatifs
	var vModalHeaderColorParams = 
	{
		activeColor : 'bg-warning',
		modalHeader : document.getElementById('idModalFriendProfilePageHeader'),
	}
	new InitHeaderColor().initHeaderColor(vModalHeaderColorParams);
	document.getElementById('idModalFriendProfilePageTitle').innerHTML = 'Profil de ' + pMyFriend.member.pseudo;
	$('#idModalFriendProfilePage').modal('show');     // Ouverture de la modale                                     

// XXXXX ZZZZZ
// Activer menu "Retour à la fiche principale"
// et inverser les autres options

console.log('---------------------------------------------------------')
console.log('---------------------------------------------------------')
console.log('---------------------------------------------------------')
console.log('---------------------------------------------------------')




	var vFriendViewProfile 	= new PresentationCard(pMyFriend).displayPresentationCard();							// - Affiche les informations du profil dans la carte "Présentation"
	
console.log('displayFriendProfile - pMyFriend 2 : ',pMyFriend);

	var vFriendsCard 				= new FriendsCard(pMyFriend).displayFriendsCard();												// - Affiche les amis dans la carte "Amis"
console.log('displayFriendProfile - pMyFriend 3 : ',pMyFriend);
	// new vInvitationsCard.displayInvitSentCard();									// - Affiche les invitations lancées dans la carte "Invitation lancéesé"

	
	// 	// En sortant : 
	// 	   vActiveProfile = cstMainProfileActive;
	// 	// Desactiver menu "Retour à la fiche principale"
	// 	// RemoveChild de toutes les fenetres
}


// $('#idModalLogin').modal('hide');                                 // Fermeture de la fenêtre modale de Login


// FriendRequestMgr.prototype.deleteLineInvitSent = function(pFriendToAdd, pModalMgrFriendListGroup){
// 	var elem = document.getElementById('idAddFriendAnchor'+pFriendToAdd.index);

// 	if (elem){
// 		elem.parentNode.removeChild(elem);

// 		if (!pModalMgrFriendListGroup.firstChild) {	// S'il n'y a plus de lignes alors
// 			$('#idModalMgrFriend').modal('hide');     // Fermeture de la modale                                     
// 		}
// 	}
// }


	// Suppression de tous les éléments de la liste des membres pouvant devenir ami à la fermeture de la modale
	$('#idModalFriendProfilePage').on('hidden.bs.modal', () => {
		vActiveProfile = cstMainProfileActive;

		var parent = document.getElementById('idDivMountPointFriendProfile');

console.log('displayFriendProfile - parent : ',parent)
		while (parent.firstChild){
			parent.removeChild(parent.firstChild);
		}

		// vModalMgrFriendHeader.removeChild(vModalMgrFriendHeader.firstChild);
		// vModalMgrFriendTitle.removeChild(vModalMgrFriendTitle.firstChild);

		// // Suppression des champs de filtrage
		// var vSearchMembersFields = document.getElementById('idFilterFields');
		// if (vSearchMembersFields){
		// 	while (vSearchMembersFields.firstChild) {
		// 		vSearchMembersFields.removeChild(vSearchMembersFields.firstChild);
		// 	}
		// 	vSearchMembersFields.parentNode.removeChild(vSearchMembersFields);
		// }

		// // Suppression des lignes d'amis potentiels
		// while (vModalMgrFriendListGroup.firstChild) {
		// 	vModalMgrFriendListGroup.removeChild(vModalMgrFriendListGroup.firstChild);
		// }
	})

