// -------------------------------------------------------------------------
// stockage des informations techniques des joueurs et des  coordonnées de leurs 
// pilules qui vont être générées pour le player
// 4 joueurs maximum - 50 pilules pour chacun 
// -------------------------------------------------------------------------

function MemberClient(){   // Fonction constructeur exportée

	this.newPasswordKO = false;    // Flag témoin de Nouveau mot de passe valide (True = KO, False = OK)
	this.member =                  // Structure du membre
	{   
		email           : '',
		pseudo          : '',
		password        : '',
		oldPassword     : '',
		role            : 0,        // 4 --> Membre, 2 --> Admin ou 1 --> SuperAdmin
		presentation    : '',       // Texte de présentation du membre

		etatCivil : 
		{
				photo          : '',    // Emplacement de la photo de profil
				firstName      : '',    // Prénom
				name           : '',    // Nom
				birthDate      : '',    // Date de naissance
				sex            : 0,     // 0 = Non divulgué, 1 --> Masculin, 2 --> Féminin
				address : 
				{
					street     : '',    // N° et voie
					city       : '',    // Ville
					zipCode    : '',    // Code Postal
					department : '',    // N° Département --> Sert a initialiser le champ "select" des départements
					departmentName : '',    // Département : N° + nom

				},
		},
		preferences : {
			prefGravures        : false,
			prefLivres          : false,
			prefFilms           : false,
			prefJeux            : false,
			prefMaquettes       : false,
			prefFigurines       : false,
			prefBlindes         : false,
			prefAvions          : false,
			prefBateaux         : false,
			prefDioramas        : false,
			prefPrehistoire     : false,
			prefAntiquite       : false,
			prefMoyenAge        : false,
			prefRenaissance     : false,
			prefDentelles       : false,
			prefAncienRegime    : false,
			prefRevolution      : false,
			pref1erEmpire       : false,
			pref2ndEmpire       : false,
			prefSecession       : false,
			prefFarWest         : false,
			prefWW1             : false,
			prefWW2             : false,
			prefContemporain    : false,    
			prefFuturiste       : false,
			prefFantastique     : false,
			prefHFrancaise      : false,
			prefHAmericaine     : false,
			prefHInternationale : false,
			prefAutre           : false,
		},
		dateCreation    : -1,       // Timestamp de la création du record
	}
}

// ===================================================== Fonctions ===========================================================
// -----------------------------------------------------------------------------
//  Cette fonction donne le focus au champs pIdField  de la fenêtre modale pIdModal
//  passée en paramètre car le composant "Modal" court-circuite l'attibut "Auto-focus"
// -----------------------------------------------------------------------------
MemberClient.prototype.giveFocusToModalFirstField = function(pIdModal, pIdField){
	$('#'+pIdModal).on('shown.bs.modal', function(){
		$('#'+pIdField).focus();
	})
}

// -----------------------------------------------------------------------------
// Cette fonction vérifie que le MDP et sa confirmation sont bien identiques
// -----------------------------------------------------------------------------
MemberClient.prototype.validatePassword = function(pPassword, pConfirmPassword){
	if (pPassword.value != pConfirmPassword.value){
		pConfirmPassword.setCustomValidity("Les mots de passe ne correspondent pas");
		this.newPasswordKO = true;
	} else {
		pConfirmPassword.setCustomValidity('');
		this.newPasswordKO = false;
	}
}

// -----------------------------------------------------------------------------
// Cette fonction initialise le contenu de la fenetre générique modale en mode "A propos"
// -----------------------------------------------------------------------------
MemberClient.prototype.initModalTextAbout = function(pModalTitle, pModalBodyText){
	pModalTitle.innerText = 'A propos...'
	pModalBodyText.innerHTML = '<h5>Bienvenue dans Collect\'Or</h5>';
	pModalBodyText.innerHTML += '<p>Collector est un réseau social destiné aux collectionneurs de figurines, véhicules, avions, bateaux, et autres sujets historiques, principalement militaires, mais les autres types de collections sont également les bienvenus.</p>';
	pModalBodyText.innerHTML += '<p>Vous pourrez notamment discuter en public ou en privé avec d\'autres collectionneurs, déposer / lire des annonces de vente, d\'échange, de recherche, de manifestations...</p>';
	pModalBodyText.innerHTML += '<p>De plus, vous pourrez laisser vos avis sur des sujets particuliers, accéder à la galerie pour admirer les collections ou y déposer vos propres photos, accéder aux trucs et astuces de modéliste, y déposer vos expériences, et enfin poser vos questions à laa Communauté.</p>';
}

