// -------------------------------------------------------------------------
// Stockage de mes amis confirmés, au cas où j'aurais besoin ultérieurement 
// d'y accéder pour travailler dessus (Modifier, supprimer, ajouter, etc...)
// -------------------------------------------------------------------------

var vMyFriendList = []

function MemberClient(){   // Fonction constructeur exportée
	this.newPasswordKO = false;    // Flag témoin de Nouveau mot de passe valide (True = KO, False = OK)
	this.member =                   // Structure de stockage provisoire du membre
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
		amis : [],
			dateCreation : -1,       // Timestamp de la création du record
	}
}

// ===================================================== Fonctions ===========================================================
// -----------------------------------------------------------------------------
//  Cette fonction initialise les popOver et toolTip de Bootstrap
// -----------------------------------------------------------------------------
MemberClient.prototype.InitPopOverAndToolTipAndDropDown = function(){
	$(function () {
		$('[data-toggle="popover"]').popover();			// Activation des PopOver de Bootstrap
	});

	$(function () {
		$('[data-toggle="tooltip"]').tooltip();			// Activation des ToolTips de Bootstrap
	});

	$(function () {
		$('[data-toggle="dropdown"]').dropdown();		// Activation des DropDown de Bootstrap
	});
}

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
		pConfirmPassword.setCustomValidity('Les mots de passe ne correspondent pas');
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
	pModalTitle.innerHTML = '<i class="fa fa-bell"></i> A propos...';
	pModalBodyText.innerHTML = '<h5>Bienvenue dans Collect\'Or</h5>';
	pModalBodyText.innerHTML += '<p>Collector est un réseau social destiné aux collectionneurs de figurines, véhicules, avions, bateaux, et autres sujets historiques, principalement militaires, mais les autres types de collections sont également les bienvenus.</p>';
	pModalBodyText.innerHTML += '<p>Vous pourrez notamment discuter en public ou en privé avec d\'autres collectionneurs, déposer / lire des annonces de vente, d\'échange, de recherche, de manifestations...</p>';
	pModalBodyText.innerHTML += '<p>De plus, vous pourrez laisser vos avis sur des sujets particuliers, accéder à la galerie pour admirer les collections ou y déposer vos propres photos, accéder aux trucs et astuces de modéliste, y déposer vos expériences, et enfin poser vos questions à laa Communauté.</p>';
}

// -----------------------------------------------------------------------------
// Cette fonction initialise le contenu de la fenetre d'erreur d'absence 
// d'amis à recommander
// -----------------------------------------------------------------------------
MemberClient.prototype.initModalNoFriendToRecommend = function(pModalTitle, pModalBodyText){
	pModalTitle.innerHTML = '<i class="fa fa-frown-o"></i> Recommandation impossible';
	pModalBodyText.innerHTML = '<h5>Vous ne pouvez pas recommander cet ami</h5>';
	pModalBodyText.innerHTML += '<p>Vous ne pouvez actuellement pas recommander cet ami pour les raisons suivantes :</p>';
	pModalBodyText.innerHTML += '<p>- soit vous n\'avez pas au moins 2 amis.</p>';
	pModalBodyText.innerHTML += '<p>- soit vous avez déjà recommandé tous vos amis.</p>';
	pModalBodyText.innerHTML += '<p>- soit l\'ami que vous souhaitez recommander est déjà ami ou a déjà des invitations en cours avec vos autres amis.</p>';
}

// -----------------------------------------------------------------------------
// Cette fonction initialise le contenu de la fenetre modale "Félicitations et Bienvenue"
// après la création réussie du nouveau membre
// -----------------------------------------------------------------------------
MemberClient.prototype.initModalWelcomeText = function(pModalTitle, pModalBodyText){
	pModalTitle.innerHTML = '<i class="fa fa-user"></i> Bienvenue dans Collect\'Or'
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
	pModalTitle.innerHTML = '<i class="fa fa-user"></i> Connexion à Collect\'Or';
	pModalBodyText.innerHTML = '<h5>Bonjour '+this.member.pseudo+'</h5>';
	pModalBodyText.innerHTML += '<br /><p>Vous êtes bien connecté à \'Collect\'Or\', bonne navigation...</p>';
}

// -----------------------------------------------------------------------------
// Cette fonction initialise le contenu de la fenetre modale "Mot de passe oublié"
// après la déclaration du mot de passe perdu
// -----------------------------------------------------------------------------
MemberClient.prototype.initModalLostPWDText = function(pModalTitle, pModalBodyText){
	pModalTitle.innerHTML = '<i class="fa fa-key"></i> Mot de passe perdu'
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
	pModalTitle.innerHTML = '<i class="fa fa-key"></i> Mot de passe changé'
	pModalBodyText.innerHTML = '<h5>Votre nouveau mot de passe ...</h5>';
	pModalBodyText.innerHTML += '<br /><p>Vous avez changé votre mot de passe.</p>';
	pModalBodyText.innerHTML += '<br /><p>Un mail contenant vos identifiants vous a été envoyé, si vous ne le voyez pas, veuillez regarder dans le dosssier des SPAMs.</p>';
}

// -----------------------------------------------------------------------------
// Cette fonction initialise le contenu de la fenetre modale de rejet d'un membre déjà connecté
// -----------------------------------------------------------------------------
MemberClient.prototype.initModalAlreadyConnectedText = function(pModalTitle, pModalBodyText){
	pModalTitle.innerHTML = '<i class="fa fa-user-times"></i> Collect\'Or';
	pModalBodyText.innerHTML = '<h5>Connexion impossible</h5>';
	pModalBodyText.innerHTML += '<br /><p>Vous ne pouvez pas vous connecter à \'Collect\'Or\', car vous vous êtes déjà connecté dans une autre session.</p>';
}

