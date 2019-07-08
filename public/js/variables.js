// ************************************************************************
// ***                                                                  ***
// *** Variables                                                        ***
// ***                                                                  ***
// *** Cet objet contient différentes variable générales                ***
// *** Il s'entichira au fur et à mesure du temps de nouvelles méthodes ***
// ***                                                                  ***
// ************************************************************************
// --------------------------------------------------------------
var vToolBox;                       // Instance de la Boîte à outils
var vMemberClient;                  // Instanciation de l'objet decrivant un Membre et les méthodes de gestion de ce Membre
var vFriendPopUpMenu;               // Instanciation de l'objet Popup Menu de mes amis
var vFriendRequestMgr;              // Instanciation de l'objet gestionnaire des demandes d'amis
var vInvitationsMgr;                // Instanciation de l'objet gestionnaire des invitations
var vMembersMgr;                    // Instanciation de l'objet gestionnaire des membres
var vPresentationCardMain;          // Instanciation de l'objet "Carte de présentation" pour le profil principal
var vPresentationCardFriend;        // Instanciation de l'objet "Carte de présentation" pour le profil d'un ami
var vFriendsCardMain;               // Instanciation de l'objet "Carte des amis"
var vFriendsCardFriend;             // Instanciation de l'objet "Carte des amis" pour le profil d'un ami
var vRecommendFriendsMgr;           // Instanciation de l'objet gestionnaire des recommandations
var vInvitationsCardMain;           // Instanciation de l'objet "carte des invitations" pour le profil principal
var vInvitationsCardFriend;         // Instanciation de l'objet "carte des invitations" pour le profil d'un am
var vAccountModal; 			            // Instanciation de la méga-modale de saisie des infos personnelles;
var vViewFriendProfile; 			      // Instanciation de l'objet de présentation du profil d'un ami
var vPostsClientSideMain; 			    // Instanciation de l'objet de Postage du profil principal
var vPostsClientSideFriend; 			  // Instanciation de l'objet de Postage du profil d'un ami
var webSocketConnection;            // Variable pour la connexion WebSocket
var vFriendProfileViewed;           // Nom du profil en cours de visualisation (Nécessaire pour la MAJ en BroadCast des Post sur différents membres regardant le même profil)

var cstSuperAdmin = 1;    // Statut du Super-Admin - Il n'y a qu'un seul SuperAdmin. il est créé lors de l'enregistrement du 1er membre - lui seul peut créer les autres Admin
var cstAdmin = 2;       	// Statut définissant les Admin standards (Qui peuvent accéder à la console d'administration (avec le SuperAdmin))
var cstMembre = 4;      	// Membre standard qui ne peut qu'utiliser la partie publique de l'application 

var cstDelayClosingMicroFiche = 10000;  // Délai en msec avant la fermeture des Micro-Fiches
var cstDelayClosingPopover = 3000;  // Délai en msec avant la fermeture des notifications diverses
var cstDelayToggleModal = 300;      // Délai nécessaire pour réouvrir des modales 
var cstIntervalConnectedFriends = 10000;  // Intervalle de scrutattion des amiis connectés

var cstAmiConfirme    = 0; 				  // Statut pour un ami confirmé
var cstInvitEncours   = 1;				  // Invitation pour devenir ami lancée							(Ajouté à la liste du membre demandeur)
var cstAttenteConfirm = 2; 			    // Attente d'acceptation d'une invitation lancée	(Ajouté à la liste du membre receveur)

var cstInvitation     = 0; 			    // Demande d'invitation classique
var cstRecommendation = 1; 			    // Recommandation d'un Ami "B", recommandé par moi "A" vers un ami à moi "C"

var cstWithoutNewModal 	= false;	  // Dans le cadre de l'affichage filtré des membres, la modale étant deja affichée, on veut pas en ouvrir une seconde
var cstWithNewModal 		= true;		  // Dans le cadre de l'affichage non filtré des membres, la modale n'étant pas encore affichée, on veut pas en ouvrir une

var cstSimpleMicroFiche	= true;		  // Affichage d'une Micro-fiche simple (sans empilement, ni delai de fermeture)
var cstStackableMicroFiche = false;	// Affichage d'une Micro-fiche empilable et delai de fermeture automatique

var cstMainProfileActive = 'Main';          // Indique si c'est le profil du membre principal qui est affiché ou celui d'un de ses amis
var cstFriendProfileActive = 'Friend';      // Indique si c'est le profil d membre principal qui est affiché ou celui d'un de ses amis
var vActiveProfile = cstMainProfileActive;  // Par défaut, c'est le profil du membre principal qui est affiché

var cstWithScaling = 'withScaling';         // Définit si un avatar va avoir l'Effet "Zoom" au survol de la souris (Dans ce cas --> Oui)
var cstWithNoScaling = 'withNoScaling';     // Définit si un avatar va avoir l'Effet "Zoom" au survol de la souris (Dans ce cas --> Non)



