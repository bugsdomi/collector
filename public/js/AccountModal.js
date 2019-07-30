// ************************************************************************
// ***      AccountModal : Objet de saisie des infos personnelles       ***
// ***                                                                  ***
// *** Objet : AccountModal                                             ***
// ***                                                                  ***
// *** Cet objet sert à saisir toutes les données de profil personnelles***
// ***                                                                  ***
// ***  Nécessite :                                                     ***
// ***      InitHeaderColor                                             ***
// ***                                                                  ***
// ************************************************************************

function AccountModal(pMemberClient){        // Fonction constructeur exportée
  this.memberClient = pMemberClient;
};
// -----------------------------------------------------------------------------
// Cette fonction initialise la modale de saisie de renseignements (Compte) 
// avec les valeurs récupérées dans la BDD, (et pouvant être vierges)
// -----------------------------------------------------------------------------
AccountModal.prototype.initModalAccount = function(pAccountParameters){
	pAccountParameters.vAccountForm.idAccountEmail.value  = this.memberClient.member.email;                                
	pAccountParameters.vAccountForm.idAccountPseudo.value = this.memberClient.member.pseudo;     

	pAccountParameters.vAccountPhotoImg.setAttribute('src', 'static/images/members/'+this.memberClient.member.etatCivil.photo);
	pAccountParameters.vAccountForm.idAccountFirstName.value = this.memberClient.member.etatCivil.firstName;     
	pAccountParameters.vAccountForm.idAccountName.value = this.memberClient.member.etatCivil.name;     
	pAccountParameters.vAccountForm.idAccountBirthDate.value = this.memberClient.member.etatCivil.birthDate;     

	if (this.memberClient.member.etatCivil.birthDate){
		this.updateFieldAge(this.memberClient.member.etatCivil.birthDate, pAccountParameters.vAccountForm);
		} else {
		pAccountParameters.vAccountForm.idAccountAge.value = '';
	}

	var selectedSex = this.inputBtnRadioSex();
	this.updateAvatar(selectedSex, pAccountParameters.vAccountPhotoImg);

	pAccountParameters.vAccountForm.idAccountStreet.value      = this.memberClient.member.etatCivil.address.street;    
	pAccountParameters.vAccountForm.idAccountCity.value        = this.memberClient.member.etatCivil.address.city;      
	pAccountParameters.vAccountForm.idAccountZipCode.value     = this.memberClient.member.etatCivil.address.zipCode;   
	pAccountParameters.vAccountForm.idAccountDepartment.value  = this.memberClient.member.etatCivil.address.department;

	pAccountParameters.vAccountPrefGravures.checked        = this.memberClient.member.preferences['prefGravures'];      
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefGravures, 'idAccountPrefGravuresLabel');

	pAccountParameters.vAccountPrefLivres.checked          = this.memberClient.member.preferences['prefLivres'];    
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefLivres, 'idAccountPrefLivresLabel');

	pAccountParameters.vAccountPrefFilms.checked           = this.memberClient.member.preferences['prefFilms']; 
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefFilms, 'idAccountPrefFilmsLabel');
	
	pAccountParameters.vAccountPrefJeux.checked            = this.memberClient.member.preferences['prefJeux'];            
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefJeux, 'idAccountPrefJeuxLabel');

	pAccountParameters.vAccountPrefMaquettes.checked       = this.memberClient.member.preferences['prefMaquettes'];       
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefMaquettes, 'idAccountPrefMaquettesLabel');
	
	pAccountParameters.vAccountPrefFigurines.checked       = this.memberClient.member.preferences['prefFigurines'];       
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefFigurines, 'idAccountPrefFigurinesLabel');

	pAccountParameters.vAccountPrefBlindes.checked         = this.memberClient.member.preferences['prefBlindes'];      
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefBlindes, 'idAccountPrefBlindesLabel');
	
	pAccountParameters.vAccountPrefAvions.checked          = this.memberClient.member.preferences['prefAvions'];          
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefAvions, 'idAccountPrefAvionsLabel');

	pAccountParameters.vAccountPrefBateaux.checked         = this.memberClient.member.preferences['prefBateaux'];         
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefBateaux, 'idAccountPrefBateauxLabel');

	pAccountParameters.vAccountPrefDioramas.checked        = this.memberClient.member.preferences['prefDioramas'];        
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefDioramas, 'idAccountPrefDioramasLabel');

	pAccountParameters.vAccountPrefPrehistoire.checked     = this.memberClient.member.preferences['prefPrehistoire'];     
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefPrehistoire, 'idAccountPrefPrehistoireLabel');

	pAccountParameters.vAccountPrefAntiquite.checked       = this.memberClient.member.preferences['prefAntiquite'];       
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefAntiquite, 'idAccountPrefAntiquiteLabel');

	pAccountParameters.vAccountPrefMoyenAge.checked        = this.memberClient.member.preferences['prefMoyenAge'];        
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefMoyenAge, 'idAccountPrefMoyenAgeLabel');

	pAccountParameters.vAccountPrefRenaissance.checked     = this.memberClient.member.preferences['prefRenaissance'];     
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefRenaissance, 'idAccountPrefRenaissanceLabel');

	pAccountParameters.vAccountPrefDentelles.checked       = this.memberClient.member.preferences['prefDentelles'];       
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefDentelles, 'idAccountPrefDentellesLabel');
	
	pAccountParameters.vAccountPrefAncienRegime.checked    = this.memberClient.member.preferences['prefAncienRegime'];    
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefAncienRegime, 'idAccountPrefAncienRegimeLabel');

	pAccountParameters.vAccountPrefRevolution.checked      = this.memberClient.member.preferences['prefRevolution'];      
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefRevolution, 'idAccountPrefRevolutionLabel');

	pAccountParameters.vAccountPref1erEmpire.checked       = this.memberClient.member.preferences['pref1erEmpire'];       
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPref1erEmpire, 'idAccountPref1erEmpireLabel');

	pAccountParameters.vAccountPref2ndEmpire.checked       = this.memberClient.member.preferences['pref2ndEmpire'];       
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPref2ndEmpire, 'idAccountPref2ndEmpireLabel');

	pAccountParameters.vAccountPrefSecession.checked       = this.memberClient.member.preferences['prefSecession'];       
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefSecession, 'idAccountPrefSecessionLabel');

	pAccountParameters.vAccountPrefFarWest.checked         = this.memberClient.member.preferences['prefFarWest'];         
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefFarWest, 'idAccountPrefFarWestLabel');

	pAccountParameters.vAccountPrefWW1.checked             = this.memberClient.member.preferences['prefWW1'];             
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefWW1, 'idAccountPrefWW1Label');

	pAccountParameters.vAccountPrefWW2.checked             = this.memberClient.member.preferences['prefWW2'];             
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefWW2, 'idAccountPrefWW2Label');

	pAccountParameters.vAccountPrefContemporain.checked    = this.memberClient.member.preferences['prefContemporain'];    
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefContemporain, 'idAccountPrefContemporainLabel');

	pAccountParameters.vAccountPrefFuturiste.checked       = this.memberClient.member.preferences['prefFuturiste'];       
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefFuturiste, 'idAccountPrefFuturisteLabel');

	pAccountParameters.vAccountPrefFantastique.checked     = this.memberClient.member.preferences['prefFantastique'];     
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefFantastique, 'idAccountPrefFantastiqueLabel');

	pAccountParameters.vAccountPrefHFrancaise.checked      = this.memberClient.member.preferences['prefHFrancaise'];      
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefHFrancaise, 'idAccountPrefHFrancaiseLabel');

	pAccountParameters.vAccountPrefHAmericaine.checked     = this.memberClient.member.preferences['prefHAmericaine'];     
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefHAmericaine, 'idAccountPrefHAmericaineLabel');

	pAccountParameters.vAccountPrefHInternationale.checked = this.memberClient.member.preferences['prefHInternationale']; 
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefHInternationale, 'idAccountPrefHInternationaleLabel');

	pAccountParameters.vAccountPrefAutre.checked           = this.memberClient.member.preferences['prefAutre'];           
	this.activeButtonOfSelectedCheckBox(pAccountParameters.vAccountPrefAutre, 'idAccountPrefAutreLabel');

	pAccountParameters.vAccountForm.idAccountPresentation.value = this.memberClient.member.presentation;

	this.memberClient.newPasswordKO = false;
	this.memberClient.birthDateKO 	= false;
	pAccountParameters.vAccountForm.idAccountCurrentPassword.value = '';
	pAccountParameters.vAccountForm.idAccountPassword.value = '';
	pAccountParameters.vAccountForm.idAccountConfirmPassword.value = '';

	pAccountParameters.vAccountPassword.setAttribute('disabled', 'true');
	pAccountParameters.vAccountConfirmPassword.setAttribute('disabled', 'true');
	pAccountParameters.vAccountAlertMsg.setAttribute('class', 'invisible');   
	
	var vModalHeaderColorParams = 
	{
		activeColor : 'bg-warning',
		modalHeader : pAccountParameters.vModalAccountHeader,
	}
	new InitHeaderColor().initHeaderColor(vModalHeaderColorParams);
}

