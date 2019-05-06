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

	// ****************************************************************************************************************************** 
	// ****************************************************************************************************************************** 
	// ****************************************************************************************************************************** 
	// ****************************************************************************************************************************** 
	//																																																																
	//                               Partie 1 : Initialisations
	// 
	// ****************************************************************************************************************************** 
	// ****************************************************************************************************************************** 
	// ****************************************************************************************************************************** 
	// ******************************************************************************************************************************

	// -------------------------------------------------------------------------
	// Initialisations
	// Recupération des Elements du DOM nécessaires
	// Mise en oeuvre des captures d'évenements nécessaires
	// Prépositionnement (Focus) sur les champs des différentes fenêtres modales
	// Réinitialisations des valeurs des champs de saisies des différentes fenêtres
	// -------------------------------------------------------------------------
	vToolBox = new ToolBox();
	var vMemberClient = new MemberClient();       // Instanciation de l'objet descrivant un Membre et les méthodes de gestion de ce Membre
	
	vMemberClient.InitPopOverAndToolTipAndDropDown();
		// -------------------------------------------------------------------------
	// 
	// Eléments du menu principal (Header Menu)
	// 
	// -------------------------------------------------------------------------
	var vConnexion = document.getElementById('idConnexion');
	var vCreation = document.getElementById('idCreation');
	var vDeconnexion = document.getElementById('idDeconnexion');
	var vAccount = document.getElementById('idAccount');
	var vAbout = document.getElementById('idAbout');
	// var vMembersConnected = document.getElementById('idMembersConnected');
	
	var vGenericModal = document.getElementById('idGenericModal');
	var vDropDownProfilMenu = document.getElementById('idDropDownProfilMenu');
	var vImgAvatarDropDownMenu = document.getElementById('idImgAvatarDropDownMenu');
	var vSpanAvatarDropDownMenu = document.getElementById('idSpanAvatarDropDownMenu');
	var vNbrPopulation = document.getElementById('idNbrPopulation');
	
// XXXXX MembersConnected.onclick =  function(event) {
//	console.log('vMembersConnected - click')
//  $('.chat-sidebar').toggleClass('focus');
// }

