// *************************************************************************
// *** MemberServer : Objet représentant les visiteurs et membres        ***
// ***                                                                   ***
// *** Objet : MemberServer                                              ***
// ***                                                                   ***
// *** Cet objet sert à gérer :                                          ***
// ***   - Le filtrage des candidats qui aspirent à jouer                ***
// ***   - La structure principale des données d'échange avec les clients***
// ***                                                                   ***
// ***  Nécessite :                                                      ***
// ***      Le module "dbMgr"                                            ***
// ***      Une variable pour son instanciation                          ***
// ***                                                                   ***
// *************************************************************************
// -------------------------------------------------------------------------

const DBMgr = require('./dbMgr');
let vDBMgr = new DBMgr();       // Instanciation de l'objet descrivant l'ensemble des joueurs et les méthodes de gestion de ces joueurs

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const cstSuperAdmin = 1;  // Statut du Super-Admin - Il n'y a qu'un seul SuperAdmin. il est créé lors de l'enregistrement du 1er membre - lui seul peut créer les autres Admin
const cstAdmin = 2;       // Statut définissant les Admin standards (Qui peuvent accéder à la console d'administration (avec le SuperAdmin))
const cstMembre = 4;      // Membre standard qui ne peut qu'utiliser la partie publique de l'application 
const cstMailFrom = 'collector@vcp.com';    // Adresse "From" du mail
const constFirstCharString = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'    // Caractères autorisés pour le 1er caractère du PWD
const constNextCharString = constFirstCharString+'&#$*_-'                                         // Caractères autorisés pour les 11 autres caractères du PWD
const cstLostPWD = 0;     // Constante qui désigne que le Chjt de MDP (PWD) a été provoqué par une déclaration de MDP perdu
const cstChangedPWD = 1;  // Constante qui désigne que le Chjt de MDP (PWD) a été provoqué par le mebre dans sa fiche de renseignement
const cstAmiConfirme  = 0; 				// Statut pour un ami confirmé
const cstInvitEncours = 1;				// Invitation pour devenir ami lancée							(Ajouté à la liste du membre demandeur)
const cstAttenteConfirm = 2; 			// Attente d'acceptation d'une invitation lancée	(Ajouté à la liste du membre receveur)

