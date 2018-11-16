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













    // -------------------------------------------------------------------------
    // Initialisations
    // Recupération des Elements du DOM nécessaires
    // Mise en oeuvre des captures d'évenements nécessaires
    // Prépositionnement (Focus) sur les champs des différentes fenêtres modales
    // Réinitialisations des valeurs des champs de saisies des différentes fenêtres
    // -------------------------------------------------------------------------
    vToolBox = new ToolBox();
    var vMemberClient = new MemberClient();       // Instanciation de l'objet descrivant un Membre et les méthodes de gestion de ce Membre
    var siofu = new SocketIOFileUpload(webSocketConnection);
    
    // Do something on upload progress:
    siofu.addEventListener("progress", function(event){
        var percent = event.bytesLoaded / event.file.size * 100;
        console.log("File is", percent.toFixed(2), "percent loaded");
    });

    // Do something when a file is uploaded:
    siofu.addEventListener("complete", function(event){
        console.log(event.success);
        console.log(event.file);
    });

    // -------------------------------------------------------------------------
    // Eléments de menu
    // -------------------------------------------------------------------------
    var vConnexion = document.getElementById('idConnexion');
    var vCreation = document.getElementById('idCreation');
    var vDeconnexion = document.getElementById('idDeconnexion');
    var vAccount = document.getElementById('idAccount');
    
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
    var vGenericModalBtn = document.getElementById('idGenericModalBtn');
    
    vMemberClient.InitHeaderColor('bg-warning', vGenericModalHeader);
    vMemberClient.initModalTextAboutMode(vGenericModalTitle, vGenericModalBodyText);                       

