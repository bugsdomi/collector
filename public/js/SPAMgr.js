'use strict'
// ********************************************************************* //
// *                                                                   * //
// *       "Collect'Or" - Octobre-Novembre 2018                        * //
// *                                                                   * //
// ********************************************************************* //
// *                                                                   * //
// *   Dominique Hourdequin - Octobre 2018                             * //
// *   Projet N°3 - Type "Full Stack"                                  * //
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
    // webSocketConnection.on('drawGameBackground', function(){
        // var vPlayerBackground = window.document.createElement('img');   
        // window.document.body.appendChild(vPlayerBackground);     
        // vPlayerBackground.setAttribute('src', 'static/images/FondEcran.jpg');
        // vPlayerBackground.style.height = '100%';
        // vPlayerBackground.style.width = '100%';

        // vMemberClient.drawControlPanel(vOuterBrdrWindowList, vWindowList, webSocketConnection);
    // });
    // -------------------------------------------------------------------------
    // Création et Affichage l'ensemble des pilules du joueurs qui ont été instanciées, 
    // initialisées et envoyées par le serveur et creation du cadre des données 
    // du joueurs et de son avatar
    // -------------------------------------------------------------------------
    // webSocketConnection.on('drawPils', function(pPlayerData){
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
    // });
    // -------------------------------------------------------------------------
    // Suppression et effacement de l'ensemble des pilules du joueurs qui s'est déconnecté 
    // -------------------------------------------------------------------------
    // webSocketConnection.on('erasePils', function(pPlayerData){
        // var vCurrentPlayer = 'player'+pPlayerData.currentPlayer;   
        
        // for (var i=0; i<=pPlayerData.maxPilsByPlayer-1; i++){
        //     vMemberClient[vCurrentPlayer].pils[i].parentNode.removeChild(vMemberClient[vCurrentPlayer].pils[i]);
        // }

        // vMemberClient[vCurrentPlayer].avatarToken.parentNode.removeChild(vMemberClient[vCurrentPlayer].avatarToken);
    // });













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
        initModalSignIn();
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
    var vAccountPrefHAmericaine = document.getElementById('idAccountPrefHAmericaine');
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
    // Initialise les champs de la Modale de saisie des renseignements avec 
    // les datas provenant de la BDD
    // -------------------------------------------------------------------------
    vAccount.addEventListener('click', function(){
        initModalAccount();
    });

    // -------------------------------------------------------------------------
    // Eléments du UpLoader d'images du profil
    // -------------------------------------------------------------------------
    var siofu = new SocketIOFileUpload(webSocketConnection);

    siofu.addEventListener("progress", function(event){
        var percent = event.bytesLoaded / event.file.size * 100;
        console.log("File is", percent.toFixed(2), "percent loaded");
    });

    siofu.addEventListener("complete", function(event){
        console.log('Image upLoadée avec succès');
        // console.log('event.success');
        // console.log(event.file);
    });

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
    // Affiche l'image de profil apres l'avoir selectionné avec un input type="file"
    // -------------------------------------------------------------------------
    vAccountPhotoFile.addEventListener("change", function(){
        vAccountPhotoImg.setAttribute('src',window.URL.createObjectURL(vAccountPhotoFile.files[0]));
    }, false);

    // -------------------------------------------------------------------------
    // Initialise la gestion du changement de passe
    // Si le MDP actuel saisi = a celui qui est stocké en BDD, on active les 2 
    // champs de New MDP
    // Sinon, on affiche un Message d'erreur ey on reboucle, et surtout, on ne 
    // met pas a jour la fiche de renseignement dans la BDD
    // -------------------------------------------------------------------------
    vAccountCurrentPassword.onchange = function(){
        vMemberClient.newPasswordKO = true;

        if (vAccountForm.idAccountCurrentPassword.value !== ''){
            if (vAccountForm.idAccountCurrentPassword.value === vMemberClient.member.password){
                vAccountAlertMsg.innerHTML='';
                vAccountAlertMsg.style.visibility = 'hidden';  
                vMemberClient.InitHeaderColor('bg-warning', vModalAccountHeader);
                vAccountPassword.removeAttribute('disabled');
                vAccountConfirmPassword.removeAttribute('disabled');
                vAccountPassword.focus();
            } else {
                vAccountAlertMsg.innerHTML='Mot de passe actuel erroné';                // Affichage du message d'alerte de MDP actuel erroné
                vAccountAlertMsg.style.visibility = 'visible';                                 
                vMemberClient.InitHeaderColor('bg-danger', vModalAccountHeader);
                vAccountPassword.setAttribute('disabled','true');
                vAccountConfirmPassword.setAttribute('disabled','true');
                vAccountPassword.focus();
            };
        } else {
            vMemberClient.newPasswordKO = false;
            vAccountAlertMsg.innerHTML='';
            vAccountAlertMsg.style.visibility = 'hidden';  
            vMemberClient.InitHeaderColor('bg-warning', vModalAccountHeader);
            vAccountPassword.setAttribute('disabled','true');
            vAccountConfirmPassword.setAttribute('disabled','true');
            vAccountPassword.focus();
        }
    };
    // -------------------------------------------------------------------------
    // Vérification que les MDP sont identiques
    // -------------------------------------------------------------------------
    vAccountPassword.onchange = function(){
        vMemberClient.validatePassword(vAccountPassword, vAccountConfirmPassword)
    };          
    vAccountConfirmPassword.onkeyup = function(){
        vMemberClient.validatePassword(vAccountPassword, vAccountConfirmPassword)
    };     




    // -------------------------------------------------------------------------
    // Gestion du raccourci de la création de compte (sur la fenêtre de Login)
    // -------------------------------------------------------------------------
    vSignIn.addEventListener('click', function(){
        initModalSignIn();
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
        webSocketConnection.close();
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
        vSignInAlertMsg.style.visibility = 'hidden';                            // Affichage du message d'alerte de connexion erronée
    });



    // -------------------------------------------------------------------------
    // Validation Fiche "Renseignements"
    // Envoi des infos de la fiche renseignement du visiteur au serveur pour 
    // stockage en BDD
    // Si une demande de chgt de MDP a été demandée et qu'elle s'est mal déroulée, 
    // on ne valide pas la fiche
    // Sinon on MAJ la fiche de renseignements en BDD
    // Cependant, s'il y a eu une demande changement dde MDP, on MAJ la BDD en conséquence
    // et on demande au serveur d'envoyer un mail de notification de MDP
    // -------------------------------------------------------------------------
    vAccountForm.addEventListener('submit', function (event){ 
        event.preventDefault();        

        if (!vMemberClient.newPasswordKO){     
            if (vAccountPhotoFile.value.length){                                                                        // Si une image a été choisie 
                vMemberClient.member.etatCivil.photo = vAccountPhotoFile.value.split('C:\\fakepath\\')[1];              // On ne garde que le nom de l'image pour la BDD
                siofu.submitFiles(vAccountPhotoFile.files);                                                             // Alors on la transfère vers le serveur
            } else {
                vMemberClient.member.etatCivil.photo = vAccountPhotoImg.getAttribute('src').split('static/images/members/')[1]; 
            }

            vMemberClient.member.etatCivil.firstName = vAccountForm.idAccountFirstName.value;
            vMemberClient.member.etatCivil.name      = vAccountForm.idAccountName.value;
            vMemberClient.member.etatCivil.birthDate = vAccountForm.idAccountBirthDate.value;                ;
            vMemberClient.member.etatCivil.sex       = outputBtnRadioSex();

            vMemberClient.member.etatCivil.address.street       = vAccountForm.idAccountStreet.value;
            vMemberClient.member.etatCivil.address.city         = vAccountForm.idAccountCity.value;
            vMemberClient.member.etatCivil.address.zipCode      = vAccountForm.idAccountZipCode.value;
            vMemberClient.member.etatCivil.address.department   = vAccountForm.idAccountDepartment.value;

            vMemberClient.member.preferences['prefGravures']        = vAccountPrefGravures.checked;
            vMemberClient.member.preferences['prefLivres']          = vAccountPrefLivres.checked;
            vMemberClient.member.preferences['prefFilms']           = vAccountPrefFilms.checked;
            vMemberClient.member.preferences['prefJeux']            = vAccountPrefJeux.checked;
            vMemberClient.member.preferences['prefMaquettes']       = vAccountPrefMaquettes.checked;
            vMemberClient.member.preferences['prefFigurines']       = vAccountPrefFigurines.checked;
            vMemberClient.member.preferences['prefBlindes']         = vAccountPrefBlindes.checked;
            vMemberClient.member.preferences['prefAvions']          = vAccountPrefAvions.checked;
            vMemberClient.member.preferences['prefBateaux']         = vAccountPrefBateaux.checked;
            vMemberClient.member.preferences['prefDioramas']        = vAccountPrefDioramas.checked;
            vMemberClient.member.preferences['prefPrehistoire']     = vAccountPrefPrehistoire.checked;
            vMemberClient.member.preferences['prefAntiquite']       = vAccountPrefAntiquite.checked;
            vMemberClient.member.preferences['prefMoyenAge']        = vAccountPrefMoyenAge.checked;
            vMemberClient.member.preferences['prefRenaissance']     = vAccountPrefRenaissance.checked;
            vMemberClient.member.preferences['prefDentelles']       = vAccountPrefDentelles.checked;
            vMemberClient.member.preferences['prefAncienRegime']    = vAccountPrefAncienRegime.checked;
            vMemberClient.member.preferences['prefRevolution']      = vAccountPrefRevolution.checked;
            vMemberClient.member.preferences['pref1erEmpire']       = vAccountPref1erEmpire.checked;
            vMemberClient.member.preferences['pref2ndEmpire']       = vAccountPref2ndEmpire.checked;
            vMemberClient.member.preferences['prefSecession']       = vAccountPrefSecession.checked;
            vMemberClient.member.preferences['prefFarWest']         = vAccountPrefFarWest.checked;
            vMemberClient.member.preferences['prefWW1']             = vAccountPrefWW1.checked;
            vMemberClient.member.preferences['prefWW2']             = vAccountPrefWW2.checked;
            vMemberClient.member.preferences['prefContemporain']    = vAccountPrefContemporain.checked;
            vMemberClient.member.preferences['prefFuturiste']       = vAccountPrefFuturiste.checked;
            vMemberClient.member.preferences['prefFantastique']     = vAccountPrefFantastique.checked;
            vMemberClient.member.preferences['prefHFrancaise']      = vAccountPrefHFrancaise.checked;
            vMemberClient.member.preferences['prefHAmericaine']     = vAccountPrefHAmericaine.checked;
            vMemberClient.member.preferences['prefHInternationale'] = vAccountPrefHInternationale.checked;
            vMemberClient.member.preferences['prefAutre']           = vAccountPrefAutre.checked;

            vMemberClient.member.presentation  = vAccountForm.idAccountPresentation.value;

            if (vAccountForm.idAccountCurrentPassword.value !==''){                                 
                vMemberClient.member.oldPassword = vAccountForm.idAccountCurrentPassword.value;
                vMemberClient.member.password = vAccountForm.idAccountPassword.value;
            }
            webSocketConnection.emit('dataProfilMembre', vMemberClient.member);   // Transmission au serveur des infos saisies
            $('#idModalAccount').modal('toggle');                                 // Fermeture de la fenêtre modale de Login
            vAccountAlertMsg.style.visibility = 'hidden';  
        }
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
console.log('welcomeMember - 001 - vMemberClient.member : ',vMemberClient.member);

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
    // avec une nuance dans le message d'écran affiché selon que le 
    // MDP a été perdu, ou changé volontairement par le membre
    // --------------------------------------------------------------
    webSocketConnection.on('notifyNewPWDSent', function(pTypeChgtPWD){ 
        var cstLostPWD = 0;     // Constante qui désigne que le Chgt de MDP a été provoqué par une déclaration de MDP perdu, sinon, c'est qu'il a été changé par le membre
        vMemberClient.member.oldPassword ='';

        vMemberClient.InitHeaderColor('bg-success', vGenericModalHeader);
        if (pTypeChgtPWD === cstLostPWD){
            vMemberClient.initModalLostPWDText(vGenericModalTitle, vGenericModalBodyText);               // Affiche la fenêtre de notification
        } else {
            vMemberClient.initModalChangedPWDText(vGenericModalTitle, vGenericModalBodyText);            // Affiche la fenêtre de notification
        }
        $('#idGenericModal').modal('toggle');                                                           // ouverture de la fenêtre modale de notification
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
    function initModalSignIn(){
        vSignInForm.idSignInEmail.value = '';                                
        vSignInForm.idSignInPseudo.value = '';                              
        vSignInForm.idSignInPassword.value = '';
        vSignInForm.idSignInConfirmPassword.value = '';
        vSignInAlertMsg.style.visibility = 'hidden';                          
        vMemberClient.InitHeaderColor('bg-warning', vModalSignInHeader);
    }

    // -----------------------------------------------------------------------------
    // Cette fonction initialise la modale de saisie de renseignements (Compte) 
    // avec les valeurs récupérées dans la BDD, (et pouvant être vieges)
    // -----------------------------------------------------------------------------
    function initModalAccount(){
        vAccountForm.idAccountEmail.value  = vMemberClient.member.email;                                
        vAccountForm.idAccountPseudo.value = vMemberClient.member.pseudo;     

        vAccountPhotoImg.setAttribute('src', 'static/images/members/'+vMemberClient.member.etatCivil.photo);
        vAccountForm.idAccountFirstName.value = vMemberClient.member.etatCivil.firstName;     
        vAccountForm.idAccountName.value = vMemberClient.member.etatCivil.name;     
        vAccountForm.idAccountBirthDate.value = vMemberClient.member.etatCivil.birthDate;     

        if (vMemberClient.member.etatCivil.birthDate){
            updateFieldAge(vMemberClient.member.etatCivil.birthDate);
            } else {
            vAccountForm.idAccountAge.value = '';
        }

        var selectedSex = inputBtnRadioSex();
        updateAvatar(selectedSex);

        vAccountForm.idAccountStreet.value      = vMemberClient.member.etatCivil.address.street;    
        vAccountForm.idAccountCity.value        = vMemberClient.member.etatCivil.address.city;      
        vAccountForm.idAccountZipCode.value     = vMemberClient.member.etatCivil.address.zipCode;   
        vAccountForm.idAccountDepartment.value  = vMemberClient.member.etatCivil.address.department;

        vAccountPrefGravures.checked        = vMemberClient.member.preferences['prefGravures'];      
        activeButtonOfSelectedCheckBox(vAccountPrefGravures, 'idAccountPrefGravuresLabel');

        vAccountPrefLivres.checked          = vMemberClient.member.preferences['prefLivres'];    
        activeButtonOfSelectedCheckBox(vAccountPrefLivres, 'idAccountPrefLivresLabel');

        vAccountPrefFilms.checked           = vMemberClient.member.preferences['prefFilms']; 
        activeButtonOfSelectedCheckBox(vAccountPrefFilms, 'idAccountPrefFilmsLabel');
        
        vAccountPrefJeux.checked            = vMemberClient.member.preferences['prefJeux'];            
        activeButtonOfSelectedCheckBox(vAccountPrefJeux, 'idAccountPrefJeuxLabel');

        vAccountPrefMaquettes.checked       = vMemberClient.member.preferences['prefMaquettes'];       
        activeButtonOfSelectedCheckBox(vAccountPrefMaquettes, 'idAccountPrefMaquettesLabel');
        
        vAccountPrefFigurines.checked       = vMemberClient.member.preferences['prefFigurines'];       
        activeButtonOfSelectedCheckBox(vAccountPrefFigurines, 'idAccountPrefFigurinesLabel');

        vAccountPrefBlindes.checked         = vMemberClient.member.preferences['prefBlindes'];      
        activeButtonOfSelectedCheckBox(vAccountPrefBlindes, 'idAccountPrefBlindesLabel');
        
        vAccountPrefAvions.checked          = vMemberClient.member.preferences['prefAvions'];          
        activeButtonOfSelectedCheckBox(vAccountPrefAvions, 'idAccountPrefAvionsLabel');

        vAccountPrefBateaux.checked         = vMemberClient.member.preferences['prefBateaux'];         
        activeButtonOfSelectedCheckBox(vAccountPrefBateaux, 'idAccountPrefBateauxLabel');

        vAccountPrefDioramas.checked        = vMemberClient.member.preferences['prefDioramas'];        
        activeButtonOfSelectedCheckBox(vAccountPrefDioramas, 'idAccountPrefDioramasLabel');

        vAccountPrefPrehistoire.checked     = vMemberClient.member.preferences['prefPrehistoire'];     
        activeButtonOfSelectedCheckBox(vAccountPrefPrehistoire, 'idAccountPrefPrehistoireLabel');

        vAccountPrefAntiquite.checked       = vMemberClient.member.preferences['prefAntiquite'];       
        activeButtonOfSelectedCheckBox(vAccountPrefAntiquite, 'idAccountPrefAntiquiteLabel');

        vAccountPrefMoyenAge.checked        = vMemberClient.member.preferences['prefMoyenAge'];        
        activeButtonOfSelectedCheckBox(vAccountPrefMoyenAge, 'idAccountPrefMoyenAgeLabel');

        vAccountPrefRenaissance.checked     = vMemberClient.member.preferences['prefRenaissance'];     
        activeButtonOfSelectedCheckBox(vAccountPrefRenaissance, 'idAccountPrefRenaissanceLabel');

        vAccountPrefDentelles.checked       = vMemberClient.member.preferences['prefDentelles'];       
        activeButtonOfSelectedCheckBox(vAccountPrefDentelles, 'idAccountPrefDentellesLabel');
        
        vAccountPrefAncienRegime.checked    = vMemberClient.member.preferences['prefAncienRegime'];    
        activeButtonOfSelectedCheckBox(vAccountPrefAncienRegime, 'idAccountPrefAncienRegimeLabel');

        vAccountPrefRevolution.checked      = vMemberClient.member.preferences['prefRevolution'];      
        activeButtonOfSelectedCheckBox(vAccountPrefRevolution, 'idAccountPrefRevolutionLabel');

        vAccountPref1erEmpire.checked       = vMemberClient.member.preferences['pref1erEmpire'];       
        activeButtonOfSelectedCheckBox(vAccountPref1erEmpire, 'idAccountPref1erEmpireLabel');

        vAccountPref2ndEmpire.checked       = vMemberClient.member.preferences['pref2ndEmpire'];       
        activeButtonOfSelectedCheckBox(vAccountPref2ndEmpire, 'idAccountPref2ndEmpireLabel');

        vAccountPrefSecession.checked       = vMemberClient.member.preferences['prefSecession'];       
        activeButtonOfSelectedCheckBox(vAccountPrefSecession, 'idAccountPrefSecessionLabel');

        vAccountPrefFarWest.checked         = vMemberClient.member.preferences['prefFarWest'];         
        activeButtonOfSelectedCheckBox(vAccountPrefFarWest, 'idAccountPrefFarWestLabel');

        vAccountPrefWW1.checked             = vMemberClient.member.preferences['prefWW1'];             
        activeButtonOfSelectedCheckBox(vAccountPrefWW1, 'idAccountPrefWW1Label');

        vAccountPrefWW2.checked             = vMemberClient.member.preferences['prefWW2'];             
        activeButtonOfSelectedCheckBox(vAccountPrefWW2, 'idAccountPrefWW2Label');

        vAccountPrefContemporain.checked    = vMemberClient.member.preferences['prefContemporain'];    
        activeButtonOfSelectedCheckBox(vAccountPrefContemporain, 'idAccountPrefContemporainLabel');

        vAccountPrefFuturiste.checked       = vMemberClient.member.preferences['prefFuturiste'];       
        activeButtonOfSelectedCheckBox(vAccountPrefFuturiste, 'idAccountPrefFuturisteLabel');

        vAccountPrefFantastique.checked     = vMemberClient.member.preferences['prefFantastique'];     
        activeButtonOfSelectedCheckBox(vAccountPrefFantastique, 'idAccountPrefFantastiqueLabel');

        vAccountPrefHFrancaise.checked      = vMemberClient.member.preferences['prefHFrancaise'];      
        activeButtonOfSelectedCheckBox(vAccountPrefHFrancaise, 'idAccountPrefHFrancaiseLabel');

        vAccountPrefHAmericaine.checked     = vMemberClient.member.preferences['prefHAmericaine'];     
        activeButtonOfSelectedCheckBox(vAccountPrefHAmericaine, 'idAccountPrefHAmericaineLabel');

        vAccountPrefHInternationale.checked = vMemberClient.member.preferences['prefHInternationale']; 
        activeButtonOfSelectedCheckBox(vAccountPrefHInternationale, 'idAccountPrefHInternationaleLabel');

        vAccountPrefAutre.checked           = vMemberClient.member.preferences['prefAutre'];           
        activeButtonOfSelectedCheckBox(vAccountPrefAutre, 'idAccountPrefAutreLabel');

        vAccountForm.idAccountPresentation.value = vMemberClient.member.presentation;

        vMemberClient.newPasswordKO = false;
        vAccountForm.idAccountCurrentPassword.value = '';
        vAccountForm.idAccountPassword.value = '';
        vAccountForm.idAccountConfirmPassword.value = '';

        vAccountPassword.setAttribute('disabled', 'true');
        vAccountConfirmPassword.setAttribute('disabled', 'true');

        vAccountAlertMsg.style.visibility = 'hidden';                          
        vMemberClient.InitHeaderColor('bg-warning', vModalAccountHeader);
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
    // Cette fonction simule le click des boutons de préférences a true pour refleter
    // le statut et la couleur correspondante des badges colorés
    // -----------------------------------------------------------------------------
    function activeButtonOfSelectedCheckBox(pAccountPref, pIdAccountPrefLabel){

        var myIdLabel = document.getElementById(pIdAccountPrefLabel)
        pAccountPref.checked ? myIdLabel.classList.add('active') : myIdLabel.classList.remove('active');
    }
// --------------------------------------------------------------------------------------------------------------
}); // Fin de la Boucle "DOMContentLoaded"