// -----------------------------------------------------------------------------
// Cette fonction initialise le contenu de la fenetre modale "Félicitations et Bienvenue"
// après la création réussie du nouveau membre
// -----------------------------------------------------------------------------
MemberClient.prototype.initModalWelcomeText = function(pModalTitle, pModalBodyText){
	pModalTitle.innerText = 'Bienvenue dans Collect\'Or'
	pModalBodyText.innerHTML = '<h5>Félicitations '+ this.member.pseudo +' !</h5>';
	pModalBodyText.innerHTML += '<br /><p>Votre compte a été créé avec succès.</p>';
	pModalBodyText.innerHTML += '<br /><p>Un mail de confirmation vous été envoyé, si vous ne le voyez pas, veuillez regarder dans le dosssier des SPAMs.</p>';
	pModalBodyText.innerHTML += '<br /><p>Nous vous invitons à remplir votre fiche de renseignements (sous le menu de votre pseudo), pour permettre a vos futurs amis de vous connaître un peu</p>';
	pModalBodyText.innerHTML += '<br /><p>Bonne navigation...</p>';
}

// -----------------------------------------------------------------------------
// Cette fonction initialise le contenu de la fenetre modale "Félicitations et Bienvenue"
// après la connexion réussie du membre
// -----------------------------------------------------------------------------
MemberClient.prototype.initModalHelloText = function(pModalTitle, pModalBodyText){
	pModalTitle.innerText = 'Connexion à Collect\'Or';
	pModalBodyText.innerHTML = '<h5>Bonjour '+this.member.pseudo+'</h5>';
	pModalBodyText.innerHTML += '<br /><p>Vous êtes bien connecté à \'Collect\'Or\', bonne navigation...</p>';
}

// -----------------------------------------------------------------------------
// Cette fonction initialise le contenu de la fenetre modale "Mot de passe oublié"
// après la déclaration du mot de passe perdu
// -----------------------------------------------------------------------------
MemberClient.prototype.initModalLostPWDText = function(pModalTitle, pModalBodyText){
	pModalTitle.innerText = 'Mot de passe perdu'
	pModalBodyText.innerHTML = '<h5>Votre nouveau mot de passe ...</h5>';
	pModalBodyText.innerHTML += '<br /><p>Suite à votre demande, un nouveau mot de passe a été généré.</p>';
	pModalBodyText.innerHTML += '<br /><p>Un mail contenant vos identifiants vous a été envoyé, si vous ne le voyez pas, veuillez regarder dans le dosssier des SPAMs.</p>';
	pModalBodyText.innerHTML += '<br /><p>Vous pouvez le modifier dans la fiche de votre profil.</p>';
}

// -----------------------------------------------------------------------------
// Cette fonction initialise le contenu de la fenetre modale "Mot de passe oublié"
// après la demande de changement du mot de passe
// -----------------------------------------------------------------------------
MemberClient.prototype.initModalChangedPWDText = function(pModalTitle, pModalBodyText){
	pModalTitle.innerText = 'Mot de passe changé'
	pModalBodyText.innerHTML = '<h5>Votre nouveau mot de passe ...</h5>';
	pModalBodyText.innerHTML += '<br /><p>Vous avez changé votre mot de passe.</p>';
	pModalBodyText.innerHTML += '<br /><p>Un mail contenant vos identifiants vous a été envoyé, si vous ne le voyez pas, veuillez regarder dans le dosssier des SPAMs.</p>';
}

// -----------------------------------------------------------------------------
// Cette fonction initialise le contenu de la fenetre modale de rejet d'un membre déjà connecté
// -----------------------------------------------------------------------------
MemberClient.prototype.initModalAlreadyConnectedText = function(pModalTitle, pModalBodyText){
	pModalTitle.innerText = 'Collect\'Or';
	pModalBodyText.innerHTML = '<h5>Connexion impossible</h5>';
	pModalBodyText.innerHTML += '<br /><p>Vous ne pouvez pas vous connecter à \'Collect\'Or\', car vous vous êtes déjà connecté dans une autre session.</p>';
}