module.exports = function MemberServer(){ // Fonction constructeur exportée
	this.newPassword;                       // Variable de stockage provisoire du nouveau mot de passe créé
	this.nbrPublicMsgs;                     // Nbre de messages publics

	this.objectPopulation =  
	{
		members             : 								// Tableau de toutes les connexions ( Visiteurs dont [Membres + Admin])
		[{
				idSocket        : 0,							// N° de socket "WebSocketConnection.id"
				isMember        : false,					// Permet de savoir si la personne connectée est un visiteurr ou un membre
				email           : '',
				pseudo          : '',
				nbrWaitingInvit : 0
		}],   
		nbrConnections      : 0,    // Nbre de connexions actives sans préjuger de leur rôle
		nbrMembersInSession : 0,    // Nbre de membres connectés (Membres + Admin)
		nbrAdminsInSessions : 0,    // Nombre d'Admins connectés
	}

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

	this.ami = {
		friendPseudo         : '',
		pendingFriendRequest : null,	// 0 --> Statut confirmé (Demander et receveur)		// 1 --> Invitation en cours  (demandeur)		// 2 --> En attente confirmation (receveur)
		friendEmail		  		 : '',
		friendPhoto					 : '',
	}


	// --------------------------------------------------------------
	// Fonction retournant un entien aléatoire entre une valeur 
	// inférieure (pas nécessairement zéro), et une valeur supérieure
	// --------------------------------------------------------------
	MemberServer.prototype.random = function(pValInf, pValSup){
		return Math.round(((pValSup - pValInf) * Math.random()) + pValInf);
	}
	// ---------------------------------------------------------------------------------------------------------------------------
	// Cette fonction recherche dans la table des membres, celui qui a la propriété passée en parametre
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.searchMemberInTableOfMembers = (pProperty, pValue) => {
		return this.objectPopulation.members.map((propertyFilter) => {
			return propertyFilter[pProperty];
		})
		.indexOf(pValue);
	}
	// ---------------------------------------------------------------------------------------------------------------------------
	// Cette fonction recherche dans le tableau des amis d'un membre, si un record "friendPseudo" non vide existe
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.searchPendingFriendRequest = (pItem, pProperty, pMyPseudo) => {
		return pItem.amis.map((propertyFilter) => {
			return propertyFilter[pProperty];
		})
		.indexOf(pMyPseudo);
	}
	// ---------------------------------------------------------------------------------------------------------------------------
	// Vérification des données du visiteur (Pseudo + MDP) :
	// On cherche la combinaison Pseudo et MDP
	// - Si la combinaison n'existe pas --> Rejet de la demande Login ('retryLoginForm')
	// - Par contre, si elle existe, il s'agit d'un membre et on demande au client de désactiver l'icône de Login et d'activer 
	// l'icône de déconnexion ('welcomeMember')
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.visitorBecomeMemberPromise = (pVisiteurLoginData, pWebSocketConnection, pSocketIo) => {
		return new Promise((resolve, reject) => {
			vDBMgr.collectionMembers.find(
				{ 
						'pseudo': pVisiteurLoginData.pseudo, 
						'password': pVisiteurLoginData.password, 
				})
			.limit(1)
			.toArray((error, documents) => {
				if (error) {
					reject(error);
					console.log('Erreur de lecture dans la collection \'membres\' : ',error);   // Si erreur technique... Message et Plantage
					throw error;
				}

				if (!documents.length){  // Le login n'a pas été trouvé dans la BDD et est donc erroné --> la tentative de connexion est refusée
					pWebSocketConnection.emit('retryLoginForm');   
					return resolve('Login Erroné');
				} 

				this.member = documents[0];                              // Récupération des infos du membre dans l'objet de stockage provisoire
				this.member.oldPassword = '';                            // RAZ de l'ancien MDP avant envoi au client

				// Recherche du pseudo du membre dans le tableau des membres car je ne veux pas qu'un membre se connecte plusieurs fois sur des sessions différentes
				let myIndex = this.searchMemberInTableOfMembers('pseudo', this.member.pseudo);
				if (myIndex !== -1){                                   // Si membre trouvé dans la table des membres connectés, on le rejette, sinon, on le connecte
					resolve('Membre dejà loggé');
					return pWebSocketConnection.emit('memberAlreadyConnected',this.member);     
				}

				myIndex = this.searchMemberInTableOfMembers('idSocket', pWebSocketConnection.id);  // Recherche du visiteur par son socket dans le tableau des membres
				
				this.objectPopulation.members[myIndex].email  = this.member.email;
				this.objectPopulation.members[myIndex].pseudo = this.member.pseudo;

				// On constitue une liste des membres ayant envoyé une invitation au membre qui viient de se connecter
				// Parmi tous mes amis, filtrage de ceux qui sont en attente d'une confirmation de ma part (Pour alimenter la puce du Nbre d'invitations)
				let vAskingMembers = this.member.amis.filter(this.filterWaitingInvit); 
				this.objectPopulation.members[myIndex].nbrWaitingInvit = vAskingMembers.length;	// On récupère le Nbre d'invitations en attente

				this.addMemberToActiveMembers(myIndex, pSocketIo);                         // Le visiteur est bien un membre, on l'ajoute à la liste des membres

				let dataToTransmit = {
					member : this.member,
					welcomeMessage : 'Hello',
					askingMembers : vAskingMembers,
				}

				pWebSocketConnection.emit('welcomeMember',dataToTransmit);                    // On transmet au client les données du membre 
				resolve('Membre loggé');
			});
		});
	};
	// ---------------------------------------------------------------------------------------------------------------------------
	// Point d'appel pour la fonction de Login en mode 'async / await'
	// Vérification des données du visiteur (Pseudo + MDP) :
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.visitorBecomeMember = async (pVisiteurLoginData, pWebSocketConnection, pSocketIo) => {
		var result = await (this.visitorBecomeMemberPromise(pVisiteurLoginData, pWebSocketConnection, pSocketIo));
		return result;
	};
	// ---------------------------------------------------------------------------------------------------------------------------
	// Création d'un PWD de 12 caractères, respectant le masque de saisie du PWD
	// - envoi de celui par mail
	// - Par contre, s'il existe, on génère un PWD aléatoire et on le transmet par mail ('sendNewPWD')
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.buildAndSendNewPWD = function(){
		this.newPassword = constFirstCharString[this.random(0, 61)];
		for (let i=1; i<=11; i++){
			this.newPassword += constNextCharString[this.random(0, 67)];
		}

		this.sendEMail(
			this.member.email, 
			'Votre demande de renouvellement de mot de passe', 
			'<h1 style="color: black;">Votre nouveau mot de passe ...</h1><p><h2>Voici vos nouveaux identifiants :</h2><br />' +
			'Vos identifiants sont : <p><Strong>Pseudonyme : </strong>'+this.member.pseudo+'<p><strong>Mot de passe : </strong>'+this.newPassword +
			'</p><br /><br /><br /><i>Vil-Coyote Products</i>'
		);
	}
	// ---------------------------------------------------------------------------------------------------------------------------
	// MAJ de la BDD aavec les données envoyées "pDataSet"
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.updateDataInBDD = function(pDataSet){
		vDBMgr.collectionMembers.updateOne(
		{ 
			'email': pDataSet.email, 
		},
		{
			$set:  pDataSet
		}, (error) => {
			if (error) {
					console.log('Erreur de MAJ dans la collection \'membres\' : ',error);   // Si erreur technique... Message et Plantage
					throw error;
			};
		});
	}
	// ---------------------------------------------------------------------------------------------------------------------------
	// Vérification que l'email fourni pour la récupération du PWD existe :
	// - Si le mail n'existe pas --> Rejet de la demande de récupération du PWD ('retryLostPWDForm')
	// - Par contre, s'il existe, on génère un PWD aléatoire et on le transmet par mail ('sendNewPWD')
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.checkLostPWDMailIsValid = function(pLostPWDEmail, pWebSocketConnection){
		vDBMgr.collectionMembers.find(
		{ 
			'email': pLostPWDEmail, 
		}).toArray((error, documents) => {
			if (error) {
				console.log('Erreur de lecture dans la collection \'membres\' : ',error);   // Si erreur technique... Message et Plantage
				throw error
			} 
			
			if (!documents.length){                                                         // Si mail non trouvé dans la BDD, on resoumet le formulaire
				return pWebSocketConnection.emit('retryLostPWDForm'); 
			} 

			// La mail est valide, récupération des infos nécessaires et suffisantes pour renvoyer le nouveau MDP
			this.member.email = documents[0].email;                                     // Récupération des infos nécessaires et suffisantes pour renvoyer le nouveau MDP
			this.member.pseudo = documents[0].pseudo;                                        
			this.member.password = documents[0].password;                                        

			this.buildAndSendNewPWD();

			let myDataSet = 
			{   
				email       : this.member.email,
				oldPassword : this.member.password,
				password    : this.newPassword,
			}
			this.updatePasswordChange(myDataSet, cstLostPWD, pWebSocketConnection);
		});
	}

	// ---------------------------------------------------------------------------------------------------------------------------
	// En cas de chgt de MDP, MAJ la BDD avec les nouveaux et anciens MDP, et envoie un mail de notification
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.updatePasswordChange = function(pDataSet, pTypeChgtPWD, pWebSocketConnection){
		this.updateDataInBDD(pDataSet);
		pWebSocketConnection.emit('notifyNewPWDSent', pTypeChgtPWD); 
	}
	// ---------------------------------------------------------------------------------------------------------------------------
	// Prépare les données de population et les envoie à tous clients connectés
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.UpdateDisplayPopulation = function(pSocketIo){
		population = {
			nbrVisitors    : this.objectPopulation.nbrConnections,
			nbrMembers     : this.objectPopulation.nbrMembersInSession,
			nbrAdmins      : this.objectPopulation.nbrAdminsInSessions,
			nbrPublicMsgs  : this.nbrPublicMsgs,
		}

		pSocketIo.emit('displayNbrConnectedMembers', population); // Affichage sur tous les clients de la MAJ du nombre de membres connectés
	}
	// ---------------------------------------------------------------------------------------------------------------------------
	// Ajoute le membre nouvellement créé ou Loggé avec succès à la liste des membres connectés
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.addMemberToActiveMembers = function(pIndex, pSocketIo){
		this.objectPopulation.members[pIndex].isMember  = true;
		this.objectPopulation.nbrMembersInSession++;  // On ajoute +1 aux nombre de membres connectés le membre qu'on vient de lire pour cette connexion dans un objet qui les recense
		
		if (this.objectPopulation.members[pIndex].role < cstMembre){    // Il s'agit obligatoirement d'un Admin ou Super-Admin
			this.objectPopulation.nbrAdminsInSessions++;  // On ajoute +1 aux nombre de membres connectés le membre qu'on vient de lire pour cette connexion dans un objet qui les recense
		}   

		this.UpdateDisplayPopulation(pSocketIo);
	}
	// ---------------------------------------------------------------------------------------------------------------------------
	// Envoi de mail générique en format HTML
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.sendEMail = function(pEMail, pSubject, pHTML){
		let messageToSend = {
			to       : pEMail,
			from     : cstMailFrom,
			subject  : pSubject,
			// text  : 'Félicitations\n\nVous êtes dorénavant membre de la Communauté \'Collect\'Or\'',
			html     : pHTML,
		}
		sgMail.send(messageToSend);
	}
	// ---------------------------------------------------------------------------------------------------------------------------
	// Création de l'enregistrement technique avec le Nbre de messages initialisé à 0
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.createTechnicalRecord = function(){
		let technicalRecord = {
			nbrPublicMsgs : 0,                                       
		}

		vDBMgr.collectionTechnical.insertOne(technicalRecord, (error) => {
			if (error){
				console.log('Erreur d\'insertion dans la collection \'Technical\' : ',technicalRecord);   // Si erreur technique... Message et Plantage
				throw error;
			} 

			console.log('add Technical Record In Database - 1 membre inséré : ',technicalRecord);  
		});       
	}
	// ---------------------------------------------------------------------------------------------------------------------------
	// Ajout des données du visiteur (futur membre) (Email, Pseudo, MDP, timestamp (au format brut), et statut dans la BDD)
	// ATTENTION !!!!
	// S'il n'y aucun membre dans la BDD, le Premier membre qui est créé est le Super-Administrateur
	// 
	// Codification des privilèges
	// 1 --> SuperAdmin
	// 2 --> Admin
	// 4 --> Membre
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.addMemberInDatabase = function(pMember, pWebSocketConnection, pSocketIo){
		var myRole;

		vDBMgr.collectionMembers.countDocuments((error, count) => {        // On compte le nombre de membres dans la base pour savoir si le nouveau membre sera le SuperAdmin
			if (error){
					console.log('Erreur de comptage dans la collection \'membres\' : ',error);   // Si erreur technique... Message et Plantage
					throw error;
			} 
			
			if (count === 0 ){
				this.createTechnicalRecord();   // Si c'est le 1er membre qui s'enregistre, création de l'enregistrement technique avec le Nbre de messages initialisé à 0
				myRole = cstSuperAdmin;         // Si c'est le 1er membre qui s'enregistre, c'est forcément le SuperAdmin ==> Creation du membre avec ce statut
			} else {    
				myRole = cstMembre;           
			}

			let myLocalDate = new Date();
			myLocalDate += myLocalDate.getTimezoneOffset(); // Timestamp de la création du record en tenant compte du décalage horaire

			let memberLocal = 
			{
				email           : pMember.email,                                       
				pseudo          : pMember.pseudo,
				password        : pMember.password,
				oldPassword     : '',
				role            : myRole,         
				presentation    : '',       // Texte de présentation du membre
				etatCivil : 
				{
					photo          : 'default-avatar-inconnu.png',    // Photo
					firstName      : '',    // Prénom
					name           : '',    // Nom
					birthDate      : '',    // Date de naissance
					sex            : 0,     // 0 = Non divulgué, 1 --> Masculin, 2 --> Féminin
					address : 
					{
						street     : '',    // N° et voie
						city       : '',    // Ville
						zipCode    : '',    // Code Postal
						department : 'Non renseigné',    // Département
						departmentName : 'Non renseigné', // N° et nom du département
					},
				},
				preferences :
				{
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
				dateCreation    : myLocalDate,         // Timestamp de la création du record en tenant compte du décalage horaire
			}

			vDBMgr.collectionMembers.insertOne(memberLocal, (error) => {
				if (error){
					console.log('Erreur d\'insertion dans la collection \'membres\' : ',memberLocal);   // Si erreur technique... Message et Plantage
					throw error;
				} 

				// L'ajout d'enregistrement a reussi
				this.member = memberLocal;
				console.log('add Member In Database - 1 membre inséré : ',this.member);  
				
				let myIndex = this.searchMemberInTableOfMembers('idSocket', pWebSocketConnection.id);  
				
				this.sendEMail(
					pMember.email, 
					'Votre inscription à Collect\'Or', 
					'<h1 style="color: black;">Félicitations '+pMember.pseudo+'</h1><p><h2>Vous êtes dorénavant membre de la Communauté \'Collect\'Or\'.</h2><br />' +
					'Vos identifiants sont : <p><Strong>Pseudonyme : </strong>'+pMember.pseudo+'<p><strong>Mot de passe : </strong>'+pMember.password +
					'</p><br /><br /><br /><i>Vil-Coyote Products</i>'
				);

				this.objectPopulation.members[myIndex].nbrWaitingInvit = 0;						// Comme le membre vient d'être créé, il n'a pas encore d'invitations
				this.addMemberToActiveMembers(myIndex, pSocketIo);										// On ajoute le membre nouvellement créé dans la table des membres actifs

				let dataToTransmit = {
					member : this.member,
					welcomeMessage : 'Congrat',
					askingMembers : [],
				}

				pWebSocketConnection.emit('welcomeMember',dataToTransmit);                    // On transmet au client les données du membre 
			});
		});
	}
	// ---------------------------------------------------------------------------------------------------------------------------
	// Vérification des données de Sign-in du visiteur  :
	// 1) Vérification de la non-préexistence de l'Email
	// 2) Vérification de la non-préexistence du Pseudo
	// Si ces 2 conditions sont vérifiées, on ajoute le visiteur à 
	// la BDD et il devient membre
	// - Sinon, on le rejette 
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.checkVisitorSignInISValid = function(pVisiteurSignInData, pWebSocketConnection, pSocketIo){
		vDBMgr.collectionMembers.find(                                                   // Vérification de non-pré-existence du mail
		{ 
			'email': pVisiteurSignInData.email, 
		})
		.limit(1)
		.toArray((error, documents) => {
			if (error){
				console.log('Erreur de lecture dans la collection \'membres\' : ',error);   // Si erreur technique... Message et Plantage
				throw error;
			} 

			// Si mail trouvé --> KO pour la création de nouveau membre
			if (documents.length){                            
				return pWebSocketConnection.emit('retrySignInForm'); 
			}

			// Le mail n a pas été trouvé, on vérifie maintenant la non-existence du Pseudo
			vDBMgr.collectionMembers.find(                  
			{ 
					'pseudo': pVisiteurSignInData.pseudo, 
			})
			.limit(1)
			.toArray((error, documents) => {
				if (error){
					console.log('Erreur de lecture dans la collection \'membres\' : ',error);   // Si erreur technique... Message et Plantage
					throw error;                                                          
				} 
				
				// Si pseudo trouvé --> KO pour la création de nouveau membre
				if (documents.length){                     
					return pWebSocketConnection.emit('retrySignInForm');                        
				} 

				// Si mail + pseudo non trouvé --> On valide l'inscription en créant le membre
				this.addMemberInDatabase(pVisiteurSignInData, pWebSocketConnection, pSocketIo);         
			});
		});
	}

	// ---------------------------------------------------------------------------------------------------------------------------
	// Filtrage de tous les membres de la BDD, selon les critères suivants
	// - Je ne peux pas être mon propre ami --> Rejet
	// - Les membres dejà amis --> Rejet
	// - Les membres ayant reçu une invitation (invitation en cours = "Ami" non confirmé) --> Rejet
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.filterMembersToBeFriends = function(pMyPseudo, pItem){
		var result = true;

		if (pItem.pseudo === pMyPseudo){  // Si le membre est moi-même, je ne vais pas m'afficher dans la liste des membres potentiellement futurs amis --> Rejet du membre
			result = false;
		} else {
			let myIndex = this.searchPendingFriendRequest(pItem, 'friendPseudo', pMyPseudo);	// Vérifie que le membre n'est pas dans la liste d'amis (potentiels ou confirmés)

			if (myIndex > -1){		// Si je suis dejà un ami potentiel ou confirmé du membre en cours de lecture, je rejete le membre de la liste d'amis potentiel
				result = false;
			}
		}
		return result ? pItem : undefined;
	};

	// ---------------------------------------------------------------------------------------------------------------------------
	// Filtrage de tous les membres de la BDD, selon les critères suivants
	// - Je ne peux pas être mon propre ami --> Rejet
	// - Les membres dejà amis --> Rejet
	// - Les membres ayant reçu une invitation (invitation en cours = "Ami" non confirmé) --> Rejet
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.filterWaitingInvit = function(pItem,pIndex){
		return pItem.pendingFriendRequest === cstAttenteConfirm;
	};

	// ---------------------------------------------------------------------------------------------------------------------------
	// Lecture de tous les membres de la BDD, puis filtrage pour ne garder que les membres pouvant devenir "Amis" en fonction des règles édictées dans le CDC
	// --> On va filtrer dans la BDD les membres qui pourraient devenir amis (Rejet de moi-même en tant qu'ami, et des membres déjà amis ou demande en cours)
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.selectMembersToBeFriends = function(pMyPseudo, pWebSocketConnection){
		vDBMgr.collectionMembers.find(                                                   
			{},
			{
				"pseudo" : 1, 
				"etatCivil.photo" : 1, 
				"_id" : 0
			})
		.toArray((error, documents) => {
			if (error){
				console.log('Erreur de lecture dans la collection \'membres\' : ',error);   // Si erreur technique... Message et Plantage
				throw error;
			} 

			// Note : Le Bind permet de passer des paramêtres supplementaires à ceux d'origine du Filter
			let vMembersFriendables = documents.filter(this.filterMembersToBeFriends.bind(this, pMyPseudo)); 

			if (vMembersFriendables.length === 0){
				return pWebSocketConnection.emit('emptyPotentialFriends'); 			// Il n'y pas de membres pouvant devenir amis ==> La liste est vide, on signale et abandonne 
			} else {
				return pWebSocketConnection.emit('displayPotentialFriends',vMembersFriendables); // Affichage des membres pouvant devenir amis
			}
		})
	};

	// ---------------------------------------------------------------------------------------------------------------------------
	// Promesse d'ajout de moi-même dans la liste d'ami de mon futur ami
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.addMeToPotentialFriend = function(pFriendToAdd){
		return new Promise((resolve, reject) => {
			vFriendToAdd = {
				friendPseudo 				 : pFriendToAdd.vMyPseudo,
				pendingFriendRequest : cstAttenteConfirm,
				friendEmail					 : pFriendToAdd.vMyEmail,
				friendPhoto					 : pFriendToAdd.vMyPhoto,
			}

			vDBMgr.collectionMembers.updateOne(
			{ 'email': pFriendToAdd.vFriendEmail, },
			{ $push: { amis : vFriendToAdd, } }, 
			(error) => {
				if (error) {
					reject(error)
					console.log('Erreur de MAJ dans la collection \'membres\' : ',error);   // Si erreur technique... Message et Plantage
					throw error;
				};
			});

			return resolve(true);
		})
	};

	// ---------------------------------------------------------------------------------------------------------------------------
	// Promesse d'ajout de mon futur Ami dans mon record
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.addPotentialFriendToMe = function(pFriendToAdd){
		return new Promise((resolve, reject) => {
			vFriendToAdd = {
				friendPseudo 				 : pFriendToAdd.vFriendPseudo,
				pendingFriendRequest : cstInvitEncours,
				friendEmail		 			 : pFriendToAdd.vFriendEmail,
				friendPhoto					 : pFriendToAdd.vFriendPhoto,
			}

			vDBMgr.collectionMembers.updateOne(
			{ 'email': pFriendToAdd.vMyEmail, },
			{ $push: { amis : vFriendToAdd, } }, 
			(error) => {
				if (error) {
					reject(error)
					console.log('Erreur de MAJ dans la collection \'membres\' : ',error);   // Si erreur technique... Message et Plantage
					throw error;
				};
			})

			return resolve(true);
		})
	};

	// ---------------------------------------------------------------------------------------------------------------------------
	// 2 steps update :
	// 1) Moi-meme avec le pseudo de celui que j'ai invité
	// 2) Celui que j'ai invité avec mon pseudo
	// 3) Si le receveur est connecté, Affichage incrémenté en temps réel sur son profil
	// Emission de mail au receveur
	// Envoi d'une notification au demandeur
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.processInvitation = function(pFriendToAdd, pWebSocketConnection, pSocketIo){
		var result1 = this.addPotentialFriendToMe(pFriendToAdd)
		.then(() => {this.addMeToPotentialFriend(pFriendToAdd)})
		.then(() => {
			this.sendEMail(
				pFriendToAdd.vFriendEmail, 
				'Collect\'Or - Notification de demande d\'ami', 
				'<h1 style="color: black;">Vous avez reçu une demande d\'ami</h1><br />' +
				'<p><Strong>'+pFriendToAdd.vMyPseudo+'</strong> souhaite devenir votre ami sur le site Collect\'Or.<p><br />'+
				'<p>Vous pouvez accepter ou refuser sa demande.</p>'+
				'<br /><br /><br /><i>Vil-Coyote Products</i>'
			);

			// Recherche du pseudo du futur ami dans le tableau des membres car s'il est connecté, je MAJ sa puce avec le Nombre (incrémenté) d'invitations
			let myIndex = this.searchMemberInTableOfMembers('pseudo', pFriendToAdd.vFriendPseudo);

			if (myIndex !== -1){  																													// Si membre trouvé dans la table des membres actuellement connectés
				this.objectPopulation.members[myIndex].nbrWaitingInvit++;  										// On ajoute +1 à son Nbre d'invitations en memoire vive
				
				// Envoi à ce membre seul, la demande de MAJ de son Nbre d'invitations
				pSocketIo.to(this.objectPopulation.members[myIndex].idSocket).emit('updatePuceNbreInvitations',this.objectPopulation.members[myIndex].nbrWaitingInvit);     
			}
			
			// Envoi au client de la demande d'affichage de la notification d'envoi de la demande d'ami
			pWebSocketConnection.emit('displayNotifInvitationSent',pFriendToAdd); 			
		});
	}
// XXXXX
	// // ---------------------------------------------------------------------------------------------------------------------------
	// // Lecture de la liste des amis (quelque soit leur statut) puis filtrage sur le statut cstAttenteConfirm
	// // ---------------------------------------------------------------------------------------------------------------------------
	// MemberServer.prototype.validateFriends = function(pMyEmail, pWebSocketConnection){
	// 	return new Promise((resolve, reject) => {

	// 		vDBMgr.collectionMembers.find(                                                   
	// 			{ 
	// 				'email': pMyEmail, 
	// 			},
	// 			{
	// 				"amis" : 1, 
	// 				"_id" : 0
	// 			})
	// 		.toArray((error, documents) => {
	// 			if (error){
	// 				reject(error)
	// 				console.log('Erreur de lecture dans la collection \'membres\' : ',error);   // Si erreur technique... Message et Plantage
	// 				throw error;
	// 			} 

	// 			resolve(true);

	// 			// Filtre les demandes d'invitation que l'on m'a envoyées
	// 			let vWaitingInvit = documents[0].amis.filter(this.filterWaitingInvit); 

	// 			if (vWaitingInvit.length === 0){
	// 				return pWebSocketConnection.emit('emptyWaitingInvitation'); 			// Il n'y pas de membres pouvant devenir amis ==> La liste est vide, on signale et abandonne 
	// 			} else {
	// 				return pWebSocketConnection.emit('displayWaitingInvitation',vWaitingInvit); // Affichage des membres ayant envoyé des invitations
	// 			}
	// 		})
	// 	})
	// };

	// ---------------------------------------------------------------------------------------------------------------------------
	// Prréparation de la liste des invitattions à traiter
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.validateFriends = function(pMyEmail){
		return new Promise((resolve, reject) => {
			vDBMgr.collectionMembers.find(                                                   
			{ 
				'email': pMyEmail, 
			},
			{
				"amis" : 1, 
				"_id" : 0
			})
			.toArray((error, documents) => {
				if (error){
					reject(error);
				} 

				if(!documents.length) {
					reject('pas de docs --> Anormal')
				}

				resolve(documents);
			})
		})
	};

// ---------------------------------------------------------------------------------------------------------------------------
// Lecture de la liste des amis (quelque soit leur statut) puis filtrage sur le statut cstAttenteConfirm
// ---------------------------------------------------------------------------------------------------------------------------
MemberServer.prototype.processInvit = function(pMyEmail, pWebSocketConnection){

	this.validateFriends(pMyEmail)
	.then(documents => {
		let vWaitingInvit = documents[0].amis.filter(this.filterWaitingInvit); // Filtre les demandes d'invitation que l'on m'a envoyées

		if (vWaitingInvit.length === 0){
			return pWebSocketConnection.emit('emptyWaitingInvitation'); 			// Il n'y pas de membres pouvant devenir amis ==> La liste est vide, on signale et abandonne 
		} else {
			return pWebSocketConnection.emit('displayWaitingInvitation',vWaitingInvit); // Affichage des membres ayant envoyé des invitations
		}
	})
	.catch(error => {
		console.log(error)
		console.log('Erreur de lecture dans la collection \'membres\' : ',error);   // Si erreur technique... Message et Plantage
		throw error;
	});
};


// ---------------------------------------------------------------------------------------------------------------------------
// MAJ du statut du demandeur dans ma propre liste d'amis --> cstAmiConfirme => Le demandeur devient un ami confirmé
// ---------------------------------------------------------------------------------------------------------------------------
MemberServer.prototype.acceptFriendIntoMyFriendList = function(pSelectedInvit){
	return new Promise((resolve, reject) => {
		vDBMgr.collectionMembers.updateOne(                                                   
		{ 
			'email': pSelectedInvit.vMyEmail,
			'amis.friendPseudo' : pSelectedInvit.vFriendPseudo
		},
		{ 
			$set: {'amis.$.pendingFriendRequest' : cstAmiConfirme} 
		},(error) => {
			if (error) {
				reject(error);
			};

			resolve('Ami MAJ dans ma liste d\amis');
		})		
	});
}
// ---------------------------------------------------------------------------------------------------------------------------
// MAJ de mon statut dans la liste d'amis du demandeur --> cstAmiConfirme => Je deviens ami confirmé du demandeur
// ---------------------------------------------------------------------------------------------------------------------------
MemberServer.prototype.acceptMeIntoFriendList = function(pSelectedInvit){
	return new Promise((resolve, reject) => {
		vDBMgr.collectionMembers.updateOne(                                                   
		{ 
			'email': pSelectedInvit.vFriendEmail,
			'amis.friendPseudo' : pSelectedInvit.vMyPseudo
		},
		{ 
			$set: {'amis.$.pendingFriendRequest' : cstAmiConfirme} 
		},(error) => {
			if (error) {
				reject(error);
			};

			resolve('Mon statut d\'Ami MAJ dans la liste de mon ami');
		})		
	});
}

// ---------------------------------------------------------------------------------------------------------------------------
// Acceptation d'une invitation :
// MAJ du statut du demandeur dans ma propre liste d'amis --> cstAmiConfirme
// MAJ chez le demandeur de mon propre statut dans sa liste d'amis --> cstAmiConfirme
// Envoi d'une Notification d'opération effectuée
// ---------------------------------------------------------------------------------------------------------------------------
MemberServer.prototype.acceptInvitation = function(pSelectedInvit, pWebSocketConnection){
	this.acceptFriendIntoMyFriendList(pSelectedInvit)
	.then(() => {
		this.acceptMeIntoFriendList(pSelectedInvit)
	})
	.then(() => {
		// Recherche de mmon pseudo le tableau des membres car je vais MAJ ma puce avec le Nombre (décrémenté) d'invitations
		let myIndex = this.searchMemberInTableOfMembers('pseudo', pSelectedInvit.vMyPseudo);

		this.objectPopulation.members[myIndex].nbrWaitingInvit--;  										// On retire 1 à mon Nbre d'invitations en memoire vive 
				
		// Envoi à moi-même, la demande de MAJ de mon Nbre d'invitations
		pWebSocketConnection.emit('updatePuceNbreInvitations',this.objectPopulation.members[myIndex].nbrWaitingInvit);     
			
		// Envoi au client de la demande d'affichage de la notification d'envoi de la demande d'ami
		pWebSocketConnection.emit('displayNotifInvitationValided',pSelectedInvit); 			
	})
	.catch(error => {
		console.log(error)
		console.log('Erreur de lecture dans la collection \'membres\' : ',error);   // Si erreur technique... Message et Plantage
		throw error;
	});
};

// ---------------------------------------------------------------------------------------------------------------------------
// Suppression du demandeur dans ma propre liste d'amis
// ---------------------------------------------------------------------------------------------------------------------------
MemberServer.prototype.deleteFriendIntoMyFriendList = function(pSelectedInvit){
	return new Promise((resolve, reject) => {
		vDBMgr.collectionMembers.updateOne(
		{ 
			'email': pSelectedInvit.vMyEmail,
		},
		{ $pull: 
			{ amis: 
				{ friendPseudo: pSelectedInvit.vFriendPseudo }
			}
		},(error) => {
			if (error) {
				reject(error);
			};

			resolve('Demandeur supprimé de ma liste d\amis');
		})		
	});
}
// ---------------------------------------------------------------------------------------------------------------------------
// / MAJ de mon statut dans la liste d'amis du demandeur --> cstAmiConfirme => Je deviens ami confirmé du demandeur
// ---------------------------------------------------------------------------------------------------------------------------
MemberServer.prototype.deleteMeIntoFriendList = function(pSelectedInvit){
	return new Promise((resolve, reject) => {
		vDBMgr.collectionMembers.updateOne(
		{ 
			'email': pSelectedInvit.vFriendEmail,
		},
		{ $pull: 
			{ amis: 
				{ friendPseudo: pSelectedInvit.vMyPseudo }
			}
		},(error) => {
		if (error) {
			reject(error);
		};

		resolve('Suppression de moi-même de la liste du demandeur');
		})		
	});
}

// ---------------------------------------------------------------------------------------------------------------------------
// Rejet d'une invitation :
// Suppression du demandeur dans ma propre liste d'amis
// Suppression de moi  dans la liste d'amis du demandeur
// Envoi d'une Notification d'opération effectuée
// ---------------------------------------------------------------------------------------------------------------------------
MemberServer.prototype.refuseInvitation = function(pSelectedInvit, pWebSocketConnection){

console.log('refuseInvitation - pSelectedInvit : ',pSelectedInvit);

	this.deleteFriendIntoMyFriendList(pSelectedInvit)
	.then(() => {
		this.deleteMeIntoFriendList(pSelectedInvit)
	})
	.then(() => {
		// Recherche de mmon pseudo le tableau des membres car je vais MAJ ma puce avec le Nombre (décrémenté) d'invitations
		let myIndex = this.searchMemberInTableOfMembers('pseudo', pSelectedInvit.vMyPseudo);

		this.objectPopulation.members[myIndex].nbrWaitingInvit--;  										// On retire 1 à mon Nbre d'invitations en memoire vive 
				
		// Envoi à moi-même, la demande de MAJ de mon Nbre d'invitations
		pWebSocketConnection.emit('updatePuceNbreInvitations',this.objectPopulation.members[myIndex].nbrWaitingInvit);     
			
		// Envoi au client de la demande d'affichage de la notification d'envoi de la demande d'ami
		pWebSocketConnection.emit('displayNotifInvitationRefused',pSelectedInvit); 			
	})
	.catch(error => {
		console.log(error)
		console.log('Erreur de lecture dans la collection \'membres\' : ',error);   // Si erreur technique... Message et Plantage
		throw error;
	});
};
	// ---------------------------------------------------------------------------------------------------------------------------
	// On MAJ la Bdd avec les données de profil du membre saisies dans la fiche "renseignements"
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.updateDataProfilMembre = function(pDataProfilMembre, pWebSocketConnection){

		// On MAJ l'ensemble des données générales de la fiche de renseignement SAUF l'éventuel Chgt de PWD
		let myDataSet = 
		{
			email              : pDataProfilMembre.email, 
			presentation       : pDataProfilMembre.presentation,                  // Texte de présentation du membre
			etatCivil : 
			{
				photo          : pDataProfilMembre.etatCivil.photo,                 // Photo
				firstName      : pDataProfilMembre.etatCivil.firstName,             // Prénom
				name           : pDataProfilMembre.etatCivil.name,                  // Nom
				birthDate      : pDataProfilMembre.etatCivil.birthDate,             // Date de naissance
				sex            : pDataProfilMembre.etatCivil.sex,                   // 0 = Non divulgué, 1 --> Masculin, 2 --> Féminin
				address : 
				{
					street     : pDataProfilMembre.etatCivil.address.street,        	// N° et voie
					city       : pDataProfilMembre.etatCivil.address.city,          	// Ville
					zipCode    : pDataProfilMembre.etatCivil.address.zipCode,       	// Code Postal
					department : pDataProfilMembre.etatCivil.address.department,    	// N° Département
					departmentName : pDataProfilMembre.etatCivil.address.departmentName,    // Département : N° + Libelle
				},
			},
			preferences : pDataProfilMembre.preferences,
		} 

		this.updateDataInBDD(myDataSet);

		// Si le MDP a été changé, on le MAJ dans un 2eme temps
		if (pDataProfilMembre.oldPassword !==''){      
			let myDataSet = 
			{   
				email       : pDataProfilMembre.email,
				oldPassword : '',
				password    : pDataProfilMembre.password,
			}
			this.updatePasswordChange(myDataSet, cstChangedPWD, pWebSocketConnection);
			this.sendEMail(
				pDataProfilMembre.email, 
				'Vous avez changé votre de mot de passe', 
				'<h1 style="color: black;">Votre nouveau mot de passe ...</h1><p><h2>Voici vos nouveaux identifiants :</h2><br />' +
				'Vos identifiants sont : <p><Strong>Pseudonyme : </strong>'+pDataProfilMembre.pseudo+'<p><strong>Mot de passe : </strong>'+pDataProfilMembre.password +
				'</p><br /><br /><br /><i>Vil-Coyote Products</i>'
			);
		}
	}

	// ---------------------------------------------------------------------------------------------------------------------------
	// Deconnexion d'un visiteur et eventuellement d'un membre  :
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.disconnectMember = function(pWebSocketConnection, pSocketIo){
		let myIndex = this.searchMemberInTableOfMembers('idSocket' ,pWebSocketConnection.id);

		if (this.objectPopulation.members[myIndex].isMember){                 // Le visiteur qui se deconnecte était un membre
			this.objectPopulation.nbrMembersInSession--;                        // Nombre de visiteurs incluant les [membres + Admins]
			
			if (this.objectPopulation.members[myIndex].role < cstMembre){       // Il s'agit obligatoiremennt d'un Admin ou Super-Admin
				this.objectPopulation.nbrAdminsInSessions--;                      // Si le memnbre est un Admin, on retire 1 aux nombre d'Admin connectés
			}
		}

		this.objectPopulation.members.splice(myIndex, 1);   // Efface l'occurence du membre du tableau des membres connectés
		this.objectPopulation.nbrConnections--;
		this.UpdateDisplayPopulation(pSocketIo);

		console.log('--------------------------------------------------------------------------------------------------------------------')
		console.log('disconnectMember - 000 - : this.objectPopulation.members.length : ',this.objectPopulation.members.length,
								'--- Nbre de visiteurs : ', this.objectPopulation.nbrConnections,
								'--- Nbre de membres : ',this.objectPopulation.nbrMembersInSession,
								'--- Nbre d\'Admin : ',this.objectPopulation.nbrAdminsInSessions,
								'--- pWebSocketConnection.id : ',pWebSocketConnection.id);
		console.log('--------------------------------------------------------------------------------------------------------------------')
	}

	// ---------------------------------------------------------------------------------------------------------------------------
	// Initialisation d'un visiteur :
	// 1) Stockage de son socket
	// 2) Mise a zero de tous les champs
	// 3) Ajout du visiteur dans le tableau global des personnes connectées
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.initVisiteur = function(pWebSocketConnection, pSocketIo){

	let memberLocal = 
	{
		idSocket  : pWebSocketConnection.id,
		isMember  : false,
		email     : '',
		pseudo    : '',
	}

	this.objectPopulation.members.push(memberLocal);
	this.objectPopulation.nbrConnections++;             // Nombre de visiteurs incluant les [membres + Admins]
	this.UpdateDisplayPopulation(pSocketIo);

	console.log('--------------------------------------------------------------------------------------------------------------------')
	console.log('initVisiteur - 000 - : this.objectPopulation.members.length : ',this.objectPopulation.members.length,
							'--- Nbre de visiteurs : ', this.objectPopulation.nbrConnections,
							'--- Nbre de membres : ',this.objectPopulation.nbrMembersInSession,
							'--- Nbre d\'Admin : ',this.objectPopulation.nbrAdminsInSessions,
							'--- pWebSocketConnection.id : ',pWebSocketConnection.id);
	console.log('--------------------------------------------------------------------------------------------------------------------')
	}
	// ---------------------------------------------------------------------------------------------------------------------------
	// Au lancement du serveur, on tente de lire le Nbre de messages publics stockés dans la BDD, si KO, on initialise a 0
	// On en profite poour initialiser toutes les variables de population à 0
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.initNbrPublicMsgs = function(){
		vDBMgr.collectionTechnical.find()
		.limit(1)
		.toArray((error, documents) => {
			if (error) {
				console.log('Erreur de lecture dans la collection \'technical\' : ',error);   // Si erreur technique... Message et Plantage
				throw error;
			}

			if (documents.length) {
				this.nbrPublicMsgs = documents[0].nbrPublicMsgs;                    
			} else {
				this.nbrPublicMsgs = 0;
			}

			this.objectPopulation.nbrConnections = 0;
			this.objectPopulation.nbrMembersInSession = 0;
			this.objectPopulation.nbrAdminsInSessions = 0;
		});
	}
	// -------------------------------------------------------------------------
	// Verification de l'accessibilité de la base - Je ne le fais qu'au debut du jeu, 
	// mais en tout état de cause, normalement, professionnellement, je devrais 
	// m'assurer qu'elle est toujours accessible en cours de partie, mais dans le 
	// contexte ultra-limité de cet atelier, ce n'est pas nécessaire
	// Si elle ne fonctionne pas, je sors du jeu, après avoir envoyé un message à la console
	// -------------------------------------------------------------------------
	MemberServer.prototype.checkDBConnect = function(){
		vDBMgr.checkDBConnect()
		.then((valeur) => {
			this.initNbrPublicMsgs();                // Mise en mémoire du Nbre de messages publics stockés en BDD
		})
	};
	// ------------------------------------------- Fin du module -------------------------------------------------------------------------
}
	// ------------------------------------------- Fin du module -------------------------------------------------------------------------