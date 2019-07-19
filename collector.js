// *************************************************************************
// *** Collector : Programme principal coté serveur        							 ***
// ***                                                                   ***
// *** Objet : Collector                                              	 ***
// ***                                                                   ***
// *** Cet objet sert à gérer :                                          ***
// ***   - Les éléments de bas niveau (BDD, Mails, UpLoader, Exprss...)  ***
// ***   - Les échanges avec les clients (Réception, dispatching)				 ***
// ***                                                                   ***
// ***  Nécessite :                                                      ***
// *** - Le module express																							 ***	
// *** - Le module path																									 ***
// *** - Le module SocketIo 																						 ***
// *** - Le module MemberServer 																				 ***
// *** - Le module PostsServer			        														 ***
// *** - Le module SocketIOFileUpload																		 ***
// *** - Le module DBMgr																								 ***
// *** - Le module sgMail																								 ***
// ***                                                                   ***
// *************************************************************************
// -------------------------------------------------------------------------

const express = require('express');
const path = require('path');
const SocketIo = require('socket.io');
const MemberServer = require('./MemberServerSide');
const PostsServer = require('./PostsServerSide');
const SocketIOFileUpload = require('socketio-file-upload');
const DBMgr = require('./dbMgr');
const sgMail = require('@sendgrid/mail');


// -------------------------------------------------------------------------
// Initilisations des variables, structures, constantes...
// -------------------------------------------------------------------------
sgMail.setApiKey(process.env.SENDGRID_API_KEY);														// Initialisation de la clé de sécurité de SendGrid

let vDBMgr = new DBMgr();      																						// Instanciation de la base de données
let vMemberServer = new MemberServer(vDBMgr, sgMail);   									// Instanciation de l'objet de gestion des membres
let vPostsServer = new PostsServer(vDBMgr, sgMail, vMemberServer);     		// Instanciation de l'objet de gestion des Posts


// -------------------------------------------------------------------------
// Création de l'application ExpressJS
// Création des routes ExppressJS, car je vais utiliser cet outil pour transferer
// au client la page HTML et tout ce qui lui est nécessaire pour s'afficher et gérer
// l'affichage
// -------------------------------------------------------------------------
const app = express();
app.use(SocketIOFileUpload.router);     																	// Gestionnaire de téléchargement des photos du client vers le serveur
app.set('view engine', 'pug');
app.use('/static', express.static(__dirname + '/public'));
app.use('/staticNodeModules', express.static(__dirname + '/node_modules'));
app.get('/', function(req, res){
  res.render('index');    
});
// -------------------------------------------------------------------------
// Création du serveur et lancement du listener
// -------------------------------------------------------------------------
const server = app.listen(process.env.PORT || 3000, function() {
	const addressHote = server.address().address;
	const portEcoute = server.address().port
	console.log('Écoute du serveur http://%s:%s',addressHote,portEcoute);
});
// ------------------------------------------------------------
// Fin de la partie HTTP - Début de la partie WebSocket avec "Socket.io"
// ------------------------------------------------------------
// -------------------------------------------------------------------------
// Création de la liaison socket.io sur la base du serveur HTTP déja déclaré précédement
// -------------------------------------------------------------------------
// XXXXX
// let socketIo = new SocketIo(server);
let socketIo = new SocketIo(server,{ pingTimeout: 1000000 });

