// -------------------------------------------------------------------------
// Stockage de mes amis confirmés, au cas où j'aurais besoin ultérieurement 
// d'y accéder pour travailler dessus (Modifier, supprimer, ajouter, etc...)
// -------------------------------------------------------------------------

function MemberClient(){   							// Fonction constructeur exportée
	this.newPasswordKO 					= false;	// Flag témoin de Nouveau mot de passe valide (True = KO, False = OK)
	this.vMyFriendList					= [];			// Ma liste d'amis
	this.vMyInvitSentList 			= [];			// Ma liste d'invitations envoyées
	this.vInvitSentCardVisible 	= false;	// Indicateur de visibilité de la carte des invitations en attente

	this.member =                 // Structure de stockage provisoire du membre
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
	pModalBodyText.innerHTML += '<p>De plus, vous pourrez laisser vos avis sur des sujets particuliers, accéder à la galerie pour admirer les collections ou y déposer vos propres photos, accéder aux trucs et astuces de modéliste, y déposer vos expériences, et enfin poser vos questions à la Communauté.</p>';
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
	pModalBodyText.innerHTML += '<br /><p>Vous n\'avez aucune demande d\'ami en cours </p>';
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
MemberClient.prototype.setMemberContext = function(pContextInfo, pAvatarInfo, pAskingMembers){
	pContextInfo.vConnexion.style.display = 'none';         			// Désactivation du bouton 'Connexion'
	pContextInfo.vCreation.style.display = 'none';          			// Désactivation du bouton 'Creation de compte'
	pContextInfo.vDropDownProfilMenu.style.display = 'block';			// Affiche le sous-menu dans la NavBar d'entête spécifique au membre connecté
	
	// Affiche le nom et la photo du membre dans la NavBar d'entête
	pAvatarInfo.vImgAvatarDropDownMenu.setAttribute('src', 'static/images/members/'+this.member.etatCivil.photo);
	pAvatarInfo.vSpanAvatarDropDownMenu.innerHTML = this.member.pseudo;		

	pContextInfo.vDeconnexion.classList.remove('disabled');									// Active l'option "Deconnexion" du menu d'entête
	pContextInfo.vProfileNavBar.style.display = 'block';										// Affichage du menu du profil (sous l'Avatar)
	this.displayPuceNbrWaitingInvit(pContextInfo, pAskingMembers.length);		// S'il y a des invitations en attente ==> Affichage de la puce avec le Nbre d'invitations
	pContextInfo.vPad.style.display = 'none';																// Masquage de la "div" de padding du profil
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
// Cette fonction affiche la page de profil complète :
// - Le contexte du membre (Menus, compteurs, etc)
// - L'avatar
// - La page de profil :
// 		- La carte de "Présentation"
// 		- La carte des "Amis"
// 		- La carte des invitations lancées (seulement s'il y en a)
// -----------------------------------------------------------------------------
MemberClient.prototype.displayProfilePage = function(pContextInfo, pAvatarInfo, pAskingMembers){
	this.setMemberContext(pContextInfo, pAvatarInfo, pAskingMembers);  			//  Active le contexte du membre (NavBar d'entête, options de menu, etc)
	document.getElementById('idMainProfilePage').classList.replace('d-none','d-block');	// Affichage du bloc du profil complet (Fiche d'identité, conversations, liste d'amis...)
	vPresentationCardMain.displayPresentationCard();														// - Affiche les informations du profil dans la carte "Présentation"
	this.displayAvatar(pAvatarInfo);																				// - Affiche la photo de l'avatar et son nom sur le carroussel et la carte "Présentation"
	vFriendsCard.displayFriendsCard();																			// - Affiche les amis dans la carte "Amis"
	vInvitationsCard.displayInvitSentCard();																// - Affiche les invitations lancées dans la carte "Invitation lancéesé"
	vPostsClientSideMain.displayPosts();																		// - Affiche les Posts appartenant au membre
}

// -----------------------------------------------------------------------------
// Cette fonction affiche l'avatar et son pseudo sur la page de profil
// -----------------------------------------------------------------------------
MemberClient.prototype.displayAvatar = function(pAvatarInfo){
	pAvatarInfo.vImgAvatarDropDownMenu.setAttribute('src', 'static/images/members/'+this.member.etatCivil.photo);  	// Avatar  sur barre de menu du haut
	pAvatarInfo.vAvatarImg1.setAttribute('src', 'static/images/members/'+this.member.etatCivil.photo);							// Avatar principal du Profil
	pAvatarInfo.vAvatarMemberNameImg1.innerHTML = this.member.pseudo;
}

// -----------------------------------------------------------------------------
// Cette fonction affiche si besoin est, une puce avec le Nbre d'invitations en attente
// -----------------------------------------------------------------------------
MemberClient.prototype.displayPuceNbrWaitingInvit = function(pContextInfo, pNbrWaitingInvit){
	if (pNbrWaitingInvit > 0){																				// S'il y a des invitations en attente ==> Affichage de la puce avec le Nbre d'invitations
		pContextInfo.vNbrWaitingInvit.style.visibility = 'visible';			// Affiche la puce
		pContextInfo.vNbrWaitingInvit.innerHTML = pNbrWaitingInvit;			// Affiche le Nbre d'invitations
	} else {
		pContextInfo.vNbrWaitingInvit.style.visibility = 'hidden';			// Cache la puce si Invitation = 0
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
	
	var vModalHeaderColorParams = 
	{
		activeColor : 'bg-warning',
		modalHeader : pSignInParameters.vModalSignInHeader,
	}
	new InitHeaderColor().initHeaderColor(vModalHeaderColorParams);
}

// --------------------------------------------------------------
// Change la classe (de couleur BS4) lorsque la souris passe sur le 
// boutons, en blanc
// --------------------------------------------------------------
MemberClient.prototype.changeBtnTxtColOver = function(event){
	document.getElementById(event.target.datas.actionBtn).classList.replace('text-dark','text-light');
}

// --------------------------------------------------------------
// Change la classe (de couleur BS4) lorsque la souris quitte le 
// boutons, en noir
// --------------------------------------------------------------
MemberClient.prototype.changeBtnTxtColOut = function(event){
	document.getElementById(event.target.datas.actionBtn).classList.replace('text-light','text-dark');	
}

// --------------------------------------------------------------------------------------------------------------
// -------------------------- Fin du module ---------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------