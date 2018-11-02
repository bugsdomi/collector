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
        // vVisiteur.adviseWithButton('La partie est pleine, revenez plus tard', 'Recommencer', vVisiteur.restartLogin);
    });
    // -------------------------------------------------------------------------
    // Le joueur qui essaie de se connecter est deja dans la partie
    // -------------------------------------------------------------------------
    webSocketConnection.on('playerAlreadyInGame', function(){
        // vVisiteur.adviseWithButton('Vous êtes déjà dans la partie dans une autre session','Recommencer', vVisiteur.restartLogin);
    });
    // -------------------------------------------------------------------------
    // La partie a déjà commencée et le joueur potentiel est refoulé
    // -------------------------------------------------------------------------
    webSocketConnection.on('partyAlreadyStarted', function(){
        // vVisiteur.adviseWithButton('La partie a déjà débuté, revenez plus tard','Recommencer', vVisiteur.restartLogin);
    });
    // -------------------------------------------------------------------------
    // On notifie au joueur qu'il est le Maître de la partie
    // -------------------------------------------------------------------------
    webSocketConnection.on('masterOfGame', function(pMyPlayer){
        // vVisiteur.adviseWithButton('Vous êtes le Maître de la partie et avez le privilège de la lancer','Démarrer la partie',vVisiteur.launchGame, pMyPlayer, webSocketConnection);
    });
    // -------------------------------------------------------------------------
    // On previent le joueur que le jeu va demartrer dans n secondes
    // -------------------------------------------------------------------------
    webSocketConnection.on('adviseStartGame', function(){
        // vVisiteur.vCompteARebours = vVisiteur.compteARebours;
        // vVisiteur.displayAdvise('Le jeu va démarrer dans '+vVisiteur.vCompteARebours+' secondes'); 

        // vVisiteur.refreshCompteARebours = setInterval(function(){
        //     vVisiteur.playCompteARebours(webSocketConnection)
        // },1000);
    });
    // -------------------------------------------------------------------------
    // On notifie au joueur qu'il est une gros Looser et qu'iol ferait meix d'aller 
    // se cacher sous une plaque d'égout
    // -------------------------------------------------------------------------
    webSocketConnection.on('youLost', function(){
        // vVisiteur.clearParty();
        // vVisiteur.adviseWithButton('Défaite !!!! Vous avez perdu','recommencer',vVisiteur.restartLogin);
    });
    // -------------------------------------------------------------------------
    // On demande aux joueurs d'envoyer leurs stats de jeu
    // -------------------------------------------------------------------------
    webSocketConnection.on('askPartyData', function(){
        // vVisiteur.sendPartyData(webSocketConnection);
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

        // vVisiteur.drawControlPanel(vOuterBrdrWindowList, vWindowList, webSocketConnection);
    });
    // -------------------------------------------------------------------------
    // Création et Affichage l'ensemble des pilules du joueurs qui ont été instanciées, 
    // initialisées et envoyées par le serveur et creation du cadre des données 
    // du joueurs et de son avatar
    // -------------------------------------------------------------------------
    webSocketConnection.on('drawPils', function(pPlayerData){
        // var vCurrentPlayer = 'player'+pPlayerData.currentPlayer; 

        // vVisiteur.indexCurrentPlayer = vCurrentPlayer; 
        // vVisiteur.currentPlayer = pPlayerData.currentPlayer; 
        // vVisiteur.isItMe = pPlayerData.isItMe; 
        // if (vVisiteur.isItMe){
        //     vVisiteur.myClientPlayer = vVisiteur.indexCurrentPlayer;      // Identification de cette session-client car toutes les donnees type                       
        //                                                                             // "CurrentPlayer" evoluent avec les nouvelles sessions
        //     vVisiteur.myNumPlayer = vVisiteur.currentPlayer;
        // }
        // vVisiteur.maxPlayers = pPlayerData.maxPlayers; 
        // vVisiteur.maxPilsByPlayer = pPlayerData.maxPilsByPlayer; 
        // vVisiteur[vCurrentPlayer].pseudo= pPlayerData.objectPlayer[vCurrentPlayer].pseudo;
        // vVisiteur[vCurrentPlayer].totalPlayedTime= pPlayerData.objectPlayer[vCurrentPlayer].totalPlayedTime;

        // vVisiteur[vCurrentPlayer].couleur= pPlayerData.objectPlayer[vCurrentPlayer].couleur;
        // vVisiteur[vCurrentPlayer].avatar= pPlayerData.objectPlayer[vCurrentPlayer].avatar;
        // vVisiteur[vCurrentPlayer].pilsNonMangeesRestantes = pPlayerData.maxPilsByPlayer;

        // for (var i=0; i<=vVisiteur.maxPilsByPlayer-1; i++){
        //     vVisiteur[vCurrentPlayer].pils[i] = window.document.createElement('div');   // Création physique dynamique et ajout au DOM de chaque pilule
        //     window.document.body.appendChild(vVisiteur[vCurrentPlayer].pils[i]);     
        //     vVisiteur[vCurrentPlayer].pils[i].setAttribute('class', 'pils');
            
        //     vVisiteur[vCurrentPlayer].pils[i].style.zIndex= pPlayerData.objectPlayer[vCurrentPlayer].pils[i].zIndex;
        //     vVisiteur[vCurrentPlayer].pils[i].style.backgroundImage= 'url("'+pPlayerData.objectPlayer[vCurrentPlayer].fichier+'")';
        //     vVisiteur[vCurrentPlayer].pils[i].style.left= pPlayerData.objectPlayer[vCurrentPlayer].pils[i].left;
        //     vVisiteur[vCurrentPlayer].pils[i].style.top = pPlayerData.objectPlayer[vCurrentPlayer].pils[i].top;
        //     vVisiteur[vCurrentPlayer].pils[i].style.transform='rotate('+(pPlayerData.objectPlayer[vCurrentPlayer].pils[i].orientation)+'deg)';
        //     vVisiteur[vCurrentPlayer].pils[i].mangee = pPlayerData.objectPlayer[vCurrentPlayer].pils[i].mangee;
        // }           
        // vVisiteur.drawPlayerFrame();           // dessine le cadre du joueur avec son pseudo, son avatar, et son score
        // vVisiteur.drawAvatarToken();           // Dessine le jeton du joueur (qui sera en fait le nouveau curseur de la souris)
    });
    // -------------------------------------------------------------------------
    // Suppression et effacement de l'ensemble des pilules du joueurs qui s'est déconnecté 
    // -------------------------------------------------------------------------
    webSocketConnection.on('erasePils', function(pPlayerData){
        // var vCurrentPlayer = 'player'+pPlayerData.currentPlayer;   
        
        // for (var i=0; i<=pPlayerData.maxPilsByPlayer-1; i++){
        //     vVisiteur[vCurrentPlayer].pils[i].parentNode.removeChild(vVisiteur[vCurrentPlayer].pils[i]);
        // }

        // vVisiteur[vCurrentPlayer].avatarToken.parentNode.removeChild(vVisiteur[vCurrentPlayer].avatarToken);
        // vVisiteur[vCurrentPlayer].containerAvatarToken.parentNode.removeChild(vVisiteur[vCurrentPlayer].containerAvatarToken);
        // vVisiteur[vCurrentPlayer].timerFrame.parentNode.removeChild(vVisiteur[vCurrentPlayer].timerFrame);
        // vVisiteur[vCurrentPlayer].counterFrame.parentNode.removeChild(vVisiteur[vCurrentPlayer].counterFrame);
        // vVisiteur[vCurrentPlayer].pseudoFrame.parentNode.removeChild(vVisiteur[vCurrentPlayer].pseudoFrame);
        // vVisiteur[vCurrentPlayer].avatarFrame.parentNode.removeChild(vVisiteur[vCurrentPlayer].avatarFrame);
        // vVisiteur[vCurrentPlayer].playerFrame.parentNode.removeChild(vVisiteur[vCurrentPlayer].playerFrame);
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
        // vVisiteur.selectNextPilsToEat(webSocketConnection);
        // window.addEventListener('mousemove', vVisiteur.playAndEatPils.bind(vVisiteur, webSocketConnection));
    });
    // --------------------------------------------------------------
    // Actualisation de la position du token du joueur envoyé en paramètre
    // --------------------------------------------------------------
    webSocketConnection.on('refreshToken', function(pMyToken){   
        // vVisiteur[pMyToken.monClientPlayer].containerAvatarToken.style.left = pMyToken.left;
        // vVisiteur[pMyToken.monClientPlayer].containerAvatarToken.style.top = pMyToken.top;
    });
    // --------------------------------------------------------------
    // Mise en evidence de la prochaine Pils a manger, du joueur envoyé en paramètre
    // --------------------------------------------------------------
    webSocketConnection.on('showNextPilsToEat', function(pMyPils){ 
        // vVisiteur.showNextPilsToEat(pMyPils);
    });
    // --------------------------------------------------------------
    // Mise en evidence de la prochaine Pils a manger, du joueur envoyé en paramètre
    // --------------------------------------------------------------
    webSocketConnection.on('hideEatedPils', function(pMyPils){ 
        // vVisiteur.hideEatedPils(pMyPils);
    });
    // --------------------------------------------------------------
    // Ajoute 1 seconde au temps total du joueur
    // --------------------------------------------------------------
    webSocketConnection.on('addOneSecond', function(){  
        // vVisiteur.addOneSecond(webSocketConnection);
    });
    // --------------------------------------------------------------
    // Met à jour le temps passé sur le client courant
    // --------------------------------------------------------------
    webSocketConnection.on('refreshElapsedTime', function(pMyTotalTime){  
        // vVisiteur.refreshElapsedTime(pMyTotalTime);
    });
    // --------------------------------------------------------------
    // Réception de la liste des joueurs pour affichage
    // --------------------------------------------------------------
    webSocketConnection.on('displayPlayersList', function(pDocuments){  
        // vVisiteur.displayPlayersList(vWindowList, pDocuments);
    });














    // -------------------------------------------------------------------------
    // Initialisations
    // Recupération des Elements du DOM nécessaires
    // Mise en oeuvre des captures d'évenements nécessaires
    // Prépositionnement (Focus) sur les champs des différentes fenêtres modales
    // Réinitialisations des valeurs des champs de saisies des différentes fenêtres
    // -------------------------------------------------------------------------
    vToolBox = new ToolBox();
    var vVisiteur = new Visiteur();       // Instanciation de l'objet descrivant un visiteur et les méthodes de gestion de ce visiteur
    
    // -------------------------------------------------------------------------
    // Eléments de menu
    // -------------------------------------------------------------------------
    var vConnexion = document.getElementById('idConnexion');
    var vCreation = document.getElementById('idCreation');
    var vDeconnexion = document.getElementById('idDeconnexion');
    var vGenericModal = document.getElementById('idGenericModal');

    // -------------------------------------------------------------------------
    // Eléments de la fenêtre modale générique
    // Initialisation du texte de la fenetre modale en mode "A propos" (par défaut 
    // et également en cas de réaction au "Click")
    // -------------------------------------------------------------------------
    var vModalTitle = document.getElementById('idModalTitle');
    var vModalBodyText = document.getElementById('idModalBodyText');
    initGenericModalTextAboutMode(vModalTitle, vModalBodyText);                       

    vGenericModal.addEventListener('click', function(){
        initGenericModalTextAboutMode(vModalTitle, vModalBodyText);                     
    });

    // -------------------------------------------------------------------------
    // Eléments de champs de saisie de la Form de Login
    // -------------------------------------------------------------------------
    var vModalLogin = document.getElementById('idModalLogin');
    var vLoginForm = document.getElementById('idLoginForm');
    var vLostPWD = document.getElementById('idLostPWD');
    var vLoginAlertMsg = document.getElementById('idLoginAlertMsg');
    
    giveFocusToModalFirstField('idModalLogin', 'idLoginPseudo');            // Donne le Focus au 1er champ de la Form
    giveFocusToModalFirstField('idModalLostPWD', 'idLostPWDEmail');

    idConnexion.addEventListener('click', function(){
        vLoginForm.idLoginPseudo.value = '';                                 
        vLoginForm.idLoginPassword.value = '';
        vLoginAlertMsg.style.visibility = 'hidden';                         
    });

    // -------------------------------------------------------------------------
    // Eléments de champs de saisie de la Form de Création de compte
    // -------------------------------------------------------------------------
    var vSignInForm = document.getElementById('idSignInForm');
    var vSignInAlertMsg = document.getElementById('idSignInAlertMsg');
    var vSignInPassword = document.getElementById('idSignInPassword');
    var vSignInConfirmPassword = document.getElementById('idSignInConfirmPassword');
    
    giveFocusToModalFirstField('idModalSignIn', 'idSignInEmail');                                               

    vCreation.addEventListener('click', function(){
        vSignInForm.idSignInEmail.value = '';                                
        vSignInForm.idSignInPseudo.value = '';                              
        vSignInForm.idSignInPassword.value = '';
        vSignInForm.idSignInConfirmPassword.value = '';
        vSignInAlertMsg.style.visibility = 'hidden';                          
    });

    vSignInPassword.onchange = function(){validatePassword(vSignInPassword, vSignInConfirmPassword)};           // Vérification que les MDP sont identiques
    vSignInConfirmPassword.onkeyup = function(){validatePassword(vSignInPassword, vSignInConfirmPassword)};     //

    // -------------------------------------------------------------------------
    // Gestion du Mot de Passe oublié
    // -------------------------------------------------------------------------
    var vLostPWDForm = document.getElementById('idLostPWDForm');
    var vLostPWDAlertMsg = document.getElementById('idLostPWDAlertMsg');

    vLostPWD.addEventListener('click', function(){
        vLostPWDForm.idLostPWDEmail.value = '';
        vLostPWDAlertMsg.style.visibility = 'hidden';                       // Cache du message d'alerte de saisie d'email erroné
        $('#idModalLogin').modal('toggle');                                 // Fermeture de la fenêtre modale de Login
        $('#idModalLostPWD').modal('toggle');                               // Ouverture de la fenêtre modale de gestion de PWD perdu
    });

        
    // -------------------------------------------------------------------------
    // Envoi des infos de récupération du Mot de Passe lorsque la saisie du mail 
    // est validée syntaxiquement et par la validation globale de celle-ci
    // -------------------------------------------------------------------------
    vLostPWDForm.addEventListener('submit', function (event){ 
        event.preventDefault();                

        webSocketConnection.emit('LostPWDMgr', vLostPWDForm.idLostPWDEmail.value);   // Transmission au serveur des infos saisies
        $('#idModalLostPWD').modal('toggle');                                        // Fermeture de la fenêtre modale de Login
    });

    // -------------------------------------------------------------------------
    // Gestion de la déconnexion
    // -------------------------------------------------------------------------
    vDeconnexion.addEventListener('click', function(){
        ActiveLoginAndCreateBtn(vConnexion, vCreation, vDeconnexion);
    });

    // -------------------------------------------------------------------------
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
    // au visiteur de le ressaisir
    // --------------------------------------------------------------
    webSocketConnection.on('retryLostPWDForm', function(){   
        vLostPWDAlertMsg.style.visibility = 'visible'                                 // Affichage du message d'alerte de saisie d'email erroné
        setTimeout(function(){$("#idModalLostPWD").modal('toggle')},300);             // Obligation de temporiser la réouverture sinon ça ne marche pas
    });
    // --------------------------------------------------------------
    // Le serveur a rejeté la demande Login, et redemande au visiteur 
    // de réessayer de se loger
    // --------------------------------------------------------------
    webSocketConnection.on('retryLoginForm', function(){   
        vLoginAlertMsg.style.visibility = 'visible'                                 // Affichage du message d'alerte de connexion erronée
        setTimeout(function(){$("#idModalLogin").modal('toggle')},300);             // Obligation de temporiser la réouverture sinon ça ne marche pas
    });
    // --------------------------------------------------------------
    // Le serveur a rejeté la demande Signin, et redemande au visiteur 
    // de ressaisir ses infos de Sign-In
    // --------------------------------------------------------------
    webSocketConnection.on('retrySignInForm', function(){   
        vSignInAlertMsg.style.visibility = 'visible'                               // Affichage du message d'alerte de connexion erronée
        setTimeout(function(){$("#idModalSignIn").modal('toggle')},300);           // Obligation de temporiser la réouverture sinon ça ne marche pas
    });
    // --------------------------------------------------------------
    // Le visiteur s'est loggé avec succès et est donc reconnu comme membre
    // ==> Désactivation du bouton "Connexion"
    // ==> Désactivation du bouton "Créer un compte"
    // ==> Activation du bouton "Deconnexion"
    // --------------------------------------------------------------
    webSocketConnection.on('disableConnectBtn', function(){   
        UnactiveLoginAndCreateBtn(vConnexion, vCreation, vDeconnexion);
    });

    // --------------------------------------------------------------
    // Le visiteur a créé son compte avec succès et est donc reconnu comme membre
    // Message d'accueil et de b=Bienvenue
    // ==> Désactivation du bouton "Connexion"
    // ==> Désactivation du bouton "Créer un compte"
    // ==> Activation du bouton "Deconnexion"
    // --------------------------------------------------------------
    webSocketConnection.on('congratNewMember', function(){ 
        initModalWelcomeText(vModalTitle, vModalBodyText);
        $('#idGenericModal').modal('toggle');                                    // ouverture de la fenêtre modale de Félicitations
        UnactiveLoginAndCreateBtn(vConnexion, vCreation, vDeconnexion);
    });    
    // -----------------------------------------------------------------------------
}); // Fin de la Boucle "DOMContentLoaded"