// -----------------------------------------------------------------------------
// Cette fonction désactive les options de menu inutiles lorsque le visiteur s'est 
// connecté ou après la création réussie de son compte, car il se trouve de fait, 
// déjà connecté :
// - Desactive Bouton Login et Création 
// - Active le sous-menu de la NavBar d'entête
// - Affiche le nom du membre dans le menu
// - Active la NavBar du profil
// -----------------------------------------------------------------------------
MemberClient.prototype.setMemberContext = function(pContextInfo){
	pContextInfo.vConnexion.style.display = 'none';         			// Désactivation du bouton 'Connexion'
	pContextInfo.vCreation.style.display = 'none';          			// Désactivation du bouton 'Creation de compte'

	pContextInfo.vDropDownProfilMenu.style.display = 'block';			// Affiche le sous-menu dans la NavBar d'entête spécifique au membre connecté
	pContextInfo.vDropDownProfilMenu.innerHTML += ' '+this.member.pseudo;		// Affiche le nom du membre dans la NavBarr d'entête

	pContextInfo.vDeconnexion.classList.remove('disabled');				// Active l'option "Deconnexion" du menu d'entête
	vToolBox.maskOff(pContextInfo.vProfileNavBar); 								// Active la NavBar du profil

	pContextInfo.vProfilePage.style.display = 'block';						// Affichage du bloc du profil complet (Fiche d'identité, conversations, liste d'amis...)
	pContextInfo.vPad.style.display = 'none';											// Masquage de la "div" de masquage du menu du profil
}

// -----------------------------------------------------------------------------
// Cette fonction réinitialise complétement l'écran et ferme le socket
// -----------------------------------------------------------------------------
MemberClient.prototype.unsetMemberContext = function(pWebSocketConnection, pContextInfo){
	// Régénération de l'écran from scratch;
	window.location.reload(true);
	
	// Fermeture du socket
	pWebSocketConnection.close();
}
// -----------------------------------------------------------------------------
// Cette fonction gère les couleurs de fond et de texte des Header des modales
// -----------------------------------------------------------------------------
MemberClient.prototype.InitHeaderColor = function(pACtiveColor, pHeader){
	if (pACtiveColor === "bg-warning"){
		pHeader.classList.remove('bg-danger');
		pHeader.classList.remove('bg-success');
		pHeader.classList.add('bg-warning');    	    
		pHeader.classList.add('text-dark');
		return
	}

	if (pACtiveColor === 'bg-danger'){
		pHeader.classList.remove('bg-success');
		pHeader.classList.remove('bg-warning');                  
		pHeader.classList.add('bg-danger');
		pHeader.classList.add('text-warning');
		return
	}
	
	if (pACtiveColor === 'bg-success'){
		pHeader.classList.remove('bg-danger');
		pHeader.classList.remove('bg-warning');                  
		pHeader.classList.add('bg-success');
		pHeader.classList.add('text-warning');
		return
	}
}

// -----------------------------------------------------------------------------
// Cette fonction affiche la page de profil complète :
// - Le contexte du membre
// - L'avatar
// - La page de profil :
// 		- La carte de "Présentation"
// -----------------------------------------------------------------------------
MemberClient.prototype.displayProfilePage = function(vContextInfo, vAvatarInfo, vProfileInfo){
	this.setMemberContext(vContextInfo);  			//  Active le contexte du membre (NavBar d'entête, options de menu, etc)
	this.displayAvatar(vAvatarInfo);						// - Affiche la photo de l'avatar et son nom sur le carroussel et la carte "Présentation"
	this.displayPresentationCard(vProfileInfo);	// - Affiche les informations du profil dans la carte "Présentation"
}

// -----------------------------------------------------------------------------
// Cette fonction affiche l'avatar et son pseudo sur la page de profil
// -----------------------------------------------------------------------------
MemberClient.prototype.displayAvatar = function(pAvatarInfo){
	pAvatarInfo.vAvatarImg1.setAttribute('src', 'static/images/members/'+this.member.etatCivil.photo);
	pAvatarInfo.vAvatarMemberNameImg1.innerHTML = this.member.pseudo;
	pAvatarInfo.vAvatarToken.setAttribute('src', 'static/images/members/'+this.member.etatCivil.photo);
}

