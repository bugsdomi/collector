// ************************************************************************
// ***                                                                  ***
// *** Variables                                                        ***
// ***                                                                  ***
// *** Cet objet contient différentes variable générales                ***
// *** Il s'entichira au fur et à mesure du temps de nouvelles méthodes ***
// ***                                                                  ***
// ************************************************************************
// --------------------------------------------------------------
var vLoginForm;                     // Instance du formulaire de saisie du Login
var vToolBox;                       // Instance de la Boîte à outils
var webSocketConnection;            // Variable pour la connexion WebSocket
var cstDelayClosingPopover = 3000;  // Délai en msec avant la fermeture des notifications diverses
var cstDelayToggleModal = 300;      // Délai nécessaire pour réouvrir des modales 
var cstAmiConfirme  = 0; 				    // Statut pour un ami confirmé
var cstInvitEncours = 1;				    // Invitation pour devenir ami lancée							(Ajouté à la liste du membre demandeur)
var cstAttenteConfirm = 2; 			    // Attente d'acceptation d'une invitation lancée	(Ajouté à la liste du membre receveur)


