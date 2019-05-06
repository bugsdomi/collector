const express = require('express');
const path = require('path');
const SocketIo = require('socket.io');
const MemberServer = require('./MemberServerSide');
const SocketIOFileUpload = require('socketio-file-upload');
// -------------------------------------------------------------------------
// Initilisations des variables, structures, constantes...
// -------------------------------------------------------------------------
let vMemberServer = new MemberServer();     // Instanciation de l'objet decrivant l'ensemble des membres et les méthodes de gestion de ces membres
// -------------------------------------------------------------------------
// Verification de l'accessibilité de la base - Je ne le fais qu'au debut du jeu, 
// mais en tout état de cause, normalement, professionnellement, je devrais 
// m'assurer qu'elle est toujours accessible en cours de partie, mais dans le 
// contexte ultra-limité de cet atelier, ce n'est pas nécessaire
// Si elle ne fonctionne pas, je sors du jeu, après avoir envoyé un message à la console
// -------------------------------------------------------------------------
vMemberServer.checkDBConnect();

// -------------------------------------------------------------------------
// Création de l'application ExpressJS
// Création des routes ExppressJS, car je vais utiliser cet outil pour transferer
// au client la page HTML et tout ce qui lui est nécessaire pour s'afficher et gérer
// l'affichage
// -------------------------------------------------------------------------
const app = express();
app.use(SocketIOFileUpload.router);     // Gestionnaire de téléchargement des photos du client vers le serveur
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
let socketIo = new SocketIo(server);

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
		vMemberServer.updateDataProfilMembre(pDataProfilMembre, webSocketConnection);
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
	// On a reçu une demande de la liste d'ajout d'amis 
	webSocketConnection.on('askAddFriend', function(pMyPseudo){
		vMemberServer.askAddFriend(pMyPseudo, webSocketConnection);
	});   						

	// On a reçu une demande d'ajout d'amis --> Ajout du futur ami dans ma liste d'amis, mais en statut "Non confirmé"
	webSocketConnection.on('invitationSent', function(pFriendToAdd){
		vMemberServer.invitationSent(pFriendToAdd, webSocketConnection, socketIo);
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
		vMemberServer.refuseInvitation(pSelectedInvit, webSocketConnection);
	});   				


	// On a reçu une suppression d'ami
	webSocketConnection.on('deleteFriendOfMine', function(pFriendToDelete){
		vMemberServer.deleteFriendOfMine(pFriendToDelete, webSocketConnection, socketIo);
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
	// Déconnexion
	// ------------------------------------

	// Un membre se déconnecte
	webSocketConnection.on('disconnect', function() {
		console.log('Déconnexion')        
		vMemberServer.disconnectMember(webSocketConnection, socketIo);
	});
});

