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
app.use(SocketIOFileUpload.router);
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
    // Make an instance of SocketIOFileUpload and listen on this socket:

    const uploader = new SocketIOFileUpload();
    uploader.dir = path.join(__dirname, '/public/images/members');
    uploader.listen(webSocketConnection);

    // Do something when a file is saved:
    uploader.on("saved", function(event){
        console.log(event.file);
    });

    // Error handler:
    uploader.on("error", function(event){
        console.log("Error from uploader", event);
    });



    vMemberServer.initVisiteur(webSocketConnection, socketIo);    
    
    // On a reçu des données de Login --> Vérification dans la BDD que le prétendant-membre (Pseudo + PWD) existe bien
    webSocketConnection.on('visiteurLoginData',function(pVisiteurLoginData){
        vMemberServer.visitorBecomeMember(pVisiteurLoginData, webSocketConnection, socketIo)
        .then((result) => {
        });
    });

    // On a reçu des données de creation de membre --> Vérification dans la BDD que le prétendant-membre (Mail + Pseudo) n'existe pas déjà
    webSocketConnection.on('visiteurSignInData',function(pVisiteurSignInData){
        vMemberServer.checkVisitorSignInISValid(pVisiteurSignInData, webSocketConnection, socketIo)
    });    

    // On a reçu des renseignements de profil de membre --> MAJ de ces infos dans la BDD
    webSocketConnection.on('dataProfilMembre',function(pDataProfilMembre){
        vMemberServer.addDataProfilMembre(pDataProfilMembre,)
    });    

    // On a reçu des données de récupération de mot de passe --> Vérification dans la BDD que le mail existe bien
    webSocketConnection.on('LostPWDMgr',function(pLostPWDEmail){
        vMemberServer.checkLostPWDMailIsValid(pLostPWDEmail, webSocketConnection)
    });

    

    // Un membre se déconnecte
    webSocketConnection.on('disconnect', function() {
console.log('disconnect')        
        vMemberServer.disconnectMember(webSocketConnection, socketIo);
    });
});