// -----------------------------------------------------------------------------
// Cette fonction affiche le contenu de la carte "Présentation" sur la page de profil
// -----------------------------------------------------------------------------
MemberClient.prototype.displayPresentationCard = function(pProfileInfo){

	pProfileInfo.vAboutPrenom.innerHTML = this.member.etatCivil.firstName;
	pProfileInfo.vAboutAge.innerHTML = this.member.etatCivil.birthDate 
																					? vToolBox.calculeAge(this.member.etatCivil.birthDate, false)
																					: '';
	pProfileInfo.vAboutVille.innerHTML = this.member.etatCivil.address.city;
	pProfileInfo.vAboutDepartmentName.innerHTML = this.member.etatCivil.address.departmentName;

	this.activeButtonOfSelectedCheckBoxReadOnly('prefGravures','idAboutPrefGravuresLabel');
	this.activeButtonOfSelectedCheckBoxReadOnly('prefLivres','idAboutPrefLivresLabel');
	this.activeButtonOfSelectedCheckBoxReadOnly('prefFilms','idAboutPrefFilmsLabel');
	this.activeButtonOfSelectedCheckBoxReadOnly('prefJeux','idAboutPrefJeuxLabel');
	this.activeButtonOfSelectedCheckBoxReadOnly('prefMaquettes','idAboutPrefMaquettesLabel');
	this.activeButtonOfSelectedCheckBoxReadOnly('prefFigurines','idAboutPrefFigurinesLabel');
	this.activeButtonOfSelectedCheckBoxReadOnly('prefBlindes','idAboutPrefBlindesLabel');
	this.activeButtonOfSelectedCheckBoxReadOnly('prefAvions','idAboutPrefAvionsLabel');
	this.activeButtonOfSelectedCheckBoxReadOnly('prefBateaux','idAboutPrefBateauxLabel');
	this.activeButtonOfSelectedCheckBoxReadOnly('prefDioramas','idAboutPrefDioramasLabel');
	this.activeButtonOfSelectedCheckBoxReadOnly('prefPrehistoire','idAboutPrefPrehistoireLabel');
	this.activeButtonOfSelectedCheckBoxReadOnly('prefAntiquite','idAboutPrefAntiquiteLabel');
	this.activeButtonOfSelectedCheckBoxReadOnly('prefMoyenAge','idAboutPrefMoyenAgeLabel');
	this.activeButtonOfSelectedCheckBoxReadOnly('prefRenaissance','idAboutPrefRenaissanceLabel');
	this.activeButtonOfSelectedCheckBoxReadOnly('prefDentelles','idAboutPrefDentellesLabel');
	this.activeButtonOfSelectedCheckBoxReadOnly('prefAncienRegime','idAboutPrefAncienRegimeLabel');
	this.activeButtonOfSelectedCheckBoxReadOnly('prefRevolution','idAboutPrefRevolutionLabel');
	this.activeButtonOfSelectedCheckBoxReadOnly('pref1erEmpire','idAboutPref1erEmpireLabel');
	this.activeButtonOfSelectedCheckBoxReadOnly('pref2ndEmpire','idAboutPref2ndEmpireLabel');
	this.activeButtonOfSelectedCheckBoxReadOnly('prefSecession','idAboutPrefSecessionLabel');
	this.activeButtonOfSelectedCheckBoxReadOnly('prefFarWest','idAboutPrefFarWestLabel');
	this.activeButtonOfSelectedCheckBoxReadOnly('prefWW1','idAboutPrefWW1Label');
	this.activeButtonOfSelectedCheckBoxReadOnly('prefWW2','idAboutPrefWW2Label');
	this.activeButtonOfSelectedCheckBoxReadOnly('prefContemporain','idAboutPrefContemporainLabel');
	this.activeButtonOfSelectedCheckBoxReadOnly('prefFuturiste','idAboutPrefFuturisteLabel');
	this.activeButtonOfSelectedCheckBoxReadOnly('prefFantastique','idAboutPrefFantastiqueLabel');
	this.activeButtonOfSelectedCheckBoxReadOnly('prefHFrancaise','idAboutPrefHFrancaiseLabel');
	this.activeButtonOfSelectedCheckBoxReadOnly('prefHAmericaine','idAboutPrefHAmericaineLabel');
	this.activeButtonOfSelectedCheckBoxReadOnly('prefHInternationale','idAboutPrefHInternationaleLabel');
	this.activeButtonOfSelectedCheckBoxReadOnly('prefAutre','idAboutPrefAutreLabel');

	pProfileInfo.vAboutPresentation.value = this.member.presentation;
}

// -----------------------------------------------------------------------------
// Cette fonction initialise la modale de création, quel que soit son mode 
// d'appel (par l'option de menu ou par le raccourci de la fenetre de Login
// -----------------------------------------------------------------------------
MemberClient.prototype.initModalSignIn = function(pSignInParameters){
	pSignInParameters.vSignInForm.idSignInEmail.value = '';                                
	pSignInParameters.vSignInForm.idSignInPseudo.value = '';                              
	pSignInParameters.vSignInForm.idSignInPassword.value = '';
	pSignInParameters.vSignInForm.idSignInConfirmPassword.value = '';
	pSignInParameters.vSignInAlertMsg.style.visibility = 'hidden';                          
	this.InitHeaderColor('bg-warning', pSignInParameters.vModalSignInHeader);
}