vMemberServer.checkDBConnect()																		// Verification de l'accessibilité de la base  
.then( () => {
	socketIo.on('connection', function(webSocketConnection){        // Une connexion au serveur vient d être faite
		console.log('Connexion')        
		
		// ------------------------------------
		// Gestion de l'Upload des Avatars
		// ------------------------------------
		const uploader = new SocketIOFileUpload();
		uploader.dir = path.join(__dirname, '/public/images/members');
		console.log('===============================================================================================================')
		console.log('File Upload - uploader : ',uploader)
		console.log('===============================================================================================================')
		console.log('File Upload - uploader.dir : ',uploader.dir)
		console.log('===============================================================================================================')
		
		uploader.listen(webSocketConnection);

		uploader.on('start', function(event){
			console.log('File Upload - Start - event.file', event.file);
			console.log('===============================================================================================================')
		});
		
		uploader.on('progress', function(event){
			console.log('File Upload - Progress - event.buffer', event.buffer);
			console.log('===============================================================================================================')
		});
		
		uploader.on('complete', function(event){
			console.log('File Upload - Complete - event.interrupt', event.interrupt);
			console.log('===============================================================================================================')
		});
		
		uploader.on('saved', function(event){
			console.log('File Upload - Saved - event.file.success', event.file.success);
			console.log('===============================================================================================================')
		});
		
		uploader.on('error', function(event){
			console.log('File Upload - Error event.errorr', event.error);
			console.log('===============================================================================================================')
		});
		

		// ------------------------------------
		// Connexion, création et contrôles de connexion
		// ------------------------------------
		vMemberServer.initVisiteur(webSocketConnection, socketIo);    
		
		// On a reçu des données de Login --> Vérification dans la BDD que le prétendant-membre (Pseudo + PWD) existe bien
		webSocketConnection.on('visiteurLoginData',function(pVisiteurLoginData){
			vMemberServer.visitorLogin(pVisiteurLoginData, webSocketConnection, socketIo);
		});

		// On a reçu des données de creation de membre --> Vérification dans la BDD que le prétendant-membre (Mail + Pseudo) n'existe pas déjà
		webSocketConnection.on('visitorSignInData',function(pVisitorSignInData){
			vMemberServer.visitorSignIn(pVisitorSignInData, webSocketConnection, socketIo);
		});    

		// On a reçu des renseignements de profil de membre --> MAJ de ces infos dans la BDD
		webSocketConnection.on('dataProfilMembre',function(pDataProfilMembre){
			vMemberServer.updateDataProfilMembre(pDataProfilMembre, webSocketConnection, socketIo);
			uploader.on('saved', function(event){
				// On demande au client d'afficher l'avatar à tous les endroits nécessaires après que l'image ait été téléchargée sur le serveur
				webSocketConnection.emit('displayAvatarOnProfile');     
			});
		});    

		// On a reçu des données de récupération de mot de passe --> Vérification dans la BDD que le mail existe bien
		webSocketConnection.on('lostPWDMgr',function(pLostPWDEmail){
			vMemberServer.lostPWDMgr(pLostPWDEmail, webSocketConnection);
		});



		// ------------------------------------
		// Gestion des amis
		// ------------------------------------
		// On a reçu une demande de la liste d'amis potentiels
		webSocketConnection.on('askAddFriend', function(pDataToTransmit){
			vMemberServer.askAddFriend(pDataToTransmit, webSocketConnection);
		});   						

		// On a reçu une demande de liste d'amis potentiels filtrés
		webSocketConnection.on('searchFilteredPotentialFriends', function(pSearchMembersParams){
			vMemberServer.searchFilteredPotentialFriends(pSearchMembersParams, webSocketConnection);
		});   				

		// On a reçu une demande de la liste des membres
		webSocketConnection.on('askMemberList', function(pDataToTransmit){
			vMemberServer.askMemberList(pDataToTransmit, webSocketConnection);
		});   						

		// On a reçu une demande de liste de membres filtrés
		webSocketConnection.on('searchFilteredMembers', function(pSearchMembersParams){
			vMemberServer.searchFilteredMembers(pSearchMembersParams, webSocketConnection);
		});   				

		// On a reçu une demande d'ajout d'amis --> Ajout du futur ami dans ma liste d'amis, mais en statut "Non confirmé"
		webSocketConnection.on('invitationSent', function(pFriendToAdd){
			vMemberServer.invitationSent(pFriendToAdd, webSocketConnection, socketIo);
		});   						

		// On a reçu une annulation d'invitation --> retrait des amis potentiels de nos listes d'amis mutuelles
		webSocketConnection.on('cancelInvitation', function(pInvitSentToDelete){
			vMemberServer.cancelInvitation(pInvitSentToDelete, webSocketConnection, socketIo);
		});   						

		// On a reçu une demande de la liste des invitations à valider
		webSocketConnection.on('listInvitations', function(pMyEmail){
			vMemberServer.listInvitations(pMyEmail, webSocketConnection);
		});   						

		// On a reçu une validation d'ami
		webSocketConnection.on('acceptInvitation', function(pSelectedInvit){
			vMemberServer.acceptInvitation(pSelectedInvit, webSocketConnection, socketIo);
		});   						

		// On a reçu un refus d'ami
		webSocketConnection.on('refuseInvitation', function(pSelectedInvit){
			vMemberServer.refuseInvitation(pSelectedInvit, webSocketConnection, socketIo);
		});   				

		// On a reçu une suppression d'ami
		webSocketConnection.on('deleteFriendOfMine', function(pFriendToDelete){
			vMemberServer.deleteFriendOfMine(pFriendToDelete, webSocketConnection, socketIo);
		});   				

		// On a reçu une demande de liste d'amis
		webSocketConnection.on('getFriendsOfMember', function(pFriendsOfMember){
			vMemberServer.getFriendsOfMember(pFriendsOfMember, webSocketConnection);
		});   				

		// On a reçu une demande de vision du profil d'un ami
		webSocketConnection.on('getCompleteRecordOfMyFriend', function(pFriendToView){
			vMemberServer.getCompleteRecordOfMyFriend(pFriendToView, webSocketConnection);
		});   				



		// ------------------------------------
		// Gestion des recommandations
		// ------------------------------------
		// On a reçu une demande  de liste d'amis dont la recommandabilité est à vérifier
		webSocketConnection.on('searchFriendsNotAlreadyInvitWithTargetFriend', function(pRecommendFriendsList){
			vMemberServer.searchFriendsNotAlreadyInvitWithTargetFriend(pRecommendFriendsList, webSocketConnection);
		}); 

		// On a reçu une recommandation d'amis --> Ajout des relations ami-recommandé et ami-cible
		webSocketConnection.on('recommendationSent', function(pFriendToAdd){
			vMemberServer.recommendationSent(pFriendToAdd, webSocketConnection, socketIo);
		});   						



		// ------------------------------------
		// Gestion des Posts
		// ------------------------------------
		// On a reçu un nouveau Post à stocker en BDD
		webSocketConnection.on('addNewPost', function(vPostToAdd){
			vPostsServer.addNewPost(vPostToAdd, socketIo);
		});   						

		// On a reçu une demande de liste des Posts pour le propriétaire du mur passé en paramètre
		webSocketConnection.on('askPostsList', function(vPostToSearch){
			vPostsServer.askPostsList(vPostToSearch, webSocketConnection);
		});   						

			// On a reçu un Post à supprimer en BDD
			webSocketConnection.on('deletePost', function(vPostToDelete){
				vPostsServer.deletePost(vPostToDelete, socketIo);
			});   						



		// ------------------------------------
		// Gestion des commentaires L1
		// ------------------------------------
		// On a reçu un nouveau commentaire de Niveau 1 à stocker en BDD
		webSocketConnection.on('addNewCommentL1', function(pCommentL1ToAdd){
			vPostsServer.addNewCommentL1(pCommentL1ToAdd, socketIo);
		});   						

		// On a reçu un commentaire L1 à supprimer en BDD
		webSocketConnection.on('deleteCommentL1', function(vCommentL1ToDelete){
			vPostsServer.deleteCommentL1(vCommentL1ToDelete, socketIo);
		});   						



		// ------------------------------------
		// Gestion des commentaires L2
		// ------------------------------------
		// On a reçu un nouveau commentaire de Niveau 2 à stocker en BDD
		webSocketConnection.on('addNewCommentL2', function(pCommentL2ToAdd){
			vPostsServer.addNewCommentL2(pCommentL2ToAdd, socketIo);
		});   						

		// On a reçu un commentaire L2 à supprimer en BDD
		webSocketConnection.on('deleteCommentL2', function(vCommentL2ToDelete){
			vPostsServer.deleteCommentL2(vCommentL2ToDelete, socketIo);
		});   						



		// ------------------------------------
		// Gestion des statuts de connnexion
		// ------------------------------------
		// ------------------------------------
		// Interrogation de mes amis connectés
		// ------------------------------------
		webSocketConnection.on('whichFriendsAreConnected', function(pMember) {
			vMemberServer.whichFriendsAreConnected(pMember, webSocketConnection);
		});

		// ------------------------------------
		// Interrogation des amis de mon ami qui sont connectés
		// ------------------------------------
		webSocketConnection.on('whichFriendsOfMyFriendAreConnected', function(pMember) {
			vMemberServer.whichFriendsOfMyFriendAreConnected(pMember, webSocketConnection);
		});

		// ------------------------------------
		// Interrogation unitaire du statut de connexion d'un nouvel ami
		// ------------------------------------
		webSocketConnection.on('isNewFriendConnected', function(pMember) {
			vMemberServer.isNewFriendConnected(pMember, webSocketConnection);
		});



		// ------------------------------------
		// Gestion des TChat
		// ------------------------------------

		// ------------------------------------
		// On a reçu une demande de création d'un nouveau salon pour un nouvel invité
		// ------------------------------------
		webSocketConnection.on('invitToChat', function(pDataInvitChat){
			vMemberServer.invitToChat(pDataInvitChat, webSocketConnection, socketIo);
		}); 

		// ------------------------------------
		// L'invité au Tchat à refusé l'invitation --> 
		// On previent l'inviteur
		// + on supprime l'invitation dans le tableau des invitations 
		// + suppression de l'avatar de l'invité dans le salon
		// ------------------------------------
		webSocketConnection.on('refuseInvitToChat', function(pInvitChat){
			vMemberServer.refuseInvitToChat(pInvitChat, socketIo);
		}); 

		// ------------------------------------
		// L'invité au Tchat à accepté l'invitation --> 
		// On previent l'inviteur
		// + MAj les status de l'invitation dans le tableau des invitations 
		// + activation de l'avatar de l'invité dans le salon
		// + abonnement au salon ici-même
		// ------------------------------------
		webSocketConnection.on('acceptInvitToChat', function(pInvitChat){
			vMemberServer.acceptInvitToChat(pInvitChat, webSocketConnection, socketIo);
		}); 

		// ------------------------------------
		// On a reçu un message Tchat
		// Je le renvoie à tous les abonnés du TChattRoom
		// ------------------------------------
		webSocketConnection.on('message', function(pMessage){
			socketIo.to(pMessage.vRoom).emit('broadcastMsgToSubscribers', pMessage);
		});			

		// ------------------------------------
		// On a reçu une demande de Refresh des avatars d'un salon donnné
		// Je le renvoie à tous les abonnés du TChattRoom (sauf l'inviteur qui est déjà raffraîchit)
		// ------------------------------------
		webSocketConnection.on('askRefreshAvatarsInChatRoom', function(pMyLounge){
			webSocketConnection.to(pMyLounge.vRoom).emit('refreshAvatarsInChatRoom', pMyLounge);
		});			

		// ------------------------------------
		// On a reçu une demande de d'expulsion du salon
		// Je le renvoie à l'abonné que j'expulse
		// ------------------------------------
		webSocketConnection.on('unsubscribeMember', function(pExitFriendChatParam){
			vMemberServer.askUnsubscribeMember(pExitFriendChatParam, socketIo);
		});			

		// ------------------------------------
		// On execute une desincription venant de l'ex-abonné
		// ------------------------------------
		webSocketConnection.on('unsubscribeMeFromRoom', function(pExitFriendChatParam){
			vMemberServer.unsubscribeMeFromRoom(pExitFriendChatParam, webSocketConnection);
		});			

		// -----------------------------------
		// Déconnexion
		// ------------------------------------

		// Un membre se déconnecte
		webSocketConnection.on('disconnect', function() {
			console.log('Déconnexion d\'un visiteur ou d\'un membre')      
			vMemberServer.disconnectMember(webSocketConnection, socketIo);
		});

// XXXXX
// Un membre se déconnecte
// 	webSocketConnection.on('UserDisconnect', function() {
// 		console.log('Déconnexion d\'un visiteur ou d\'un membre')        
// 		vMemberServer.disconnectMember(webSocketConnection, socketIo);
// 	});
	});
});

