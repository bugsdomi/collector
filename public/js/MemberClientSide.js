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
					department : '',    // Département
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
MemberClient.prototype.initModalTextAboutMode = function(pModalTitle, pModalBodyText){
	pModalTitle.innerText = 'A propos...'
	pModalBodyText.innerHTML = '<h5>Bienvenue dans Collect\'Or</h5>';
	pModalBodyText.innerHTML += '<p>Collector est un réseau social destiné aux collectionneurs de figurines, véhicules, avions, bateaux, et autres sujets historiques, principalement militaires, mais les autres types de collections sont également les bienvenus.</p>';
	pModalBodyText.innerHTML += '<p>Vous pourrez notamment discuter en public ou en privé avec d\'autres collectionneurs, déposer / lire des annonces de vente, d\'échange, de recherche, de manifestations...</p>';
	pModalBodyText.innerHTML += '<p>De plus, vous pourrez laisser vos avis sur des sujets particuliers, accéder à la galerie pour admirer les collections ou y déposer vos propres photos, accéder aux trucs et astuces de modéliste, y déposer vos expériences, et enfin poser vos questions.</p>';
}
// -----------------------------------------------------------------------------
// Cette fonction initialise le contenu de la fenetre modale "Félicitations et Bienvenue"
// après la création réussie du nouveau membre
// -----------------------------------------------------------------------------
MemberClient.prototype.initModalWelcomeText = function(pModalTitle, pModalBodyText, pMemberPseudo){
	pModalTitle.innerText = 'Bienvenue dans Collect\'Or'
	pModalBodyText.innerHTML = '<h5>Félicitations '+ pMemberPseudo +' !</h5>';
	pModalBodyText.innerHTML += '<br /><p>Votre compte a été créé avec succès.</p>';
	pModalBodyText.innerHTML += '<br /><p>Un mail de confirmation vous été envoyé, si vous ne le voyez pas, veuillez regarder dans le dosssier des SPAMs.</p>';
	pModalBodyText.innerHTML += '<br /><p>Bonne navigation...</p>';
}
// -----------------------------------------------------------------------------
// Cette fonction initialise le contenu de la fenetre modale "Mot de passe oublié"
// après la création réussie du nouveau membre
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
// après la création réussie du nouveau membre
// -----------------------------------------------------------------------------
MemberClient.prototype.initModalChangedPWDText = function(pModalTitle, pModalBodyText){
	pModalTitle.innerText = 'Mot de passe changé'
	pModalBodyText.innerHTML = '<h5>Votre nouveau mot de passe ...</h5>';
	pModalBodyText.innerHTML += '<br /><p>Vous avez changé votre mot de passe.</p>';
	pModalBodyText.innerHTML += '<br /><p>Un mail contenant vos identifiants vous a été envoyé, si vous ne le voyez pas, veuillez regarder dans le dosssier des SPAMs.</p>';
}
// -----------------------------------------------------------------------------
// Cette fonction initialise le contenu de la fenetre modale "Félicitations et Bienvenue"
// après la création réussie du nouveau membre
// -----------------------------------------------------------------------------
MemberClient.prototype.initModalAlreadyConnectedText = function(pModalTitle, pModalBodyText){
	pModalTitle.innerText = 'Collect\'Or';
	pModalBodyText.innerHTML = '<h5>Connexion impossible</h5>';
	pModalBodyText.innerHTML += '<br /><p>Vous ne pouvez pas vous connecter à \'Collect\'Or\', car vous vous êtes déjà connecté dans une autre session.</p>';
	// pModalBodyText.innerHTML += '<br /><p></p>';
}
// -----------------------------------------------------------------------------
// Cette fonction initialise le contenu de la fenetre modale "Félicitations et Bienvenue"
// après la création réussie du nouveau membre
// -----------------------------------------------------------------------------
MemberClient.prototype.initModalHelloText = function(pModalTitle, pModalBodyText, pMemberPseudo){
	pModalTitle.innerText = 'Connexion à Collect\'Or';
	pModalBodyText.innerHTML = '<h5>Bonjour '+pMemberPseudo+'</h5>';
	pModalBodyText.innerHTML += '<br /><p>Vous êtes bien connecté à \'Collect\'Or\', bonne navigation...</p>';
}
// -----------------------------------------------------------------------------
// Cette fonction désactive les options de menu inutiles lorsque le visiteur s'est 
// connecté ou après la création réussie de son compte, car il se trouve de fait, 
// déjà connecté
// -----------------------------------------------------------------------------
MemberClient.prototype.setMemberContext = function(pConnexion, pCreation, pDropDownProfilMenu, pPseudo, pDeconnexion,pProfileNavBar){
	pConnexion.style.display = 'none';         //      Désactivation du bouton 'Connexion'
	pCreation.style.display = 'none';          //      Désactivation du bouton 'Creation de compte'

	pDropDownProfilMenu.style.display = 'block';
	pDropDownProfilMenu.innerHTML += ' '+pPseudo;

	pDeconnexion.classList.remove('disabled');
	this.maskOff(pProfileNavBar); 						// Active la NavBar du profile
}
// -----------------------------------------------------------------------------
// Cette fonction réactive les options de menu Login et Création de compte lorsque
//  le Membre se déconnecte, et désactive le bouton "Déconnexion"
// -----------------------------------------------------------------------------
MemberClient.prototype.unsetMemberContext = function(pWebSocketConnection){
	// Désactive la NavBar du profile
	this.maskOn('idProfileNavBar', {zIndex:1}); 

	// Régénèration de l'écran from scratch;
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
		pHeader.classList.remove('txt-yellow-stroke');                       
		pHeader.classList.add('bg-warning');    // Jaune Or     
		return
	}

	if (pACtiveColor === 'bg-danger'){
		pHeader.classList.remove('bg-success');
		pHeader.classList.remove('bg-warning');    // Jaune Or               
		pHeader.classList.add('bg-danger');
		// pHeader.classList.add('txt-yellow-stroke');
		pHeader.classList.add('text-warning');
		return
	}
	
	if (pACtiveColor === 'bg-success'){
		pHeader.classList.remove('bg-danger');
		pHeader.classList.remove('bg-warning');    // Jaune Or               
		pHeader.classList.add('bg-success');
		// pHeader.classList.add('txt-yellow-stroke');
		pHeader.classList.add('text-warning');
		return
	}
}
// -----------------------------------------------------------------------------
// Cette fonction affiche l'avatar et le pseudo sur le carroussel de la page de profil
// -----------------------------------------------------------------------------
MemberClient.prototype.displayAvatarOnCarrousel = function(pPhoto, pPseudo, pAvatarsOnCarousel){
	pAvatarsOnCarousel.vAvatarImg1.setAttribute('src', 'static/images/members/'+pPhoto);
	pAvatarsOnCarousel.vAvatarMemberNameImg1.innerHTML = pPseudo;
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
// avec les valeurs récupérées dans la BDD, (et pouvant être vieges)
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
MemberClient.prototype.updateAvatar = function(pIndex, pAccountPhotoImg){ 

	var myPhoto = pAccountPhotoImg.getAttribute('src').split('static/images/members/')[1];

	if (myPhoto){
		if (myPhoto.startsWith('default-avatar-')){
			switch (pIndex){
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
// Cette fonction simule le click des boutons de préférences a true pour refleter
// le statut et la couleur correspondante des badges colorés
// -----------------------------------------------------------------------------
MemberClient.prototype.activeButtonOfSelectedCheckBox = function(pAccountPref, pIdAccountPrefLabel){

	var myIdLabel = document.getElementById(pIdAccountPrefLabel)
	pAccountPref.checked ? myIdLabel.classList.add('active') : myIdLabel.classList.remove('active');
}

// --------------------------------------------------------------------------------------------------------------
// elemOrId - jquery element or element id, defaults to $('<body>')'
// settings.color defaults to 'transparent'
// settings.opacity defaults to 1
// settings.zIndex defaults to 2147483647
// if settings.hourglasss==true change cursor to hourglass over mask
// 
//  Exemples d'utilisation
// maskOn(); // transparent page mask
// maskOn(null, {color:'gray', opacity:0.8}); // gray page mask with opacity
// maskOff(); // remove page mask
// maskOn(div); // transparent div mask
// maskOn(divId, {color:'gray', hourglass:true}); // gray div mask with hourglass
// maskOff(div); // remove div mask
// --------------------------------------------------------------------------------------------------------------
MemberClient.prototype.maskOn = function(elemOrId, settings) {
	var elem = this.elemFromParam(elemOrId);
	if (!elem) return;
	
	var maskDiv=elem.data('maskDiv');
	if (!maskDiv) {
		maskDiv=$('<div style="position:fixed;display:inline"></div>');
		$('body').append(maskDiv);
		elem.data('maskDiv', maskDiv);
	}

	// Vérrification de la présence de styles CSS dans les paramètres, sinon ==> Valeurs par défaut
	if (typeof settings==='undefined' || settings===null) settings={};
	if (typeof settings.color==='undefined' || settings.color===null) settings.color='transparent';
	if (typeof settings.opacity==='undefined' || settings.opacity===null) settings.opacity=1;
	if (typeof settings.zIndex==='undefined' || settings.zIndex===null) settings.zIndex=2147483647;
	if (typeof settings.hourglass==='undefined' || settings.hourglass===null) settings.hourglass=false;
	
	// Etirement du maskdiv au-dessus de l'élément
	var offsetParent = elem.offsetParent();
	var widthPercents=elem.outerWidth()*100/offsetParent.outerWidth()+'%';
	var heightPercents=elem.outerHeight()*100/offsetParent.outerHeight()+'%';

	maskDiv.width(widthPercents);
	maskDiv.height(heightPercents);
	maskDiv.offset($(elem).offset());
	
	// set styles passés en paramètres ou par défaut
	maskDiv[0].style.backgroundColor = settings.color;
	maskDiv[0].style.opacity = settings.opacity;
	maskDiv[0].style.zIndex = settings.zIndex;
	if (settings.hourglass) this.hourglassOn(maskDiv);
	
	return maskDiv;
}
// --------------------------------------------------------------------------------------------------------------
// elemOrId - jquery element or element id, defaults to $('<body>')'
// --------------------------------------------------------------------------------------------------------------
MemberClient.prototype.maskOff = function(elemOrId) {
	var elem = this.elemFromParam(elemOrId);
	if (!elem) return;
	
	var maskDiv=elem.data('maskDiv');
	if (!maskDiv) {
		console.log('maskOff no mask !');
		return;
	}

	elem.removeData('maskDiv');
	maskDiv.remove();
}
// --------------------------------------------------------------------------------------------------------------
// Si l icone "sablier" a été passée en paramètre lors du masquage des éléments, change l icone en sablier
// Si "decendents" est a true, alors montre également le sablier sur les déscendants ou "elemOrId"  (defaults --> true)
// --------------------------------------------------------------------------------------------------------------
MemberClient.prototype.hourglassOn = function(elemOrId, decendents) {
	var elem = this.elemFromParam(elemOrId);
	if (!elem) return;

	if (typeof decendents==='undefined' || decendents===null) decendents=true;

	if ($('style:contains("hourGlass")').length < 1) $('<style>').text('.hourGlass { cursor: wait !important; }').appendTo('head');
	if ($('style:contains("hourGlassWithDecendents")').length < 1) $('<style>').text('.hourGlassWithDecendents, .hourGlassWithDecendents * { cursor: wait !important; }').appendTo('head');
	elem.addClass(decendents ? 'hourGlassWithDecendents' : 'hourGlass');
}
// --------------------------------------------------------------------------------------------------------------
// Si l icone "sablier" a été passée en paramètre lors du masquage des éléments, retire l icone "sablier"
// --------------------------------------------------------------------------------------------------------------
MemberClient.prototype.hourglassOff = function(elemOrId) {
	var elem = this.elemFromParam(elemOrId);
	if (!elem) return;

	elem.removeClass('hourGlass');
	elem.removeClass('hourGlassWithDecendents');
}
// --------------------------------------------------------------------------------------------------------------
// Vérifie que l'élément passé en paramètre est valide
// --------------------------------------------------------------------------------------------------------------
MemberClient.prototype.elemFromParam = function(elemOrId) {
	var elem;
	if (typeof elemOrId==='undefined' || elemOrId===null) 
		elem=$('body');
	else if (typeof elemOrId === 'string' || elemOrId instanceof String) 
		elem=$('#'+elemOrId);
	else
		elem=$(elemOrId);

	if (!elem || elem.length===0) {
		console.log('elemFromParam no element !');
		return null;
	}
	return elem;
}
// --------------------------------------------------------------------------------------------------------------












// -------------------------- Fin du module ----------------------------------------------------------------------------
