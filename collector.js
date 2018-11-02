const DBMgr = require('./dbMgr');
const express = require('express');
const SocketIo = require('socket.io');
const MemberServer = require('./MemberServerSide');

// -------------------------------------------------------------------------
// Initilisations des variables, structures, constantes...
// -------------------------------------------------------------------------
let objectPopulation = 
{
    vMembers : {},
    vNbrConnections : 0,
    vNbrMembersInSession : 0,
}

// let vMembers = {}                            // On définit un objet vide pour accueillir les membres.
// let vNbrConnectionsAlive = 0;               // Nombre total de connexions en cours sur ce serveur     !!! ATTENTION !!! Il ne's'agit pas encore de membres valides , juste de visiteurs
// let vNbrMembersInSession = 0;                // Nombre de membres connectés 

// -------------------------------------------------------------------------
// Verification de l'accessibilité de la base - Je ne le fais qu'au debut du jeu, 
// mais en tout état de cause, normalement, professionnellement, je devrais 
// m'assurer qu'elle est toujours accessible en cours de partie, mais dans le 
// contexte ultra-limité de cet atelier, ce n'est pas nécessaire
// Si elle ne fonctionne pas, je sors du jeu, après avoir envoyé un message à la console
// -------------------------------------------------------------------------
let vDBMgr = new DBMgr();       // Instanciation de l'objet décrivant l'ensemble des joueurs et les méthodes de gestion de ces joueurs
vDBMgr.checkDBConnect();
// -------------------------------------------------------------------------
// Création de l'application ExpressJS
// Création des routes ExppressJS, car je vais utiliser cet outil pour transferer
// au client la page HTML et tout ce qui lui est nécessaire pour s'afficher et gérer
// l'affichage
// -------------------------------------------------------------------------
const app = express();
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
    objectPopulation.vNbrConnections++;                         // Nombre de visiteurs incluant les [membres + Admins]
    let vMemberServer = new MemberServer(vDBMgr);     // Instanciation de l'objet decrivant l'ensemble des membres et les méthodes de gestion de ces membres

    console.log('--------------------------------------------------------------------------------------------------------------------')
    console.log('Connection : Nbre de visiteurs : ', objectPopulation.vNbrConnections,'--- Nbre de membres : ',objectPopulation.vNbrMembersInSession);
    
    
    // On a reçu des données de Login --> Vérification dans la BDD que le prétendant-membre (Pseudo + PWD) existe bien
    webSocketConnection.on('visiteurLoginData',function(pVisiteurLoginData){
console.log('====================================================================================================================')
console.log('Avant then(objectPopulation) - objectPopulation : ',objectPopulation);
console.log('--------------------------------------------------------------------------------------------------------------------')
        vMemberServer.checkVisitorIsMember(pVisiteurLoginData, objectPopulation, webSocketConnection)
        .then(() => {
console.log('Apres then(objectPopulation) - objectPopulation : ',objectPopulation);
console.log('--------------------------------------------------------------------------------------------------------------------')
console.log('Apres then(objectPopulation) - objectMember : ',vMemberServer.objectMember);
console.log('====================================================================================================================')
        });
    });




    // On a reçu des données de creation de membre --> Vérification dans la BDD que le prétendant-membre (Mail + Pseudo) n'existe pas déjà
    webSocketConnection.on('visiteurSignInData',function(pVisiteurSignInData){
        vMemberServer.checkVisitorSignInISValid(pVisiteurSignInData, webSocketConnection)
    });    

    // On a reçu des données de récupération de mot de passe --> Vérification dans la BDD que le mail existe bien
    webSocketConnection.on('LostPWDMgr',function(pLostPWDEmail){
        vMemberServer.checkLostPWDMailIsValid(pLostPWDEmail, webSocketConnection)
    });
                        
    webSocketConnection.on('disconnect', function() {
        objectPopulation.vNbrConnections--;
console.log('disconnect - vMemberServer.objectMember.id : ',vMemberServer.objectMember.id);
        if (vMemberServer.objectMember.id){                                     // Le visiteur qui se deconnecte était un membre
            console.log('=================================================================================================================');
            console.log('=================================================================================================================');
            console.log('=================================================================================================================');
            console.log('Avant Suppression - objectPopulation : ',objectPopulation);
            console.log('-----------------------------------------------------------------------------------------------------------------');

            
            objectPopulation.vNbrMembersInSession--;                               // Nombre de visiteurs incluant les [membres + Admins]
// delete objectPopulation.vMembers[vMemberServer.objectMember.id];    // Suppression du membre de la liste des membres connectés
            delete objectPopulation.vMembers[vMemberServer.objectMember.id];        // Suppression du membre de la liste des membres connectés

            console.log('Après Suppression - objectPopulation : ',objectPopulation);
            console.log('=================================================================================================================');
            console.log('=================================================================================================================');
            console.log('=================================================================================================================');
        }    
    });
});