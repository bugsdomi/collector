// ======================================================================**
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
// ======================================================================**

function ViewFriendProfile(pMemberClient){                              // Fonction constructeur exportée
  this.memberClient = pMemberClient;
};   						

// -----------------------------------------------------------------------------
// Suppression de tous les éléments contenus dans la modale "FriendProfile"
// -----------------------------------------------------------------------------
	$('#idModalFriendProfilePage').on('hidden.bs.modal', () => {
		vActiveProfile = cstMainProfileActive;
		vFriendProfileViewed 		= null;
		vPostsClientSideFriend 	= null;
		vPresentationCardFriend	= null;
		vInvitationsCardFriend	= null;
		vFriendsCardFriend			= null;

		var parent = document.getElementById('idDivMountPointFriendProfile');
		while (parent.firstChild){
			parent.removeChild(parent.firstChild);
		}
		var parent = document.getElementById('idDivMountPointPostEditFriend');
		while (parent.firstChild){
			parent.removeChild(parent.firstChild);
		}
	})
// -----------------------------------------------------------------------------
// Option de menu "Voir le Profil d'un ami"
// -----------------------------------------------------------------------------
ViewFriendProfile.prototype.displayFriendProfile = function(pMyFriend){
	vFriendProfileViewed = pMyFriend;

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

	vPresentationCardFriend	= new PresentationCard(pMyFriend);							// Instanciation de l'objet "Carte de présentations"
	vPresentationCardFriend.displayPresentationCard();							// - Affiche les informations du profil dans la carte "Présentation"

	vFriendsCardFriend = new FriendsCard(pMyFriend);
	vFriendsCardFriend.displayFriendsCard();												// - Affiche les amis dans la carte "Amis"

	pMyFriend.vMyInvitSentList = [];
	vInvitationsCardFriend = new InvitationsCard(pMyFriend);
	vInvitationsCardFriend.displayInvitSentCard();									// - Affiche les invitations lancées dans la carte "Invitation lancées"

	vPostsClientSideFriend = new PostsClient(pMyFriend);
	vPostsClientSideFriend.displayPosts();																	// - Affiche les Posts du profil de mon ami

}