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
	vAccountModal = new AccountModal(vMemberClient);				// Instanciation de la méga-modale de saisie des infos personnelles;

	vToolBox.InitPopOverAndToolTipAndDropDown();
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
	var vMemberList = document.getElementById('idMemberList');							// Bouton "Ajouter des amis"
	var vInvitations = document.getElementById('idInvitations');					// Bouton "Valider des amis"
	var vNbrWaitingInvit = document.getElementById('idNbrWaitingInvit');	// Puce "Nbre d'invit en attentes"

	vAddFriend.addEventListener('click', function(){											// Ouvre la fenêtre d'ajout d'amis
	// Demande au serveur d'afficher les membres (filtrés) pour les présenter dans une liste d'amis potentiels
		var vDataToTransmit = {
			myPseudo 			: vMemberClient.member.pseudo,
			withNewModal	: cstWithNewModal,
		}
		webSocketConnection.emit('askAddFriend', vDataToTransmit);  
	});

	vMemberList.addEventListener('click', function(){											// Ouvre la fenêtre d'ajout d'amis
	// Demande au serveur d'afficher tous les membres (non filtrés) pour les présenter dans une liste 
		var vDataToTransmit = {
			withNewModal : cstWithNewModal,
		}
		webSocketConnection.emit('askMemberList', vDataToTransmit);  
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
	var vAboutNom = document.getElementById('idAboutNom');
	var vAboutAge = document.getElementById('idAboutAge');
	var vAboutVille = document.getElementById('idAboutVille');
	var vAboutDepartmentName = document.getElementById('idAboutDepartmentName');
	var vAboutPresentation = document.getElementById('idAboutPresentation');

	// -------------------------------------------------------------------------
	// Eléments de la carte des amis du membre sur son profil
	// -------------------------------------------------------------------------
	var vFilteredFriends = document.getElementById('idFilteredFriends');
	vFilteredFriends.addEventListener('keyup', function(){
		vMemberClient.filterFriends(vFilteredFriends.value.toUpperCase())
	});

	var vClearFriendsFilter = document.getElementById('idClearFriendsFilter');
	vClearFriendsFilter.addEventListener('click', function(){
		vFilteredFriends.value = '';
		vMemberClient.filterFriends(vFilteredFriends.value.toUpperCase())
	});

	var vFriendUL = document.getElementById('idFriendUL');
	
	// -------------------------------------------------------------------------
	// Eléments de la carte des invitations lancées membre sur son profil
	// -------------------------------------------------------------------------
	var vInvitSentCard = document.getElementById('idInvitSentCard');
	var vInvitSentUL = document.getElementById('idInvitSentUL');

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
		var vModalHeaderColorParams = 
		{
			activeColor : 'bg-warning',
			modalHeader : vGenericModalHeader,
		}
		new InitHeaderColor().initHeaderColor(vModalHeaderColorParams);
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

		var vModalHeaderColorParams = 
		{
			activeColor : 'bg-warning',
			modalHeader : vModalLoginHeader,
		}
		new InitHeaderColor().initHeaderColor(vModalHeaderColorParams);
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

		var vModalHeaderColorParams = 
		{
			activeColor : 'bg-warning',
			modalHeader : vModalLostPWDHeader,
		}
		new InitHeaderColor().initHeaderColor(vModalHeaderColorParams);
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
		vAccountModal.initModalAccount(vAccountParams);
		
	});

	// -------------------------------------------------------------------------
	// MAJ en temps réel du champ age dès qu'il y a une modification de la date de naissance
	// -------------------------------------------------------------------------
	vAccountBirthDate.addEventListener('click', function(){
		vAccountModal.updateFieldAge(vAccountForm.idAccountBirthDate.value, vAccountForm);
	});          
	vAccountBirthDate.addEventListener('input', function(){
		vAccountModal.updateFieldAge(vAccountForm.idAccountBirthDate.value, vAccountForm);
	});          
	
	// -------------------------------------------------------------------------
	// MAJ en temps réel de la silhouette de l'avatar (si aucune photo n'a été chargée)
	// en fonction de la sélection du sexe
	// -------------------------------------------------------------------------
	vAccountSexNone.addEventListener('click', function(){
		vAccountModal.updateAvatar(0, vAccountPhotoImg);
	});          
	vAccountSexMale.addEventListener('click', function(){
		vAccountModal.updateAvatar(1, vAccountPhotoImg);
	});          
	vAccountSexFemale.addEventListener('click', function(){
		vAccountModal.updateAvatar(2, vAccountPhotoImg);
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

				var vModalHeaderColorParams = 
				{
					activeColor : 'bg-warning',
					modalHeader : vModalAccountHeader,
				}
				new InitHeaderColor().initHeaderColor(vModalHeaderColorParams);
		
				vAccountPassword.removeAttribute('disabled');
				vAccountConfirmPassword.removeAttribute('disabled');
				vAccountPassword.focus();
			} else {
				vAccountAlertMsg.innerHTML='Mot de passe actuel erroné';                // Affichage du message d'alerte de MDP actuel erroné
				vAccountAlertMsg.style.visibility = 'visible';    
				
				var vModalHeaderColorParams = 
				{
					activeColor : 'bg-danger',
					modalHeader : vModalAccountHeader,
				}
				new InitHeaderColor().initHeaderColor(vModalHeaderColorParams);
				
				vAccountPassword.setAttribute('disabled','true');
				vAccountConfirmPassword.setAttribute('disabled','true');
				vAccountPassword.focus();
			};
		} else {
			vMemberClient.newPasswordKO = false;
			vAccountAlertMsg.innerHTML='';
			vAccountAlertMsg.style.visibility = 'hidden';  

			var vModalHeaderColorParams = 
			{
				activeColor : 'bg-warning',
				modalHeader : vModalAccountHeader,
			}
			new InitHeaderColor().initHeaderColor(vModalHeaderColorParams);

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
			vAccountModal.updateProfile(vAccountParams, vAvatarInfo, vProfileInfo);
		});


	// -------------------------------------------------------------------------
	// -------------------------------------------------------------------------
	// Eléments des champs de saisie de la Modale d'ajout d'amis
	// -------------------------------------------------------------------------
	// -------------------------------------------------------------------------
	var vModalMgrFriend = document.getElementById('idModalMgrFriend');
	var vModalMgrFriendDialog = document.getElementById('idModalMgrFriendDialog');
	var vModalMgrFriendHeader = document.getElementById('idModalMgrFriendHeader');
	var vModalMgrFriendExitBtn = document.getElementById('idModalMgrFriendExitBtn');
	var vModalMgrFriendTitle = document.getElementById('idModalMgrFriendTitle');
	var vModalMgrFriendListGroup = document.getElementById('idModalMgrFriendListGroup');

	// Suppression de tous les éléments de la liste des membres pouvant devenir ami à la fermeture de la modale
	$('#idModalMgrFriend').on('hidden.bs.modal', () => {
		vModalMgrFriendDialog.classList.remove('form-MgrFriends');

		vModalMgrFriendHeader.removeChild(vModalMgrFriendHeader.firstChild);
		vModalMgrFriendTitle.removeChild(vModalMgrFriendTitle.firstChild);

		// Suppression des champs de filtrage
		var vSearchMembersFields = document.getElementById('idFilterFields');
		if (vSearchMembersFields){
			while (vSearchMembersFields.firstChild) {
				vSearchMembersFields.removeChild(vSearchMembersFields.firstChild);
			}
			vSearchMembersFields.parentNode.removeChild(vSearchMembersFields);
		}

		// Suppression des lignes d'amis potentiels
		while (vModalMgrFriendListGroup.firstChild) {
			vModalMgrFriendListGroup.removeChild(vModalMgrFriendListGroup.firstChild);
		}
	})

	// -------------------------------------------------------------------------
	// -------------------------------------------------------------------------
	// Eléments des champs de saisie de la Modale de listage des membres
	// -------------------------------------------------------------------------
	// -------------------------------------------------------------------------
	var vModalMemberList = document.getElementById('idModalMemberList');
	var vModalMemberListDialog = document.getElementById('idModalMemberListDialog');
	var vModalMemberListHeader = document.getElementById('idModalMemberListHeader');
	var vModalMemberListExitBtn = document.getElementById('idModalMemberListExitBtn');
	var vModalMemberListTitle = document.getElementById('idModalMemberListTitle');
	var vModalMemberListGroup = document.getElementById('idModalMemberListGroup');

	// Suppression de tous les éléments de la liste des membres pouvant devenir ami à la fermeture de la modale
	$('#idModalMemberList').on('hidden.bs.modal', () => {
		vModalMgrFriendDialog.classList.remove('form-MgrFriends');

		vModalMemberListHeader.removeChild(vModalMemberListHeader.firstChild);
		vModalMemberListTitle.removeChild(vModalMemberListTitle.firstChild);

		// Suppression des champs de filtrage
		var vSearchMembersFields = document.getElementById('idFilterFields');
		if (vSearchMembersFields){
			while (vSearchMembersFields.firstChild) {
				vSearchMembersFields.removeChild(vSearchMembersFields.firstChild);
			}
			vSearchMembersFields.parentNode.removeChild(vSearchMembersFields);
		}

		// Suppression des lignes des membres
		while (vModalMemberListGroup.firstChild) {
			vModalMemberListGroup.removeChild(vModalMemberListGroup.firstChild);
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
		vAboutNom,
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
		vClearFriendsFilter,
		vFriendUL,
	}

	// -------------------------------------------------------------------------
	// Structure de transfert des infos des invitations lancées
	// -------------------------------------------------------------------------
	var vInvitSentInfo = {
		vInvitSentCard,
		vInvitSentUL,
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
	// Le serveur a renvoyé une liste d'amis pour le membre clické sur la micro-fiche
	// On ouvre une nouvelle micro-fiche pour ce membre
	// --------------------------------------------------------------
	webSocketConnection.on('displayFriendListOfMember', function(pFriendsOfMember){
		var vDropDownParent = document.getElementById('idDivMicroFiche0');
		new MicroFicheMember(pFriendsOfMember, vDropDownParent).displayMicroFicheMember();
	}); 

	// --------------------------------------------------------------
	// Le serveur a supprimé le membre à qui j'avais envoyé une 
	// invitation, et je dois donc l'effacer de ma carte "Invitations lancées"
	// --------------------------------------------------------------
	webSocketConnection.on('cancelInvitedMemberFromMyInvitSentList', function(pcancelInvitSent){ 
		pcancelInvitSent.indexInvitToDelete = vMemberClient.searchObjectInArray(vMemberClient.vMyInvitSentList, 'friendPseudo', pcancelInvitSent.friendPseudo);	
		vMemberClient.removeInvitSentFromMyInvitSentList(pcancelInvitSent, vInvitSentInfo);
	});

	// --------------------------------------------------------------
	// Le serveur a supprimé le membre à qui j'avais envoyé une 
	// invitation, et je dois donc l'effacer de ma carte "Invitations lancées"
	// --------------------------------------------------------------
	webSocketConnection.on('deleteInvitedMemberFromMyInvitSentList', function(pcancelInvitSent){ 
		pcancelInvitSent.indexInvitToDelete = vMemberClient.searchObjectInArray(vMemberClient.vMyInvitSentList, 'friendPseudo', pcancelInvitSent.friendPseudo);	
		vMemberClient.refreshMyInvitList(pcancelInvitSent, vInvitSentInfo);
	});

	// --------------------------------------------------------------
	// Le serveur a supprimé mon ex-ami, et je dois donc l'effacer 
	// de ma carte "Liste d'amis"
	// --------------------------------------------------------------
	webSocketConnection.on('deleteFriendFromMyFriendList', function(pFriendToDelete){ 
		pFriendToDelete.indexFriendToDelete = vMemberClient.searchObjectInArray(vMemberClient.vMyFriendList, 'friendPseudo', pFriendToDelete.friendPseudo);
		vMemberClient.removeFriendFromMyFriendList(pFriendToDelete, vFriendInfo);
	});

	// --------------------------------------------------------------
	// Le serveur a supprimé mon ex-ami à l'initiative de la suppression, 
	// et je dois donc l'effacer également de ma carte "Liste d'amis"
	// Même procédure que ci-dessus, sauf que les rôles sont inversés
	// --------------------------------------------------------------
	webSocketConnection.on('deleteMeFromHisFriendList', function(pFriendToDelete){ 
		pFriendToDelete.indexFriendToDelete = vMemberClient.searchObjectInArray(vMemberClient.vMyFriendList, 'friendPseudo', pFriendToDelete.friendPseudo);
		vMemberClient.refreshMyFriendList(pFriendToDelete, vFriendInfo);
	});

	// --------------------------------------------------------------
	// Le serveur n'a pas trouvé d'amis à qui envoyer la recommendation de mon ami --> Message d'erreur
	// --------------------------------------------------------------
	webSocketConnection.on('emptyRecommendableFriendList', function(pRecommendFriendsList){   
		vMemberClient.initModalNoFriendToRecommend(vGenericModalTitle, vGenericModalBodyText);  // Affiche la fenêtre générique

		var vModalHeaderColorParams = 
		{
			activeColor : 'bg-danger',
			modalHeader : vGenericModalHeader,
		}
		new InitHeaderColor().initHeaderColor(vModalHeaderColorParams);
		$('#idGenericModal').modal('show');      																		// ouverture de la fenêtre modale de message d'erreur
		$('#'+pRecommendFriendsList.myDropDownMenuId).dropdown('toggle');						// Fermeture de la DropDown d'amis à recommander puisque vide
	});

	// --------------------------------------------------------------
	// Le serveur a envoyé une liste d'amis à qui je peux recommander mon ami
	// --------------------------------------------------------------
	webSocketConnection.on('displayRecommendableFriendList', function(pRecommendableFriends){  
		vMemberClient.displayPopUpOfMyFriend(pRecommendableFriends);	// Affichage des amis à qui on peut recommander notre ami
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

		var vModalHeaderColorParams = 
		{
			activeColor : 'bg-danger',
			modalHeader : vGenericModalHeader,
		}
		new InitHeaderColor().initHeaderColor(vModalHeaderColorParams);
		$('#idGenericModal').modal('show');                                           // ouverture de la fenêtre modale de message d'erreur
	});

	// --------------------------------------------------------------
	// On a reçu une liste d'invitations à traiter
	// Ajout dynamique des membres demandeurs dans le DOM sur la modale
	// --------------------------------------------------------------
	webSocketConnection.on('displayWaitingInvitation', function(pWaitingInvit){   
		var vDisplayWaitingInvitationData = {
			modalHeader 		: vModalMgrFriendHeader,
			modalExitBtn 		: vModalMgrFriendExitBtn ,
			modalListGroup 	: vModalMgrFriendListGroup,
		}

		vMemberClient.displayWaitingInvitation(pWaitingInvit, vDisplayWaitingInvitationData)
	});

	// --------------------------------------------------------------
	// Suppression de l'invitation que j avais lancée à mon nouvel ami
	// et ajout de mon Avatar sur la liste de mon nouvel ami
	// --------------------------------------------------------------
	webSocketConnection.on('addFriendIntoHisList', function(pMyFriend){ 
		pMyFriend.indexInvitToDelete = vMemberClient.searchObjectInArray(vMemberClient.vMyInvitSentList, 'friendPseudo', pMyFriend.friendPseudo);

		// Suppression de l'avatar sujet de l'invitation de la carte des invitations en attente
		vMemberClient.refreshMyInvitList(pMyFriend, vInvitSentInfo);		

		// Ajout de l'avatar sujet de l'invitation dans ma liste d'amis
		vMemberClient.addFriendIntoCard(pMyFriend, vFriendInfo);
	});

	// --------------------------------------------------------------
	// Affichage d'une Notification d'acceptation d'ami envoyée par 
	// le serveur après les MAJ réussies de la BDD
	// et ajout de son avatar dans ma liste d'amis
	// --------------------------------------------------------------
	webSocketConnection.on('displayNotifInvitationValided', function(pSelectedInvit){ 
		var vDisplayNotifInvitationValidedData = {
			modalListGroup : vModalMgrFriendListGroup,
		}
		vMemberClient.displayNotifInvitationValided(pSelectedInvit, vFriendInfo, vDisplayNotifInvitationValidedData);
	});	

	// --------------------------------------------------------------
	// Affichage d'une Notification de refus d'ami envoyée par 
	// le serveur après les MAJ réussies de la BDD
	// --------------------------------------------------------------
	webSocketConnection.on('displayNotifInvitationRefused', function(pSelectedInvit){   
		var vDisplayNotifInvitationRefusedData = {
			modalListGroup : vModalMgrFriendListGroup,
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

		var vModalHeaderColorParams = 
		{
			activeColor : 'bg-danger',
			modalHeader : vGenericModalHeader,
		}
		new InitHeaderColor().initHeaderColor(vModalHeaderColorParams);
		$('#idGenericModal').modal('show');                                           // ouverture de la fenêtre modale de message d'erreur
	});

	// --------------------------------------------------------------
	// On a reçu une liste de membres pouvant devenir amis
	// Ajout dynamique des membres dans le DOM sur la modale
	// de sélection des membres pour devenir amis
	// --------------------------------------------------------------
	webSocketConnection.on('displayPotentialFriends', function(pMembersFriendables){  
		var vDisplayPotentialfriendData = {
			modalHeader 		: vModalMgrFriendHeader,
			modalExitBtn 		: vModalMgrFriendExitBtn,
			modalListGroup 	: vModalMgrFriendListGroup,
		}

		vMemberClient.displayPotentialFriends(pMembersFriendables, vDisplayPotentialfriendData);
	});

	// --------------------------------------------------------------
	// On a reçu une liste de membres pouvant devenir amis
	// Ajout dynamique des membres dans le DOM sur la modale
	// de sélection des membres pour devenir amis
	// --------------------------------------------------------------
	webSocketConnection.on('displayFilteredPotentialFriends', function(pMembersFriendables){  

		// Suppression des lignes d'amis potentiels pour pouvoir afficher les amis potentiels filtrés
		while (vModalMgrFriendListGroup.firstChild) {
			vModalMgrFriendListGroup.removeChild(vModalMgrFriendListGroup.firstChild);
		}

		var vDisplayPotentialfriendData = {
			modalHeader 		: vModalMgrFriendHeader,
			modalExitBtn 		: vModalMgrFriendExitBtn,
			modalListGroup 	: vModalMgrFriendListGroup,
		}

		vMemberClient.displayPotentialFriendsLines(pMembersFriendables, vDisplayPotentialfriendData)
	});

	// --------------------------------------------------------------
	// On a reçu une liste de membres pouvant devenir amis
	// Ajout dynamique des membres dans le DOM sur la modale
	// de sélection des membres pour devenir amis
	// --------------------------------------------------------------
	webSocketConnection.on('displayMembers', function(pMembers){  
		var vDisplayMembersModalData = {
			modalHeader 		: vModalMemberListHeader,
			modalExitBtn		: vModalMemberListExitBtn,
			modalListGroup 	: vModalMemberListGroup,
		}

		vMemberClient.displayMembers(pMembers, vDisplayMembersModalData);
	});

	// --------------------------------------------------------------
	// On a reçu une liste de membres filtrés
	// Ajout dynamique des membres dans le DOM sur la modale
	// --------------------------------------------------------------
	webSocketConnection.on('displayFilteredMembers', function(pMembers){  

		// Suppression des lignes de membres pour pouvoir afficher les membres filtrés
		while (vModalMemberListGroup.firstChild) {
			vModalMemberListGroup.removeChild(vModalMemberListGroup.firstChild);
		}

		var vDisplayMembersModalData = {
			modalHeader 		: vModalMemberListHeader,
			modalExitBtn		: vModalMemberListExitBtn,
			modalListGroup 	: vModalMemberListGroup,
		}

		vMemberClient.displayMembersLines(pMembers, vDisplayMembersModalData);
	});

	// --------------------------------------------------------------
	// Affichage d'une Notification d'envoi d'invitation envoyée par 
	// le serveur après les MAJ réussies de la BDD et l'envoi du mail
	// --------------------------------------------------------------
	webSocketConnection.on('displayNotifInvitationSent', function(pFriendToAdd){  
		var vDisplayNotifInvitationSentData = {
			modalListGroup : vModalMgrFriendListGroup,
		}
		vMemberClient.displayNotifInvitationSent(pFriendToAdd, vDisplayNotifInvitationSentData, vInvitSentInfo);
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

		var vModalHeaderColorParams = 
		{
			activeColor : 'bg-danger',
			modalHeader : vModalLostPWDHeader,
		}
		new InitHeaderColor().initHeaderColor(vModalHeaderColorParams);
		setTimeout(function(){$('#idModalLostPWD').modal('show')},cstDelayToggleModal);              // Obligation de temporiser la réouverture sinon ça ne marche pas
	});

	// --------------------------------------------------------------
	// Le serveur a rejeté la demande Login, et redemande au visiteur 
	// de réessayer de se logger
	// --------------------------------------------------------------
	webSocketConnection.on('retryLoginForm', function(){   
		vLoginAlertMsg.style.visibility = 'visible';                                 // Affichage du message d'alerte de connexion erronée

		var vModalHeaderColorParams = 
		{
			activeColor : 'bg-danger',
			modalHeader : vModalLoginHeader,
		}
		new InitHeaderColor().initHeaderColor(vModalHeaderColorParams);
		setTimeout(function(){$('#idModalLogin').modal('show')},cstDelayToggleModal);              // Obligation de temporiser la réouverture sinon ça ne marche pas
	});

	// --------------------------------------------------------------
	// Le serveur a rejeté la demande Signin, et redemande au visiteur 
	// de resaisir ses infos de Sign-In
	// --------------------------------------------------------------
	webSocketConnection.on('retrySignInForm', function(){   
		vSignInAlertMsg.style.visibility = 'visible';                               // Affichage du message d'alerte de connexion erronée

		var vModalHeaderColorParams = 
		{
			activeColor : 'bg-danger',
			modalHeader : vModalSignInHeader,
		}
		new InitHeaderColor().initHeaderColor(vModalHeaderColorParams);
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
		var askingMembers = pDataTransmitted.askingMembers;
		var myFriendsInfo = pDataTransmitted.myFriendsInfos;

console.log('welcomeMember - pDataTransmitted : ',pDataTransmitted)
		if (pDataTransmitted.welcomeMessage === 'Hello') {
			vMemberClient.initModalHelloText(vGenericModalTitle, vGenericModalBodyText);  	// Affiche la fenêtre de bienvenue
		} else {
			if (pDataTransmitted.welcomeMessage === 'Congrat'){
				vMemberClient.initModalWelcomeText(vGenericModalTitle, vGenericModalBodyText); 	// Affiche la fenêtre de bienvenue pour un nouveau membre
			}
		}

		var vModalHeaderColorParams = 
		{
			activeColor : 'bg-success',
			modalHeader : vGenericModalHeader,
		}
		new InitHeaderColor().initHeaderColor(vModalHeaderColorParams);
		$('#idGenericModal').modal('show');                                           		// ouverture de la fenêtre modale de Félicitations

		// Affichage de la page de profil avec les avatars, les amis, les invitations...
		vMemberClient.displayProfilePage(vContextInfo, vAvatarInfo, vProfileInfo, vFriendInfo, vInvitSentInfo, askingMembers, myFriendsInfo);			// Affichage de la page de profil
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

		var vModalHeaderColorParams = 
		{
			activeColor : 'bg-success',
			modalHeader : vGenericModalHeader,
		}
		new InitHeaderColor().initHeaderColor(vModalHeaderColorParams);

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

		var vModalHeaderColorParams = 
		{
			activeColor : 'bg-danger',
			modalHeader : vGenericModalHeader,
		}
		new InitHeaderColor().initHeaderColor(vModalHeaderColorParams);
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