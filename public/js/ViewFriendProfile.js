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
// ***      InitHeaderColor                                             ***
// ***      PresentationCard                                            ***
// ***      FriendsCard			                                            ***
// ***      InvitationsCard                                             ***
// ***                                                                  ***
// ************************************************************************

function ViewFriendProfile(pMemberClient){                              // Fonction constructeur exportée
  this.memberClient = pMemberClient;
};   						

// -----------------------------------------------------------------------------
// Suppression de tous les éléments contenus dans la modale "FriendPrrofile"
// -----------------------------------------------------------------------------
	$('#idModalFriendProfilePage').on('hidden.bs.modal', () => {
		vActiveProfile = cstMainProfileActive;

		var parent = document.getElementById('idDivMountPointFriendProfile');
		while (parent.firstChild){
			parent.removeChild(parent.firstChild);
		}
})
// -----------------------------------------------------------------------------
// Option de menu "Voir le Profil d'un ami"
// -----------------------------------------------------------------------------
ViewFriendProfile.prototype.displayFriendProfile = function(pMyFriend){
	vActiveProfile = cstFriendProfileActive;					// Indique que l'on vient de passer en "Vue du profil de mon ami" et on va utiliser le jeu d'identifiants aletrnatifs
	var vModalHeaderColorParams = 
	{
		activeColor : 'bg-warning',
		modalHeader : document.getElementById('idModalFriendProfilePageHeader'),
	}
	new InitHeaderColor().initHeaderColor(vModalHeaderColorParams);
	document.getElementById('idModalFriendAvatarToken').setAttribute('src','static/images/members/'+pMyFriend.member.etatCivil.photo);
	document.getElementById('idModalFriendProfilePageTitle').innerHTML = ' Profil de ' + pMyFriend.member.pseudo;
	$('#idModalFriendProfilePage').modal('show');     // Ouverture de la modale                                     

	new PresentationCard(pMyFriend).displayPresentationCard();							// - Affiche les informations du profil dans la carte "Présentation"
	new FriendsCard(pMyFriend).displayFriendsCard();												// - Affiche les amis dans la carte "Amis"
	pMyFriend.vMyInvitSentList = [];
	new InvitationsCard(pMyFriend).displayInvitSentCard();									// - Affiche les invitations lancées dans la carte "Invitation lancées"
	new Posts(pMyFriend).displayPosts();																		// - Affiche les Posts et le PostEdit
}