// -------------------------------------------------------------------------
//
// Eléments de la page "Profil"
//
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// Eléments du menu du profil ("Profile Menu" sous l'Avatar)
// -------------------------------------------------------------------------
	var vProfileNavBar = document.getElementById('idProfileNavBar');			// Menu du profil
	var vAddFriend = document.getElementById('idAddFriend');							// Bouton "Ajouter des amis"
	var vInvitations = document.getElementById('idInvitations');					// Bouton "Valider des amis"
	var vNbrWaitingInvit = document.getElementById('idNbrWaitingInvit');	// Puce "Nbre d'invit en attentes"

	vAddFriend.addEventListener('click', function(){											// Ouvre la fenêtre d'ajout d'amis
	// Demande au serveur d'afficher les membres (filtrés) pour les présenter dans une liste d'amis potentiels
		webSocketConnection.emit('askAddFriend', vMemberClient.member.pseudo);  
	});

	vInvitations.addEventListener('click', function(){											// Ouvre la fenêtre de validation des amis
	// Demande au serveur d'afficher les membres qui ont envoyé une invitation pour devenir ami
		webSocketConnection.emit('listInvitations', vMemberClient.member.email);  
	});

	// Affiche une Div "Pad" qui vient s'intercaler entre le bas du menu du profil 
	// et le haut du Footer, pour que le fond d'écran ne soit pas interrompu lorsque 
	// la page de profil n'est pas affichée
	var vPad = document.getElementById('idPad');
	vPad.style.height = document.getElementById('idFooter').offsetTop - vPad.offsetTop + 'px';

	// -------------------------------------------------------------------------
	// Eléments de l'Avatar (Photo (normale et tokenisée) et Pseudo)
	// -------------------------------------------------------------------------
	var vAvatarImg1 = document.getElementById('idAvatarImg1');
	var vAvatarMemberNameImg1 = document.getElementById('idAvatarMemberNameImg1');
	vAvatarImg1.setAttribute('src', 'static/images/visiteur.jpg');  // Avatar par défaut lorsque le visiteur ne s'est pas loggé
	vAvatarMemberNameImg1.innerHTML = 'Visiteur';
	
	// -------------------------------------------------------------------------
	// Eléments de la page de profil (Page qui affiche la présentation, les posts, 
	// les amis, la discussion de groupe...)
	// -------------------------------------------------------------------------
	var vProfilePage = document.getElementById('idProfilePage');
	
	// -------------------------------------------------------------------------
	// Eléments de la carte de Présentation du membre sur son profil
	// -------------------------------------------------------------------------
	var vAvatarToken = document.getElementById('idAvatarToken');
	var vAboutPrenom = document.getElementById('idAboutPrenom');
	var vAboutAge = document.getElementById('idAboutAge');
	var vAboutVille = document.getElementById('idAboutVille');
	var vAboutDepartmentName = document.getElementById('idAboutDepartmentName');
	var vAboutPresentation = document.getElementById('idAboutPresentation');
	

	// -------------------------------------------------------------------------
	// Eléments de la carte des amis du membre sur son profil
	// -------------------------------------------------------------------------
	var vFriendUL = document.getElementById('idFriendUL');
	
	// -------------------------------------------------------------------------
	// Déconnexion du membre:
	// - Réinitialisation de la landing-page
	// - Fermeture du socket
	// - Blocage de la NavBar du profil
	// -------------------------------------------------------------------------
	vDeconnexion.addEventListener('click', function(){
		vMemberClient.unsetMemberContext();
	});

	// -------------------------------------------------------------------------
	// -------------------------------------------------------------------------
	// Eléments de la fenêtre modale générique
	// Initialisation du texte de la fenetre modale en mode "A propos" (par défaut 
	// et également en cas de réaction au "Click")
	// -------------------------------------------------------------------------
	// -------------------------------------------------------------------------
	var vGenericModalHeader = document.getElementById('idGenericModalHeader');
	var vGenericModalTitle = document.getElementById('idGenericModalTitle');
	var vGenericModalBodyText = document.getElementById('idGenericModalBodyText');
	var vGenericModalBtn = document.getElementById('idGenericModalBtn');
	
	vAbout.addEventListener('click', function(){
		vMemberClient.InitHeaderColor('bg-warning', vGenericModalHeader);
		vMemberClient.initModalTextAbout(vGenericModalTitle, vGenericModalBodyText);                     
	});

	// -------------------------------------------------------------------------
	// -------------------------------------------------------------------------
	// Eléments de champs de saisie de la Modale de Login
	// -------------------------------------------------------------------------
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
	// Validation Login
	// Envoi des infos de login du visiteur lorsque la saisie du Login est validée 
	// syntaxiquement et par la validation globale de celle-ci
	// -------------------------------------------------------------------------
	vLoginForm.addEventListener('submit', function (event){ 
		event.preventDefault();                

		var vVisiteurLoginData =                                     // Mise en forme pour transmission au serveur des données saisies
			{
				pseudo : vLoginForm.idLoginPseudo.value,
				password : vLoginForm.idLoginPassword.value,
			}

		webSocketConnection.emit('visiteurLoginData', vVisiteurLoginData);   	// Transmission au serveur des infos saisies
		$('#idModalLogin').modal('hide');                                 		// Fermeture de la fenêtre modale de Login
		vLoginAlertMsg.style.visibility = 'hidden';  
	});

	// -------------------------------------------------------------------------
	// Gestion du raccourci de la création de compte (sur la Modale de Login)
	// -------------------------------------------------------------------------
	vSignIn.addEventListener('click', function(){
		var lSignInParameters = {
			vSignInForm,
			vSignInAlertMsg,
			vModalSignInHeader,
		}
		vMemberClient.initModalSignIn(lSignInParameters);
		$('#idModalLogin').modal('hide');                                 // Fermeture de la fenêtre modale de Login
		$('#idModalSignIn').modal('show');                                // Ouverture de la fenêtre modale de gestion de PWD perdu
	});

	// -------------------------------------------------------------------------
	// Gestion du raccourci de Mot de Passe oublié (sur la Modale de login)
	// -------------------------------------------------------------------------
	var vLostPWDForm = document.getElementById('idLostPWDForm');
	var vModalLostPWDHeader = document.getElementById('idModalLostPWDHeader');
	var vLostPWDAlertMsg = document.getElementById('idLostPWDAlertMsg');

	vMemberClient.giveFocusToModalFirstField('idModalLostPWD', 'idLostPWDEmail');

	vLostPWD.addEventListener('click', function(){
		vLostPWDForm.idLostPWDEmail.value = '';
		vLostPWDAlertMsg.style.visibility = 'hidden';                       // Cache du message d'alerte de saisie d'email erroné
		vMemberClient.InitHeaderColor('bg-warning', vModalLostPWDHeader);
		$('#idModalLogin').modal('hide');                                 // Fermeture de la fenêtre modale de Login
		$('#idModalLostPWD').modal('show');                               // Ouverture de la fenêtre modale de gestion de PWD perdu
	});

	// -------------------------------------------------------------------------
	// Validation Demande du Mot de passe
	// Envoi des infos de récupération du Mot de Passe lorsque la saisie du mail 
	// est validée syntaxiquement et par la validation globale de celle-ci
	// -------------------------------------------------------------------------
	vLostPWDForm.addEventListener('submit', function (event){ 
		event.preventDefault();                
		webSocketConnection.emit('lostPWDMgr', vLostPWDForm.idLostPWDEmail.value);   	// Transmission au serveur des infos saisies
		$('#idModalLostPWD').modal('hide');                                        		// Fermeture de la fenêtre modale de Login
	});

	// -------------------------------------------------------------------------
	// -------------------------------------------------------------------------
	// Eléments de champs de saisie de la Modale de Création de compte (SignIn)
	// -------------------------------------------------------------------------
	// -------------------------------------------------------------------------
	var vSignInForm = document.getElementById('idSignInForm');
	var vModalSignInHeader = document.getElementById('idModalSignInHeader');
	var vSignInAlertMsg = document.getElementById('idSignInAlertMsg');
	var vSignInPassword = document.getElementById('idSignInPassword');
	var vSignInConfirmPassword = document.getElementById('idSignInConfirmPassword');
	
	vMemberClient.giveFocusToModalFirstField('idModalSignIn', 'idSignInEmail');                                               

	vCreation.addEventListener('click', function(){
		var lSignInParameters = {
			vSignInForm,
			vSignInAlertMsg,
			vModalSignInHeader,
		}
		vMemberClient.initModalSignIn(lSignInParameters);
	});

	vSignInPassword.onchange = function(){vMemberClient.validatePassword(vSignInPassword, vSignInConfirmPassword)};  					// Vérification que les MDP sont identiques
	vSignInConfirmPassword.onkeyup = function(){vMemberClient.validatePassword(vSignInPassword, vSignInConfirmPassword)};     //

	// -------------------------------------------------------------------------
	// Validation Sign-In (Création de compte)
	// Envoi des infos de création du visiteur lorsque la Création de compte est 
	// validée syntaxiquement et par la validation globale de celle-ci
	// -------------------------------------------------------------------------
	vSignInForm.addEventListener('submit', function (event){ 
		event.preventDefault();                

		var visitorSignInData =                                     // Mise en forme pour transmission au serveur des données saisies
		{
			email    : vSignInForm.idSignInEmail.value,
			pseudo   : vSignInForm.idSignInPseudo.value,
			password : vSignInForm.idSignInPassword.value,
		}

		webSocketConnection.emit('visitorSignInData', visitorSignInData);     // Transmission au serveur des infos saisies
		$('#idModalSignIn').modal('hide');                                    	// Fermeture de la fenêtre modale de Sign-In
		vSignInAlertMsg.style.visibility = 'hidden';                            // Affichage du message d'alerte de connexion erronée
	});

	// -------------------------------------------------------------------------
	// -------------------------------------------------------------------------
	// Eléments des champs de saisie de la Modale de renseignements (Account)
	// -------------------------------------------------------------------------
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
	// Eléments du UpLoader d'images du profil (avec ses events)
	// -------------------------------------------------------------------------
	var vSIOFU = new SocketIOFileUpload(webSocketConnection);

	vSIOFU.addEventListener('progress', function(event){
		var percent = event.bytesLoaded / event.file.size * 100;
		console.log('File Upload - File is', percent.toFixed(2), 'percent loaded');
	});

	vSIOFU.addEventListener('complete', function(event){
		console.log('File Upload - Image upLoadée avec succès');
		console.log('File Upload - event.success');
		console.log(event.file);
	});

	// -------------------------------------------------------------------------
	// Initialisation Modale de la Fiche de renseignements avec 
	// les datas provenant de la BDD
	// -------------------------------------------------------------------------
	vAccount.addEventListener('click', function(){
		vMemberClient.initModalAccount(vAccountParams);
	});

	// -------------------------------------------------------------------------
	// MAJ en temps réel du champ age dès qu'il y a une modification de la date de naissance
	// -------------------------------------------------------------------------
	vAccountBirthDate.addEventListener('click', function(){
		vMemberClient.updateFieldAge(vAccountForm.idAccountBirthDate.value, vAccountForm);
	});          
	vAccountBirthDate.addEventListener('input', function(){
		vMemberClient.updateFieldAge(vAccountForm.idAccountBirthDate.value, vAccountForm);
	});          
	
	// -------------------------------------------------------------------------
	// MAJ en temps réel de la silhouette de l'avatar (si aucune photo n'a été chargée)
	// en fonction de la sélection du sexe
	// -------------------------------------------------------------------------
	vAccountSexNone.addEventListener('click', function(){
		vMemberClient.updateAvatar(0, vAccountPhotoImg);
	});          
	vAccountSexMale.addEventListener('click', function(){
		vMemberClient.updateAvatar(1, vAccountPhotoImg);
	});          
	vAccountSexFemale.addEventListener('click', function(){
		vMemberClient.updateAvatar(2, vAccountPhotoImg);
	});              

	// -------------------------------------------------------------------------
	// Affiche l'image de profil apres l'avoir selectionné avec un input type="file"
	// MAIS elle n'est pas encore envoyée vers le serveur, ce ne sera fait qu'à 
	// la validation globale de la fiche de renseignement
	// -------------------------------------------------------------------------
	vAccountPhotoFile.addEventListener('change', function(){

		// if (vAccountPhotoFile.files[0]!=='undefined'){ // Suggestion de Mathos
		if (vAccountPhotoFile.files[0]!==undefined){		
			vAccountPhotoImg.setAttribute('src',window.URL.createObjectURL(vAccountPhotoFile.files[0]));
		}
	}, false);

	// -------------------------------------------------------------------------
	// Initialise la gestion du changement de passe
	// Si le MDP actuel saisi = a celui qui est stocké en BDD, on active les 2 
	// champs de New MDP
	// Sinon, on affiche un Message d'erreur et on reboucle, et surtout, on ne 
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
	// Validation Modale  Fiche "Renseignements"
	// -------------------------------------------------------------------------
		vAccountForm.addEventListener('submit', function (event){ 
			event.preventDefault();
			vMemberClient.updateProfile(vAccountParams, vAvatarInfo, vProfileInfo);
		});


	// -------------------------------------------------------------------------
	// -------------------------------------------------------------------------
	// Eléments des champs de saisie de la Modale d'ajout d'amis
	// -------------------------------------------------------------------------
	// -------------------------------------------------------------------------
	var vModalMgrFriend = document.getElementById('idModalMgrFriend');
	var vModalMgrFriendHeader = document.getElementById('idModalMgrFriendHeader');
	var vModalMgrFriendExitBtn = document.getElementById('idModalMgrFriendExitBtn');
	var vModalMgrFriendTitle = document.getElementById('idModalMgrFriendTitle');
	var vModalMgrFriendListGroup = document.getElementById('idModalMgrFriendListGroup');

	// Suppression de tous les éléments de la liste des membres pouvant devenir ami à la fermeture de la modale
	$('#idModalMgrFriend').on('hidden.bs.modal', () => {
		vModalMgrFriendHeader.removeChild(vModalMgrFriendHeader.firstChild);
		vModalMgrFriendTitle.removeChild(vModalMgrFriendTitle.firstChild);

		while (vModalMgrFriendListGroup.firstChild) {
			vModalMgrFriendListGroup.removeChild(vModalMgrFriendListGroup.firstChild);
		}
	})


	// ****************************************************************************************************************************** 
	// ****************************************************************************************************************************** 
	// ****************************************************************************************************************************** 
	// ****************************************************************************************************************************** 
	//																																																																
	//                               Partie 2 : Structures de transfert vers l'objet Principal "vMemberClient"
	// 
	// ****************************************************************************************************************************** 
	// ****************************************************************************************************************************** 
	// ****************************************************************************************************************************** 
	// ******************************************************************************************************************************

	// -------------------------------------------------------------------------
	// Structure de transfert des infos de contexte (NavBar, Options de menus, etc...)
	// -------------------------------------------------------------------------
	var vContextInfo = {
		vConnexion,
		vCreation,
		vDropDownProfilMenu,
		vDeconnexion,
		vProfileNavBar,
		vNbrWaitingInvit,
		vProfilePage,
		vPad
	}

	// -------------------------------------------------------------------------
	// Structure de transfert des infos de l'avatar
	// -------------------------------------------------------------------------
	var vAvatarInfo = {
		vImgAvatarDropDownMenu,
		vSpanAvatarDropDownMenu,
		vAvatarImg1,
		vAvatarToken,
		vAvatarMemberNameImg1
	}
	
	// -------------------------------------------------------------------------
	// Structure de transfert des infos du profil
	// -------------------------------------------------------------------------
	var vProfileInfo = {
		vAboutPrenom,
		vAboutAge,
		vAboutVille,
		vAboutDepartmentName,
		vAboutPresentation,
	}

	// -------------------------------------------------------------------------
	// Structure de transfert des infos des amis
	// -------------------------------------------------------------------------
	var vFriendInfo = {
		vGenericModal,
		vGenericModalHeader,
		vGenericModalTitle,
		vGenericModalBodyText,
		vFriendUL,
	}
	
	// -------------------------------------------------------------------------
	// Structure de transfert des infos de la page de renseignements vers la 
	// page de renseignements
	// -------------------------------------------------------------------------
	var vAccountParams = {
		vSIOFU,
		vModalAccountHeader,
		vAccountForm,
		vAccountAlertMsg,
		vAccountPhotoImg,
		vAccountPhotoFile,
		vAccountDepartment,
		vAccountPrefGravures,
		vAccountPrefLivres,
		vAccountPrefFilms,
		vAccountPrefJeux,
		vAccountPrefMaquettes,
		vAccountPrefFigurines,
		vAccountPrefBlindes,
		vAccountPrefAvions,
		vAccountPrefBateaux,
		vAccountPrefDioramas,
		vAccountPrefPrehistoire,
		vAccountPrefAntiquite,
		vAccountPrefMoyenAge,
		vAccountPrefRenaissance,
		vAccountPrefDentelles,
		vAccountPrefAncienRegime,
		vAccountPrefRevolution,
		vAccountPref1erEmpire,
		vAccountPref2ndEmpire,
		vAccountPrefSecession,
		vAccountPrefFarWest,
		vAccountPrefWW1,
		vAccountPrefWW2,
		vAccountPrefContemporain,
		vAccountPrefFuturiste,
		vAccountPrefFantastique,
		vAccountPrefHFrancaise,
		vAccountPrefHAmericaine,
		vAccountPrefHInternationale,
		vAccountPrefAutre,
		vAccountPassword,
		vAccountConfirmPassword,
	}

	// ****************************************************************************************************************************** 
	// ****************************************************************************************************************************** 
	// ****************************************************************************************************************************** 
	// ****************************************************************************************************************************** 
	//																																																																
	//                                   Partie 3 :  Reception des messages en provenance du serveur 
	// 
	// ****************************************************************************************************************************** 
	// ****************************************************************************************************************************** 
	// ****************************************************************************************************************************** 
	// ******************************************************************************************************************************
	
	// --------------------------------------------------------------
	// Le serveur a supprimé mon ex-ami, et je dois donc l'effacer 
	// de ma carte "Liste d'amis"
	// --------------------------------------------------------------
	webSocketConnection.on('deleteFriendFromMyFriendList', function(pFriendToDelete){ 
		vMemberClient.deleteFriendFromMyFriendList(pFriendToDelete, vFriendInfo);
	});

	// --------------------------------------------------------------
	// Le serveur a supprimé mon ex-ami à l'initiative de la suppression, 
	// et je dois donc l'effacer également de ma carte "Liste d'amis"
	// Même procédure que ci-dessus, sauf que les rôles sont inversés
	// --------------------------------------------------------------
	webSocketConnection.on('deleteMeFromHisFriendList', function(pFriendToDelete){ 
		vMemberClient.deleteFriendFromMyFriendList(pFriendToDelete, vFriendInfo);
	});

	// --------------------------------------------------------------
	// Le serveur n'a pas trouvé d'amis à qui envoyer la recommendation de mon ami --> Message d'erreur
	// --------------------------------------------------------------
	webSocketConnection.on('emptyRecommendableFriendList', function(pRecommendFriendsList){   

		vMemberClient.initModalNoFriendToRecommend(vGenericModalTitle, vGenericModalBodyText);  // Affiche la fenêtre générique
		vMemberClient.InitHeaderColor('bg-danger', vGenericModalHeader);
		$('#idGenericModal').modal('show');      																		// ouverture de la fenêtre modale de message d'erreur

		$('#'+pRecommendFriendsList.myDropDownMenuId).dropdown('toggle');						// Fermeture de la DropDown d'amis à recommander puisque vide
	});

	// --------------------------------------------------------------
	// Le serveur a envoyé une liste d'amis à qui je peux recommander mon ami
	// --------------------------------------------------------------
	webSocketConnection.on('displayRecommendableFriendList', function(pRecommendableFriends){   
		vMemberClient.displayRecommendableFriendList(pRecommendableFriends);	// Affichage des amis à qui on peut recommander notre ami
	});

	// --------------------------------------------------------------
	// Affichage d'une Notification de recommandation envoyée par 
	// le serveur après les MAJ réussies de la BDD et l'envoi du mail
	// --------------------------------------------------------------
	webSocketConnection.on('displayNotifRecommendationSent', function(pFriendToAdd){  
		vMemberClient.displayNotifRecommendationSent(pFriendToAdd);
	});

	// --------------------------------------------------------------
	// Le serveur n'a pas trouvé d'invitations en attente --> Message d'erreur
	// --------------------------------------------------------------
	webSocketConnection.on('emptyWaitingInvitation', function(){   
		vMemberClient.initModalEmptyWaitingInvit(vGenericModalTitle, vGenericModalBodyText);  // Affiche la fenêtre générique
		vMemberClient.InitHeaderColor('bg-danger', vGenericModalHeader);
		$('#idGenericModal').modal('show');                                           // ouverture de la fenêtre modale de message d'erreur
	});

	// --------------------------------------------------------------
	// On a reçu une liste d'invitations à traiter
	// Ajout dynamique des membres demandeurs dans le DOM sur la modale
	// --------------------------------------------------------------
	webSocketConnection.on('displayWaitingInvitation', function(pWaitingInvit){   
		var vDisplayWaitingInvitationData = {
			modalMgrFriendHeader 		: vModalMgrFriendHeader,
			modalMgrFriendExitBtn 	: vModalMgrFriendExitBtn ,
			modalMgrFriendListGroup : vModalMgrFriendListGroup,
		}

		vMemberClient.displayWaitingInvitation(pWaitingInvit, vDisplayWaitingInvitationData)
	});

	// --------------------------------------------------------------
	// Ajout de mon Avatar sur la liste de mon nouvel ami
	// --------------------------------------------------------------
	webSocketConnection.on('addFriendIntoHisList', function(pMyFriend){ 
		vMemberClient.addFriendIntoCard(pMyFriend, vFriendInfo);
	});

	// --------------------------------------------------------------
	// Affichage d'une Notification d'acceptation d'ami envoyée par 
	// le serveur après les MAJ réussies de la BDD
	// et ajout de son avaatar dans ma liste d'amis
	// --------------------------------------------------------------
	webSocketConnection.on('displayNotifInvitationValided', function(pSelectedInvit){ 
		var vDisplayNotifInvitationValidedData = {
			modalMgrFriendListGroup : vModalMgrFriendListGroup,
		}
		vMemberClient.displayNotifInvitationValided(pSelectedInvit, vFriendInfo, vDisplayNotifInvitationValidedData);
	});	

	// --------------------------------------------------------------
	// Affichage d'une Notification de refus d'ami envoyée par 
	// le serveur après les MAJ réussies de la BDD
	// --------------------------------------------------------------
	webSocketConnection.on('displayNotifInvitationRefused', function(pSelectedInvit){   
		var vDisplayNotifInvitationRefusedData = {
			modalMgrFriendListGroup : vModalMgrFriendListGroup,
		}
		vMemberClient.displayNotifInvitationRefused(pSelectedInvit, vDisplayNotifInvitationRefusedData);
	});

	// --------------------------------------------------------------
	// Le serveur n'a pas trouvé de membres susceptibles de devenir amis
	// car soit c'est le membre lui-même (et ne peut donc devenir son 
	// propre ami, soit ils sont dejà amis ou en attente de confirmation 
	// (tel que demandé dans le CDC)) --> Message d'erreur
	// --------------------------------------------------------------
	webSocketConnection.on('emptyPotentialFriends', function(){   
		vMemberClient.initModalEmptyFriendList(vGenericModalTitle, vGenericModalBodyText);  // Affiche la fenêtre générique
		vMemberClient.InitHeaderColor('bg-danger', vGenericModalHeader);
		$('#idGenericModal').modal('show');                                           // ouverture de la fenêtre modale de message d'erreur
	});

	// --------------------------------------------------------------
	// On a reçu une liste de membres pouvant devenir amis
	// Ajout dynamique des membres dans le DOM sur la modale
	// de sélection des membres pour devenir amis
	// --------------------------------------------------------------
	webSocketConnection.on('displayPotentialFriends', function(pMembersFriendables){  
		var vDisplayPotentialfriendData = {
			modalMgrFriendHeader 		: vModalMgrFriendHeader,
			modalMgrFriendExitBtn 	: vModalMgrFriendExitBtn,
			modalMgrFriendListGroup : vModalMgrFriendListGroup,
		}
		vMemberClient.displayPotentialFriends(pMembersFriendables, vDisplayPotentialfriendData);
	});

	// --------------------------------------------------------------
	// Affichage d'une Notification d'envoi d'invitation envoyée par 
	// le serveur après les MAJ réussies de la BDD et l'envoi du mail
	// --------------------------------------------------------------
	webSocketConnection.on('displayNotifInvitationSent', function(pFriendToAdd){  
		var vDisplayNotifInvitationSentData = {
			modalMgrFriendListGroup : vModalMgrFriendListGroup,
		}
		vMemberClient.displayNotifInvitationSent(pFriendToAdd, vDisplayNotifInvitationSentData);
	});

	// --------------------------------------------------------------
	// Le serveur a demandé la MAJ de la puce du Nbre d'invitations 
	// en attente de validation
	// --------------------------------------------------------------
	webSocketConnection.on('updatePuceNbreInvitations', function(pNbrWaitingInvit){   
		vMemberClient.displayPuceNbrWaitingInvit(vContextInfo, pNbrWaitingInvit);
	});

	// --------------------------------------------------------------
	// Le serveur a rejeté le mail de Mot de passe perdu, et redemande 
	// au visiteur de le resaisir
	// --------------------------------------------------------------
	webSocketConnection.on('retryLostPWDForm', function(){   
		vLostPWDAlertMsg.style.visibility = 'visible';                                 // Affichage du message d'alerte de saisie d'email erroné
		vMemberClient.InitHeaderColor('bg-danger', vModalLostPWDHeader);
		setTimeout(function(){$('#idModalLostPWD').modal('show')},cstDelayToggleModal);              // Obligation de temporiser la réouverture sinon ça ne marche pas
	});

	// --------------------------------------------------------------
	// Le serveur a rejeté la demande Login, et redemande au visiteur 
	// de réessayer de se logger
	// --------------------------------------------------------------
	webSocketConnection.on('retryLoginForm', function(){   
		vLoginAlertMsg.style.visibility = 'visible';                                 // Affichage du message d'alerte de connexion erronée
		vMemberClient.InitHeaderColor('bg-danger', vModalLoginHeader);
		setTimeout(function(){$('#idModalLogin').modal('show')},cstDelayToggleModal);              // Obligation de temporiser la réouverture sinon ça ne marche pas
	});

	// --------------------------------------------------------------
	// Le serveur a rejeté la demande Signin, et redemande au visiteur 
	// de resaisir ses infos de Sign-In
	// --------------------------------------------------------------
	webSocketConnection.on('retrySignInForm', function(){   
		vSignInAlertMsg.style.visibility = 'visible';                               // Affichage du message d'alerte de connexion erronée
		vMemberClient.InitHeaderColor('bg-danger', vModalSignInHeader);
		setTimeout(function(){$('#idModalSignIn').modal('show')},cstDelayToggleModal);            // Obligation de temporiser la réouverture sinon ça ne marche pas
	});

	// --------------------------------------------------------------
	// Le visiteur s'est loggé avec succès et est donc reconnu comme membre
	// ==> Désactivation du bouton "Connexion"
	// ==> Désactivation du bouton "Créer un compte"
	// ==> Activation du bouton "Deconnexion"
	// ==> Active le sous-menu de la NavBar d'entête
	// ==> Affiche le nom du membre dans le menu
	// ==> Affiche la photo de l'avatar et son nom sur le carousel
	// ==> Active la NavBar du profil
	// ==> Ouverture de la page de profil
	// ==> MAJ du badge du Nbre d'invitations en attente
	// --------------------------------------------------------------
	webSocketConnection.on('welcomeMember', function(pDataTransmitted){   
		vMemberClient.member = pDataTransmitted.member;    

		if (pDataTransmitted.welcomeMessage === 'Hello') {
			vMemberClient.initModalHelloText(vGenericModalTitle, vGenericModalBodyText);  	// Affiche la fenêtre de bienvenue
		} else {
			if (pDataTransmitted.welcomeMessage === 'Congrat'){
				vMemberClient.initModalWelcomeText(vGenericModalTitle, vGenericModalBodyText); 	// Affiche la fenêtre de bienvenue pour un nouveau membre
			}
		}
		vMemberClient.InitHeaderColor('bg-success', vGenericModalHeader);
		$('#idGenericModal').modal('show');                                           		// ouverture de la fenêtre modale de Félicitations

		vMemberClient.displayProfilePage(vContextInfo, vAvatarInfo, vProfileInfo, pDataTransmitted.askingMembers, vMemberClient.member.amis, vFriendInfo);			// Affichage de la page de profil
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
			vMemberClient.initModalLostPWDText(vGenericModalTitle, vGenericModalBodyText);               // Affiche la fenêtre de notification pour MDP perdu
		} else {
			vMemberClient.initModalChangedPWDText(vGenericModalTitle, vGenericModalBodyText);            // Affiche la fenêtre de notification pourMDP changé volontairement
		}
		$('#idGenericModal').modal('show');                                                           // ouverture de la fenêtre modale de notification
	});    

	// --------------------------------------------------------------
	// Le serveur a rejeté la demande Login, car le visiteur est dejà 
	// coonnecté avec une autre session
	// --------------------------------------------------------------
	webSocketConnection.on('memberAlreadyConnected', function(pMember){ 
		vMemberClient.initModalAlreadyConnectedText(vGenericModalTitle, vGenericModalBodyText);     // Affiche la fenêtre de bienvenue
		vMemberClient.InitHeaderColor('bg-danger', vGenericModalHeader);
		$('#idGenericModal').modal('show');                                                       // ouverture de la fenêtre modale de notification de rejet
	});    

	// --------------------------------------------------------------
	// Affiche le nombre de membres connectés
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

	// --------------------------------------------------------------
	// Affichage de l'avatar sur la page de profil lorsque le serveur 
	// a fini de l'UpLoader
	// --------------------------------------------------------------
	webSocketConnection.on('displayAvatarOnProfile', function(){ 
		vMemberClient.displayAvatar(vAvatarInfo)
	});

	// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// 
}); // Fin de la Boucle "DOMContentLoaded"
// 
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------