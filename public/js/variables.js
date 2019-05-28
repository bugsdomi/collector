// ************************************************************************
// ***                                                                  ***
// *** Variables                                                        ***
// ***                                                                  ***
// *** Cet objet contient différentes variable générales                ***
// *** Il s'entichira au fur et à mesure du temps de nouvelles méthodes ***
// ***                                                                  ***
// ************************************************************************
// --------------------------------------------------------------
// var vLoginForm;                     // Instance du formulaire de saisie du Login
var vToolBox;                       // Instance de la Boîte à outils
var vAccountModal; 			            // Instanciation de la méga-modale de saisie des infos personnelles;
var webSocketConnection;            // Variable pour la connexion WebSocket
var cstDelayClosingMicroFiche = 10000;  // Délai en msec avant la fermeture des Micro-Fiches
var cstDelayClosingPopover = 3000;  // Délai en msec avant la fermeture des notifications diverses
var cstDelayToggleModal = 300;      // Délai nécessaire pour réouvrir des modales 
var cstAmiConfirme    = 0; 				  // Statut pour un ami confirmé
var cstInvitEncours   = 1;				  // Invitation pour devenir ami lancée							(Ajouté à la liste du membre demandeur)
var cstAttenteConfirm = 2; 			    // Attente d'acceptation d'une invitation lancée	(Ajouté à la liste du membre receveur)
var cstInvitation     = 0; 			    // Demande d'invitation classique
var cstRecommendation = 1; 			    // Recommandation d'un Ami "B", recommandé par moi "A" vers un ami à moi "C"
var cstWithoutNewModal 	= false;	  // Dans le cadre de l'affichage filtré des membres, la modale étant deja affichée, on veut pas en ouvrir une seconde
var cstWithNewModal 		= true;		  // Dans le cadre de l'affichage non filtré des membres, la modale n'étant pas encore affichée, on veut pas en ouvrir une