// -----------------------------------------------------------------------------
// Cette fonction initialise la modale de saisie de renseignements (Compte) 
// avec les valeurs récupérées dans la BDD, (et pouvant être vierges)
// -----------------------------------------------------------------------------
MemberClient.prototype.initModalAccount = function(pAccountParameters){
	pAccountParameters.vAccountForm.idAccountEmail.value  = this.member.email;                                
	pAccountParameters.vAccountForm.idAccountPseudo.value = this.member.pseudo;     

	pAccountParameters.vAccountPhotoImg.setAttribute('src', 'static/images/members/'+this.member.etatCivil.photo);
	pAccountParameters.vAccountForm.idAccountFirstName.value = this.member.etatCivil.firstName;     
	pAccountParameters.vAccountForm.idAccountName.value = this.member.etatCivil.name;     
	pAccountParameters.vAccountForm.idAccountBirthDate.value = this.member.etatCivil.birthDate;     

	if (this.member.etatCivil.birthDate){
		this.updateFieldAge(this.member.etatCivil.birthDate, pAccountParameters.vAccountForm);
		} else {
		pAccountParameters.vAccountForm.idAccountAge.value = '';
	}

	var selectedSex = this.inputBtnRadioSex();
	this.updateAvatar(selectedSex, pAccountParameters.vAccountPhotoImg);

	pAccountParameters.vAccountForm.idAccountStreet.value      = this.member.etatCivil.address.street;    
	pAccountParameters.vAccountForm.idAccountCity.value        = this.member.etatCivil.address.city;      
	pAccountParameters.vAccountForm.idAccountZipCode.value     = this.member.etatCivil.address.zipCode;   
	pAccountParameters.vAccountForm.idAccountDepartment.value  = this.member.etatCivil.address.department;

	pAccountParameters.vAccountPrefGravures.checked        = this.member.preferences['prefGravures'];      
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefGravures, 'idAccountPrefGravuresLabel');

	pAccountParameters.vAccountPrefLivres.checked          = this.member.preferences['prefLivres'];    
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefLivres, 'idAccountPrefLivresLabel');

	pAccountParameters.vAccountPrefFilms.checked           = this.member.preferences['prefFilms']; 
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefFilms, 'idAccountPrefFilmsLabel');
	
	pAccountParameters.vAccountPrefJeux.checked            = this.member.preferences['prefJeux'];            
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefJeux, 'idAccountPrefJeuxLabel');

	pAccountParameters.vAccountPrefMaquettes.checked       = this.member.preferences['prefMaquettes'];       
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefMaquettes, 'idAccountPrefMaquettesLabel');
	
	pAccountParameters.vAccountPrefFigurines.checked       = this.member.preferences['prefFigurines'];       
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefFigurines, 'idAccountPrefFigurinesLabel');

	pAccountParameters.vAccountPrefBlindes.checked         = this.member.preferences['prefBlindes'];      
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefBlindes, 'idAccountPrefBlindesLabel');
	
	pAccountParameters.vAccountPrefAvions.checked          = this.member.preferences['prefAvions'];          
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefAvions, 'idAccountPrefAvionsLabel');

	pAccountParameters.vAccountPrefBateaux.checked         = this.member.preferences['prefBateaux'];         
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefBateaux, 'idAccountPrefBateauxLabel');

	pAccountParameters.vAccountPrefDioramas.checked        = this.member.preferences['prefDioramas'];        
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefDioramas, 'idAccountPrefDioramasLabel');

	pAccountParameters.vAccountPrefPrehistoire.checked     = this.member.preferences['prefPrehistoire'];     
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefPrehistoire, 'idAccountPrefPrehistoireLabel');

	pAccountParameters.vAccountPrefAntiquite.checked       = this.member.preferences['prefAntiquite'];       
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefAntiquite, 'idAccountPrefAntiquiteLabel');

	pAccountParameters.vAccountPrefMoyenAge.checked        = this.member.preferences['prefMoyenAge'];        
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefMoyenAge, 'idAccountPrefMoyenAgeLabel');

	pAccountParameters.vAccountPrefRenaissance.checked     = this.member.preferences['prefRenaissance'];     
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefRenaissance, 'idAccountPrefRenaissanceLabel');

	pAccountParameters.vAccountPrefDentelles.checked       = this.member.preferences['prefDentelles'];       
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefDentelles, 'idAccountPrefDentellesLabel');
	
	pAccountParameters.vAccountPrefAncienRegime.checked    = this.member.preferences['prefAncienRegime'];    
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefAncienRegime, 'idAccountPrefAncienRegimeLabel');

	pAccountParameters.vAccountPrefRevolution.checked      = this.member.preferences['prefRevolution'];      
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefRevolution, 'idAccountPrefRevolutionLabel');

	pAccountParameters.vAccountPref1erEmpire.checked       = this.member.preferences['pref1erEmpire'];       
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPref1erEmpire, 'idAccountPref1erEmpireLabel');

	pAccountParameters.vAccountPref2ndEmpire.checked       = this.member.preferences['pref2ndEmpire'];       
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPref2ndEmpire, 'idAccountPref2ndEmpireLabel');

	pAccountParameters.vAccountPrefSecession.checked       = this.member.preferences['prefSecession'];       
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefSecession, 'idAccountPrefSecessionLabel');

	pAccountParameters.vAccountPrefFarWest.checked         = this.member.preferences['prefFarWest'];         
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefFarWest, 'idAccountPrefFarWestLabel');

	pAccountParameters.vAccountPrefWW1.checked             = this.member.preferences['prefWW1'];             
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefWW1, 'idAccountPrefWW1Label');

	pAccountParameters.vAccountPrefWW2.checked             = this.member.preferences['prefWW2'];             
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefWW2, 'idAccountPrefWW2Label');

	pAccountParameters.vAccountPrefContemporain.checked    = this.member.preferences['prefContemporain'];    
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefContemporain, 'idAccountPrefContemporainLabel');

	pAccountParameters.vAccountPrefFuturiste.checked       = this.member.preferences['prefFuturiste'];       
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefFuturiste, 'idAccountPrefFuturisteLabel');

	pAccountParameters.vAccountPrefFantastique.checked     = this.member.preferences['prefFantastique'];     
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefFantastique, 'idAccountPrefFantastiqueLabel');

	pAccountParameters.vAccountPrefHFrancaise.checked      = this.member.preferences['prefHFrancaise'];      
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefHFrancaise, 'idAccountPrefHFrancaiseLabel');

	pAccountParameters.vAccountPrefHAmericaine.checked     = this.member.preferences['prefHAmericaine'];     
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefHAmericaine, 'idAccountPrefHAmericaineLabel');

	pAccountParameters.vAccountPrefHInternationale.checked = this.member.preferences['prefHInternationale']; 
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefHInternationale, 'idAccountPrefHInternationaleLabel');

	pAccountParameters.vAccountPrefAutre.checked           = this.member.preferences['prefAutre'];           
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefAutre, 'idAccountPrefAutreLabel');

	pAccountParameters.vAccountForm.idAccountPresentation.value = this.member.presentation;

	this.newPasswordKO = false;
	pAccountParameters.vAccountForm.idAccountCurrentPassword.value = '';
	pAccountParameters.vAccountForm.idAccountPassword.value = '';
	pAccountParameters.vAccountForm.idAccountConfirmPassword.value = '';

	pAccountParameters.vAccountPassword.setAttribute('disabled', 'true');
	pAccountParameters.vAccountConfirmPassword.setAttribute('disabled', 'true');

	pAccountParameters.vAccountAlertMsg.style.visibility = 'hidden';                          
	this.InitHeaderColor('bg-warning', pAccountParameters.vModalAccountHeader);
}