// -----------------------------------------------------------------------------
// Cette fonction initialise le contenu de la fenetre modale d'avertissement 
// que la liste de membres pouvant devenir amis est vide
// -----------------------------------------------------------------------------
MemberClient.prototype.initModalEmptyFriendList = function(pModalTitle, pModalBodyText){
	pModalTitle.innerHTML = '<i class="fa fa-frown-o"></i> Demander à être ami';
	pModalBodyText.innerHTML = '<h5>Pas de membres pouvant devenir amis</h5>';
	pModalBodyText.innerHTML += '<br /><p>Il n\'y a pas de membre disponible auquel vous pouvez demander à être ami car :</p>';
	pModalBodyText.innerHTML += '<p>- soit il n\'y a pas d\'autres membres</p>';
	pModalBodyText.innerHTML += '<p>- soit vous êtes déjà amis avec eux</p>';
	pModalBodyText.innerHTML += '<p>- soit vous leur avez déjà demandé à être ami et le membre n\'a pas encore accepté votre demande.</p>';
}
// -----------------------------------------------------------------------------
// Cette fonction initialise le contenu de la fenetre modale d'avertissement 
// qu'il n'y a pas d'invitations en attente
// -----------------------------------------------------------------------------
MemberClient.prototype.initModalEmptyWaitingInvit = function(pModalTitle, pModalBodyText){
	pModalTitle.innerHTML = '<i class="fa fa-frown-o"></i> Validation des invitations';
	pModalBodyText.innerHTML = '<h5>Pas d\'invitations en attente</h5>';
	pModalBodyText.innerHTML += '<br /><p>Vous n\'avez aucune demande d\'amis en cours </p>';
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
MemberClient.prototype.setMemberContext = function(pContextInfo, pAskingMembers){
	pContextInfo.vConnexion.style.display = 'none';         			// Désactivation du bouton 'Connexion'
	pContextInfo.vCreation.style.display = 'none';          			// Désactivation du bouton 'Creation de compte'

	pContextInfo.vDropDownProfilMenu.style.display = 'block';			// Affiche le sous-menu dans la NavBar d'entête spécifique au membre connecté
	pContextInfo.vDropDownProfilMenu.innerHTML += ' '+this.member.pseudo;		// Affiche le nom du membre dans la NavBarr d'entête

	pContextInfo.vDeconnexion.classList.remove('disabled');				// Active l'option "Deconnexion" du menu d'entête

	pContextInfo.vProfileNavBar.style.display = 'block';					// Affichage du menu du profil (sous l'Avatar)

	this.displayPuceNbrWaitingInvit(pContextInfo, pAskingMembers.length);				// S'il y a des invitations en attente ==> Affichage de la puce avec le Nbre d'invitations

	pContextInfo.vProfilePage.style.display = 'block';						// Affichage du bloc du profil complet (Fiche d'identité, conversations, liste d'amis...)
	pContextInfo.vPad.style.display = 'none';											// Masquage de la "div" de masquage du menu du profil
}

// -----------------------------------------------------------------------------
// Cette fonction affiche si besoin est, une puce avec le Nbre d'invitations en attente
// -----------------------------------------------------------------------------
MemberClient.prototype.displayPuceNbrWaitingInvit = function(pContextInfo, pNbrWaitingInvit){

	if (pNbrWaitingInvit > 0){																				// S'il y a des invitations en attente ==> Affichage de la puce avec le Nbre d'invitations
		// pContextInfo.vNbrWaitingInvit.style.display = 'inline';			// Affiche la puce
		pContextInfo.vNbrWaitingInvit.style.visibility = 'visible';			// Affiche la puce
		pContextInfo.vNbrWaitingInvit.innerHTML = pNbrWaitingInvit;			// Affiche le Nbre d'invitations
	} else {
		// pContextInfo.vNbrWaitingInvit.style.display = 'none';				// Cache la puce si Invitation = 0
		pContextInfo.vNbrWaitingInvit.style.visibility = 'hidden';			// Cache la puce si Invitation = 0
	}
}
// -----------------------------------------------------------------------------
// Cette fonction réinitialise complétement l'écran et ferme le socket
// -----------------------------------------------------------------------------
MemberClient.prototype.unsetMemberContext = function(){
	// Régénération de l'écran from scratch;
	window.location.reload(true);
	
	// Fermeture du socket
	webSocketConnection.close();
}
// -----------------------------------------------------------------------------
// Cette fonction gère les couleurs de fond et de texte des Header des modales
// -----------------------------------------------------------------------------
MemberClient.prototype.InitHeaderColor = function(pACtiveColor, pHeader){
	if (pACtiveColor === "bg-warning"){
		pHeader.classList.remove('bg-danger');
		pHeader.classList.remove('bg-success');
		pHeader.classList.remove('text-warning');
		pHeader.classList.add('bg-warning');    	    
		pHeader.classList.add('text-dark');
		return
	}

	if (pACtiveColor === 'bg-danger'){
		pHeader.classList.remove('bg-success');
		pHeader.classList.remove('bg-warning');                  
		pHeader.classList.remove('text-dark');
		pHeader.classList.add('bg-danger');
		pHeader.classList.add('text-warning');
		return
	}
	
	if (pACtiveColor === 'bg-success'){
		pHeader.classList.remove('bg-danger');
		pHeader.classList.remove('bg-warning');                  
		pHeader.classList.remove('text-dark');
		pHeader.classList.add('bg-success');
		pHeader.classList.add('text-warning');
		return
	}
}

// -----------------------------------------------------------------------------
// Cette fonction affiche la page de profil complète :
// - Le contexte du membre (Menus, compteurs, etc)
// - L'avatar
// - La page de profil :
// 		- La carte de "Présentation"
// 		- La carte des "Amis"
// -----------------------------------------------------------------------------
MemberClient.prototype.displayProfilePage = function(pContextInfo, pAvatarInfo, pProfileInfo, pAskingMembers, pFriends, pFriendInfo){
	this.setMemberContext(pContextInfo, pAskingMembers);  			//  Active le contexte du membre (NavBar d'entête, options de menu, etc)
	this.displayAvatar(pAvatarInfo);														// - Affiche la photo de l'avatar et son nom sur le carroussel et la carte "Présentation"
	this.displayPresentationCard(pProfileInfo);									// - Affiche les informations du profil dans la carte "Présentation"
	this.displayFriendsCard(pFriends,pFriendInfo);							// - Affiche les amis dans la carte "Amis"
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
// Cette fonction affiche la carte "Mes Amis" sur ma page de profil
// -----------------------------------------------------------------------------
MemberClient.prototype.displayFriendsCard = function(pFriends, pFriendInfo){
	var vMyFriend = {
		friendEmail  : null,
		friendPseudo : null,
		friendPhoto 	: null,
	}

	pFriends.forEach((item, index) => {																						// Pour chacun de mes amis en BDD
		if (item.pendingFriendRequest === cstAmiConfirme){													// Si la personn est un ami confirmé, je l'ajoute à ma liste
			vMyFriend.friendEmail = item.friendEmail;
			vMyFriend.friendPseudo = item.friendPseudo;
			vMyFriend.friendPhoto = item.friendPhoto;
			this.addFriendIntoCard(vMyFriend, pFriendInfo);
		}
	});
};

// -----------------------------------------------------------------------------
// Cette fonction ajoute un Ami sur la carte "Amis" de la page de profil 
// et prépare son sous-menu PopUp pour les recommandations d'amis
// -----------------------------------------------------------------------------
MemberClient.prototype.addFriendIntoCard = function(pMyFriend, pFriendInfo){

	var vFriendLocal = 
	{
		friendEmail  	: pMyFriend.friendEmail,
		friendPseudo 	: pMyFriend.friendPseudo,
		friendPhoto 	: pMyFriend.friendPhoto,
	}

	vMyFriendList.push(vFriendLocal);
	var index = (vMyFriendList.length-1);

	var vlineHTML = {					// Structure HTML générée pour chaque ligne de membre
		Vli 					: null,		// <li class="friendList withScaling">
		vA	 					: null,		// <a id ="xxxx" href="#">
		vDivDropDown 	: null,		// <div class="dropdown-menu py-0" style="width: 150px; border: 1px solid black; transform: translate3d(45px, 30px, 0px);"></div> 
		vSpan 				: null,		// <span class="bg-warning dropdown-item-text text-center" style="padding: 0.25rem 0.5rem; font-size: 0.8rem; border-bottom: 1px solid black;">xxxx</span>
		vDivContain		: null,		// <div style="max-height: 400px; overflow-y: auto"></div> 
		vDivAvatar  	: null,		// <div class="containerAvatarToken text-center align-self-center">
		vImg 			 		: null,		// <img id="idAvatarToken" class="avatarToken" alt="Membre" src="static/images/members/xxx.jpg">
	};

	// <li class="friendList withScaling dropdown dropright">
	vlineHTML.vLi = window.document.createElement('li');
	pFriendInfo.vFriendUL.appendChild(vlineHTML.vLi);
	vlineHTML.vLi.setAttribute('id', 'idMyFriendLi'+index);
	vlineHTML.vLi.setAttribute('class', 'dropdown dropright friendList withScaling');

	// <a id ="xxxx" href="#" class="btn-sm dropdown-toggle dropdown-toggle-split" style="padding-left: 0;padding-right: 0; color: white;" data-toggle="dropdown"></a> 
	vlineHTML.vA = window.document.createElement('a');
	vlineHTML.vLi.appendChild(vlineHTML.vA);
	vlineHTML.vA.setAttribute('href', '#');
	vlineHTML.vA.setAttribute('style', 'padding-left: 0;padding-right: 0; color: white;');
	vlineHTML.vA.setAttribute('class', 'btn-sm dropdown-toggle dropdown-toggle-split');
	vlineHTML.vA.setAttribute('data-toggle', 'dropdown');

	// <div class="dropdown-menu py-0" style="width: 150px; border: 1px solid black; transform: translate3d(45px, 30px, 0px);"></div> 
	vlineHTML.vDivDropDown = window.document.createElement('div');
	vlineHTML.vA.appendChild(vlineHTML.vDivDropDown);
	vlineHTML.vDivDropDown.setAttribute('id', 'idMyDropDown'+index);
	vlineHTML.vDivDropDown.setAttribute('class', 'dropdown-menu py-0');
	vlineHTML.vDivDropDown.setAttribute('style', 'width: 220px; border: 1px solid black;');

	// <span class="bg-warning dropdown-item-text text-center" style="padding: 0.25rem 0.5rem; font-size: 0.8rem; border-bottom: 1px solid black;">xxxx</span>
	vlineHTML.vSpan = window.document.createElement('span');
	vlineHTML.vDivDropDown.appendChild(vlineHTML.vSpan);
	vlineHTML.vSpan.setAttribute('class', 'bg-warning dropdown-item-text px-0 py-1');
	vlineHTML.vSpan.setAttribute('style', 'font-size: 0.8rem; border-bottom: 1px solid black;');
	vlineHTML.vSpan.innerHTML = 
	'<div class="containerAvatarToken px-0 withNoScaling">'+
	'<img class="avatarToken ml-1 my-1" alt="Membre" src="static/images/members/'+ vMyFriendList[index].friendPhoto +'" style="width:25px; height: 25px">'+ ' Recommander '+vMyFriendList[index].friendPseudo+' à :';

	// <div style="max-height: 400px; overflow-y: auto"></div> 
	vlineHTML.vDivContain = window.document.createElement('div');
	vlineHTML.vDivDropDown.appendChild(vlineHTML.vDivContain);
	vlineHTML.vDivContain.setAttribute('id', 'idDivContain'+index);
	vlineHTML.vDivContain.setAttribute('style', 'max-height: 400px; overflow-y: auto');

// <--- Endroit à partir duquel les lignes "Item" du menu Popup vont venir s'insérer --->

	// <div class="containerAvatarToken text-center align-self-center">
	vlineHTML.vDivAvatar = window.document.createElement('div');
	vlineHTML.vA.appendChild(vlineHTML.vDivAvatar);
// XXXXX
// vlineHTML.vDivAvatar.setAttribute('id', 'idMyFriendDivAvatar'+index);
	vlineHTML.vDivAvatar.setAttribute('class', 'containerAvatarToken py-1 text-center align-self-center');

	// <img id="idAvatarToken" class="avatarToken" alt="Membre" src="static/images/members/xxx.jpg"></img>
	vlineHTML.vImg = window.document.createElement('img');
	vlineHTML.vDivAvatar.appendChild(vlineHTML.vImg);
	vlineHTML.vImg.setAttribute('class', 'avatarToken');
	vlineHTML.vImg.setAttribute('alt', 'Ami');
	vlineHTML.vImg.setAttribute('src', 'static/images/members/'+pMyFriend.friendPhoto);
	vlineHTML.vImg.setAttribute('data-toggle', 'tooltip');
	vlineHTML.vImg.setAttribute('data-placement', 'top');
	vlineHTML.vImg.setAttribute('data-title', pMyFriend.friendPseudo);

	// Pour empêcher la fermeture de DropDownMenu lorsque l'on clique quelque part dedans (Comportement par défaut)
	$('#'+vlineHTML.vDivDropDown.id).on("click.bs.dropdown", (event) => { 
		event.stopPropagation(); 
		event.preventDefault(); 
	});

	// A l'ouverture du DropDownMenu, on créée dynamiquement tous ses sous-éléments (les amis-cibles des recommandations)dans le DOM
	$('#'+vlineHTML.vLi.id).on('shown.bs.dropdown', () => {
		this.searchFriendsNotAlreadyInvitWithTargetFriend(index, vlineHTML.vLi.id, vlineHTML.vDivContain.id);
	});
	
	// A la fermeture du DropDownMenu, on detruit tous ses sous-éléments dans le DOM
	$('#'+vlineHTML.vLi.id).on('hidden.bs.dropdown', () => {
		this.removeFriendToRecommendMenu(vlineHTML.vDivContain);
	});

	// Ajoute la déclaration d'évenements à chaque PopOver, ToolTip DropDown
	this.InitPopOverAndToolTipAndDropDown();
};









// *****************************************************************************
// 											Gestion des recommandations
// *****************************************************************************

// -----------------------------------------------------------------------------
// Cette fonction affiche une Popup avec les amis à qui on peut recommander un ami
// La recommandation ne peut fonctionner qu'à partir du moment où on a au moins 2 amis
// En effet, pour recommander un ami "A" à un ami "B", il faut au minimum 2 amis.
// 
// lorsqu'on a cliqué sur l'avatar d'un ami :
// On affiche tous mes autres amis sauf :
// - L'ami vers qui je vais envoyer les recommandations
// - ceux qui n'ont pas déjà une recommandation par moi-même en cours
// -----------------------------------------------------------------------------
MemberClient.prototype.displayRecommendableFriendList = function(pRecommendableFriends){
	var vDivContain = document.getElementById(pRecommendableFriends.myDivContainId)

	// Création dynamique des lignes HTML et création des EventListener pour activer les opération de recommandation d'ami
	var vTargetFriendForRecommend = [];
	pRecommendableFriends.recommendableFriendsList.forEach((item, index) => {
		vTargetFriendForRecommend.push(new AddTargetFriendsforRecommendLines(item, index, vDivContain));	// Ajoute les éléments d'une ligne vide dans le tableau des éléments
		
		var vDataToTransmit = {
			member										: this.member,
			recommendedFriendEmail 		: pRecommendableFriends.recommendedFriendEmail,
			recommendedFriendPseudo 	: pRecommendableFriends.recommendedFriendPseudo,
			recommendedFriendPhoto 		: pRecommendableFriends.recommendedFriendPhoto,
			dataToTransmit  					: vTargetFriendForRecommend[index],
		}

		vTargetFriendForRecommend[index].lineHTML.vIFA.addEventListener('click', this.sendRecommendation,false);
		vTargetFriendForRecommend[index].lineHTML.vIFA.invitation = vDataToTransmit;

		vTargetFriendForRecommend[index].lineHTML.vBtn.addEventListener('mouseover', this.addFriendModalChgBtnTextColorOver,false);
		vTargetFriendForRecommend[index].lineHTML.vBtn.invitation = vDataToTransmit;

		vTargetFriendForRecommend[index].lineHTML.vBtn.addEventListener('mouseout', this.addFriendModalChgBtnTextColorOut,false);
		vTargetFriendForRecommend[index].lineHTML.vBtn.invitation = vDataToTransmit;
	});
};

// --------------------------------------------------------------
// Envoi d'une recommandation d'un ami(A) à un autre ami(B) pour 
// qu'ils deviennent amis (Une seule demande par ami):
// Bascule la couleur de l'icône "Ajout d'amis"
// Si le receveur est connecté, son nombre d'invitations evoluera en temps réel
// --------------------------------------------------------------
MemberClient.prototype.sendRecommendation = function(event){
	// Bascule Look des boutons et de leur texte, puis désactive les boutons 
	event.target.invitation.dataToTransmit.lineHTML.vBtn.classList.replace('btn-outline-success','btn-success'); 
	event.target.invitation.dataToTransmit.lineHTML.vIFA.classList.replace('text-dark','text-light'); 
	event.target.invitation.dataToTransmit.lineHTML.vBtn.classList.add('active'); 
	event.target.invitation.dataToTransmit.lineHTML.vBtn.classList.add('disabled'); 

	// Neutralise les events et force le curseur en mode par défaut pour ne pas réactiver des lignes de recommandation deja utilisées
	event.target.invitation.dataToTransmit.lineHTML.vA.classList.add('neutralPointer'); 

	// Suppression des Listeners
	event.target.invitation.dataToTransmit.lineHTML.vIFA.removeEventListener('click', this.sendRecommendation,false);
	event.target.invitation.dataToTransmit.lineHTML.vBtn.removeEventListener('mouseover', this.addFriendModalChgBtnTextColorOver,false);
	event.target.invitation.dataToTransmit.lineHTML.vBtn.removeEventListener('mouseout', this.addFriendModalChgBtnTextColorOut,false);

	var vFriendToAdd = {
		myEmail 						:	event.target.invitation.member.email,
		myPseudo						:	event.target.invitation.member.pseudo,										    // C'est moi qui recommande l'ami 'recommendedFriendPseudo'
		myPhoto							:	event.target.invitation.member.etatCivil.photo,
		friendEmail 			 	: event.target.invitation.recommendedFriendEmail,
		friendPseudo 				: event.target.invitation.recommendedFriendPseudo,							// Ami recommandé par moi
		friendPhoto  				: event.target.invitation.recommendedFriendPhoto,
		targetFriendEmail  	: event.target.invitation.dataToTransmit.friend.friendEmail,
		targetFriendPseudo	: event.target.invitation.dataToTransmit.friend.friendPseudo,		// Ami à qui je recommande un ami (La cible)
		targetFriendPhoto  	: event.target.invitation.dataToTransmit.friend.friendPhoto,
		anchorTarget				: event.target.invitation.dataToTransmit.lineHTML.vA.id,	// Envoyé au serveur pour qu'il retourne cette info à la procédure d'envoi des notification.dataToTransmit
		imgTarget						: event.target.invitation.dataToTransmit.lineHTML.vImg.id,// Envoyé au serveur pour qu'il retourne cette info à la procédure d'envoi des notification
	}
	webSocketConnection.emit('recommendationSent', vFriendToAdd);  
}

// --------------------------------------------------------------
// Cette fonction alimente un objet avec des créations dans le DOM 
// des lignes HTML pour chaque ami-cible à qui l'on peut recommander un ami 
// --------------------------------------------------------------
function AddTargetFriendsforRecommendLines (pItem, pIndex, pDivContain) {
	this.lineHTML = {						// Structure HTML générée pour chaque ligne de membre
		vA							: null,
		vDivRow					: null,
		vDivAvatar			: null,
		vImg						: null,
		vDivPseudo			: null,
		vDivFA					: null,
		vBtn						: null,
		vIFA 						: null,	
	}

	this.friend = pItem; 
	this.index = pIndex;

	// <a href="#" class="container list-group-item list-group-item-action list-group-item-white">
	this.lineHTML.vA = window.document.createElement('a');
	pDivContain.appendChild(this.lineHTML.vA);
	this.lineHTML.vA.setAttribute('id', 'idRecommendAnchor'+pIndex);
	this.lineHTML.vA.setAttribute('href', '#');
	this.lineHTML.vA.setAttribute('class', 'container list-group-item list-group-item-action list-group-item-white');

	// <div class="row">
	this.lineHTML.vDivRow = window.document.createElement('div');
	this.lineHTML.vA.appendChild(this.lineHTML.vDivRow);
	this.lineHTML.vDivRow.setAttribute('class', 'row');
	
	// <div class="col-3 containerAvatarToken p-0 text-center withNoScaling">
	this.lineHTML.vDivAvatar = window.document.createElement('div');
	this.lineHTML.vDivRow.appendChild(this.lineHTML.vDivAvatar);
	this.lineHTML.vDivAvatar.setAttribute('class', 'col-3 containerAvatarToken p-0 text-center withNoScaling');

	// <img class="avatarToken m-1"  src="static/images/members/'+ pItem.friendPhoto +'" style="width:32px; height: 32px">
	this.lineHTML.vImg = window.document.createElement('img');
	this.lineHTML.vDivAvatar.appendChild(this.lineHTML.vImg);
	this.lineHTML.vImg.setAttribute('id', 'idRecommendImg'+pIndex);
	this.lineHTML.vImg.setAttribute('class', 'avatarToken m-1');
	this.lineHTML.vImg.setAttribute('alt', 'Amis à qui je peux recommander un ami');
	this.lineHTML.vImg.setAttribute('title', 'Recommandations d\'ami');
	this.lineHTML.vImg.setAttribute('src', 'static/images/members/'+pItem.friendPhoto);
	this.lineHTML.vImg.setAttribute('style', 'width:32px; height: 32px;');

	// <div class="col-6 align-self-center px-0" style="font-size: 0.8rem;">pItem.friendPseudo</div>
	this.lineHTML.vDivPseudo = window.document.createElement('div');
	this.lineHTML.vDivRow.appendChild(this.lineHTML.vDivPseudo);
	this.lineHTML.vDivPseudo.setAttribute('class', 'col-6 align-self-center px-0');
	this.lineHTML.vDivPseudo.setAttribute('style', 'font-size: 0.8rem;');
	this.lineHTML.vDivPseudo.innerHTML = pItem.friendPseudo;
	
	// <div class="col-3 text-center align-self-center px-0">
	this.lineHTML.vDivFA = window.document.createElement('div');
	this.lineHTML.vDivRow.appendChild(this.lineHTML.vDivFA);
	this.lineHTML.vDivFA.setAttribute('class', 'col-3 text-center align-self-center px-0');

	// <button type="button" class="btn btn-outline-success btn-sm">
	this.lineHTML.vBtn = window.document.createElement('button');
	this.lineHTML.vDivFA.appendChild(this.lineHTML.vBtn);
	this.lineHTML.vBtn.setAttribute('type', 'button');
	this.lineHTML.vBtn.setAttribute('class', 'btn btn-outline-success btn-sm');

	// <i class="fa fa-user-plus text-dark"></i>
	this.lineHTML.vIFA = window.document.createElement('i');
	this.lineHTML.vBtn.appendChild(this.lineHTML.vIFA);
	this.lineHTML.vIFA.setAttribute('class', 'fa fa-user-plus text-dark');
}

// -----------------------------------------------------------------------------
// Cette fonction va demander au serveur de lui fournir une liste d'amis à qui je peux recommander mon ami
// 
// La recommandation ne peut fonctionner qu'à partir du moment où on a au moins 2 amis
// En effet, pour recommander un ami "A" à un ami "B", il faut au minimum 2 amis.
// 
// lorsqu'on a cliqué sur l'avatar d'un ami :
// On affiche tous mes autres amis sauf :
// - L'ami vers qui je vais envoyer les recommandations
// - ceux qui n'ont pas déjà une recommandation par moi-même en cours
// -----------------------------------------------------------------------------
MemberClient.prototype.searchFriendsNotAlreadyInvitWithTargetFriend = function(pIndex, pDropDownMenuId, pDivContainId){
	vRecommendFriendsList = {
		friendEmail 		: vMyFriendList[pIndex].friendEmail,
		friendPseudo 		: vMyFriendList[pIndex].friendPseudo,
		friendPhoto 		: vMyFriendList[pIndex].friendPhoto,
		myFriendList 		: vMyFriendList,
		myDivContainId	: pDivContainId,
	}

	// Demande au serveur de vérifier si MES amis ne sont pas déjà dans un processus d'invitation avec l'Ami cible (celui à qui on veut recommander des amis)
	webSocketConnection.emit('searchFriendsNotAlreadyInvitWithTargetFriend', vRecommendFriendsList);   		
}

// -----------------------------------------------------------------------------
// Suppression de tous les éléments de la liste des membres pouvant devenir ami 
// à la fermeture du sous-menu
// -----------------------------------------------------------------------------
MemberClient.prototype.removeFriendToRecommendMenu = function(pDivDropDown){
	while (pDivDropDown.firstChild) {
		pDivDropDown.removeChild(pDivDropDown.firstChild);
	}
}

// -----------------------------------------------------------------------------
// Cette fonction initialise la modale de création de compte, quel que soit son mode 
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

// --------------------------------------------------------------
// Cette fonction alimente un objet avec des créations dans le DOM 
// des lignes HTML pour chaque invitation en attente à valider
// --------------------------------------------------------------
function AddInvitLines(item, index, pModalMgrFriendListGroup) {
	this.lineHTML = {		// Structure HTML générée pour chaque ligne de membre
		vA 				 : null,				// <a href="#" class="list-group-item list-group-item-action list-group-item-white">
		vDivRow 	 : null,				// <div class="row">
		vDivAvatar : null,				// <div class="col-4 containerAvatarToken py-1 text-center align-self-center">
		vImg 			 : null,				// <img id="idAvatarToken" class="avatarToken" alt="Membre" src="static/images/members/xxx.jpg">
		vDivPseudo : null,				// <div class="col-4 align-self-center font-size-120">xxx</div>
		vDivFA 		 : null,				// <div class="col-2 text-center align-self-center">
		vIFADown 	 : null,				// <i class="fa fa-thumbs-o-up fa-2x text-dark"></i>
		vIFAUp 		 : null,				// <i class="fa fa-thumbs-o-down fa-2x text-dark"></i>
	};

	this.friend = item;
	this.index = index;

	// <a href="#" class="list-group-item list-group-item-action list-group-item-white">
	this.lineHTML.vA = window.document.createElement('a');
	pModalMgrFriendListGroup.appendChild(this.lineHTML.vA);
	this.lineHTML.vA.setAttribute('id', 'idInvitAnchor'+index);
	this.lineHTML.vA.setAttribute('href', '#');
	this.lineHTML.vA.setAttribute('class', 'list-group-item list-group-item-action list-group-item-white');
	
	// <div class="row">
	this.lineHTML.vDivRow = window.document.createElement('div');
	this.lineHTML.vA.appendChild(this.lineHTML.vDivRow);
	this.lineHTML.vDivRow.setAttribute('class', 'row');
	
	// <div class="col-3 containerAvatarToken py-1 text-center align-self-center">
	this.lineHTML.vDivAvatar = window.document.createElement('div');
	this.lineHTML.vDivRow.appendChild(this.lineHTML.vDivAvatar);
	this.lineHTML.vDivAvatar.setAttribute('class', 'col-3 containerAvatarToken py-1 text-center align-self-center');

	// <img id="idAvatarToken" class="avatarToken" alt="Membre" src="static/images/members/xxx.jpg">
	this.lineHTML.vImg = window.document.createElement('img');
	this.lineHTML.vDivAvatar.appendChild(this.lineHTML.vImg);
	this.lineHTML.vImg.setAttribute('class', 'avatarToken mx-1');
	this.lineHTML.vImg.setAttribute('id', 'idInvitAvatarToken'+index);
	this.lineHTML.vImg.setAttribute('alt', 'Membre demandant à devenir ami');
	this.lineHTML.vImg.setAttribute('src', 'static/images/members/' + item.friendPhoto);
	this.lineHTML.vImg.setAttribute('data-toggle', 'popover');
	this.lineHTML.vImg.setAttribute('data-placement', 'right');

	// <div class="col-6 align-self-center font-size-120">xxx</div>
	this.lineHTML.vDivPseudo = window.document.createElement('div');
	this.lineHTML.vDivRow.appendChild(this.lineHTML.vDivPseudo);
	this.lineHTML.vDivPseudo.setAttribute('class', 'col-6 align-self-center px-0 font-size-120');


	var friendPair = item.friendPseudo.split('/')
	if (friendPair.length === 1){													// S'il ne s'agit pas d'une recommandation, donc c'est une invitation directe
		this.lineHTML.vDivPseudo.innerHTML = item.friendPseudo;
	} else {																											//
		this.lineHTML.vDivPseudo.innerHTML = friendPair[1]+'<font size="+0"> recommande </font>'+friendPair[0];
	}
	
	// <div class="col-3 text-center align-self-center">
	this.lineHTML.vDivFA = window.document.createElement('div');
	this.lineHTML.vDivRow.appendChild(this.lineHTML.vDivFA);
	this.lineHTML.vDivFA.setAttribute('class', 'col-3 text-center align-self-center pl-0');

	// <button type="button" class="btn btn-outline-success btn-sm mr-2">
	this.lineHTML.vBtnUp = window.document.createElement('button');
	this.lineHTML.vDivFA.appendChild(this.lineHTML.vBtnUp);
	this.lineHTML.vBtnUp.setAttribute('type', 'button');
	this.lineHTML.vBtnUp.setAttribute('class', 'btn btn-outline-success btn-sm mr-2');

	// <i class="fa fa-thumbs-o-up fa-2x text-dark"></i>
	this.lineHTML.vIFAUp = window.document.createElement('i');
	this.lineHTML.vBtnUp.appendChild(this.lineHTML.vIFAUp);
	this.lineHTML.vIFAUp.setAttribute('class', 'fa fa-thumbs-o-up fa-2x text-dark');

	// <button type="button" class="btn btn-outline-danger btn-sm">
	this.lineHTML.vBtnDown = window.document.createElement('button');
	this.lineHTML.vDivFA.appendChild(this.lineHTML.vBtnDown);
	this.lineHTML.vBtnDown.setAttribute('type', 'button');
	this.lineHTML.vBtnDown.setAttribute('class', 'btn btn-outline-danger btn-sm');

	// <i class="fa fa-thumbs-o-down fa-2x text-dark"></i>
	this.lineHTML.vIFADown = window.document.createElement('i');
	this.lineHTML.vBtnDown.appendChild(this.lineHTML.vIFADown);
	this.lineHTML.vIFADown.setAttribute('class', 'fa fa-thumbs-o-down fa-2x text-dark');
}

// --------------------------------------------------------------
// On a reçu une liste d'invitations à traiter
// Ajout dynamique des membres demandeurs dans le DOM sur la modale
// d'affichage des invitations
// --------------------------------------------------------------
MemberClient.prototype.displayWaitingInvitation = function(pWaitingInvit, pDisplayWaitingInvitationData){

	// Préparation et ouverture de la fenêtre modale de sélection des invitations à traiter
	this.InitHeaderColor('bg-warning', pDisplayWaitingInvitationData.modalMgrFriendHeader);
	$('#idModalMgrFriend').modal('show');     // Ouverture de la modale                                     

	var lineHTML = {						// Structure HTML générée pour le titre et la ligne de présentation de la fenêtre
		vH5        : null,				// <h5 class="modal-title"><i class="fa fa-fw fa-check"></i> Validation d'amis</h5>
		vH6 	     : null,				// <h6 class="text-center">Validez les membres avec qui vous acceptez de devenir ami</h6>
	}

	// <h5 class="modal-title"><i class="fa fa-fw fa-check"></i> Validation d'amis</h5>
	lineHTML.vH5 = window.document.createElement('h5');
	var parentDiv1 = pDisplayWaitingInvitationData.modalMgrFriendExitBtn.parentNode;
	parentDiv1.insertBefore(lineHTML.vH5, pDisplayWaitingInvitationData.modalMgrFriendExitBtn);
	lineHTML.vH5.setAttribute('class', 'modal-title');
	lineHTML.vH5.innerHTML = '<i class="fa fa-fw fa-check"></i>'+' Validation d\'amis';
	
	// <h6 class="text-center">Validez les membres avec qui vous acceptez de devenir ami</h6>
	lineHTML.vH6 = window.document.createElement('h6');
	var parentDiv2 = pDisplayWaitingInvitationData.modalMgrFriendListGroup.parentNode;
	parentDiv2.insertBefore(lineHTML.vH6, pDisplayWaitingInvitationData.modalMgrFriendListGroup);
	lineHTML.vH6.setAttribute('class', 'text-center');
	lineHTML.vH6.innerHTML = 'Validez les membres avec qui vous acceptez de devenir ami';

	// Création dynamique des lignes HTML et création des EventListener pour activer les opération de validation ou de rejet
	var vInvitAvailable = [];
	pWaitingInvit.forEach((item, index) => {
		vInvitAvailable.push(new AddInvitLines(item, index, pDisplayWaitingInvitationData.modalMgrFriendListGroup));	// Ajoute les éléments d'une ligne vide dans le tableau des éléments

		var vDataToTransmit = {
			member					: this.member,
			dataToTransmit  : vInvitAvailable[index],
		}

		// StackOverflow : https://stackoverflow.com/questions/256754/how-to-pass-arguments-to-addeventlistener-listener-function - 
		// "Why not just get the arguments from the target attribute of the event?"
		// Cette façon de procéder pour les 4 lignes qui suivent permet de passer des paramètres à la fonction appelée et surtout de pouvoir "Remove" les Listeners
		vInvitAvailable[index].lineHTML.vIFAUp.addEventListener('click', this.acceptInvitation,false);
		vInvitAvailable[index].lineHTML.vIFADown.addEventListener('click', this.refuseInvitation,false);
		vInvitAvailable[index].lineHTML.vIFAUp.invitation = vDataToTransmit;
		vInvitAvailable[index].lineHTML.vIFADown.invitation = vDataToTransmit;

		vInvitAvailable[index].lineHTML.vBtnUp.addEventListener('mouseover', this.acceptFriendBtnTxtColOver,false);
		vInvitAvailable[index].lineHTML.vBtnUp.invitation = vDataToTransmit;

		vInvitAvailable[index].lineHTML.vBtnUp.addEventListener('mouseout', this.acceptFriendBtnTxtColOut,false);
		vInvitAvailable[index].lineHTML.vBtnUp.invitation = vDataToTransmit;

		vInvitAvailable[index].lineHTML.vBtnDown.addEventListener('mouseover', this.refuseFriendBtnTxtColOver,false);
		vInvitAvailable[index].lineHTML.vBtnDown.invitation = vDataToTransmit;

		vInvitAvailable[index].lineHTML.vBtnDown.addEventListener('mouseout', this.refuseFriendBtnTxtColOut,false);
		vInvitAvailable[index].lineHTML.vBtnDown.invitation = vDataToTransmit;
	});
};

// --------------------------------------------------------------
// Envoi d'une acceptation d'invitation pour devenir ami au serveur (Une seule demande par ami):
// Bascule la couleur de l'icône "Accord d'amis"
// --------------------------------------------------------------
MemberClient.prototype.acceptInvitation = function(event){
	// Bascule Look des boutons et de leur texte, puis désactive les boutons 
	event.target.invitation.dataToTransmit.lineHTML.vBtnUp.classList.replace('btn-outline-success','btn-success'); 
	event.target.invitation.dataToTransmit.lineHTML.vIFAUp.classList.replace('text-dark','text-light'); 
	event.target.invitation.dataToTransmit.lineHTML.vBtnUp.classList.add('active'); 
	event.target.invitation.dataToTransmit.lineHTML.vBtnUp.classList.add('disabled'); 
	event.target.invitation.dataToTransmit.lineHTML.vBtnDown.classList.add('disabled'); 

	// Neutralise les events et force le curseur en mode par défaut pour ne pas réactiver des lignes d'invitations deja utilisées
	event.target.invitation.dataToTransmit.lineHTML.vA.classList.add('neutralPointer'); 

	// Suppression des Listeners
	event.target.invitation.dataToTransmit.lineHTML.vIFAUp.removeEventListener('click', this.acceptInvitation,false);
	event.target.invitation.dataToTransmit.lineHTML.vIFADown.removeEventListener('click', this.refuseInvitation,false);
	event.target.invitation.dataToTransmit.lineHTML.vBtnUp.removeEventListener('mouseover', this.acceptFriendBtnTxtColOver,false);
	event.target.invitation.dataToTransmit.lineHTML.vBtnUp.removeEventListener('mouseout', this.acceptFriendBtnTxtColOut,false);
	event.target.invitation.dataToTransmit.lineHTML.vBtnDown.removeEventListener('mouseover', this.refuseFriendBtnTxtColOver,false);
	event.target.invitation.dataToTransmit.lineHTML.vBtnDown.removeEventListener('mouseout', this.refuseFriendBtnTxtColOut,false);

	var vSelectedInvit = {
		myEmail 			: event.target.invitation.member.email,
		myPseudo			:	event.target.invitation.member.pseudo,
		myPhoto				: event.target.invitation.member.etatCivil.photo,
		friendEmail  	: event.target.invitation.dataToTransmit.friend.friendEmail,
		friendPseudo 	: event.target.invitation.dataToTransmit.friend.friendPseudo,
		friendPhoto 	: event.target.invitation.dataToTransmit.friend.friendPhoto,
		anchorTarget	: event.target.invitation.dataToTransmit.lineHTML.vA.id,			  // Envoyé au serveur pour qu'il retourne cette info à la procédure d'envoi des notification
		imgTarget			: event.target.invitation.dataToTransmit.lineHTML.vImg.id,			// Envoyé au serveur pour qu'il retourne cette info à la procédure d'envoi des notification
	}

	webSocketConnection.emit('acceptInvitation', vSelectedInvit);  
}

// --------------------------------------------------------------
// Affichage d'une Notification d'acceptation d'ami envoyée par 
// le serveur après les MAJ réussies de la BDD
// et ajout de son avatar dans ma liste d'amis
// --------------------------------------------------------------
MemberClient.prototype.displayNotifInvitationValided = function(pSelectedInvit, pFriendInfo, pDisplayNotifInvitationValidedData){
	document.getElementById(pSelectedInvit.imgTarget).setAttribute('title', 'Invitation acceptée');
	document.getElementById(pSelectedInvit.imgTarget).setAttribute('data-content', 'Vous êtes désormais ami avec '+pSelectedInvit.friendPseudo);

	$('#'+pSelectedInvit.imgTarget).popover('show')
	setTimeout(function(){
		$('#'+pSelectedInvit.imgTarget).popover('hide')
	},cstDelayClosingPopover);     																	// Fermeture temporisée de la PopOver

	setTimeout(() => {
		this.deleteLineInvitProcessed(pSelectedInvit, pDisplayNotifInvitationValidedData.modalMgrFriendListGroup)
	},cstDelayClosingPopover+500);																	// Supprime la ligne après un délai de quelques secondes

	this.addFriendIntoCard(pSelectedInvit, pFriendInfo);
};

// --------------------------------------------------------------
// Envoi d'un refus d'invitation pour devenir ami au serveur (Une seule demande par ami):
// Bascule la couleur de l'icône "Refus d'amis"
// --------------------------------------------------------------
MemberClient.prototype.refuseInvitation = function(event){
	// Bascule Look des boutons et de leur texte, puis désactive les boutons 
	event.target.invitation.dataToTransmit.lineHTML.vBtnDown.classList.replace('btn-outline-danger','btn-danger'); 
	event.target.invitation.dataToTransmit.lineHTML.vIFADown.classList.replace('text-dark','text-light'); 
	event.target.invitation.dataToTransmit.lineHTML.vBtnDown.classList.add('active'); 
	event.target.invitation.dataToTransmit.lineHTML.vBtnDown.classList.add('disabled'); 
	event.target.invitation.dataToTransmit.lineHTML.vBtnUp.classList.add('disabled'); 

	// Neutralise les events et force le curseur en mode par défaut pour ne pas réactiver des lignes d'invitations deja utilisées
	event.target.invitation.dataToTransmit.lineHTML.vA.classList.add('neutralPointer'); 

	// Suppression des Listeners
	event.target.invitation.dataToTransmit.lineHTML.vBtnUp.removeEventListener('click', this.acceptInvitation,false);
	event.target.invitation.dataToTransmit.lineHTML.vBtnDown.removeEventListener('click', this.refuseInvitation,false);
	event.target.invitation.dataToTransmit.lineHTML.vBtnUp.removeEventListener('mouseover', this.acceptFriendBtnTxtColOver,false);
	event.target.invitation.dataToTransmit.lineHTML.vBtnUp.removeEventListener('mouseout', this.acceptFriendBtnTxtColOut,false);
	event.target.invitation.dataToTransmit.lineHTML.vBtnDown.removeEventListener('mouseover', this.refuseFriendBtnTxtColOver,false);
	event.target.invitation.dataToTransmit.lineHTML.vBtnDown.removeEventListener('mouseout', this.refuseFriendBtnTxtColOut,false);

	var vSelectedInvit = {
		myEmail 			: event.target.invitation.member.email,
		myPseudo			:	event.target.invitation.member.pseudo,
		friendEmail  	: event.target.invitation.dataToTransmit.friend.friendEmail,
		friendPseudo 	: event.target.invitation.dataToTransmit.friend.friendPseudo,
		anchorTarget	: event.target.invitation.dataToTransmit.lineHTML.vA.id,			  // Envoyé au serveur pour qu'il retourne cette info à la procédure d'envoi des notification
		imgTarget	  	: event.target.invitation.dataToTransmit.lineHTML.vImg.id,			// Envoyé au serveur pour qu'il retourne cette info à la procédure d'envoi des notification
	}
	webSocketConnection.emit('refuseInvitation', vSelectedInvit);  
}

// --------------------------------------------------------------
// Affichage d'une Notification de refus d'ami envoyée par 
// le serveur après les MAJ réussies de la BDD
// --------------------------------------------------------------
MemberClient.prototype.displayNotifInvitationRefused = function(pSelectedInvit, pDisplayNotifInvitationRefusedData){   
	document.getElementById(pSelectedInvit.imgTarget).setAttribute('title', 'Invitation refusée');
	document.getElementById(pSelectedInvit.imgTarget).setAttribute('data-content', 'Vous avez décliné la demande d\'ami de '+pSelectedInvit.friendPseudo);

	$('#'+pSelectedInvit.imgTarget).popover('show')
	setTimeout(function(){
		$('#'+pSelectedInvit.imgTarget).popover('hide')
	},cstDelayClosingPopover);     // Fermeture temporisée de la PopOver

	setTimeout(() => {
		this.deleteLineInvitProcessed(pSelectedInvit, pDisplayNotifInvitationRefusedData.modalMgrFriendListGroup)
	},cstDelayClosingPopover+500);																		// Supprime la ligne après un délai de quelques secondes
};
	
// --------------------------------------------------------------
// Supprime la ligne à partir de laquelle on a validé ou refusé 
// une invitation.
// S'il n'y a plus de lignes, je ferme la modale
// --------------------------------------------------------------
MemberClient.prototype.deleteLineInvitProcessed = function(pSelectedInvit, pModalMgrFriendListGroup){
	var elem = document.getElementById(pSelectedInvit.anchorTarget);
	elem.parentNode.removeChild(elem);

	if (!pModalMgrFriendListGroup.firstChild) {	// S'il n'y a plus de lignes alors
		$('#idModalMgrFriend').modal('hide');     // Fermeture de la modale                                     
	}
}

// --------------------------------------------------------------
// Cette fonction alimente un objet avec des créations dans le DOM 
// des lignes HTML pour chaque membre pouvant devenir ami
// --------------------------------------------------------------
function AddPotentialFriendLines(item, index, pModalMgrFriendListGroup) {
	this.lineHTML = {						// Structure HTML générée pour chaque ligne de membre
		vA 				 : null,				// <a href="#" class="list-group-item list-group-item-action list-group-item-white">
		vDivRow 	 : null,				// <div class="row">
		vDivAvatar : null,				// <div class="col-4 containerAvatarToken py-1 text-center align-self-center">
		vImg 			 : null,				// <img id="idAvatarToken" class="avatarToken" alt="Membre" src="static/images/members/xxx.jpg">
		vDivPseudo : null,				// <div class="col-4 align-self-center font-size-120">xxx</div>
		vDivFA 		 : null,				// <div class="col-2 text-center align-self-center">
		vIFA 			 : null,				// <i class="fa fa-user-plus fa-2x text-dark"></i>
	};

	this.friend = item;
	this.index = index;

	// <a href="#" class="list-group-item list-group-item-action list-group-item-white">
	this.lineHTML.vA = window.document.createElement('a');
	pModalMgrFriendListGroup.appendChild(this.lineHTML.vA);
	this.lineHTML.vA.setAttribute('id', 'idAddFriendAnchor'+index);
	this.lineHTML.vA.setAttribute('href', '#');
	this.lineHTML.vA.setAttribute('class', 'list-group-item list-group-item-action list-group-item-white');
	
	// <div class="row">
	this.lineHTML.vDivRow = window.document.createElement('div');
	this.lineHTML.vA.appendChild(this.lineHTML.vDivRow);
	this.lineHTML.vDivRow.setAttribute('class', 'row');
	
	// <div class="col-3 containerAvatarToken py-1 text-center align-self-center">
	this.lineHTML.vDivAvatar = window.document.createElement('div');
	this.lineHTML.vDivRow.appendChild(this.lineHTML.vDivAvatar);
	this.lineHTML.vDivAvatar.setAttribute('class', 'col-3 containerAvatarToken py-1 text-center align-self-center');

	// <img id="idAvatarToken" class="avatarToken" alt="Membre" src="static/images/members/xxx.jpg">
	this.lineHTML.vImg = window.document.createElement('img');
	this.lineHTML.vDivAvatar.appendChild(this.lineHTML.vImg);
	this.lineHTML.vImg.setAttribute('class', 'avatarToken mx1');
	this.lineHTML.vImg.setAttribute('id', 'idAddFriendAvatarToken'+index);
	this.lineHTML.vImg.setAttribute('alt', 'Membre pouvant devenir ami');
	this.lineHTML.vImg.setAttribute('src', 'static/images/members/' + item.etatCivil.photo);
	this.lineHTML.vImg.setAttribute('title', 'Invitation envoyée');
	this.lineHTML.vImg.setAttribute('data-toggle', 'popover');
	this.lineHTML.vImg.setAttribute('data-placement', 'right');

	// <div class="col-6 align-self-center font-size-120">xxx</div>
	this.lineHTML.vDivPseudo = window.document.createElement('div');
	this.lineHTML.vDivRow.appendChild(this.lineHTML.vDivPseudo);
	this.lineHTML.vDivPseudo.setAttribute('class', 'col-6 align-self-center font-size-120');
	this.lineHTML.vDivPseudo.innerHTML = item.pseudo;
	
	// <div class="col-3 text-center align-self-center">
	this.lineHTML.vDivFA = window.document.createElement('div');
	this.lineHTML.vDivRow.appendChild(this.lineHTML.vDivFA);
	this.lineHTML.vDivFA.setAttribute('class', 'col-3 text-center align-self-center pl-0');

	// <button type="button" class="btn btn-outline-success btn-sm">
	this.lineHTML.vBtn = window.document.createElement('button');
	this.lineHTML.vDivFA.appendChild(this.lineHTML.vBtn);
	this.lineHTML.vBtn.setAttribute('type', 'button');
	this.lineHTML.vBtn.setAttribute('class', 'btn btn-outline-success btn-sm');

	// <i class="fa fa-user-plus fa-2x text-dark"></i>
	this.lineHTML.vIFA = window.document.createElement('i');
	this.lineHTML.vBtn.appendChild(this.lineHTML.vIFA);
	this.lineHTML.vIFA.setAttribute('class', 'fa fa-user-plus fa-2x text-dark');
}

// --------------------------------------------------------------
// On a reçu une liste de membres pouvant devenir amis
// Ajout dynamique des membres dans le DOM sur la modale
// de sélection des membres pour devenir amis
// --------------------------------------------------------------
MemberClient.prototype.displayPotentialFriends = function(pMembersFriendables, pDisplayPotentialfriendData){   

	// Préparation et ouverture de la fenêtre modale de sélection des membres pouvant devenir amis
	this.InitHeaderColor('bg-warning', pDisplayPotentialfriendData.modalMgrFriendHeader);
	$('#idModalMgrFriend').modal('show');     // Ouverture de la modale                                     

	var lineHTML = {						// Structure HTML générée pour le titre et la ligne de présentation de la fenêtre
		vH5        : null,				// <h5 class="modal-title"><i class="fa fa-fw fa-user-plus"></i> Ajout d'amis</h5>
		vH6 	     : null,				// <h6 class="text-center">Sélectionnez les membres avec qui vous souhaitez devenir ami</h6>
	}

	// <h5 class="modal-title"><i class="fa fa-fw fa-user-plus"></i> Ajout d'amis</h5>
	lineHTML.vH5 = window.document.createElement('h5');
	var parentDiv1 = pDisplayPotentialfriendData.modalMgrFriendExitBtn.parentNode;
	parentDiv1.insertBefore(lineHTML.vH5, pDisplayPotentialfriendData.modalMgrFriendExitBtn);
	lineHTML.vH5.setAttribute('class', 'modal-title');
	lineHTML.vH5.innerHTML = '<i class="fa fa-fw fa-user-plus"></i>'+' Ajout d\'amis';
	
	// <h6 class="text-center">Sélectionnez les membres avec qui vous souhaitez devenir ami</h6>
	lineHTML.vH6 = window.document.createElement('h6');
	var parentDiv2 = pDisplayPotentialfriendData.modalMgrFriendListGroup.parentNode;
	parentDiv2.insertBefore(lineHTML.vH6, pDisplayPotentialfriendData.modalMgrFriendListGroup);
	lineHTML.vH6.setAttribute('class', 'text-center');
	lineHTML.vH6.innerHTML = 'Sélectionnez les membres avec qui vous souhaitez devenir ami';

		// Création dynamique des lignes HTML et création des EventListener pour activer les opération de demande d'ami
	var vMembersFriendables = [];

	pMembersFriendables.forEach((item, index) => {
		vMembersFriendables.push(new AddPotentialFriendLines(item, index, pDisplayPotentialfriendData.modalMgrFriendListGroup));	// Ajoute les éléments d'une ligne vide dans le tableau des éléments

		var vDataToTransmit = {
			member					: this.member,
			dataToTransmit  : vMembersFriendables[index],
		}

		vMembersFriendables[index].lineHTML.vIFA.addEventListener('click', this.sendInvitation,false);
		vMembersFriendables[index].lineHTML.vIFA.invitation = vDataToTransmit;

		vMembersFriendables[index].lineHTML.vBtn.addEventListener('mouseover', this.addFriendModalChgBtnTextColorOver,false);
		vMembersFriendables[index].lineHTML.vBtn.invitation = vDataToTransmit;

		vMembersFriendables[index].lineHTML.vBtn.addEventListener('mouseout', this.addFriendModalChgBtnTextColorOut,false);
		vMembersFriendables[index].lineHTML.vBtn.invitation = vDataToTransmit;
	});
};

// --------------------------------------------------------------
// Envoi d'une invitation pour devenir ami (Une seule demande par ami):
// Bascule la couleur de l'icône "Ajout d'amis"
// Si le receveur est connecté, son nombre d'invitations evoluera en temps réel
// --------------------------------------------------------------
MemberClient.prototype.sendInvitation = function(event){
	// Bascule Look des boutons et de leur texte, puis désactive les boutons 
	event.target.invitation.dataToTransmit.lineHTML.vBtn.classList.replace('btn-outline-success','btn-success'); 
	event.target.invitation.dataToTransmit.lineHTML.vIFA.classList.replace('text-dark','text-light'); 
	event.target.invitation.dataToTransmit.lineHTML.vBtn.classList.add('active'); 
	event.target.invitation.dataToTransmit.lineHTML.vBtn.classList.add('disabled'); 

	// Neutralise les events et force le curseur en mode par défaut pour ne pas réactiver des lignes d'invitations deja utilisées
	event.target.invitation.dataToTransmit.lineHTML.vA.classList.add('neutralPointer'); 

	// Suppression des Listeners
	event.target.invitation.dataToTransmit.lineHTML.vIFA.removeEventListener('click', this.sendInvitation,false);
	event.target.invitation.dataToTransmit.lineHTML.vBtn.removeEventListener('mouseover', this.addFriendModalChgBtnTextColorOver,false);
	event.target.invitation.dataToTransmit.lineHTML.vBtn.removeEventListener('mouseout', this.addFriendModalChgBtnTextColorOut,false);

	var vFriendToAdd = {
		myEmail 			: event.target.invitation.member.email,
		myPseudo			:	event.target.invitation.member.pseudo,																						// Moi
		myPhoto				: event.target.invitation.member.etatCivil.photo,
		friendEmail  	: event.target.invitation.dataToTransmit.friend.email,
		friendPseudo 	: event.target.invitation.dataToTransmit.friend.pseudo,					// Ami que j'invite
		friendPhoto  	: event.target.invitation.dataToTransmit.friend.etatCivil.photo,
		anchorTarget	: event.target.invitation.dataToTransmit.lineHTML.vA.id,			  // Envoyé au serveur pour qu'il retourne cette info à la procédure d'envoi des notification
		imgTarget			: event.target.invitation.dataToTransmit.lineHTML.vImg.id,			// Envoyé au serveur pour qu'il retourne cette info à la procédure d'envoi des notification
	}
	webSocketConnection.emit('invitationSent', vFriendToAdd);  
}

// --------------------------------------------------------------
// Supprime la ligne à partir de laquelle on a envoyé une invitation
// S'il n'y a plus de lignes, je ferme la modale
// --------------------------------------------------------------
MemberClient.prototype.deleteLine = function(pFriendToAdd, pModalMgrFriendListGroup){
	var elem = document.getElementById(pFriendToAdd.anchorTarget);
	elem.parentNode.removeChild(elem);

	if (!pModalMgrFriendListGroup.firstChild) {	// S'il n'y a plus de lignes alors
		$('#idModalMgrFriend').modal('hide');     // Fermeture de la modale                                     
	}
}

// --------------------------------------------------------------
// Affichage d'une Notification d'envoi d'invitation envoyée par 
// le serveur après les MAJ réussies de la BDD et l'envoi du mail
// --------------------------------------------------------------
MemberClient.prototype.displayNotifInvitationSent = function(pFriendToAdd, pDisplayNotifInvitationSentData){   
	document.getElementById(pFriendToAdd.imgTarget).setAttribute('data-content', 'Vous avez demandé à être ami avec '+pFriendToAdd.friendPseudo);

	$('#'+pFriendToAdd.imgTarget).popover('show');										// Affiche la notification d'envoi de la demande d'ami
	setTimeout(function(){
		$('#'+pFriendToAdd.imgTarget).popover('hide');
	},cstDelayClosingPopover);																				// Ferme la notif après un délai de quelques secondes

	setTimeout(() => {
		this.deleteLine(pFriendToAdd, pDisplayNotifInvitationSentData.modalMgrFriendListGroup)
	},cstDelayClosingPopover + 500);																		// Supprime la ligne après un délai de quelques secondes
};

// --------------------------------------------------------------
// Change la classe (de couleur BS) lors du survol des boutons, 
// en blanc
// --------------------------------------------------------------
MemberClient.prototype.addFriendModalChgBtnTextColorOver = function(event){
	event.target.invitation.dataToTransmit.lineHTML.vIFA.classList.replace('text-dark','text-light'); 
}
	
// --------------------------------------------------------------
// Change la classe (de couleur BS) lorsque la souris quitte le 
// boutons, en noir
// --------------------------------------------------------------
MemberClient.prototype.addFriendModalChgBtnTextColorOut = function(event){
	event.target.invitation.dataToTransmit.lineHTML.vIFA.classList.replace('text-light','text-dark'); 
}
	
// --------------------------------------------------------------
// Change la classe (de couleur BS) lorsque la souris quitte le 
// boutons, en blanc
// --------------------------------------------------------------
MemberClient.prototype.acceptFriendBtnTxtColOver = function(event){
	event.target.invitation.dataToTransmit.lineHTML.vIFAUp.classList.replace('text-dark','text-light'); 
}

// --------------------------------------------------------------
// Change la classe (de couleur BS) lorsque la souris quitte le 
// boutons, en noir
// --------------------------------------------------------------
MemberClient.prototype.acceptFriendBtnTxtColOut = function(event){
	event.target.invitation.dataToTransmit.lineHTML.vIFAUp.classList.replace('text-light','text-dark'); 
}

// --------------------------------------------------------------
// Change la classe (de couleur BS) lorsque la souris quitte le 
// boutons, en blanc
// --------------------------------------------------------------
MemberClient.prototype.refuseFriendBtnTxtColOver = function(event){
	event.target.invitation.dataToTransmit.lineHTML.vIFADown.classList.replace('text-dark','text-light'); 
}

// --------------------------------------------------------------
// Change la classe (de couleur BS) lorsque la souris quitte le 
// boutons, en noir
// --------------------------------------------------------------
MemberClient.prototype.refuseFriendBtnTxtColOut = function(event){
	event.target.invitation.dataToTransmit.lineHTML.vIFADown.classList.replace('text-light','text-dark'); 
}

// --------------------------------------------------------------------------------------------------------------
// -------------------------- Fin du module ---------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------