'use strict'
// ********************************************************************* //
// *                                                                   * //
// *       "Collect'Or" - Octobre-Novembre 2018                        * //
// *                                                                   * //
// ********************************************************************* //
// *                                                                   * //
// *   Dominique Hourdequin - Octobre 2018                             * //
// *   Projet N°3 - Type "Full Stack"                                    * //
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
    webSocketConnection = io();
    // var webSocketConnection = io('http://192.168.0.20:3000');        // Endormi car je ne veux pas utiliser une adresse IP en dur
    // var webSocketConnection = io('http://localhost:3000');           // Endormi car je veux pouvoir travailler sur plusieurs ordi

    // -------------------------------------------------------------------------
    // La partie est pleine, un message prévient le joueur 
    // -------------------------------------------------------------------------
    webSocketConnection.on('alertPartyFull', function(){
        // vMemberClient.adviseWithButton('La partie est pleine, revenez plus tard', 'Recommencer', vMemberClient.restartLogin);
    });
    // -------------------------------------------------------------------------
    // Le joueur qui essaie de se connecter est deja dans la partie
    // -------------------------------------------------------------------------
    webSocketConnection.on('playerAlreadyInGame', function(){
        // vMemberClient.adviseWithButton('Vous êtes déjà dans la partie dans une autre session','Recommencer', vMemberClient.restartLogin);
    });
    // -------------------------------------------------------------------------
    // La partie a déjà commencée et le joueur potentiel est refoulé
    // -------------------------------------------------------------------------
    webSocketConnection.on('partyAlreadyStarted', function(){
        // vMemberClient.adviseWithButton('La partie a déjà débuté, revenez plus tard','Recommencer', vMemberClient.restartLogin);
    });
    // -------------------------------------------------------------------------
    // On notifie au joueur qu'il est le Maître de la partie
    // -------------------------------------------------------------------------
    webSocketConnection.on('masterOfGame', function(pMyPlayer){
        // vMemberClient.adviseWithButton('Vous êtes le Maître de la partie et avez le privilège de la lancer','Démarrer la partie',vMemberClient.launchGame, pMyPlayer, webSocketConnection);
    });
    // -------------------------------------------------------------------------
    // On previent le joueur que le jeu va demartrer dans n secondes
    // -------------------------------------------------------------------------
    webSocketConnection.on('adviseStartGame', function(){
        // vMemberClient.vCompteARebours = vMemberClient.compteARebours;
        // vMemberClient.displayAdvise('Le jeu va démarrer dans '+vMemberClient.vCompteARebours+' secondes'); 

        // vMemberClient.refreshCompteARebours = setInterval(function(){
        //     vMemberClient.playCompteARebours(webSocketConnection)
        // },1000);
    });
    // -------------------------------------------------------------------------
    // On notifie au joueur qu'il est une gros Looser et qu'iol ferait meix d'aller 
    // se cacher sous une plaque d'égout
    // -------------------------------------------------------------------------
    webSocketConnection.on('youLost', function(){
        // vMemberClient.clearParty();
        // vMemberClient.adviseWithButton('Défaite !!!! Vous avez perdu','recommencer',vMemberClient.restartLogin);
    });
    // -------------------------------------------------------------------------
    // On demande aux joueurs d'envoyer leurs stats de jeu
    // -------------------------------------------------------------------------
    webSocketConnection.on('askPartyData', function(){
        // vMemberClient.sendPartyData(webSocketConnection);
    });
    // -------------------------------------------------------------------------
    // Le serveur a sollicité la saisie du Login du joueur qui vient de se connecter
    // Affichage du formulaire de saisie et envoi lorsque la saisie est validée 
    // syntaxiquement par appel des checks directement par les champs et la Form 
    // provoqués par évenement de sortie du champ, ou validation globale de la Form
    // -------------------------------------------------------------------------
    webSocketConnection.on('callLoginForm', function(){
        // vLoginForm.style.display='block';
    });
    // -------------------------------------------------------------------------
    // Affiche le fond d'écran bigaré, et le panneau de contrôle
    // -------------------------------------------------------------------------
    webSocketConnection.on('drawGameBackground', function(){
        // vBtnImgBtnListMainScreen.style.display = 'none';
        // vBtnImgBtnDisclaimer.style.display = 'none';
        // vPalmares.style.display = 'none';
        // vGameRules.style.display = 'none';;
    

        // var vPlayerBackground = window.document.createElement('img');   
        // window.document.body.appendChild(vPlayerBackground);     
        // vPlayerBackground.setAttribute('src', 'static/images/FondEcran.jpg');
        // vPlayerBackground.style.height = '100%';
        // vPlayerBackground.style.width = '100%';

        // vMemberClient.drawControlPanel(vOuterBrdrWindowList, vWindowList, webSocketConnection);
    });
    // -------------------------------------------------------------------------
    // Création et Affichage l'ensemble des pilules du joueurs qui ont été instanciées, 
    // initialisées et envoyées par le serveur et creation du cadre des données 
    // du joueurs et de son avatar
    // -------------------------------------------------------------------------
    webSocketConnection.on('drawPils', function(pPlayerData){
        // var vCurrentPlayer = 'player'+pPlayerData.currentPlayer; 

        // vMemberClient.indexCurrentPlayer = vCurrentPlayer; 
        // vMemberClient.currentPlayer = pPlayerData.currentPlayer; 
        // vMemberClient.isItMe = pPlayerData.isItMe; 
        // if (vMemberClient.isItMe){
        //     vMemberClient.myClientPlayer = vMemberClient.indexCurrentPlayer;      // Identification de cette session-client car toutes les donnees type                       
        //                                                                             // "CurrentPlayer" evoluent avec les nouvelles sessions
        //     vMemberClient.myNumPlayer = vMemberClient.currentPlayer;
        // }
        // vMemberClient.maxPlayers = pPlayerData.maxPlayers; 
        // vMemberClient.maxPilsByPlayer = pPlayerData.maxPilsByPlayer; 
        // vMemberClient[vCurrentPlayer].pseudo= pPlayerData.objectPlayer[vCurrentPlayer].pseudo;
        // vMemberClient[vCurrentPlayer].totalPlayedTime= pPlayerData.objectPlayer[vCurrentPlayer].totalPlayedTime;

        // vMemberClient[vCurrentPlayer].couleur= pPlayerData.objectPlayer[vCurrentPlayer].couleur;
        // vMemberClient[vCurrentPlayer].avatar= pPlayerData.objectPlayer[vCurrentPlayer].avatar;
        // vMemberClient[vCurrentPlayer].pilsNonMangeesRestantes = pPlayerData.maxPilsByPlayer;

        // for (var i=0; i<=vMemberClient.maxPilsByPlayer-1; i++){
        //     vMemberClient[vCurrentPlayer].pils[i] = window.document.createElement('div');   // Création physique dynamique et ajout au DOM de chaque pilule
        //     window.document.body.appendChild(vMemberClient[vCurrentPlayer].pils[i]);     
        //     vMemberClient[vCurrentPlayer].pils[i].setAttribute('class', 'pils');
            
        //     vMemberClient[vCurrentPlayer].pils[i].style.zIndex= pPlayerData.objectPlayer[vCurrentPlayer].pils[i].zIndex;
        //     vMemberClient[vCurrentPlayer].pils[i].style.backgroundImage= 'url("'+pPlayerData.objectPlayer[vCurrentPlayer].fichier+'")';
        //     vMemberClient[vCurrentPlayer].pils[i].style.left= pPlayerData.objectPlayer[vCurrentPlayer].pils[i].left;
        //     vMemberClient[vCurrentPlayer].pils[i].style.top = pPlayerData.objectPlayer[vCurrentPlayer].pils[i].top;
        //     vMemberClient[vCurrentPlayer].pils[i].style.transform='rotate('+(pPlayerData.objectPlayer[vCurrentPlayer].pils[i].orientation)+'deg)';
        //     vMemberClient[vCurrentPlayer].pils[i].mangee = pPlayerData.objectPlayer[vCurrentPlayer].pils[i].mangee;
        // }           
        // vMemberClient.drawPlayerFrame();           // dessine le cadre du joueur avec son pseudo, son avatar, et son score
        // vMemberClient.drawAvatarToken();           // Dessine le jeton du joueur (qui sera en fait le nouveau curseur de la souris)
    });
    // -------------------------------------------------------------------------
    // Suppression et effacement de l'ensemble des pilules du joueurs qui s'est déconnecté 
    // -------------------------------------------------------------------------
    webSocketConnection.on('erasePils', function(pPlayerData){
        // var vCurrentPlayer = 'player'+pPlayerData.currentPlayer;   
        
        // for (var i=0; i<=pPlayerData.maxPilsByPlayer-1; i++){
        //     vMemberClient[vCurrentPlayer].pils[i].parentNode.removeChild(vMemberClient[vCurrentPlayer].pils[i]);
        // }

        // vMemberClient[vCurrentPlayer].avatarToken.parentNode.removeChild(vMemberClient[vCurrentPlayer].avatarToken);
        // vMemberClient[vCurrentPlayer].containerAvatarToken.parentNode.removeChild(vMemberClient[vCurrentPlayer].containerAvatarToken);
        // vMemberClient[vCurrentPlayer].timerFrame.parentNode.removeChild(vMemberClient[vCurrentPlayer].timerFrame);
        // vMemberClient[vCurrentPlayer].counterFrame.parentNode.removeChild(vMemberClient[vCurrentPlayer].counterFrame);
        // vMemberClient[vCurrentPlayer].pseudoFrame.parentNode.removeChild(vMemberClient[vCurrentPlayer].pseudoFrame);
        // vMemberClient[vCurrentPlayer].avatarFrame.parentNode.removeChild(vMemberClient[vCurrentPlayer].avatarFrame);
        // vMemberClient[vCurrentPlayer].playerFrame.parentNode.removeChild(vMemberClient[vCurrentPlayer].playerFrame);
    });
    // ------------------------------------------------------------
    // Le serveur a demandé les caractéristiques physiques de l'écran
    // Obtention et Transmission des caractéristiques de l'écran du client  
    // au serveur pour qu il puisse calculer aléatoirement la position des pilules
    // ------------------------------------------------------------
    webSocketConnection.on('askScreenSize', function(){
        // vToolBox.getScreenSize();
        
        // var vDataScreenSize = 
        // {
        // vScreenHeight: vToolBox.screenHeight,
        // vScreenWidth : vToolBox.screenWidth,
        // }
        // webSocketConnection.emit('receiveScreenSize', vDataScreenSize);
    });
    // --------------------------------------------------------------
    // Gestion de la capture du jeton du joueur et attachement à la souris
    // puis Gestion du déplacement de la souris et collecte des pils
    // --------------------------------------------------------------
    webSocketConnection.on('playAndEatPils', function(){   
        // vMemberClient.selectNextPilsToEat(webSocketConnection);
        // window.addEventListener('mousemove', vMemberClient.playAndEatPils.bind(vMemberClient, webSocketConnection));
    });
    // --------------------------------------------------------------
    // Actualisation de la position du token du joueur envoyé en paramètre
    // --------------------------------------------------------------
    webSocketConnection.on('refreshToken', function(pMyToken){   
        // vMemberClient[pMyToken.monClientPlayer].containerAvatarToken.style.left = pMyToken.left;
        // vMemberClient[pMyToken.monClientPlayer].containerAvatarToken.style.top = pMyToken.top;
    });
    // --------------------------------------------------------------
    // Mise en evidence de la prochaine Pils a manger, du joueur envoyé en paramètre
    // --------------------------------------------------------------
    webSocketConnection.on('showNextPilsToEat', function(pMyPils){ 
        // vMemberClient.showNextPilsToEat(pMyPils);
    });
    // --------------------------------------------------------------
    // Mise en evidence de la prochaine Pils a manger, du joueur envoyé en paramètre
    // --------------------------------------------------------------
    webSocketConnection.on('hideEatedPils', function(pMyPils){ 
        // vMemberClient.hideEatedPils(pMyPils);
    });
    // --------------------------------------------------------------
    // Ajoute 1 seconde au temps total du joueur
    // --------------------------------------------------------------
    webSocketConnection.on('addOneSecond', function(){  
        // vMemberClient.addOneSecond(webSocketConnection);
    });
    // --------------------------------------------------------------
    // Met à jour le temps passé sur le client courant
    // --------------------------------------------------------------
    webSocketConnection.on('refreshElapsedTime', function(pMyTotalTime){  
        // vMemberClient.refreshElapsedTime(pMyTotalTime);
    });
    // --------------------------------------------------------------
    // Réception de la liste des joueurs pour affichage
    // --------------------------------------------------------------
    webSocketConnection.on('displayPlayersList', function(pDocuments){  
        // vMemberClient.displayPlayersList(vWindowList, pDocuments);
    });














    // -------------------------------------------------------------------------
    // Initialisations
    // Recupération des Elements du DOM nécessaires
    // Mise en oeuvre des captures d'évenements nécessaires
    // Prépositionnement (Focus) sur les champs des différentes fenêtres modales
    // Réinitialisations des valeurs des champs de saisies des différentes fenêtres
    // -------------------------------------------------------------------------
    vToolBox = new ToolBox();
    var vMemberClient = new MemberClient();       // Instanciation de l'objet descrivant un Membre et les méthodes de gestion de ce Membre
    
    // -------------------------------------------------------------------------
    // Eléments de menu
    // -------------------------------------------------------------------------
    var vConnexion = document.getElementById('idConnexion');
    var vCreation = document.getElementById('idCreation');
    var vDeconnexion = document.getElementById('idDeconnexion');
    var vGenericModal = document.getElementById('idGenericModal');
    var vDropDownProfilMenu = document.getElementById('idDropDownProfilMenu');
    var vMemberName = document.getElementById('idMemberName');
    var vNbrPopulation = document.getElementById('idNbrPopulation');



    // -------------------------------------------------------------------------
    // Eléments de la fenêtre modale générique
    // Initialisation du texte de la fenetre modale en mode "A propos" (par défaut 
    // et également en cas de réaction au "Click")
    // -------------------------------------------------------------------------
    var vGenericModalHeader = document.getElementById('idGenericModalHeader');
    var vGenericModalTitle = document.getElementById('idGenericModalTitle');
    var vGenericModalBodyText = document.getElementById('idGenericModalBodyText');
    
    vMemberClient.InitHeaderColor('bg-warning', vGenericModalHeader);
    vMemberClient.initModalTextAboutMode(vGenericModalTitle, vGenericModalBodyText);                       

    vGenericModal.addEventListener('click', function(){
        vMemberClient.InitHeaderColor('bg-warning', vGenericModalHeader);
        vMemberClient.initModalTextAboutMode(vGenericModalTitle, vGenericModalBodyText);                     
    });

    // -------------------------------------------------------------------------
    // Eléments de champs de saisie de la Form de Login
    // -------------------------------------------------------------------------
    var vLoginForm = document.getElementById('idLoginForm');
    var vLostPWD = document.getElementById('idLostPWD');
    var vSignIn = document.getElementById('idSignIn');
    var vLoginAlertMsg = document.getElementById('idLoginAlertMsg');
    var vModalLoginHeader = document.getElementById('idModalLoginHeader');
    
    vMemberClient.giveFocusToModalFirstField('idModalLogin', 'idLoginPseudo');            // Donne le Focus au 1er champ de la Form
    vMemberClient.giveFocusToModalFirstField('idModalLostPWD', 'idLostPWDEmail');

    idConnexion.addEventListener('click', function(){
        vLoginForm.idLoginPseudo.value = '';                                 
        vLoginForm.idLoginPassword.value = '';
        vLoginAlertMsg.style.visibility = 'hidden';  
        vMemberClient.InitHeaderColor('bg-warning', vModalLoginHeader);
    });


    // -------------------------------------------------------------------------
    // Eléments de champs de saisie de la Form de Création de compte (SignIn)
    // -------------------------------------------------------------------------
    var vSignInForm = document.getElementById('idSignInForm');
    var vModalSignInHeader = document.getElementById('idModalSignInHeader');
    var vSignInAlertMsg = document.getElementById('idSignInAlertMsg');
    var vSignInPassword = document.getElementById('idSignInPassword');
    var vSignInConfirmPassword = document.getElementById('idSignInConfirmPassword');
    
    vMemberClient.giveFocusToModalFirstField('idModalSignIn', 'idSignInEmail');                                               

    vCreation.addEventListener('click', function(){
        initModalSignIn(vSignInForm, vSignInAlertMsg, vModalSignInHeader);
    });

    vSignInPassword.onchange = function(){vMemberClient.validatePassword(vSignInPassword, vSignInConfirmPassword)};           // Vérification que les MDP sont identiques
    vSignInConfirmPassword.onkeyup = function(){vMemberClient.validatePassword(vSignInPassword, vSignInConfirmPassword)};     //

    // -------------------------------------------------------------------------
    // Eléments de champs de saisie de la Form de renseignements (Compte)
    // -------------------------------------------------------------------------
    // var vCompteForm = document.getElementById('idCompteForm');
    var vCompte = document.getElementById('idCompte');
    var vModalCompteHeader = document.getElementById('idModalCompteHeader');
    var vCompteAlertMsg = document.getElementById('idCompteAlertMsg');
    // var vComptePassword = document.getElementById('idComptePassword');
    // var vCompteConfirmPassword = document.getElementById('idCompteConfirmPassword');
    
    // vMemberClient.giveFocusToModalFirstField('idModalCompte', 'idCompteEmail');                                               

    vCompte.addEventListener('click', function(){
        // initModalCompte(vCompteForm, vCompteAlertMsg, vModalCompteHeader);
        initModalCompte(vCompteAlertMsg, vModalCompteHeader);
    });

    // vComptePassword.onchange = function(){vMemberClient.validatePassword(vComptePassword, vCompteConfirmPassword)};           // Vérification que les MDP sont identiques
    // vCompteConfirmPassword.onkeyup = function(){vMemberClient.validatePassword(vComptePassword, vSignInConfirmPassword)};     //

    // -------------------------------------------------------------------------
    // Gestion du raccourci de la création de compte
    // -------------------------------------------------------------------------
    vSignIn.addEventListener('click', function(){
        initModalSignIn(vSignInForm, vSignInAlertMsg, vModalSignInHeader);
        $('#idModalLogin').modal('toggle');                                 // Fermeture de la fenêtre modale de Login
        $('#idModalSignIn').modal('toggle');                               // Ouverture de la fenêtre modale de gestion de PWD perdu
    });
    // -------------------------------------------------------------------------
    // Gestion du raccourci de Mot de Passe oublié
    // -------------------------------------------------------------------------
    var vLostPWDForm = document.getElementById('idLostPWDForm');
    var vModalLostPWDHeader = document.getElementById('idModalLostPWDHeader');
    var vLostPWDAlertMsg = document.getElementById('idLostPWDAlertMsg');

    vLostPWD.addEventListener('click', function(){
        vLostPWDForm.idLostPWDEmail.value = '';
        vLostPWDAlertMsg.style.visibility = 'hidden';                       // Cache du message d'alerte de saisie d'email erroné
        vMemberClient.InitHeaderColor('bg-warning', vModalLostPWDHeader);
        $('#idModalLogin').modal('toggle');                                 // Fermeture de la fenêtre modale de Login
        $('#idModalLostPWD').modal('toggle');                               // Ouverture de la fenêtre modale de gestion de PWD perdu
    });
    // -------------------------------------------------------------------------
    // Demande du Mot de passe
    // Envoi des infos de récupération du Mot de Passe lorsque la saisie du mail 
    // est validée syntaxiquement et par la validation globale de celle-ci
    // -------------------------------------------------------------------------
    vLostPWDForm.addEventListener('submit', function (event){ 
        event.preventDefault();                
        webSocketConnection.emit('LostPWDMgr', vLostPWDForm.idLostPWDEmail.value);   // Transmission au serveur des infos saisies
        $('#idModalLostPWD').modal('toggle');                                        // Fermeture de la fenêtre modale de Login
    });
    // -------------------------------------------------------------------------
    // Déconnexion
    // -------------------------------------------------------------------------
    vDeconnexion.addEventListener('click', function(){
        vMemberClient.restartLandingPage();
    });
    // -------------------------------------------------------------------------
    // Login
    // Envoi des infos de login du visiteur lorsque la saisie du Login est validée 
    // syntaxiquement et par la validation globale de celle-ci
    // -------------------------------------------------------------------------
    vLoginForm.addEventListener('submit', function (event){ 
        event.preventDefault();                

        var visiteurLoginData =                                     // Mise en forme pour transmission au serveur des données saisies
            {
                pseudo : vLoginForm.idLoginPseudo.value,
                password : vLoginForm.idLoginPassword.value,
            }

        webSocketConnection.emit('visiteurLoginData', visiteurLoginData);   // Transmission au serveur des infos saisies
        
        $('#idModalLogin').modal('toggle');                                 // Fermeture de la fenêtre modale de Login
        vLoginAlertMsg.style.visibility = 'hidden';  
    });
    // -------------------------------------------------------------------------
    // Sign-In
    // Envoi des infos de création du visiteur lorsque la Création de compte est 
    // validée syntaxiquement et par la validation globale de celle-ci
    // -------------------------------------------------------------------------
    vSignInForm.addEventListener('submit', function (event){ 
        event.preventDefault();                

        var visiteurSignInData =                                     // Mise en forme pour transmission au serveur des données saisies
            {
                email : vSignInForm.idSignInEmail.value,
                pseudo : vSignInForm.idSignInPseudo.value,
                password : vSignInForm.idSignInPassword.value,
            }

        webSocketConnection.emit('visiteurSignInData', visiteurSignInData);     // Transmission au serveur des infos saisies
        $('#idModalSignIn').modal('toggle');                                    // Fermeture de la fenêtre modale de Sign-In
        vSignInAlertMsg.style.visibility = 'hidden';                               // Affichage du message d'alerte de connexion erronée
    });







    // ================================= Reception des messages en provenance du serveur =================================================
    // --------------------------------------------------------------
    // Le serveur a rejeté le mail de Mot de passe perdu, et redemande 
    // au visiteur de le resaisir
    // --------------------------------------------------------------
    webSocketConnection.on('retryLostPWDForm', function(){   
        vLostPWDAlertMsg.style.visibility = 'visible';                                 // Affichage du message d'alerte de saisie d'email erroné
        vMemberClient.InitHeaderColor('bg-danger', vModalLostPWDHeader);
        setTimeout(function(){$("#idModalLostPWD").modal('toggle')},300);             // Obligation de temporiser la réouverture sinon ça ne marche pas
    });
    // --------------------------------------------------------------
    // Le serveur a rejeté la demande Login, et redemande au visiteur 
    // de réessayer de se loger
    // --------------------------------------------------------------
    webSocketConnection.on('retryLoginForm', function(){   
        vLoginAlertMsg.style.visibility = 'visible';                                 // Affichage du message d'alerte de connexion erronée
        vMemberClient.InitHeaderColor('bg-danger', vModalLoginHeader);
        setTimeout(function(){$("#idModalLogin").modal('toggle')},300);              // Obligation de temporiser la réouverture sinon ça ne marche pas
    });
    // --------------------------------------------------------------
    // Le serveur a rejeté la demande Signin, et redemande au visiteur 
    // de resaisir ses infos de Sign-In
    // --------------------------------------------------------------
    webSocketConnection.on('retrySignInForm', function(){   
        vSignInAlertMsg.style.visibility = 'visible';                               // Affichage du message d'alerte de connexion erronée
        vMemberClient.InitHeaderColor('bg-danger', vModalSignInHeader);
        setTimeout(function(){$("#idModalSignIn").modal('toggle')},300);           // Obligation de temporiser la réouverture sinon ça ne marche pas
    });
    // --------------------------------------------------------------
    // Le visiteur s'est loggé avec succès et est donc reconnu comme membre
    // ==> Désactivation du bouton "Connexion"
    // ==> Désactivation du bouton "Créer un compte"
    // ==> Activation du bouton "Deconnexion"
    // --------------------------------------------------------------
    webSocketConnection.on('welcomeMember', function(pMember){   
        vMemberClient.member =  pMember;                                                // Affecte les données du membre à l'objet "Membre"
        vMemberClient.initModalHelloText(vGenericModalTitle, vGenericModalBodyText, pMember.pseudo);  // Affiche la fenêtre de bienvenue
        vMemberClient.InitHeaderColor('bg-success', vGenericModalHeader);
        $('#idGenericModal').modal('toggle');                                           // ouverture de la fenêtre modale de Félicitations
        vMemberClient.disableLoginAndCreateBtn(vConnexion, vCreation, vDropDownProfilMenu, vMemberName, vMemberClient.member.pseudo, vDeconnexion);   // Desactive Bouton Login et Création
    });
    // --------------------------------------------------------------
    // Le visiteur a créé son compte avec succès et est donc reconnu comme membre
    // Message d'accueil et de Bienvenue
    // ==> Désactivation du bouton "Connexion"
    // ==> Désactivation du bouton "Créer un compte"
    // ==> Activation du bouton "Deconnexion"
    // --------------------------------------------------------------
    webSocketConnection.on('congratNewMember', function(pMember){ 
        vMemberClient.member =  pMember;                                                // Affecte les données du membre à l'objet "Membre"
        vMemberClient.initModalWelcomeText(vGenericModalTitle, vGenericModalBodyText, pMember.pseudo);                // Affiche la fenêtre de bienvenue
        vMemberClient.InitHeaderColor('bg-success', vGenericModalHeader);
        $('#idGenericModal').modal('toggle');                                           // ouverture de la fenêtre modale de Félicitations
        vMemberClient.disableLoginAndCreateBtn(vConnexion, vCreation, vDropDownProfilMenu, vMemberName, vMemberClient.member.pseudo, vDeconnexion);   // Desactive Bouton Login et Création
    });    
    // --------------------------------------------------------------
    // Le visiteur a demandé un nouveau mot de passe
    // Message de notification de renouvellement du PWD
    // --------------------------------------------------------------
    webSocketConnection.on('notifyNewPWDSent', function(){ 
        vMemberClient.InitHeaderColor('bg-success', vGenericModalHeader);
        vMemberClient.initModalNewPWDText(vGenericModalTitle, vGenericModalBodyText);               // Affiche la fenêtre de notification
        $('#idGenericModal').modal('toggle');                                                       // ouverture de la fenêtre modale de notification
    });    
    // --------------------------------------------------------------
    // Le serveur a rejeté la demande Login, car le visiteur est dejà 
    // coonnecté avec une autre session
    // --------------------------------------------------------------
    webSocketConnection.on('memberAlreadyConnected', function(pMember){ 
        vMemberClient.initModalAlreadyConnectedText(vGenericModalTitle, vGenericModalBodyText);     // Affiche la fenêtre de bienvenue
        vMemberClient.InitHeaderColor('bg-danger', vGenericModalHeader);
        $('#idGenericModal').modal('toggle');                                                       // ouverture de la fenêtre modale de Félicitations
    });    
    // --------------------------------------------------------------
    // Le serveur a rejeté la demande Login, car le visiteur est dejà 
    // coonnecté avec une autre session
    // --------------------------------------------------------------
    webSocketConnection.on('displayNbrConnectedMembers', function(pPopulation){ 
        // let vNbrAdmin = pPopulation.nbreAdmins;
        // let vNbrMembers = pPopulation.nbreMembers - vNbrAdmin;
        // let vNbrVisitors   = pPopulation.nbreVisitors - (vNbrMembers + pPopulation.nbreAdmins);

        // // Affichage du nombre de visiteurs connectés sur la barre de menu
        // vNbrPopulation.innerHTML    = vNbrVisitors < 2 
        //                             ? vNbrVisitors + ' visiteur'        
        //                             : vNbrVisitors + ' visiteurs'      

        // vNbrPopulation.innerHTML += ', ';

        // vNbrPopulation.innerHTML    += vNbrMembers < 2 
        //                             ? vNbrMembers + ' membre'        // Affichage du nombre de membres connectés sur la barre de menu
        //                             : vNbrMembers + ' membres'      // Affichage du nombre de membres connectés sur la barre de menu

        // vNbrPopulation.innerHTML += ', ';

        // vNbrPopulation.innerHTML    += vNbrAdmin < 2 
        //                             ? vNbrAdmin + ' Admin'        // Affichage du nombre de membres connectés sur la barre de menu
        //                             : vNbrAdmin + ' Admins'      // Affichage du nombre de membres connectés sur la barre de menu

        // vNbrPopulation.innerHTML += ' sont connectés';
   
        // Affichage du nombre de visiteurs connectés sur la barre de menu
        vNbrPopulation.innerHTML    = pPopulation.nbrMembers < 2 
                                    ? pPopulation.nbrMembers + ' membre connecté - '        // Affichage du nombre de membres connectés sur la barre de menu
                                    : pPopulation.nbrMembers + ' membres connectés - ';      // Affichage du nombre de membres connectés sur la barre de menu

        vNbrPopulation.innerHTML    += pPopulation.nbrPublicMsgs < 2 
                                    ? pPopulation.nbrPublicMsgs + ' message'        // Affichage du nombre de membres connectés sur la barre de menu
                                    : pPopulation.nbrPublicMsgs + ' messages';      // Affichage du nombre de membres connectés sur la barre de menu
    });    
    // -----------------------------------------------------------------------------
    // Cette fonction initalise la modale de création, quel que soit son mode 
    // d'appel (par l'option de menu ou par le raccourci de la fenetre de Login
    // -----------------------------------------------------------------------------
    function initModalSignIn(pSignInForm, pSignInAlertMsg, pModalSignInHeader){
        pSignInForm.idSignInEmail.value = '';                                
        pSignInForm.idSignInPseudo.value = '';                              
        pSignInForm.idSignInPassword.value = '';
        pSignInForm.idSignInConfirmPassword.value = '';
        pSignInAlertMsg.style.visibility = 'hidden';                          
        vMemberClient.InitHeaderColor('bg-warning', pModalSignInHeader);
    }
    // -----------------------------------------------------------------------------
    // Cette fonction initalise la modale de saisie de rrenseignements (Compte) 
    // -----------------------------------------------------------------------------
    function initModalCompte(pCompteAlertMsg, pModalCompteHeader){
        // pCompteForm.idCompteEmail.value = '';                                
        // pCompteForm.idComptePseudo.value = '';                              
        // pCompteForm.idComptePassword.value = '';
        // pCompteForm.idCompteConfirmPassword.value = '';
        pCompteAlertMsg.style.visibility = 'hidden';                          
        vMemberClient.InitHeaderColor('bg-warning', pModalCompteHeader);
    }
    // -----------------------------------------------------------------------------
}); // Fin de la Boucle "DOMContentLoaded"