// SocketIO Cheat Sheet
// socketIo.on('connect', onConnect);

// function onConnect(webSocketConnection){
//   // sending to the client
//   webSocketConnection.emit('hello', 'can you hear me?', 1, 2, 'abc');

//   // sending to all clients except sender
//   webSocketConnection.broadcast.emit('broadcast', 'hello friends!');

//   // sending to all clients in 'game' room except sender
//   webSocketConnection.to('game').emit('nice game', "let's play a game");

//   // sending to all clients in 'game1' and/or in 'game2' room, except sender
//   webSocketConnection.to('game1').to('game2').emit('nice game', "let's play a game (too)");

//   // sending to all clients in 'game' room, including sender
//   socketIo.in('game').emit('big-announcement', 'the game will start soon');

//   // sending to all clients in namespace 'myNamespace', including sender
//   socketIo.of('myNamespace').emit('bigger-announcement', 'the tournament will start soon');

//   // sending to a specific room in a specific namespace, including sender
//   socketIo.of('myNamespace').to('room').emit('event', 'message');

//   // sending to individual socketid (private message)
//   socketIo.to(`${socketId}`).emit('hey', 'I just met you');

//   // WARNING: `webSocketConnection.to(webSocketConnection.id).emit()` will NOT work, as it will send to everyone in the room
//   // named `webSocketConnection.id` but the sender. Please use the classic `webSocketConnection.emit()` instead.

//   // sending with acknowledgement
//   webSocketConnection.emit('question', 'do you think so?', function (answer) {});

//   // sending without compression
//   webSocketConnection.compress(false).emit('uncompressed', "that's rough");

//   // sending a message that might be dropped if the client is not ready to receive messages
//   webSocketConnection.volatile.emit('maybe', 'do you really need it?');

//   // specifying whether the data to send has binary data
//   webSocketConnection.binary(false).emit('what', 'I have no binaries!');

//   // sending to all clients on this node (when using multiple nodes)
//   socketIo.local.emit('hi', 'my lovely babies');

//   // sending to all connected clients
//   socketIo.emit('an event sent to all connected clients');
// };