// ===================================================== Fonctions ===========================================================
// -----------------------------------------------------------------------------
//  Cette fonction donne le focus au champs pIdField  de la fenêtre modale pIdModal
//  passée en paramètre car le composant "Modal" court-circuite l'attibut "Auto-focus"
// -----------------------------------------------------------------------------
function giveFocusToModalFirstField(pIdModal, pIdField){
    $('#'+pIdModal).on('shown.bs.modal', function() {
        $('#'+pIdField).focus();
    })

    // $('#'+pIdModal).on('shown.bs.modal', function() {
    //     $(this).find('[autofocus]').focus();
    //   });

}
// -----------------------------------------------------------------------------
// Cette fonction vérifie que le MDP et sa confirmation sont bien identiques
// -----------------------------------------------------------------------------
function validatePassword(pSignInPassword, pSignInConfirmPassword){
    if (pSignInPassword.value != pSignInConfirmPassword.value){
        pSignInConfirmPassword.setCustomValidity("Les mots de passe ne correspondent pas");
    } else {
        pSignInConfirmPassword.setCustomValidity('');
    }
}
// -----------------------------------------------------------------------------
// Cette fonction initialise le contenu de la fenetre générique modale en mode "A propos"
// -----------------------------------------------------------------------------
function initGenericModalTextAboutMode(pModalTitle, pModalBodyText){
    pModalTitle.innerText = 'A propos...'
    pModalBodyText.innerHTML = '<h5>Bienvenue dans Collect\'Or</h5>';
    pModalBodyText.innerHTML += '<p>Collector est un réseau social destiné aux collectionneurs de figurines, véhicules, avions, bateaux, et autres sujets historiques, principalement militaires, mais les autres types de collections sont également les bienvenus</p>';
    pModalBodyText.innerHTML += '<p>Vous pourrez notamment discuter en public ou en privé avec d\'autres collectionneurs, déposer / lire des annonces de vente, d\'échange, de recherche, de manifestations...</p>';
    pModalBodyText.innerHTML += '<p>De plus, vous pourrez laisser vos avis sur des sujets particuliers, accéder à la galerie pour admirer les collections ou y déposer vos propres photos, accéder aux trucs et astuces de modéliste, y déposer vos expériences, et enfin poser vos questions</p>';
}
// -----------------------------------------------------------------------------
// Cette fonction initialise le contenu de la fenetre modale "Félicitations et Bienvenue"
// après la création réussie du nouveau membre
// -----------------------------------------------------------------------------
function initModalWelcomeText(pModalTitle, pModalBodyText){
    pModalTitle.innerText = 'Bienvenue dans Collect\'Or'
    pModalBodyText.innerHTML = '<h5>Félicitations !</h5>';
    pModalBodyText.innerHTML += '<br /><p>Votre compte a été créé avec succès</p>';
    pModalBodyText.innerHTML += '<br /><p>Un mail de confirmation vous été envoyé, si vous ne le voyez pas, veuillez regarder dans le dosssier des SPAMs</p>';
    pModalBodyText.innerHTML += '<br /><p>Bonne navigation...</p>';
}
// -----------------------------------------------------------------------------
// Cette fonction désactive les options de menu inutiles lorsque le visiteur s'est 
// connecté ou après la création réussie de son compte, car il se trouve de fait, 
// déjà connecté
// -----------------------------------------------------------------------------
function UnactiveLoginAndCreateBtn(pConnexion, pCreation, pDeconnexion){
    pConnexion.style.display = 'none';         //      Désactivation du bouton 'Connexion'
    pCreation.style.display = 'none';          //      Désactivation du bouton 'Creation de compte'

    pDeconnexion.classList.remove('disabled');
    pDeconnexion.style.color = '#212529';           //      Activation du bouton 'Déconnexion'
}
// -----------------------------------------------------------------------------
// Cette fonction réactive les options de menu Login et Création de compte lorsque
//  le visiteur se déconnecte, et désactive le bouton "Déconnexion"
// -----------------------------------------------------------------------------
function ActiveLoginAndCreateBtn(pConnexion, pCreation, pDeconnexion){
    // pConnexion.style.display = 'block';         //      Désactivation du bouton 'Connexion'
    // pCreation.style.display = 'block';          //      Désactivation du bouton 'Creation de compte'

    // pDeconnexion.classList.add('disabled');

// XXXXXXXXXX Voir si on peut faire une vraie deconnexion
webSocketConnection.emit('disconnect','');   // Transmission au serveur des infos saisies
vToolBox.refreshScreen();

}
// -------------------------- Fin du module ----------------------------------------

