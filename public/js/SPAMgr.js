'use strict'
// ********************************************************************* //
// *                                                                   * //
// *       "Tour de France" - Juin 2018                                * //
// *                                                                   * //
// ********************************************************************* //
// *                                                                   * //
// *   Dominique Hourdequin - Juin 2018                                * //
// *   Projet N°2 - Type "Back-end"                                    * //
// *                                                                   * //
// *   Formation "Développeur Full Stack Javascript"                   * //
// *   Classe : "DIWJS08" - Printemps 2018                             * //
// *   IFOCOP - Paris XI                                               * //
// *                                                                   * //
// *   Contact à l'IFOCOP qui transmettra mes coordonnées sur demande  * //
// *   Responsable de formation                                        * //
// *   Madame Fabienne Thiry                                           * //
// *   mail : fthiry@ifocop.fr                                         * //
// *   Tel : 01-40-21-83-78                                            * //
// *                                                                   * //
// ********************************************************************* //

// --------------------- Point d'entrée de l'application  ---------------------------
// Lance l'éxecution du script après chargement et affichage du document  (Window)
//-----------------------------------------------------------------------------------
window.addEventListener('DOMContentLoaded', function(){

    // -------------------------------------------------------------------------
    // Initialisation coté client de la connexion SocketIO
    // -------------------------------------------------------------------------
    var webSocketConnection = io();
    // var webSocketConnection = io('http://192.168.0.20:3000');        // Endormi car je ne veux pas utiliser une adresse IP en dur
    // var webSocketConnection = io('http://localhost:3000');           // Endormi car je veux pouvoir travailler sur plusieurs ordi

    // -------------------------------------------------------------------------
    // La partie est pleine, un message prévient le joueur 
    // -------------------------------------------------------------------------
    webSocketConnection.on('alertPartyFull', function(){
        vPlayersClient.adviseWithButton('La partie est pleine, revenez plus tard', 'Recommencer', vPlayersClient.restartLogin);
    });
    // -------------------------------------------------------------------------
    // Le joueur qui essaie de se connecter est deja dans la partie
    // -------------------------------------------------------------------------
    webSocketConnection.on('playerAlreadyInGame', function(){
        vPlayersClient.adviseWithButton('Vous êtes déjà dans la partie dans une autre session','Recommencer', vPlayersClient.restartLogin);
    });
    // -------------------------------------------------------------------------
    // La partie a déjà commencée et le joueur potentiel est refoulé
    // -------------------------------------------------------------------------
    webSocketConnection.on('partyAlreadyStarted', function(){
        vPlayersClient.adviseWithButton('La partie a déjà débuté, revenez plus tard','Recommencer', vPlayersClient.restartLogin);
    });
    // -------------------------------------------------------------------------
    // On notifie au joueur qu'il est le Maître de la partie
    // -------------------------------------------------------------------------
    webSocketConnection.on('masterOfGame', function(pMyPlayer){
        vPlayersClient.adviseWithButton('Vous êtes le Maître de la partie et avez le privilège de la lancer','Démarrer la partie',vPlayersClient.launchGame, pMyPlayer, webSocketConnection);
    });
    // -------------------------------------------------------------------------
    // On previent le joueur que le jeu va demartrer dans n secondes
    // -------------------------------------------------------------------------
    webSocketConnection.on('adviseStartGame', function(){
        vPlayersClient.vCompteARebours = vPlayersClient.compteARebours;
        vPlayersClient.displayAdvise('Le jeu va démarrer dans '+vPlayersClient.vCompteARebours+' secondes'); 

        vPlayersClient.refreshCompteARebours = setInterval(function(){
            vPlayersClient.playCompteARebours(webSocketConnection)
        },1000);
    });
    // -------------------------------------------------------------------------
    // On notifie au joueur qu'il est une gros Looser et qu'iol ferait meix d'aller 
    // se cacher sous une plaque d'égout
    // -------------------------------------------------------------------------
    webSocketConnection.on('youLost', function(){
        vPlayersClient.clearParty();
        vPlayersClient.adviseWithButton('Défaite !!!! Vous avez perdu','recommencer',vPlayersClient.restartLogin);
    });
    // -------------------------------------------------------------------------
    // On demande aux joueurs d'envoyer leurs stats de jeu
    // -------------------------------------------------------------------------
    webSocketConnection.on('askPartyData', function(){
        vPlayersClient.sendPartyData(webSocketConnection);
    });
    // -------------------------------------------------------------------------
    // Le serveur a sollicité la saisie du Login du joueur qui vient de se connecter
    // Affichage du formulaire de saisie et envoi lorsque la saisie est validée 
    // syntaxiquement par appel des checks directement par les champs et la Form 
    // provoqués par évenement de sortie du champ, ou validation globale de la Form
    // -------------------------------------------------------------------------
    webSocketConnection.on('callLoginForm', function(){
        vLoginForm.style.display='block';
    });
    // -------------------------------------------------------------------------
    // Affiche le fond d'écran bigaré, et le panneau de contrôle
    // -------------------------------------------------------------------------
    webSocketConnection.on('drawGameBackground', function(){
        vBtnImgBtnListMainScreen.style.display = 'none';
        vBtnImgBtnDisclaimer.style.display = 'none';
        vPalmares.style.display = 'none';
        vGameRules.style.display = 'none';;
    

        var vPlayerBackground = window.document.createElement('img');   
        window.document.body.appendChild(vPlayerBackground);     
        vPlayerBackground.setAttribute('src', 'static/images/FondEcran.jpg');
        vPlayerBackground.style.height = '100%';
        vPlayerBackground.style.width = '100%';

        vPlayersClient.drawControlPanel(vOuterBrdrWindowList, vWindowList, webSocketConnection);
    });
    // -------------------------------------------------------------------------
    // Création et Affichage l'ensemble des pilules du joueurs qui ont été instanciées, 
    // initialisées et envoyées par le serveur et creation du cadre des données 
    // du joueurs et de son avatar
    // -------------------------------------------------------------------------
    webSocketConnection.on('drawPils', function(pPlayerData){
        var vCurrentPlayer = 'player'+pPlayerData.currentPlayer; 

        vPlayersClient.indexCurrentPlayer = vCurrentPlayer; 
        vPlayersClient.currentPlayer = pPlayerData.currentPlayer; 
        vPlayersClient.isItMe = pPlayerData.isItMe; 
        if (vPlayersClient.isItMe){
            vPlayersClient.myClientPlayer = vPlayersClient.indexCurrentPlayer;      // Identification de cette session-client car toutes les donnees type                       
                                                                                    // "CurrentPlayer" evoluent avec les nouvelles sessions
            vPlayersClient.myNumPlayer = vPlayersClient.currentPlayer;
        }
        vPlayersClient.maxPlayers = pPlayerData.maxPlayers; 
        vPlayersClient.maxPilsByPlayer = pPlayerData.maxPilsByPlayer; 
        vPlayersClient[vCurrentPlayer].pseudo= pPlayerData.objectPlayer[vCurrentPlayer].pseudo;
        vPlayersClient[vCurrentPlayer].totalPlayedTime= pPlayerData.objectPlayer[vCurrentPlayer].totalPlayedTime;

        vPlayersClient[vCurrentPlayer].couleur= pPlayerData.objectPlayer[vCurrentPlayer].couleur;
        vPlayersClient[vCurrentPlayer].avatar= pPlayerData.objectPlayer[vCurrentPlayer].avatar;
        vPlayersClient[vCurrentPlayer].pilsNonMangeesRestantes = pPlayerData.maxPilsByPlayer;

        for (var i=0; i<=vPlayersClient.maxPilsByPlayer-1; i++){
            vPlayersClient[vCurrentPlayer].pils[i] = window.document.createElement('div');   // Création physique dynamique et ajout au DOM de chaque pilule
            window.document.body.appendChild(vPlayersClient[vCurrentPlayer].pils[i]);     
            vPlayersClient[vCurrentPlayer].pils[i].setAttribute('class', 'pils');
            
            vPlayersClient[vCurrentPlayer].pils[i].style.zIndex= pPlayerData.objectPlayer[vCurrentPlayer].pils[i].zIndex;
            vPlayersClient[vCurrentPlayer].pils[i].style.backgroundImage= 'url("'+pPlayerData.objectPlayer[vCurrentPlayer].fichier+'")';
            vPlayersClient[vCurrentPlayer].pils[i].style.left= pPlayerData.objectPlayer[vCurrentPlayer].pils[i].left;
            vPlayersClient[vCurrentPlayer].pils[i].style.top = pPlayerData.objectPlayer[vCurrentPlayer].pils[i].top;
            vPlayersClient[vCurrentPlayer].pils[i].style.transform='rotate('+(pPlayerData.objectPlayer[vCurrentPlayer].pils[i].orientation)+'deg)';
            vPlayersClient[vCurrentPlayer].pils[i].mangee = pPlayerData.objectPlayer[vCurrentPlayer].pils[i].mangee;
        }           
        vPlayersClient.drawPlayerFrame();           // dessine le cadre du joueur avec son pseudo, son avatar, et son score
        vPlayersClient.drawAvatarToken();           // Dessine le jeton du joueur (qui sera en fait le nouveau curseur de la souris)
    });
    // -------------------------------------------------------------------------
    // Suppression et effacement de l'ensemble des pilules du joueurs qui s'est déconnecté 
    // -------------------------------------------------------------------------
    webSocketConnection.on('erasePils', function(pPlayerData){
        var vCurrentPlayer = 'player'+pPlayerData.currentPlayer;   
        
        for (var i=0; i<=pPlayerData.maxPilsByPlayer-1; i++){
            vPlayersClient[vCurrentPlayer].pils[i].parentNode.removeChild(vPlayersClient[vCurrentPlayer].pils[i]);
        }

        vPlayersClient[vCurrentPlayer].avatarToken.parentNode.removeChild(vPlayersClient[vCurrentPlayer].avatarToken);
        vPlayersClient[vCurrentPlayer].containerAvatarToken.parentNode.removeChild(vPlayersClient[vCurrentPlayer].containerAvatarToken);
        vPlayersClient[vCurrentPlayer].timerFrame.parentNode.removeChild(vPlayersClient[vCurrentPlayer].timerFrame);
        vPlayersClient[vCurrentPlayer].counterFrame.parentNode.removeChild(vPlayersClient[vCurrentPlayer].counterFrame);
        vPlayersClient[vCurrentPlayer].pseudoFrame.parentNode.removeChild(vPlayersClient[vCurrentPlayer].pseudoFrame);
        vPlayersClient[vCurrentPlayer].avatarFrame.parentNode.removeChild(vPlayersClient[vCurrentPlayer].avatarFrame);
        vPlayersClient[vCurrentPlayer].playerFrame.parentNode.removeChild(vPlayersClient[vCurrentPlayer].playerFrame);
    });
    // ------------------------------------------------------------
    // Le serveur a demandé les caractéristiques physiques de l'écran
    // Obtention et Transmission des caractéristiques de l'écran du client  
    // au serveur pour qu il puisse calculer aléatoirement la position des pilules
    // ------------------------------------------------------------
    webSocketConnection.on('askScreenSize', function(){
        vToolBox.getScreenSize();
        
        var vDataScreenSize = 
        {
        vScreenHeight: vToolBox.screenHeight,
        vScreenWidth : vToolBox.screenWidth,
        }
        webSocketConnection.emit('receiveScreenSize', vDataScreenSize);
    });
    // --------------------------------------------------------------
    // Gestion de la capture du jeton du joueur et attachement à la souris
    // puis Gestion du déplacement de la souris et collecte des pils
    // --------------------------------------------------------------
    webSocketConnection.on('playAndEatPils', function(){   
        vPlayersClient.selectNextPilsToEat(webSocketConnection);
        window.addEventListener('mousemove', vPlayersClient.playAndEatPils.bind(vPlayersClient, webSocketConnection));
    });
    // --------------------------------------------------------------
    // Actualisation de la position du token du joueur envoyé en paramètre
    // --------------------------------------------------------------
    webSocketConnection.on('refreshToken', function(pMyToken){   
        vPlayersClient[pMyToken.monClientPlayer].containerAvatarToken.style.left = pMyToken.left;
        vPlayersClient[pMyToken.monClientPlayer].containerAvatarToken.style.top = pMyToken.top;
    });
    // --------------------------------------------------------------
    // Mise en evidence de la prochaine Pils a manger, du joueur envoyé en paramètre
    // --------------------------------------------------------------
    webSocketConnection.on('showNextPilsToEat', function(pMyPils){ 
        vPlayersClient.showNextPilsToEat(pMyPils);
    });
    // --------------------------------------------------------------
    // Mise en evidence de la prochaine Pils a manger, du joueur envoyé en paramètre
    // --------------------------------------------------------------
    webSocketConnection.on('hideEatedPils', function(pMyPils){ 
        vPlayersClient.hideEatedPils(pMyPils);
    });
    // --------------------------------------------------------------
    // Ajoute 1 seconde au temps total du joueur
    // --------------------------------------------------------------
    webSocketConnection.on('addOneSecond', function(){  
        vPlayersClient.addOneSecond(webSocketConnection);
    });
    // --------------------------------------------------------------
    // Met à jour le temps passé sur le client courant
    // --------------------------------------------------------------
    webSocketConnection.on('refreshElapsedTime', function(pMyTotalTime){  
        vPlayersClient.refreshElapsedTime(pMyTotalTime);
    });
    // --------------------------------------------------------------
    // Réception de la liste des joueurs pour affichage
    // --------------------------------------------------------------
    webSocketConnection.on('displayPlayersList', function(pDocuments){  
        vPlayersClient.displayPlayersList(vWindowList, pDocuments);
    });
    // -------------------------------------------------------------------------
    // Envoi des infos de login du client lorsque la saisie est validée syntaxiquement 
    // par appel du check provoqué la Form par la validation globale de celle-ci
    // -------------------------------------------------------------------------
    vLoginForm = window.document.getElementById('idLoginForm');
    vLoginForm.addEventListener('submit', function (event){ 
        event.preventDefault();                
    
        var pseudoOk = vPlayersClient.checkPseudo(vLoginForm.pseudo);
        var playerLoginData = 
        {
            pseudo : vLoginForm.pseudo.value,
        }
        if (pseudoOk){
            webSocketConnection.emit('playerLoginData', playerLoginData);
            vLoginForm.style.display='none';
        }
    });
    // -------------------------------------------------------------------------
    // Initialisations
    // -------------------------------------------------------------------------
    vToolBox = new ToolBox();
    var vPlayersClient = new PlayersClient();       // Instanciation de l'objet descrivant l'ensemble des joueurs et les méthodes de gestion de ces joueurs

    var vBtnImgBtnListMainScreen = document.getElementById('idImgBtnList');
    var vBtnImgBtnDisclaimer = document.getElementById('idBtnImgBtnDisclaimer');
    var vOuterBrdrWindowList = document.getElementById('idOuterBrdrWindowList');
    var vWindowList = document.getElementById('idWindowList');
    
    var vPalmares = document.getElementById('idPalmares');
    var vGameRules = document.getElementById('idGameRules');
    
    window.addEventListener('keydown',vPlayersClient.hidePalmaresAndRules.bind(vPlayersClient,vOuterBrdrWindowList,vWindowList));   
    
    vBtnImgBtnListMainScreen.addEventListener('click', function(){
        vPlayersClient.askPlayersList(vOuterBrdrWindowList, vWindowList, webSocketConnection);
    });    
    vBtnImgBtnDisclaimer.addEventListener('click', function(){
        vPlayersClient.displayDisclaimer(vOuterBrdrWindowList, vWindowList, webSocketConnection);
    });    
});        
// -----------------------------------------------------------------------------