// XXXXXXXXXXXXX
// vGenericModal.addEventListener('click', function(){
        vGenericModalBtn.addEventListener('click', function(){
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
    // vMemberClient.giveFocusToModalFirstField('idModalLostPWD', 'idLostPWDEmail');

    vConnexion.addEventListener('click', function(){
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
    // Eléments de champs de saisie de la Form de renseignements (Account)
    // -------------------------------------------------------------------------
    var vAccountForm = document.getElementById('idAccountForm');
    var vModalAccountHeader = document.getElementById('idModalAccountHeader');
    var vAccountPseudo = document.getElementById('idAccountPseudo');
    var vAccountEmail = document.getElementById('idAccountEmail');
    var vAccountPhotoImg = document.getElementById('idAccountPhotoImg');
    var vAccountPhotoFile = document.getElementById('idAccountPhotoFile');
    var vAccountFirstName = document.getElementById('idAccountFirstName');
    var vAccountName = document.getElementById('idAccountName');
    var vAccountBirthDate = document.getElementById('idAccountBirthDate');
    var vAccountAge = document.getElementById('idAccountAge');

    var vAccountSexNone = document.getElementById('idAccountSexNone');
    var vAccountSexMale = document.getElementById('idAccountSexMale');
    var vAccountSexFemale = document.getElementById('idAccountSexFemale');
    
    var vAccountStreet = document.getElementById('idAccountStreet');
    var vAccountCity = document.getElementById('idAccountCity');
    var vAccountZipCode = document.getElementById('idAccountZipCode');
    var vAccountDepartment = document.getElementById('idAccountDepartment');
    var vAccountPrefGravures = document.getElementById('idAccountPrefGravures');
    var vAccountPrefLivres = document.getElementById('idAccountPrefLivres');
    var vAccountPrefFilms = document.getElementById('idAccountPrefFilms');
    var vAccountPrefJeux = document.getElementById('idAccountPrefJeux');
    var vAccountPrefMaquettes = document.getElementById('idAccountPrefMaquettes');
    var vAccountPrefFigurines = document.getElementById('idAccountPrefFigurines');
    var vAccountPrefBlindes = document.getElementById('idAccountPrefBlindes');
    var vAccountPrefAvions = document.getElementById('idAccountPrefAvions');
    var vAccountPrefBateaux = document.getElementById('idAccountPrefBateaux');
    var vAccountPrefDioramas = document.getElementById('idAccountPrefDioramas');
    var vAccountPrefPrehistoire = document.getElementById('idAccountPrefPrehistoire');
    var vAccountPrefAntiquite = document.getElementById('idAccountPrefAntiquite');
    var vAccountPrefMoyenAge = document.getElementById('idAccountPrefMoyenAge');
    var vAccountPrefRenaissance = document.getElementById('idAccountPrefRenaissance');
    var vAccountPrefDentelles = document.getElementById('idAccountPrefDentelles');
    var vAccountPrefAncienRegime = document.getElementById('idAccountPrefAncienRegime');
    var vAccountPrefRevolution = document.getElementById('idAccountPrefRevolution');
    var vAccountPref1erEmpire = document.getElementById('idAccountPref1erEmpire');
    var vAccountPref2ndEmpire = document.getElementById('idAccountPref2ndEmpire');
    var vAccountPrefSecession = document.getElementById('idAccountPrefSecession');
    var vAccountPrefFarWest = document.getElementById('idAccountPrefFarWest');
    var vAccountPrefWW1 = document.getElementById('idAccountPrefWW1');
    var vAccountPrefWW2 = document.getElementById('idAccountPrefWW2');
    var vAccountPrefContemporain = document.getElementById('idAccountPrefContemporain');
    var vAccountPrefFuturiste = document.getElementById('idAccountPrefFuturiste');
    var vAccountPrefFantastique = document.getElementById('idAccountPrefFantastique');
    var vAccountPrefHFrancaise = document.getElementById('idAccountPrefHFrancaise');
    var vAccountPrefHAméricaine = document.getElementById('idAccountPrefHAméricaine');
    var vAccountPrefHInternationale = document.getElementById('idAccountPrefHInternationale');
    var vAccountPrefAutre = document.getElementById('idAccountPrefAutre');
    var vAccountPresentation = document.getElementById('idAccountPresentation');
    var vAccountCurrentPassword = document.getElementById('idAccountCurrentPassword');
    var vAccountPassword = document.getElementById('idAccountPassword');
    var vAccountConfirmPassword = document.getElementById('idAccountConfirmPassword');
    var vAccountAlertMsg = document.getElementById('idAccountAlertMsg');1
    var vAccountBtn = document.getElementById('idAccountBtn');1

    vMemberClient.giveFocusToModalFirstField('idModalAccount', 'idAccountFirstName');    

    // -------------------------------------------------------------------------
    // MAJ en temps réel du champ age dès qu'il y a une modification de la date de naissance
    // -------------------------------------------------------------------------
    vAccountBirthDate.addEventListener('click', function(){
        updateFieldAge(vAccountForm.idAccountBirthDate.value);
    });          
    vAccountBirthDate.addEventListener('input', function(){
        updateFieldAge(vAccountForm.idAccountBirthDate.value);
    });          
    
    // -------------------------------------------------------------------------
    // MAJ en temps réel de la silhouette de l'avatar (si aucune photo n'a été chargée)
    // en fonction de la sélection du sexe
    // -------------------------------------------------------------------------
    vAccountSexNone.addEventListener('click', function(){
        updateAvatar(0);
    });          
    vAccountSexMale.addEventListener('click', function(){
        updateAvatar(1);
    });          
    vAccountSexFemale.addEventListener('click', function(){
        updateAvatar(2);
    });              

    // -------------------------------------------------------------------------
    // Initialise l'Uploader d'images vers le serveur
    // -------------------------------------------------------------------------
    vAccountPhotoFile.addEventListener("change", function(){

// siofu.listenOnSubmit(vAccountBtn, vAccountPhotoFile);


console.log('vAccountPhotoFile.addEventListener("change") - 002 - vAccountPhotoFile.value : ',vAccountPhotoFile.value)
        vAccountPhotoImg.setAttribute('src',window.URL.createObjectURL(vAccountPhotoFile.files[0]));
console.log('vAccountPhotoFile.addEventListener("change") - 003 - vAccountPhotoImg.getAttribute("src") : ',vAccountPhotoImg.getAttribute('src'));        
console.log('vAccountPhotoFile.addEventListener("change") - 004 - vAccountPhotoFile.files[0] : ',vAccountPhotoFile.files[0]);        


        // siofu.prompt();
    }, false);

//     vAccountPhotoFile.addEventListener("click", function(event){

// // siofu.listenOnSubmit(vAccountBtn, vAccountPhotoFile);
// event.preventDefault(); 

//         siofu.prompt();

// console.log('vAccountPhotoFile.addEventListener("change") - 002 - vAccountPhotoFile.value : ',vAccountPhotoFile.value)
// console.log('vAccountPhotoFile.addEventListener("change") - 002 - vAccountPhotoFile.value.files : ',vAccountPhotoFile.value.files)
        
// // vAccountPhotoImg.setAttribute('src',window.URL.createObjectURL(vAccountPhotoFile.files[0]));


// console.log('vAccountPhotoFile.addEventListener("change") - 003 - vAccountPhotoImg.getAttribute("src") : ',vAccountPhotoImg.getAttribute('src'));        
// console.log('vAccountPhotoFile.addEventListener("change") - 004 - vAccountPhotoFile.files[0] : ',vAccountPhotoFile.files[0]);        

//     }, false);

    // -------------------------------------------------------------------------
    // Initialise les champs de la Modale de saisie des renseignements avec 
    // les datas provenant de la BDD
    // -------------------------------------------------------------------------
    vAccount.addEventListener('click', function(){
        initModalAccount(vAccountForm, vAccountAlertMsg, vModalAccountHeader);
    });

    // -------------------------------------------------------------------------
    // Vérification que les MDP sont identiques
    // -------------------------------------------------------------------------
    vAccountPassword.onchange = function(){
        vMemberClient.validatePassword(vAccountPassword, vAccountConfirmPassword)
    };          
    vAccountConfirmPassword.onkeyup = function(){
        vMemberClient.validatePassword(vAccountPassword, vSignInConfirmPassword)
    };     

    // -------------------------------------------------------------------------
    // Gestion du raccourci de la création de compte (sur la fenêtre de Login)
    // -------------------------------------------------------------------------
    vSignIn.addEventListener('click', function(){
        initModalSignIn(vSignInForm, vSignInAlertMsg, vModalSignInHeader);
        $('#idModalLogin').modal('toggle');                                 // Fermeture de la fenêtre modale de Login
        $('#idModalSignIn').modal('toggle');                                // Ouverture de la fenêtre modale de gestion de PWD perdu
    });
    // -------------------------------------------------------------------------
    // Gestion du raccourci de Mot de Passe oublié (sur la fenêtre de login)
    // -------------------------------------------------------------------------
    var vLostPWDForm = document.getElementById('idLostPWDForm');
    var vModalLostPWDHeader = document.getElementById('idModalLostPWDHeader');
    var vLostPWDAlertMsg = document.getElementById('idLostPWDAlertMsg');

    vMemberClient.giveFocusToModalFirstField('idModalLostPWD', 'idLostPWDEmail');

    vLostPWD.addEventListener('click', function(){
        vLostPWDForm.idLostPWDEmail.value = '';
        vLostPWDAlertMsg.style.visibility = 'hidden';                       // Cache du message d'alerte de saisie d'email erroné
        vMemberClient.InitHeaderColor('bg-warning', vModalLostPWDHeader);
        $('#idModalLogin').modal('toggle');                                 // Fermeture de la fenêtre modale de Login
        $('#idModalLostPWD').modal('toggle');                               // Ouverture de la fenêtre modale de gestion de PWD perdu
    });







    // -------------------------------------------------------------------------
    // Validation Demande du Mot de passe
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
    // Validation Login
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
    // Validation Sign-In (Création de compte)
    // Envoi des infos de création du visiteur lorsque la Création de compte est 
    // validée syntaxiquement et par la validation globale de celle-ci
    // -------------------------------------------------------------------------
    vSignInForm.addEventListener('submit', function (event){ 
        event.preventDefault();                

        var visiteurSignInData =                                     // Mise en forme pour transmission au serveur des données saisies
            {
                email    : vSignInForm.idSignInEmail.value,
                pseudo   : vSignInForm.idSignInPseudo.value,
                password : vSignInForm.idSignInPassword.value,
            }

        webSocketConnection.emit('visiteurSignInData', visiteurSignInData);     // Transmission au serveur des infos saisies
        $('#idModalSignIn').modal('toggle');                                    // Fermeture de la fenêtre modale de Sign-In
        vSignInAlertMsg.style.visibility = 'hidden';                               // Affichage du message d'alerte de connexion erronée
    });

    // -------------------------------------------------------------------------
    // Validation Fiche "Renseignements"
    // Envoi des infos de la fiche renseignement du visiteur au serveur pour 
    // stockage en BDD
    // -------------------------------------------------------------------------
    vAccountForm.addEventListener('submit', function (event){ 
        event.preventDefault();        

        if (vAccountPhotoFile.value.length){        // Si une image a été choisie
            vMemberClient.member.etatCivil.photo = vAccountPhotoFile.value.split('C:\\fakepath\\')[1];
            siofu.submitFiles(vAccountPhotoFile.files);  // Alors on la transfère vers le serveur
        } else {
            vMemberClient.member.etatCivil.photo = vAccountPhotoImg.getAttribute('src').split('static/images/members/')[1]; 
        }


        vMemberClient.member.etatCivil.firstName = vAccountForm.idAccountFirstName.value;
        vMemberClient.member.etatCivil.name      = vAccountForm.idAccountName.value;
        vMemberClient.member.etatCivil.birthDate = vAccountForm.idAccountBirthDate.value;                ;
        vMemberClient.member.etatCivil.sex       = outputBtnRadioSex();


// XXXXXXXXXXXXXX 
// Transferer les champs vers vMemberClient

// vMemberClient.member.email = vAccountEmail;
// vMemberClient.member.pseudo          : '',
// vMemberClient.member.password        : '',
// vMemberClient.member.role            : 0,        // 4 --> Membre, 2 --> Admin ou 1 --> SuperAdmin

        // vMemberClient.presentation           = vAccountForm.vPresentation.value;
console.log('submit 001 - vMemberClient.member : ',vMemberClient.member);


//         vMemberClient.member.etatCivil.name         = vAccountName;
//         vMemberClient.member.etatCivil.photo         = vAccountName;
//         vMemberClient.member.etatCivil.birthDate    = vAccountBirthDate;

//         vMemberClient.member.etatCivil.address.street       = vAccountStreet;
//         vMemberClient.member.etatCivil.address.city         = vAccountCity;
//         vMemberClient.member.etatCivil.address.zipCode      = vAccountZipCode;
//         vMemberClient.member.etatCivil.address.department   = vAccountDepartment;

//         vMemberClient.member.preferences['PrefGravures']        = vAccountPrefGravures;
//         vMemberClient.member.preferences['PrefLivres']          = vAccountPrefLivres;
//         vMemberClient.member.preferences['PrefFilms']           = vAccountPrefFilms;
//         vMemberClient.member.preferences['PrefJeux']            = vAccountPrefJeux;
//         vMemberClient.member.preferences['PrefMaquettes']       = vAccountPrefMaquettes;
//         vMemberClient.member.preferences['PrefFigurines']       = vAccountPrefFigurines;
//         vMemberClient.member.preferences['PrefBlindes']         = vAccountPrefBlindes;
//         vMemberClient.member.preferences['PrefAvions']          = vAccountPrefAviosn;
//         vMemberClient.member.preferences['PrefBateaux']         = vAccountPrefBateaux;
//         vMemberClient.member.preferences['PrefDioramas']        = vAccountPrefDioramas;
//         vMemberClient.member.preferences['PrefPrehistoire']     = vAccountPrefPrehistoire;
//         vMemberClient.member.preferences['PrefAntiquite']       = vAccountPrefAntiquite;
//         vMemberClient.member.preferences['PrefMoyenAge']        = vAccountPrefMoyenAge;
//         vMemberClient.member.preferences['PrefRenaissance']     = vAccountPrefRenaissance;
//         vMemberClient.member.preferences['PrefDentelles']       = vAccountPrefDentelles;
//         vMemberClient.member.preferences['PrefAncienRegime']    = vAccountPrefAncienRegime;
//         vMemberClient.member.preferences['PrefRevolution']      = vAccountPrefRevolution;
//         vMemberClient.member.preferences['Pref1erEmpire']       = vAccountPref1erEmpire;
//         vMemberClient.member.preferences['Pref2ndEmpire']       = vAccountPref2ndEmpire;
//         vMemberClient.member.preferences['PrefSecession']       = vAccountPrefSecession;
//         vMemberClient.member.preferences['PrefFarWest']         = vAccountPrefFarWest;
//         vMemberClient.member.preferences['PrefWW1']             = vAccountPrefWW1;
//         vMemberClient.member.preferences['PrefWW2']             = vAccountPrefWW2;
//         vMemberClient.member.preferences['PrefContemporain']    = vAccountPrefContemporain;
//         vMemberClient.member.preferences['PrefFuturiste']       = vAccountPrefFuturiste;
//         vMemberClient.member.preferences['PrefFantastique']     = vAccountPrefFantastique;
//         vMemberClient.member.preferences['PrefHFrancaise']      = vAccountPrefHFrancaise;
//         vMemberClient.member.preferences['PrefHAméricaine']     = vAccountPrefHAméricaine;
//         vMemberClient.member.preferences['PrefHInternationale'] = vAccountPrefHInternationale;
//         vMemberClient.member.preferences['PrefAutre']           = vAccountPrefAutre;

// vMemberClient.member.dateCreation    : -1,       // Timestamp de la création du record



        webSocketConnection.emit('dataProfilMembre', vMemberClient.member);   // Transmission au serveur des infos saisies
        
        $('#idModalAccount').modal('toggle');                                 // Fermeture de la fenêtre modale de Login
        vAccountAlertMsg.style.visibility = 'hidden';  
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
console.log('welcomeMember - 001 - this.member : ',vMemberClient.member);

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
        // var vNbrAdmin = pPopulation.nbreAdmins;
        // var vNbrMembers = pPopulation.nbreMembers - vNbrAdmin;
        // var vNbrVisitors   = pPopulation.nbreVisitors - (vNbrMembers + pPopulation.nbreAdmins);

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
    // Cette fonction initialise la modale de création, quel que soit son mode 
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
    // Cette fonction initialise la modale de saisie de renseignements (Compte) 
    // avec les valeurs récupérées dans la BDD, (et pouvant $être vieges)
    // -----------------------------------------------------------------------------
    function initModalAccount(pAccountForm, pAccountAlertMsg, pModalAccountHeader){
//  XXXXXXXXXXXXXX Alimenter tous les champs
console.log('initModalAccount - 000 - vMemberClient.member.pseudo : ',vMemberClient.member.pseudo)

        pAccountForm.idAccountEmail.value  = vMemberClient.member.email;                                
        pAccountForm.idAccountPseudo.value = vMemberClient.member.pseudo;     

        vAccountPhotoImg.setAttribute('src', 'static/images/members/'+vMemberClient.member.etatCivil.photo);
        pAccountForm.idAccountFirstName.value = vMemberClient.member.etatCivil.firstName;     
        pAccountForm.idAccountName.value = vMemberClient.member.etatCivil.name;     
        pAccountForm.idAccountBirthDate.value = vMemberClient.member.etatCivil.birthDate;     

        if (vMemberClient.member.etatCivil.birthDate){
            updateFieldAge(vMemberClient.member.etatCivil.birthDate);
            } else {
            pAccountForm.idAccountAge.value = '';
        }
        
        var selectedSex = inputBtnRadioSex();
        updateAvatar(selectedSex);

        pAccountForm.idAccountCurrentPassword.value = '';
        pAccountForm.idAccountPassword.value = '';
        pAccountForm.idAccountConfirmPassword.value = '';

        pAccountAlertMsg.style.visibility = 'hidden';                          
        vMemberClient.InitHeaderColor('bg-warning', pModalAccountHeader);
    }
    // -----------------------------------------------------------------------------
    // Cette fonction récupère la sélection du Sexe à travers les boutons-radio
    // -----------------------------------------------------------------------------
    function outputBtnRadioSex(){ 
        var i=0;
        var found=false

        while (i < document.forms.idAccountForm.accountSexe.length && !found){
            if (document.forms.idAccountForm.accountSexe[i].checked===true){ 
            found = true;
            } else {
                i++
            }
        } 
        return i;
    }
    // -----------------------------------------------------------------------------
    // Cette fonction initialise le bouton-radio du Sexe approprié
    // -----------------------------------------------------------------------------
    function inputBtnRadioSex(){ 
        var selectedSex;

        for (var i=0; i < document.forms.idAccountForm.accountSexe.length; i++) {
            if (vMemberClient.member.etatCivil.sex === i){
                
                document.forms.idAccountForm.accountSexe[i].checked = true;
                selectedSex = i;
            } else { 
                document.forms.idAccountForm.accountSexe[i].checked = false;
            }
        } 
        return selectedSex;
    }    
    // -----------------------------------------------------------------------------
    // Cette fonction met à jour l'avatar (si aucune photo n a été chargée), avec une 
    // silhouette Profil par défaut, en concordance avec la sélection du sexe
    // 
    // Si pas de photo, initialiser avec l avatar correspondant au sexe
    // et le faire vivre a chaque changement de sexe
    // Sinon, ignorer les changements de sexe
    // -----------------------------------------------------------------------------
    function updateAvatar(pIndex){ 
        var myPhoto = vAccountPhotoImg.getAttribute('src').split('static/images/members/')[1];

        if (myPhoto){
            if (myPhoto.startsWith('default-avatar-')){
                switch (pIndex){
                    case 0 :
                    vAccountPhotoImg.setAttribute('src', 'static/images/members/default-avatar-inconnu.png');
                    break;
                    case 1 :
                    vAccountPhotoImg.setAttribute('src', 'static/images/members/default-avatar-male.png');
                    break;
                    case 2 :
                    vAccountPhotoImg.setAttribute('src', 'static/images/members/default-avatar-female.png');
                    break;
                }
            } 
        }
    }
    // -----------------------------------------------------------------------------
    // Cette fonction calcule et MAJ le champ "Age" de la fenêtre de saisie des renseignements
    // -----------------------------------------------------------------------------
    function updateFieldAge(pBirthDate){ 
        if (pBirthDate){
            vAccountForm.idAccountAge.value = vToolBox.calculeAge(pBirthDate, false);
        } else {
            vAccountForm.idAccountAge.value ='';
        }
    }
    // --------------------------------------------------------------------------------------------------------------
}); // Fin de la Boucle "DOMContentLoaded"