// -----------------------------------------------------------------------------
// Cette fonction calcule et MAJ le champ "Age" de la fenêtre de saisie des renseignements
// -----------------------------------------------------------------------------
AccountModal.prototype.updateFieldAge = function(pBirthDate, pAccountForm){ 
	if (pBirthDate){
		pAccountForm.idAccountAge.value = vToolBox.calculeAge(pBirthDate, false);
	} else {
		pAccountForm.idAccountAge.value ='';
	}
}

// -----------------------------------------------------------------------------
// Cette fonction récupère la sélection du Sexe à travers les boutons-radio
// -----------------------------------------------------------------------------
AccountModal.prototype.outputBtnRadioSex = function(){ 
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
AccountModal.prototype.inputBtnRadioSex = function(){ 
	var selectedSex;

	for (var i=0; i < document.forms.idAccountForm.accountSexe.length; i++) {
		if (this.memberClient.member.etatCivil.sex === i){
				
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
AccountModal.prototype.updateAvatar = function(pSelectedSex, pAccountPhotoImg){ 
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
// - Elle ajoute ou retire la classe "active" du label
// -----------------------------------------------------------------------------
AccountModal.prototype.activeButtonOfSelectedCheckBox = function(pPref, pPrefLabel){
var myIdLabel = document.getElementById(pPrefLabel)
	pPref.checked ? myIdLabel.classList.add('active') : myIdLabel.classList.remove('active');
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
AccountModal.prototype.updateProfile = function(pAccountParams, pAvatarInfo){
	var cstWaitForUpladToDisplayAvatar = false;

	var vFormValid = !(this.memberClient.newPasswordKO || this.memberClient.birthDateKO);										// On vérifie qu'il n'y a pas de c!(hamps en erreur

	if (vFormValid){
		if (pAccountParams.vAccountPhotoFile.value.length){                                                    // Si un fichier image a été choisi dans l explorateur windows
			this.memberClient.member.etatCivil.photo = pAccountParams.vAccountPhotoFile.value.split('C:\\fakepath\\')[1];     // On ne garde que le nom de l'image pour la BDD
			pAccountParams.vSIOFU.submitFiles(pAccountParams.vAccountPhotoFile.files);                           // Alors on la transfère vers le serveur 
			cstWaitForUpladToDisplayAvatar = true;
		} else {
			this.memberClient.member.etatCivil.photo = pAccountParams.vAccountPhotoImg.getAttribute('src').split('static/images/members/')[1]; 
		}

		this.memberClient.member.etatCivil.firstName = pAccountParams.vAccountForm.idAccountFirstName.value;
		this.memberClient.member.etatCivil.name      = pAccountParams.vAccountForm.idAccountName.value;
		this.memberClient.member.etatCivil.birthDate = pAccountParams.vAccountForm.idAccountBirthDate.value;                ;
		this.memberClient.member.etatCivil.sex       = this.outputBtnRadioSex();

		this.memberClient.member.etatCivil.address.street       	 = pAccountParams.vAccountForm.idAccountStreet.value;
		this.memberClient.member.etatCivil.address.city         	 = pAccountParams.vAccountForm.idAccountCity.value;
		this.memberClient.member.etatCivil.address.zipCode      	 = pAccountParams.vAccountForm.idAccountZipCode.value;
		this.memberClient.member.etatCivil.address.department   	 = pAccountParams.vAccountForm.idAccountDepartment.value;

		this.memberClient.member.etatCivil.address.departmentName = pAccountParams.vAccountDepartment[pAccountParams.vAccountDepartment.selectedIndex].text;

		this.memberClient.member.preferences['prefGravures']        = pAccountParams.vAccountPrefGravures.checked;
		this.memberClient.member.preferences['prefLivres']          = pAccountParams.vAccountPrefLivres.checked;
		this.memberClient.member.preferences['prefFilms']           = pAccountParams.vAccountPrefFilms.checked;
		this.memberClient.member.preferences['prefJeux']            = pAccountParams.vAccountPrefJeux.checked;
		this.memberClient.member.preferences['prefMaquettes']       = pAccountParams.vAccountPrefMaquettes.checked;
		this.memberClient.member.preferences['prefFigurines']       = pAccountParams.vAccountPrefFigurines.checked;
		this.memberClient.member.preferences['prefBlindes']         = pAccountParams.vAccountPrefBlindes.checked;
		this.memberClient.member.preferences['prefAvions']          = pAccountParams.vAccountPrefAvions.checked;
		this.memberClient.member.preferences['prefBateaux']         = pAccountParams.vAccountPrefBateaux.checked;
		this.memberClient.member.preferences['prefDioramas']        = pAccountParams.vAccountPrefDioramas.checked;
		this.memberClient.member.preferences['prefPrehistoire']     = pAccountParams.vAccountPrefPrehistoire.checked;
		this.memberClient.member.preferences['prefAntiquite']       = pAccountParams.vAccountPrefAntiquite.checked;
		this.memberClient.member.preferences['prefMoyenAge']        = pAccountParams.vAccountPrefMoyenAge.checked;
		this.memberClient.member.preferences['prefRenaissance']     = pAccountParams.vAccountPrefRenaissance.checked;
		this.memberClient.member.preferences['prefDentelles']       = pAccountParams.vAccountPrefDentelles.checked;
		this.memberClient.member.preferences['prefAncienRegime']    = pAccountParams.vAccountPrefAncienRegime.checked;
		this.memberClient.member.preferences['prefRevolution']      = pAccountParams.vAccountPrefRevolution.checked;
		this.memberClient.member.preferences['pref1erEmpire']       = pAccountParams.vAccountPref1erEmpire.checked;
		this.memberClient.member.preferences['pref2ndEmpire']       = pAccountParams.vAccountPref2ndEmpire.checked;
		this.memberClient.member.preferences['prefSecession']       = pAccountParams.vAccountPrefSecession.checked;
		this.memberClient.member.preferences['prefFarWest']         = pAccountParams.vAccountPrefFarWest.checked;
		this.memberClient.member.preferences['prefWW1']             = pAccountParams.vAccountPrefWW1.checked;
		this.memberClient.member.preferences['prefWW2']             = pAccountParams.vAccountPrefWW2.checked;
		this.memberClient.member.preferences['prefContemporain']    = pAccountParams.vAccountPrefContemporain.checked;
		this.memberClient.member.preferences['prefFuturiste']       = pAccountParams.vAccountPrefFuturiste.checked;
		this.memberClient.member.preferences['prefFantastique']     = pAccountParams.vAccountPrefFantastique.checked;
		this.memberClient.member.preferences['prefHFrancaise']      = pAccountParams.vAccountPrefHFrancaise.checked;
		this.memberClient.member.preferences['prefHAmericaine']     = pAccountParams.vAccountPrefHAmericaine.checked;
		this.memberClient.member.preferences['prefHInternationale'] = pAccountParams.vAccountPrefHInternationale.checked;
		this.memberClient.member.preferences['prefAutre']           = pAccountParams.vAccountPrefAutre.checked;

		this.memberClient.member.presentation  = pAccountParams.vAccountForm.idAccountPresentation.value;

		if (pAccountParams.vAccountForm.idAccountCurrentPassword.value !==''){   
			this.memberClient.member.oldPassword 	= vToolBox.encryptPWD(pAccountParams.vAccountForm.idAccountCurrentPassword.value);
			this.memberClient.member.password 		= vToolBox.encryptPWD(pAccountParams.vAccountForm.idAccountPassword.value);
		}

		webSocketConnection.emit('dataProfilMembre', this.memberClient.member);   		// Transmission au serveur des infos saisies

		$('#idModalAccount').modal('toggle');                           // Fermeture de la fenêtre modale de Login
		pAccountParams.vAccountAlertMsg.style.visibility = 'hidden';  

		if (!cstWaitForUpladToDisplayAvatar) {					// Si c est un avatar qui n'a pas eu besoin d être téléchargé (Soit Photo déja existante, soit avatar par défaut)
			setTimeout(() => {
				this.memberClient.displayAvatar(pAvatarInfo);	// MAJ L'avatar sur la barre de menu, et l'avatar principal du profile
			}, 500);
		};
	}
}