// -----------------------------------------------------------------------------
// Cette fonction calcule et MAJ le champ "Age" de la fenêtre de saisie des renseignements
// -----------------------------------------------------------------------------
MemberClient.prototype.updateFieldAge = function(pBirthDate, pAccountForm){ 
	if (pBirthDate){
		pAccountForm.idAccountAge.value = vToolBox.calculeAge(pBirthDate, false);
	} else {
		pAccountForm.idAccountAge.value ='';
	}
}

// -----------------------------------------------------------------------------
// Cette fonction récupère la sélection du Sexe à travers les boutons-radio
// -----------------------------------------------------------------------------
MemberClient.prototype.outputBtnRadioSex = function(){ 
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
MemberClient.prototype.inputBtnRadioSex = function(){ 
	var selectedSex;

	for (var i=0; i < document.forms.idAccountForm.accountSexe.length; i++) {
		if (this.member.etatCivil.sex === i){
				
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
MemberClient.prototype.updateAvatar = function(pSelectedSex, pAccountPhotoImg){ 
	var myPhoto = pAccountPhotoImg.getAttribute('src').split('static/images/members/')[1];

	if (myPhoto){
		if (myPhoto.startsWith('default-avatar-')){
			switch (pSelectedSex){
				case 0 :
					pAccountPhotoImg.setAttribute('src', 'static/images/members/default-avatar-inconnu.png');
					break;
				case 1 :
					pAccountPhotoImg.setAttribute('src', 'static/images/members/default-avatar-male.png');
					break;
				case 2 :
					pAccountPhotoImg.setAttribute('src', 'static/images/members/default-avatar-female.png');
					break;
			}
		} 
	}
}

// -----------------------------------------------------------------------------
// Cette fonction simule le click des boutons de préférences a true pour refléter
// le statut et la couleur correspondante des badges colorés :
// - Elle coche ou decoche (de façon cachée) le bouton Check-box sous-jacent
// - Elle ajoute ou retire laa classe "active" du label
// -----------------------------------------------------------------------------
MemberClient.prototype.activeButtonOfSelectedCheckBox = function(pPref, pPrefLabel){
var myIdLabel = document.getElementById(pPrefLabel)
	pPref.checked ? myIdLabel.classList.add('active') : myIdLabel.classList.remove('active');
}

// -----------------------------------------------------------------------------
// Cette fonction simule le click des boutons de préférences a true pour refléter
// le statut et la couleur correspondante des badges colorés
// - Elle ajoute ou retire la classe "active" du label
// - Comme cette fonction est "Read-Only", on ne change pas le statut réel des check-box sous-jacents
// -----------------------------------------------------------------------------
MemberClient.prototype.activeButtonOfSelectedCheckBoxReadOnly = function(pIndex, pPrefLabel){
	this.member.preferences[pIndex] ? document.getElementById(pPrefLabel).classList.add('active')
																	: document.getElementById(pPrefLabel).classList.remove('active')
}

	// -------------------------------------------------------------------------
	// Validation Fiche "Renseignements"
	// Envoi des infos de la fiche renseignement du visiteur au serveur pour 
	// stockage en BDD
	// Si une demande de chgt de MDP a été demandée et qu'elle s'est mal déroulée, 
	// on ne valide pas la fiche
	// Sinon on MAJ la fiche de renseignements en BDD
	// De plus, s'il y a eu une demande changement dde MDP, on MAJ la BDD en conséquence
	// et on demande au serveur d'envoyer un mail de notification de MDP
	// -------------------------------------------------------------------------
MemberClient.prototype.updateProfile = function(pAccountParams, pAvatarInfo, pProfileInfo){
	var cstWaitForUpladToDisplayAvatar = false;

	if (!this.newPasswordKO){
		if (pAccountParams.vAccountPhotoFile.value.length){                                                    // Si un fichier image a été choisie dans l explorateur windows
			this.member.etatCivil.photo = pAccountParams.vAccountPhotoFile.value.split('C:\\fakepath\\')[1];     // On ne garde que le nom de l'image pour la BDD
			pAccountParams.vSIOFU.submitFiles(pAccountParams.vAccountPhotoFile.files);                                           // Alors on la transfère vers le serveur 
			cstWaitForUpladToDisplayAvatar = true;
		} else {
			this.member.etatCivil.photo = pAccountParams.vAccountPhotoImg.getAttribute('src').split('static/images/members/')[1]; 
		}

		this.member.etatCivil.firstName = pAccountParams.vAccountForm.idAccountFirstName.value;
		this.member.etatCivil.name      = pAccountParams.vAccountForm.idAccountName.value;
		this.member.etatCivil.birthDate = pAccountParams.vAccountForm.idAccountBirthDate.value;                ;
		this.member.etatCivil.sex       = this.outputBtnRadioSex();

		this.member.etatCivil.address.street       	 = pAccountParams.vAccountForm.idAccountStreet.value;
		this.member.etatCivil.address.city         	 = pAccountParams.vAccountForm.idAccountCity.value;
		this.member.etatCivil.address.zipCode      	 = pAccountParams.vAccountForm.idAccountZipCode.value;
		this.member.etatCivil.address.department   	 = pAccountParams.vAccountForm.idAccountDepartment.value;
		this.member.etatCivil.address.departmentName = pAccountParams.vAccountDepartment[pAccountParams.vAccountDepartment.selectedIndex].text;

		this.member.preferences['prefGravures']        = pAccountParams.vAccountPrefGravures.checked;
		this.member.preferences['prefLivres']          = pAccountParams.vAccountPrefLivres.checked;
		this.member.preferences['prefFilms']           = pAccountParams.vAccountPrefFilms.checked;
		this.member.preferences['prefJeux']            = pAccountParams.vAccountPrefJeux.checked;
		this.member.preferences['prefMaquettes']       = pAccountParams.vAccountPrefMaquettes.checked;
		this.member.preferences['prefFigurines']       = pAccountParams.vAccountPrefFigurines.checked;
		this.member.preferences['prefBlindes']         = pAccountParams.vAccountPrefBlindes.checked;
		this.member.preferences['prefAvions']          = pAccountParams.vAccountPrefAvions.checked;
		this.member.preferences['prefBateaux']         = pAccountParams.vAccountPrefBateaux.checked;
		this.member.preferences['prefDioramas']        = pAccountParams.vAccountPrefDioramas.checked;
		this.member.preferences['prefPrehistoire']     = pAccountParams.vAccountPrefPrehistoire.checked;
		this.member.preferences['prefAntiquite']       = pAccountParams.vAccountPrefAntiquite.checked;
		this.member.preferences['prefMoyenAge']        = pAccountParams.vAccountPrefMoyenAge.checked;
		this.member.preferences['prefRenaissance']     = pAccountParams.vAccountPrefRenaissance.checked;
		this.member.preferences['prefDentelles']       = pAccountParams.vAccountPrefDentelles.checked;
		this.member.preferences['prefAncienRegime']    = pAccountParams.vAccountPrefAncienRegime.checked;
		this.member.preferences['prefRevolution']      = pAccountParams.vAccountPrefRevolution.checked;
		this.member.preferences['pref1erEmpire']       = pAccountParams.vAccountPref1erEmpire.checked;
		this.member.preferences['pref2ndEmpire']       = pAccountParams.vAccountPref2ndEmpire.checked;
		this.member.preferences['prefSecession']       = pAccountParams.vAccountPrefSecession.checked;
		this.member.preferences['prefFarWest']         = pAccountParams.vAccountPrefFarWest.checked;
		this.member.preferences['prefWW1']             = pAccountParams.vAccountPrefWW1.checked;
		this.member.preferences['prefWW2']             = pAccountParams.vAccountPrefWW2.checked;
		this.member.preferences['prefContemporain']    = pAccountParams.vAccountPrefContemporain.checked;
		this.member.preferences['prefFuturiste']       = pAccountParams.vAccountPrefFuturiste.checked;
		this.member.preferences['prefFantastique']     = pAccountParams.vAccountPrefFantastique.checked;
		this.member.preferences['prefHFrancaise']      = pAccountParams.vAccountPrefHFrancaise.checked;
		this.member.preferences['prefHAmericaine']     = pAccountParams.vAccountPrefHAmericaine.checked;
		this.member.preferences['prefHInternationale'] = pAccountParams.vAccountPrefHInternationale.checked;
		this.member.preferences['prefAutre']           = pAccountParams.vAccountPrefAutre.checked;

		this.member.presentation  = pAccountParams.vAccountForm.idAccountPresentation.value;

		if (pAccountParams.vAccountForm.idAccountCurrentPassword.value !==''){                                 
			this.member.oldPassword = pAccountParams.vAccountForm.idAccountCurrentPassword.value;
			this.member.password = pAccountParams.vAccountForm.idAccountPassword.value;
		}

		webSocketConnection.emit('dataProfilMembre', this.member);   		// Transmission au serveur des infos saisies

		$('#idModalAccount').modal('toggle');                           // Fermeture de la fenêtre modale de Login
		pAccountParams.vAccountAlertMsg.style.visibility = 'hidden';  

		if (!cstWaitForUpladToDisplayAvatar) {					// Si c est un avatar qui n'a pas eu besoin d être téléchargé (Soit Photo déja existante, soit avatar par défaut)
			this.displayAvatar(pAvatarInfo);
		};

		this.displayPresentationCard(pProfileInfo);
	}
}
// -------------------------------------------------------------------------
// Modale "AJout d'Amis"
// -------------------------------------------------------------------------
	MemberClient.prototype.initModalAddFriend = function(){
	}
// --------------------------------------------------------------------------------------------------------------
// -------------------------- Fin du module ---------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------
