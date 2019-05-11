// *************************************************************************
// *** MemberServer : Objet représentant les visiteurs et membres        ***
// ***                                                                   ***
// *** Objet : MemberServer                                              ***
// ***                                                                   ***
// *** Cet objet sert à gérer :                                          ***
// ***   - Le filtrage des candidats qui aspirent à se connecter         ***
// ***   - La structure principale des données d'échange avec les clients***
// ***                                                                   ***
// ***  Nécessite :                                                      ***
// ***      Le module "dbMgr"                                            ***
// ***      Une variable pour son instanciation                          ***
// ***                                                                   ***
// *************************************************************************
// -------------------------------------------------------------------------

const DBMgr = require('./dbMgr');
let vDBMgr = new DBMgr();       // Instanciation de l'objet decrivant l'ensemble des membres et les méthodes de gestion de ces membres

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
		[
		// {
			// idSocket        	: 0,							// N° de socket "WebSocketConnection.id"
			// isMember        	: false,					// Permet de savoir si la personne connectée est un visiteurr ou un membre
			// email           	: '',
			// pseudo          	: '',
			// role						 	: 0,
			// nbrWaitingInvit 	: 0,
		// }
	],   
		nbrConnections      : 0,    // Nbre de connexions actives sans préjuger de leur rôle
		nbrMembersInSession : 0,    // Nbre de membres connectés (Membres + Admin)
		nbrAdminsInSessions : 0,    // Nombre d'Admins connectés
	}

	this.member =                  // Structure de stockage provisoire du membre
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

	// --------------------------------------------------------------
	// Fonction retournant le Pseudo d'un ami éventuellement splitté
	// à partir d'un combo "PseudoAmiRecommandé/PseudoAmiRecommandeur"
	// --------------------------------------------------------------
	MemberServer.prototype.splitFriendFromCombo = function(pFriendCombo){
		let friendPair = pFriendCombo.split('/')
		if (friendPair.length === 1){													// S'il ne s'agit pas d'une recommandation, donc c'est une invitation directe
			vFriendPseudo = pFriendCombo;
		} else {
			vFriendPseudo = friendPair[0];
		}
		return vFriendPseudo;
	}

	// --------------------------------------------------------------
	// Fonction retournant un entier aléatoire entre une valeur 
	// inférieure (pas nécessairement zéro), et une valeur supérieure
	// --------------------------------------------------------------
	MemberServer.prototype.random = function(pValInf, pValSup){
		return Math.round(((pValSup - pValInf) * Math.random()) + pValInf);
	}
	// ---------------------------------------------------------------------------------------------------------------------------
	// Cette fonction recherche dans la table des membres connectés, celui qui a la propriété passée en parametre
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.searchMemberInTableOfMembers = (pProperty, pValue) => {
		return this.objectPopulation.members.map((propertyFilter) => {
			return propertyFilter[pProperty];
		})
		.indexOf(pValue);
	}
	// ---------------------------------------------------------------------------------------------------------------------------
	// Cette fonction recherche dans le tableau des amis d'un membre, si un record "friendPseudo" non vide existe
	// et s'il trouve dans ce tableau le pseudo envoyé en parametre
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
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.findVisitorBecomeMember = (pVisiteurLoginData) => {
		return new Promise((resolve, reject) => {
			vDBMgr.collectionMembers.find(
				{ 
						'pseudo': pVisiteurLoginData.pseudo, 
						'password': pVisiteurLoginData.password, 
				})
			.limit(1)
			.toArray((error, documents) => {
				if (error) {
					console.log('-------------------------------------------------------------');
					console.log('findVisitorBecomeMember - Erreur de lecture dans la collection \'members\' : ',error);   // Si erreur technique... Message et Plantage
					console.log('findVisitorBecomeMember - pVisiteurLoginData.pseudo : ',pVisiteurLoginData.pseudo);
					console.log('findVisitorBecomeMember - pVisiteurLoginData.password : ',pVisiteurLoginData.password);
					console.log('-------------------------------------------------------------');
					reject(error);
					throw error;
				}

				resolve(documents);
			});
		});
	};

	// ---------------------------------------------------------------------------------------------------------------------------
	// Lecture d'un ami pour récupération de ses infos de Patronyme et alimenter ma liste d'amis coté client
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.getFriendInfos = function(pMyFriend){
		return new Promise((resolve, reject) => {
			vDBMgr.collectionMembers.find(
			{ 
				'email': pMyFriend.friendEmail, 
			})
			.limit(1)
			.toArray((error, document) => {
				if (error) {
					console.log('-------------------------------------------------------------');
					console.log('getFriendsInfo - pMyFriend : ',pMyFriend.friendEmail);
					console.log('getFriendsInfo - Erreur de lecture dans la collection \'members\' : ',error);   // Si erreur technique... Message et Plantage
					console.log('-------------------------------------------------------------');
					reject(error);
					throw error;
				} 
				resolve(document[0]);
			})
		})
	};

	// ---------------------------------------------------------------------------------------------------------------------------
	// Obtention des noms et prénom de chacun de mes amis
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.getMyFriendsInfos = async function(){
			let myFriendsInfos = [];

			for (const aFriendOfMine of this.member.amis) {
				const document = await this.getFriendInfos(aFriendOfMine);

				let friendsInfosLocal = 
				{
					pseudo 		: null, 	
					email			: null,
					firstName : null,
					name			: null,
					photo			: null,
				}

				friendsInfosLocal.pseudo 		= document.pseudo;
				friendsInfosLocal.email 		= document.email;
				friendsInfosLocal.firstName	= document.etatCivil.firstName;
				friendsInfosLocal.name 			= document.etatCivil.name;
				friendsInfosLocal.photo 		= document.etatCivil.photo;

				myFriendsInfos.push(friendsInfosLocal);
			};

		return myFriendsInfos;
	}
	
	// ---------------------------------------------------------------------------------------------------------------------------
	// Vérification des données du visiteur (Pseudo + MDP) :
	// - Si la combinaison Pseudo et MDP n'existe pas --> Rejet de la demande Login ('retryLoginForm')
	// - Par contre, si elle existe, il s'agit d'un membre et on demande au client de désactiver l'icône de Login et d'activer 
	// l'icône de déconnexion ('welcomeMember')
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.visitorBecomeMember = (pDocuments, pWebSocketConnection, pSocketIo) => {

		// Le login n'a pas été trouvé dans la BDD et est donc erroné --> la tentative de connexion est refusée
		if (!pDocuments.length){  
			pWebSocketConnection.emit('retryLoginForm');   
			return;
		} 

		this.member = pDocuments[0];                             // Récupération des infos du membre dans l'objet de stockage provisoire
		this.member.oldPassword = '';                            // RAZ de l'ancien MDP avant envoi au client

		// Recherche du pseudo du membre dans le tableau des membres connectés car je ne veux pas qu'un membre se connecte plusieurs fois sur des sessions différentes
		let myIndex = this.searchMemberInTableOfMembers('pseudo', this.member.pseudo);
		if (myIndex !== -1){                                   // Si membre trouvé dans la table des membres connectés, on le rejette, sinon, on le connecte
			return pWebSocketConnection.emit('memberAlreadyConnected',this.member);     
		}

		myIndex = this.searchMemberInTableOfMembers('idSocket', pWebSocketConnection.id);  // Recherche du visiteur par son socket dans le tableau des membres

		this.objectPopulation.members[myIndex].email  = this.member.email;
		this.objectPopulation.members[myIndex].pseudo = this.member.pseudo;
		this.objectPopulation.members[myIndex].role = this.member.role;

		// On constitue une liste des membres ayant envoyé une invitation au membre qui vient de se connecter
		// Parmi tous mes amis, filtrage de ceux qui sont en attente d'une confirmation de ma part (Pour alimenter la puce du Nbre d'invitations)
		let vAskingMembers = this.member.amis.filter(this.filterWaitingInvit); 
		this.objectPopulation.members[myIndex].nbrWaitingInvit = vAskingMembers.length;	// On récupère le Nbre d'invitations en attente

		this.addMemberToActiveMembers(myIndex, pSocketIo);                    					// Le visiteur est bien un membre, on l'ajoute à la liste des membres

		// Pour chaque ami de ma liste d'amis, je vais chercher son Nom et son prenom
		this.getMyFriendsInfos()
		.then((myFriendsInfos) => {
			let dataToTransmit = {
				member 					: this.member,
				welcomeMessage 	: 'Hello',
				askingMembers 	: vAskingMembers,
				myFriendsInfos	: myFriendsInfos, 
			}

			pWebSocketConnection.emit('welcomeMember',dataToTransmit);                    	// On transmet au client les données du membre 
		});
	};

	// ---------------------------------------------------------------------------------------------------------------------------
	// Point d'appel pour la fonction de Login
	// Vérification des données du visiteur (Pseudo + MDP) :
	// On cherche la combinaison Pseudo et MDP
	// - Si la combinaison n'existe pas --> Rejet de la demande Login ('retryLoginForm')
	// - Par contre, si elle existe, il s'agit d'un membre et on demande au client de désactiver l'icône de Login et d'activer 
	// l'icône de déconnexion ('welcomeMember')
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.visitorLogin = (pVisiteurLoginData, pWebSocketConnection, pSocketIo) => {
		this.findVisitorBecomeMember(pVisiteurLoginData, pWebSocketConnection, pSocketIo)
		.then ((documents) => {
			this.visitorBecomeMember(documents, pWebSocketConnection, pSocketIo);
		})
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
			'Vos identifiants sont : <p><strong>Pseudonyme : </strong>'+this.member.pseudo+'<p><strong>Mot de passe : </strong>'+this.newPassword +
			'</p><br /><br /><br /><i>Vil-Coyote Products</i>'
		);
	};

  // ---------------------------------------------------------------------------------------------------------------------------
	// MAJ de la BDD avec les données envoyées "pDataSet"
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.updateDataInBDD = function(pDataSet){
		return new Promise((resolve, reject) => {
			vDBMgr.collectionMembers.updateOne(
			{ 
				'email': pDataSet.email, 
			},
			{
				$set:  pDataSet
			}, (error) => {
				if (error) {
					console.log('-------------------------------------------------------------');
					console.log('updateDataInBDD - Erreur de MAJ dans la collection \'members\' : ',error);   // Si erreur technique... Message et Plantage
					console.log('updateDataInBDD - pDataSet.email : ',pDataSet.email);
					console.log('-------------------------------------------------------------');
					reject(error);
					throw error;
				};
			});

			resolve('MAJ BDD OK')
		});
	};
  
	// ---------------------------------------------------------------------------------------------------------------------------
	// En cas de chgt de MDP, MAJ la BDD avec les nouveaux et anciens MDP, et envoie un mail de notification
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.updatePasswordChange = function(pDataSet, pTypeChgtPWD, pWebSocketConnection){
		this.updateDataInBDD(pDataSet)
		.then(() => {
			pWebSocketConnection.emit('notifyNewPWDSent', pTypeChgtPWD); 
		})
	};

	// ---------------------------------------------------------------------------------------------------------------------------
	// Vérification que l'email fourni pour la récupération du PWD existe
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.checkLostPWDMailIsValid = function(pLostPWDEmail, pWebSocketConnection){
		return new Promise((resolve, reject) => {
			vDBMgr.collectionMembers.find(
			{ 
				'email': pLostPWDEmail, 
			}).toArray((error, documents) => {
				if (error) {
					console.log('-------------------------------------------------------------');
					console.log('checkLostPWDMailIsValid - pLostPWDEmail : ',pLostPWDEmail);
					console.log('checkLostPWDMailIsValid - Erreur de lecture dans la collection \'members\' : ',error);   // Si erreur technique... Message et Plantage
					console.log('-------------------------------------------------------------');
					reject(error);
					throw error;
				} 
				
				if (!documents.length){                                                         // Si mail non trouvé dans la BDD, on resoumet le formulaire
					return pWebSocketConnection.emit('retryLostPWDForm'); 
				} 

				resolve(documents);
			})
		})
	};

	// ---------------------------------------------------------------------------------------------------------------------------
	// Vérification que l'email fourni pour la récupération du PWD existe :
	// - Si le mail n'existe pas --> Rejet de la demande de récupération du PWD ('retryLostPWDForm')
	// - Par contre, s'il existe, on génère un PWD aléatoire et on le transmet par mail ('sendNewPWD')
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.lostPWDMgr = function(pLostPWDEmail, pWebSocketConnection){
		this.checkLostPWDMailIsValid(pLostPWDEmail, pWebSocketConnection)
		.then((documents) => {
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
		})
	};

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
	};

	// ---------------------------------------------------------------------------------------------------------------------------
	// Ajoute le membre nouvellement créé ou Loggé avec succès à la liste des membres connectés
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.addMemberToActiveMembers = function(pIndex, pSocketIo){
		this.objectPopulation.members[pIndex].isMember  = true;
		this.objectPopulation.nbrMembersInSession++;  // On ajoute +1 aux nombre de membres connectés le membre qu'on vient de lire pour cette connexion dans un objet qui les recense
		
		if (this.objectPopulation.members[pIndex].role < cstMembre){    // Il s'agit obligatoirement d'un Admin ou Super-Admin
			this.objectPopulation.nbrAdminsInSessions++;  // On ajoute +1 aux nombre de membres connectés le membre qu'on vient de lire pour cette connexion dans un objet qui les recense
		}   

		console.log('--------------------------------------------------------------------------------------------------------------------');
		console.log('addMemberToActiveMembers 0 : idSocket : ',this.objectPopulation.members[pIndex].idSocket);
		console.log('addMemberToActiveMembers 0 : email : ',this.objectPopulation.members[pIndex].email);
		console.log('addMemberToActiveMembers 0 : pseudo : ',this.objectPopulation.members[pIndex].pseudo);
		console.log('addMemberToActiveMembers 0 : role : ',this.objectPopulation.members[pIndex].role);
		console.log('addMemberToActiveMembers 0 : isMember : ',this.objectPopulation.members[pIndex].isMember);
		console.log('addMemberToActiveMembers 0 : nbrWaitingInvit : ',this.objectPopulation.members[pIndex].nbrWaitingInvit);
		console.log('addMemberToActiveMembers 0 : Nbre de visiteurs : ', this.objectPopulation.nbrConnections);
		console.log('addMemberToActiveMembers 0 : Nbre de membres : ',this.objectPopulation.nbrMembersInSession);
		console.log('addMemberToActiveMembers 0 : Nbre d\'Admin : ',this.objectPopulation.nbrAdminsInSessions);
		console.log('--------------------------------------------------------------------------------------------------------------------');
		console.log('addMemberToActiveMembers 0 : objectPopulation.members.length : ',this.objectPopulation.members.length);
		console.log('addMemberToActiveMembers 0 : objectPopulation.members : ',this.objectPopulation.members);
		console.log('--------------------------------------------------------------------------------------------------------------------');

		this.UpdateDisplayPopulation(pSocketIo);
	};

	// ---------------------------------------------------------------------------------------------------------------------------
	// Envoi de mail générique en format HTML
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.sendEMail = function(pEMail, pSubject, pHTML){
		let messageToSend = {
			to       : pEMail,
			from     : cstMailFrom,
			subject  : pSubject,
			// text  : 'Félicitations\n\nVous êtes dorénavant membre de la Communauté \'Collect\'Or\'',      // Variante pour une version "Text" (Non HTML)
			html     : pHTML,
		}
		sgMail.send(messageToSend)
		.catch((error) => {
			console.log('--------------------------------------------------------------------------');
			console.log('Problème lors de l\'envoi d\'email à ',pEMail,' --- Sujet : ',pSubject);
			console.log('sendEMail - error.code : ',error.code);
			console.log('sendEMail - error.message : ',error.message);
			console.log('--------------------------------------------------------------------------');
		});;
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
				console.log('-------------------------------------------------------------');
				console.log('createTechnicalRecord - technicalRecord : ',technicalRecord);   // Si erreur technique... Message et Plantage
				console.log('-------------------------------------------------------------');
				throw error;
			} 

			console.log('Ajout d\'un Record \'Technical\' dans la BDD - 1 membre inséré : ',technicalRecord);  
		});       
	}

	// ---------------------------------------------------------------------------------------------------------------------------
	// Comptage des membres dans la BDD pour déterminer le rôle du nouveau membre
	// ATTENTION !!!!
	// S'il n'y aucun membre dans la BDD, le Premier membre qui est créé est le Super-Administrateur
	// 
	// Codification des privilèges
	// 1 --> SuperAdmin
	// 2 --> Admin
	// 4 --> Membre
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.countMembers = function(){
		return new Promise((resolve, reject) => {

			vDBMgr.collectionMembers.countDocuments((error, count) => {        // On compte le nombre de membres dans la base pour savoir si le nouveau membre sera le SuperAdmin
				if (error){
					console.log('-------------------------------------------------------------');
					console.log('countMembers - Erreur de Comptage dans la collection \'members\' : ',error);   // Si erreur technique... Message et Plantage
					console.log('countMembers - Pas de clés - Normal');
					console.log('-------------------------------------------------------------');
					reject(error);
					throw error;
				} 
				
				resolve(count);
			});
		});
	};

	// ---------------------------------------------------------------------------------------------------------------------------
	// Vérification des données de Sign-in du visiteur  :
	// 1) Vérification de la non-préexistence de l'Email
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.checkVisitorSignInMailIsValid = function(pVisiteurSignInData, pWebSocketConnection){
		return new Promise((resolve, reject) => {
			vDBMgr.collectionMembers.find(                                                   // Vérification de non-pré-existence du mail
			{ 
				'email': pVisiteurSignInData.email, 
			})
			.limit(1)
			.toArray((error, documents) => {
				if (error){
					console.log('-------------------------------------------------------------');
					console.log('checkVisitorSignInMailIsValid - Erreur de lecture dans la collection \'members\' : ',error);   // Si erreur technique... Message et Plantage
					console.log('checkVisitorSignInMailIsValid - pVisiteurSignInData.email : ',pVisiteurSignInData.email);
					console.log('-------------------------------------------------------------');
					reject(error);
					throw error;
				} 

				// Si mail trouvé --> KO pour la création de nouveau membre
				if (documents.length){                            
					return pWebSocketConnection.emit('retrySignInForm'); 
				}

				resolve('Mail non trouvé --> Ok')
			});
		});
	};

	// ---------------------------------------------------------------------------------------------------------------------------
	// Vérification des données de Sign-in du visiteur  :
	// 2) Vérification de la non-préexistence du Pseudo
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.checkVisitorSignInPseudoIsValid = function(pVisiteurSignInData, pWebSocketConnection){
		return new Promise((resolve, reject) => {

			// Le mail n a pas été trouvé (donc O), on vérifie maintenant la non-existence du Pseudo
			vDBMgr.collectionMembers.find(                  
			{ 
				'pseudo': pVisiteurSignInData.pseudo, 
			})
			.limit(1)
			.toArray((error, documents) => {
				if (error){
					console.log('-------------------------------------------------------------');
					console.log('checkVisitorSignInPseudoIsValid - Erreur de lecture dans la collection \'members\' : ',error);   // Si erreur technique... Message et Plantage
					console.log('checkVisitorSignInPseudoIsValid - pVisiteurSignInData.pseudo : ',pVisiteurSignInData.pseudo);
					console.log('-------------------------------------------------------------');
					reject(error);
					throw error;
				} 
				
				// Si pseudo trouvé --> KO pour la création de nouveau membre
				if (documents.length){                     
					return pWebSocketConnection.emit('retrySignInForm');                        
				} 

				resolve('Pseudo non trouvé --> Ok')
			});
		});
	};

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
	MemberServer.prototype.addMemberInDatabase = function(pMember, pCount){
		return new Promise((resolve, reject) => {

			let myRole;
			if (pCount === 0 ){
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
					console.log('-------------------------------------------------------------');
					console.log('addMemberInDatabase - Erreur d\'insertion dans la collection \'members\' : ',error);   // Si erreur technique... Message et Plantage
					console.log('addMemberInDatabase - pMember.email : ',pMember.email);
					console.log('-------------------------------------------------------------');
					reject(error);
					throw error;
				} 

				this.member = memberLocal;
				console.log('addMemberInDatabase - 1 membre inséré : ',this.member);  
				resolve('Création du membre Ok');
			});
		});
	};

	// ---------------------------------------------------------------------------------------------------------------------------
	// Finalisation Ajout des données du visiteur (futur membre) (Email, Pseudo, MDP, timestamp (au format brut), et statut dans la BDD)
	// - Envoi de mail
	// - Message d'accueil du membre
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.finalizeAddingMember = function(pWebSocketConnection, pSocketIo){
		let myIndex = this.searchMemberInTableOfMembers('idSocket', pWebSocketConnection.id);  
						
		this.sendEMail(
			this.member.email, 
			'Votre inscription à Collect\'Or', 
			'<h1 style="color: black;">Félicitations '+this.member.pseudo+'</h1><p><h2>Vous êtes dorénavant membre de la Communauté \'Collect\'Or\'.</h2><br />' +
			'Vos identifiants sont : <p><strong>Pseudonyme : </strong>'+this.member.pseudo+'<p><strong>Mot de passe : </strong>'+this.member.password +
			'</p><br /><br /><br /><i>Vil-Coyote Products</i>'
		);

		this.objectPopulation.members[myIndex].nbrWaitingInvit = 0;						// Comme le membre vient d'être créé, il n'a pas encore reçu d'invitations
		this.objectPopulation.members[myIndex].email  = this.member.email;
		this.objectPopulation.members[myIndex].pseudo = this.member.pseudo;
		this.objectPopulation.members[myIndex].role = this.member.role;
		this.addMemberToActiveMembers(myIndex, pSocketIo);										// On ajoute le membre nouvellement créé dans la table des membres actifs

		let dataToTransmit = {
			member 					: this.member,
			welcomeMessage 	: 'Congrat',
			askingMembers 	: [],
		}

		pWebSocketConnection.emit('welcomeMember',dataToTransmit);             // On transmet au client les données du membre 
	};

	// ---------------------------------------------------------------------------------------------------------------------------
	// Vérification des données de Sign-in du visiteur  :
	// 1) Vérification de la non-préexistence de l'Email
	// 2) Vérification de la non-préexistence du Pseudo
	// Si ces 2 conditions sont vérifiées, on ajoute le visiteur à la BDD et il devient membre
	// - Sinon, on le rejette 
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.visitorSignIn = function(pVisiteurSignInData, pWebSocketConnection, pSocketIo){
		this.checkVisitorSignInMailIsValid(pVisiteurSignInData, pWebSocketConnection)
		.then(() => {
			this.checkVisitorSignInPseudoIsValid(pVisiteurSignInData, pWebSocketConnection)
			.then(() => {
				// Si mail + pseudo non trouvé --> On valide l'inscription en créant le membre
				this.countMembers()
				.then((count) => {
					this.addMemberInDatabase(pVisiteurSignInData, count)
					.then(() => { this.finalizeAddingMember(pWebSocketConnection, pSocketIo) })
				});
			});
		});
	};

	// ***************************************************************************************************************************
	// 															Gestion des invitations
	// ***************************************************************************************************************************

	// ---------------------------------------------------------------------------------------------------------------------------
	// Filtrage de tous les membres de la BDD, selon les critères suivants
	// - Je ne peux pas être mon propre ami --> Rejet
	// - Les membres dejà amis --> Rejet
	// - Les membres ayant reçu une invitation (invitation en cours = "Ami" non confirmé) --> Rejet
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.filterMembersToBeFriends = function(pMyPseudo, pItem){
		let result = true;

		if (pItem.pseudo === pMyPseudo){  // Si le membre est moi-même, je ne vais pas m'afficher dans la liste des membres potentiellement futurs amis --> Rejet du membre
			result = false;
		} else {
			let myIndex = this.searchPendingFriendRequest(pItem, 'friendPseudo', pMyPseudo);	// Vérifie que le membre n'est pas dans la liste d'amis (potentiels ou confirmés)

			if (myIndex > -1){		// Si je suis dejà un ami potentiel ou confirmé du membre en cours de lecture, je rejete le membre de la liste d'amis potentiel
				result = false;
			};
		};
		return result ? pItem : undefined;
	};

	// ---------------------------------------------------------------------------------------------------------------------------
	// Filtrage de tous les membres de la BDD qui m'ont envoyé une invitation
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.filterWaitingInvit = function(pItem){
		return pItem.pendingFriendRequest === cstAttenteConfirm;
	};

	// ---------------------------------------------------------------------------------------------------------------------------
	// Filtrage de tous les membres à qui j'ai envoyé une invitation
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.filterInvitSent = function(pItem){
		return pItem.pendingFriendRequest === cstInvitEncours;
	};

	// ---------------------------------------------------------------------------------------------------------------------------
	// Lecture de tous les membres de la BDD, puis filtrage pour ne garder que les membres pouvant devenir "Amis" en fonction des règles édictées dans le CDC
	// --> On va filtrer dans la BDD les membres qui pourraient devenir amis (Rejet de moi-même en tant qu'ami, et des membres déjà amis ou demande en cours)
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.selectMembersToBeFriends = function(pMyPseudo){
		return new Promise((resolve, reject) => {

			pMyPseudo = this.splitFriendFromCombo(pMyPseudo);

			vDBMgr.collectionMembers.find(                                                   
				{},
				{
					"pseudo" : 1, 
					"etatCivil.photo" : 1, 
					"_id" : 0
				})
			.toArray((error, documents) => {
				if (error){
					console.log('-------------------------------------------------------------');
					console.log('selectMembersToBeFriends - Erreur de Lecture dans la collection \'members\' : ',error);   // Si erreur technique... Message et Plantage
					console.log('selectMembersToBeFriends - Pas de clé --> Normal : ');
					console.log('-------------------------------------------------------------');
					reject(error);
					throw error;
				} 
				resolve(documents)
			})
		});
	};

	// ---------------------------------------------------------------------------------------------------------------------------
	// Lecture de tous les membres de la BDD, puis filtrage pour ne garder que les membres pouvant devenir "Amis" en fonction des règles édictées dans le CDC
	// --> On va filtrer dans la BDD les membres qui pourraient devenir amis (Rejet de moi-même en tant qu'ami, et des membres déjà amis ou demande en cours)
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.filtersMembersFriendables = function(documents, pMyPseudo, pWebSocketConnection){
		// Note : Le Bind permet de passer des paramêtres supplementaires à ceux d'origine du Filter
		let vMembersFriendables = documents.filter(this.filterMembersToBeFriends.bind(this, pMyPseudo)); 

		if (vMembersFriendables.length === 0){
			pWebSocketConnection.emit('emptyPotentialFriends'); 			// Il n'y pas de membres pouvant devenir amis ==> La liste est vide, on signale et abandonne 
		} else {
			pWebSocketConnection.emit('displayPotentialFriends',vMembersFriendables); // Affichage des membres pouvant devenir amis
		};
	};

	// ---------------------------------------------------------------------------------------------------------------------------
	// Lecture de tous les membres de la BDD, puis filtrage pour ne garder que les membres pouvant devenir "Amis" en fonction des règles édictées dans le CDC
	// --> On va filtrer dans la BDD les membres qui pourraient devenir amis (Rejet de moi-même en tant qu'ami, et des membres déjà amis ou demande en cours)
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.askAddFriend = function(pMyPseudo, pWebSocketConnection){
		this.selectMembersToBeFriends(pMyPseudo, pWebSocketConnection)
		.then((documents) => {
			this.filtersMembersFriendables(documents, pMyPseudo, pWebSocketConnection);
		});
	};

	// ---------------------------------------------------------------------------------------------------------------------------
	// Promesse d'ajout de moi-même dans la liste d'ami de mon futur ami
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.addMeToPotentialFriend = function(pFriendToAdd){
		return new Promise((resolve, reject) => {
			let vFriendToAdd = {
				friendPseudo 				 : pFriendToAdd.myPseudo,
				pendingFriendRequest : cstAttenteConfirm,
				friendEmail					 : pFriendToAdd.myEmail,
				friendPhoto					 : pFriendToAdd.myPhoto,
			}

			vDBMgr.collectionMembers.updateOne(
			{ 'email': pFriendToAdd.friendEmail, },
			{ $push: { amis : vFriendToAdd, } }, 
			(error) => {
				if (error) {
					console.log('-------------------------------------------------------------')
					console.log('addMeToPotentialFriend - Erreur de MAJ dans la collection \'members\' : ',error);   // Si erreur technique... Message et Plantage
					console.log('addMeToPotentialFriend - pFriendToAdd.friendEmail : ',pFriendToAdd.friendEmail)
					console.log('-------------------------------------------------------------')
					reject(error);
					throw error;
				};
			});

			resolve(true);
		});
	};

	// ---------------------------------------------------------------------------------------------------------------------------
	// Promesse d'ajout de mon futur Ami dans mon record
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.addPotentialFriendToMe = function(pFriendToAdd){
		return new Promise((resolve, reject) => {
			let vFriendToAdd = {
				friendPseudo 				 : pFriendToAdd.friendPseudo,
				pendingFriendRequest : cstInvitEncours,
				friendEmail		 			 : pFriendToAdd.friendEmail,
				friendPhoto					 : pFriendToAdd.friendPhoto,
			}

			vDBMgr.collectionMembers.updateOne(
			{ 'email': pFriendToAdd.myEmail, },
			{ $push: { amis : vFriendToAdd, } }, 
			(error) => {
				if (error) {
					console.log('-------------------------------------------------------------');
					console.log('addPotentialFriendToMe - Erreur de MAJ dans la collection \'members\' : ',error);   // Si erreur technique... Message et Plantage
					console.log('addPotentialFriendToMe - pFriendToAdd.myEmail : ',pFriendToAdd.myEmail);
					console.log('-------------------------------------------------------------');
					reject(error);
					throw error;
				};
			});

			resolve(true);
		});
	};

	// ---------------------------------------------------------------------------------------------------------------------------
	// Gestion d'une invitation directe (Non recommandée)
	// 2 steps update :
	// 1) Moi-meme avec le pseudo de celui que j'ai invité
	// 2) Celui que j'ai invité avec mon pseudo
	// 3) Si le receveur est connecté, Affichage incrémenté en temps réel sur son profil
	// Emission de mail au receveur
	// Envoi d'une notification au demandeur
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.invitationSent = function(pFriendToAdd, pWebSocketConnection, pSocketIo){
		this.addPotentialFriendToMe(pFriendToAdd)
		.then(() => {
			this.addMeToPotentialFriend(pFriendToAdd)
			.then(() => {
				this.sendEMail(
					pFriendToAdd.friendEmail, 
					'Collect\'Or - Notification de demande d\'ami', 
					'<h1 style="color: black;">Vous avez reçu une demande d\'ami</h1><br />' +
					'<p><strong>'+pFriendToAdd.myPseudo+'</strong> souhaite devenir votre ami sur le site Collect\'Or.<p><br />'+
					'<p>Vous pouvez accepter ou refuser sa demande.</p>'+
					'<br /><br /><br /><i>Vil-Coyote Products</i>'
				);
	
				// Recherche du pseudo du futur ami dans le tableau des membres connectés car s'il est connecté, je MAJ sa puce avec le Nombre (incrémenté) d'invitations
				let myIndex = this.searchMemberInTableOfMembers('pseudo', pFriendToAdd.friendPseudo);
	
				if (myIndex !== -1){  																													// Si membre trouvé dans la table des membres actuellement connectés
					this.objectPopulation.members[myIndex].nbrWaitingInvit++;  										// On ajoute +1 à son Nbre d'invitations en memoire vive
					
					// Envoi à ce membre seul de la demande de MAJ de son Nbre d'invitations
					pSocketIo.to(this.objectPopulation.members[myIndex].idSocket).emit('updatePuceNbreInvitations',this.objectPopulation.members[myIndex].nbrWaitingInvit);     
				}
				
				// Envoi au client de la demande d'affichage de la notification d'envoi de la demande d'ami
				pWebSocketConnection.emit('displayNotifInvitationSent',pFriendToAdd); 			
			});
		});
	};

	// ---------------------------------------------------------------------------------------------------------------------------
	// Préparation de la liste des invitations à traiter
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.readFriends = function(pMyEmail){
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
					console.log('-------------------------------------------------------------');
					console.log('readFriends - Erreur de lecture dans la collection \'members\' : ',error);   // Si erreur technique... Message et Plantage
					console.log('readFriends - pFriendToAdd.friendEmail : ',pFriendToAdd.friendEmail);
					console.log('-------------------------------------------------------------');
					reject(error);
					throw error;
				};

				if(!documents.length) {
					reject('pas de docs --> Anormal')
				};

				resolve(documents);
			});
		});
	};

	// ---------------------------------------------------------------------------------------------------------------------------
	// Constitution de la liste des membres qui m'ont envoyé une invitation que je n'ai toujours pas confirmé "cstAttenteConfirm"
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.listInvitations = function(pMyEmail, pWebSocketConnection){
		this.readFriends(pMyEmail)
		.then(documents => {
			let vWaitingInvit = documents[0].amis.filter(this.filterWaitingInvit); // Filtre les demandes d'invitation que l'on m'a envoyées

			if (vWaitingInvit.length === 0){
				return pWebSocketConnection.emit('emptyWaitingInvitation'); 			// Il n'y pas de membres pouvant devenir amis ==> La liste est vide, on signale et abandonne 
			} else {
				return pWebSocketConnection.emit('displayWaitingInvitation',vWaitingInvit); // Affichage des membres ayant envoyé des invitations
			};
		});
	};

	// ---------------------------------------------------------------------------------------------------------------------------
	// MAJ du statut du demandeur dans ma propre liste d'amis --> cstAmiConfirme => Le demandeur devient un ami confirmé
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.acceptFriendIntoMyFriendList = function(pSelectedInvit){
		return new Promise((resolve, reject) => {
			let vFriendPseudo = this.splitFriendFromCombo(pSelectedInvit.friendPseudo);

			vDBMgr.collectionMembers.updateOne(                                                   
			{ 
				'email': pSelectedInvit.myEmail,
				'amis.friendPseudo' : pSelectedInvit.friendPseudo
			},
			{ 
				$set: 
				{
					'amis.$.friendPseudo' : vFriendPseudo,
					'amis.$.pendingFriendRequest' : cstAmiConfirme,
				} 
			},(error) => {
				if (error) {
					console.log('-------------------------------------------------------------');
					console.log('acceptFriendIntoMyFriendList - Erreur de MAJ dans la collection \'members\' : ',error);   // Si erreur technique... Message et Plantage
					console.log('acceptFriendIntoMyFriendList - pSelectedInvit.myEmail : ',pSelectedInvit.myEmail);
					console.log('acceptFriendIntoMyFriendList - pSelectedInvit.friendPseudo : ',pSelectedInvit.friendPseudo)
					console.log('-------------------------------------------------------------');
					reject(error);
					throw error;
				};

				resolve('Ami MAJ dans ma liste d\amis');
			});
		});
	};

	// ---------------------------------------------------------------------------------------------------------------------------
	// MAJ de mon statut dans la liste d'amis du demandeur --> cstAmiConfirme => Je deviens ami confirmé du demandeur
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.acceptMeIntoFriendList = function(pSelectedInvit){
		return new Promise((resolve, reject) => {
			vDBMgr.collectionMembers.updateOne(                                                   
			{ 
				'email': pSelectedInvit.friendEmail,
				'amis.friendPseudo' : pSelectedInvit.myPseudo
			},
			{ 
				$set: {'amis.$.pendingFriendRequest' : cstAmiConfirme} 
			},(error) => {
				if (error) {
					console.log('-------------------------------------------------------------');
					console.log('acceptMeIntoFriendList - Erreur de MAJ dans la collection \'members\' : ',error);   // Si erreur technique... Message et Plantage
					console.log('acceptMeIntoFriendList - pSelectedInvit.friendEmail : ',pSelectedInvit.friendEmail);
					console.log('acceptMeIntoFriendList - pSelectedInvit.myPseudo : ',pSelectedInvit.myPseudo)
					console.log('-------------------------------------------------------------');
					reject(error);
					throw error;
				};

				resolve('Mon statut d\'Ami MAJ dans la liste de mon ami');
			});		
		});
	};

	// ---------------------------------------------------------------------------------------------------------------------------
	// Acceptation d'une invitation :
	// MAJ du statut du demandeur dans ma propre liste d'amis --> cstAmiConfirme
	// MAJ chez le demandeur de mon propre statut dans sa liste d'amis --> cstAmiConfirme
	// Envoi d'une Notification d'opération effectuée
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.acceptInvitation = function(pSelectedInvit, pWebSocketConnection, pSocketIo){
		this.acceptFriendIntoMyFriendList(pSelectedInvit)
		.then(() => {
			this.acceptMeIntoFriendList(pSelectedInvit)
			.then(() => {
				// Recherche de mon pseudo dans le tableau des membres connectés car je vais MAJ ma puce avec le Nombre (décrémenté) d'invitations
				let myIndex = this.searchMemberInTableOfMembers('pseudo', pSelectedInvit.myPseudo);
		
				this.objectPopulation.members[myIndex].nbrWaitingInvit--;  										// On retire 1 à mon Nbre d'invitations en memoire vive 

				// Envoi à moi-même de la MAJ de mon Nbre d'invitations
				pWebSocketConnection.emit('updatePuceNbreInvitations',this.objectPopulation.members[myIndex].nbrWaitingInvit);     
		
				let vFriendPseudo = this.splitFriendFromCombo(pSelectedInvit.friendPseudo);
				pSelectedInvit.friendPseudo = vFriendPseudo;

				// Lecture des infos complémentaires de mon nouvel ami (Nom + prénom) pour alimenter ma liste d'amis coté client
				this.getFriendInfos(pSelectedInvit)
				.then((document) => {
					pSelectedInvit.friendFirstName	= document.etatCivil.firstName;
					pSelectedInvit.friendName 			= document.etatCivil.name;

					// Envoi à moi-même de la demande d'affichage de la notification d'invitation acceptée
					pWebSocketConnection.emit('displayNotifInvitationValided',pSelectedInvit); 	
			
					// Recherche du pseudo de mon nouvel ami dans le tableau des membres connectés car s'il est connecté, j'ajoute mon Avatar dans sa Carte "Liste d'Amis" en temps réel
					myIndex = this.searchMemberInTableOfMembers('pseudo', pSelectedInvit.friendPseudo);
			
					// Si membre trouvé dans la table des membres actuellement connectés
					// Envoi à ce membre seul, de la demande d'ajout de mon Avatar dans sa liste d'amis
					if (myIndex !== -1){  																													
						let vReversedRoles = {
							myEmail 			: pSelectedInvit.friendEmail,
							myPseudo			:	pSelectedInvit.friendPseudo,
							myPhoto				: pSelectedInvit.friendPhoto,
							friendEmail  	: pSelectedInvit.myEmail,
							friendPseudo 	: pSelectedInvit.myPseudo,
							friendPhoto 	: pSelectedInvit.myPhoto,
							friendFirstName	: this.member.etatCivil.firstName,			// Ajout du complément des mes infos personnelles pour que mon nouvel Ami puisse les afficher
							friendName 			: this.member.etatCivil.name,						//		""						""					""					""					""					""					""					""
							indexInvitation	: pSelectedInvit.indexInvitation,			 
						}
			
						pSocketIo.to(this.objectPopulation.members[myIndex].idSocket).emit('addFriendIntoHisList',vReversedRoles);     
					};
			
					this.sendEMail(
						pSelectedInvit.friendEmail, 
						'Collect\'Or - Acceptation de votre demande d\'ami', 
						'<h1 style="color: black;">Vous avez un nouvel ami</h1><br />' +
						'<p><strong>'+pSelectedInvit.myPseudo+'</strong> a accepté de devenir votre ami sur le site Collect\'Or.<p><br />'+
						'<br /><br /><br /><i>Vil-Coyote Products</i>'
					);
				});
			});
		});
	};

	// ---------------------------------------------------------------------------------------------------------------------------
	// Suppression du demandeur dans ma propre liste d'amis
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.deleteFriendIntoMyFriendList = function(pSelectedInvit){
		return new Promise((resolve, reject) => {

			vDBMgr.collectionMembers.updateOne(
			{ 
				'email': pSelectedInvit.myEmail,
			},
			{ $pull: 
				{ amis: 
					{ friendPseudo: pSelectedInvit.friendPseudo }
				}
			},(error) => {
				if (error) {
					console.log('-------------------------------------------------------------');
					console.log('deleteFriendIntoMyFriendList - Erreur de MAJ dans la collection \'members\' : ',error);   // Si erreur technique... Message et Plantage
					console.log('deleteFriendIntoMyFriendList - pSelectedInvit.myEmail : ',pSelectedInvit.myEmail);
					console.log('-------------------------------------------------------------');
					reject(error);
					throw error;
				};

				resolve('Demandeur supprimé de ma liste d\amis');
			});		
		});
	};

	// ---------------------------------------------------------------------------------------------------------------------------
	// / MAJ de mon statut dans la liste d'amis du demandeur --> cstAmiConfirme => Je deviens ami confirmé du demandeur
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.deleteMeIntoFriendList = function(pSelectedInvit){
		return new Promise((resolve, reject) => {
			vDBMgr.collectionMembers.updateOne(
			{ 
				'email': pSelectedInvit.friendEmail,
			},
			{ $pull: 
				{ amis: 
					{ friendPseudo: pSelectedInvit.myPseudo }
				}
			},(error) => {
				if (error) {
					console.log('-------------------------------------------------------------');
					console.log('deleteMeIntoFriendList - Erreur de MAJ dans la collection \'members\' : ',error);   // Si erreur technique... Message et Plantage
					console.log('deleteMeIntoFriendList - pSelectedInvit.friendEmail : ',pSelectedInvit.friendEmail);
					console.log('-------------------------------------------------------------');
					reject(error);
					throw error;
				};

				resolve('Suppression de moi-même de la liste du demandeur');
			});		
		});
	};

	// ---------------------------------------------------------------------------------------------------------------------------
	// Rejet d'une invitation :
	// Suppression du demandeur dans ma propre liste d'amis
	// Suppression de moi-même  dans la liste d'amis du demandeur
	// Envoi d'une Notification d'opération effectuée
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.refuseInvitation = function(pSelectedInvit, pWebSocketConnection, pSocketIo){
		this.deleteFriendIntoMyFriendList(pSelectedInvit)
		.then(() => {
			this.deleteMeIntoFriendList(pSelectedInvit)
			.then(() => {
				// Recherche de mon pseudo dans le tableau des membres connectés car je vais MAJ ma puce avec le Nombre (décrémenté) d'invitations
				let myIndex = this.searchMemberInTableOfMembers('pseudo', pSelectedInvit.myPseudo);
	
				this.objectPopulation.members[myIndex].nbrWaitingInvit--;  										// On retire 1 à mon Nbre d'invitations en memoire vive 
	
				// Envoi à moi-même de la MAJ de mon Nbre d'invitations
				pWebSocketConnection.emit('updatePuceNbreInvitations',this.objectPopulation.members[myIndex].nbrWaitingInvit);     
					
				// Envoi à moi-même de la demande d'affichage de la notification du refus de l'invitation
				pWebSocketConnection.emit('displayNotifInvitationRefused',pSelectedInvit); 	
				
				// Recherche du pseudo du membre que je refuse dans le tableau des membres connectés car s'il est connecté, je supprime mon Avatar dans sa Carte "Invitations lancées" en temps réel
				myIndex = this.searchMemberInTableOfMembers('pseudo', pSelectedInvit.friendPseudo);
		
				// Si membre trouvé dans la table des membres actuellement connectés
				// Envoi à ce membre seul, de la demande de suppression de mon Avatar dans sa liste d'invitations envoyées
				if (myIndex !== -1){  																													
					let vReversedRoles = {
						myEmail 			: pSelectedInvit.friendEmail,
						myPseudo			:	pSelectedInvit.friendPseudo,
						myPhoto				: pSelectedInvit.friendPhoto,
						friendEmail  	: pSelectedInvit.myEmail,
						friendPseudo 	: pSelectedInvit.myPseudo,
						friendPhoto 	: pSelectedInvit.myPhoto,
						indexInvitation	: pSelectedInvit.indexInvitation,			 
					}
		
					pSocketIo.to(this.objectPopulation.members[myIndex].idSocket).emit('deleteInvitedMemberFromMyInvitSentList',vReversedRoles);     
				};

				this.sendEMail(
					pSelectedInvit.friendEmail, 
					'Collect\'Or - Rejet de votre demande d\'ami', 
					'<h1 style="color: black;">Votre demande d\'ami a été rejetée</h1><br />' +
					'<p><strong>'+pSelectedInvit.myPseudo+'</strong> ne souhaite pas devenir votre ami sur le site Collect\'Or.<p><br />'+
					'<br /><br /><br /><i>Vil-Coyote Products</i>'
				);
			});
		});
	};

	// ---------------------------------------------------------------------------------------------------------------------------
	// Suppression d'un ami
	// Suppression de l'ami dans ma propre liste d'amis
	// Suppression de moi-même dans la liste d'amis de mon ami
	// Envoi d'une Notification d'opération effectuée
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.deleteFriendOfMine = function(pFriendToDelete, pWebSocketConnection, pSocketIo){
		this.deleteFriendIntoMyFriendList(pFriendToDelete)
		.then(() => {
			this.deleteMeIntoFriendList(pFriendToDelete)
			.then(() => {

				// Envoi à moi-même de la demande de suppression de l'Avatar de mon ex-ami dans ma liste d'amis
				pWebSocketConnection.emit('deleteFriendFromMyFriendList',pFriendToDelete);     

				// Recherche du pseudo de mon ex-ami dans le tableau des membres connectés car s'il est connecté, je supprime mon Avatar dans sa Carte "Liste d'Amis" en temps réel
				myIndex = this.searchMemberInTableOfMembers('pseudo', pFriendToDelete.friendPseudo);
		
				// Si membre trouvé dans la table des membres actuellement connectés
				// Envoi à ce membre seul, de la demande de suppression de mon Avatar dans sa liste d'amis
				if (myIndex !== -1){  																													
					let vReversedRoles = {
						myEmail 			: pFriendToDelete.friendEmail,
						myPseudo			:	pFriendToDelete.friendPseudo,
						friendEmail  	: pFriendToDelete.myEmail,
						friendPseudo 	: pFriendToDelete.myPseudo,
					}
		
					pSocketIo.to(this.objectPopulation.members[myIndex].idSocket).emit('deleteMeFromHisFriendList',vReversedRoles);     
				};

				this.sendEMail(
					pFriendToDelete.friendEmail, 
					'Collect\'Or - Suppression de la liste d\'un ami', 
					'<h1 style="color: black;">Un ami vous a supprimé de sa liste d\'amis</h1><br />' +
					'<p><strong>'+pFriendToDelete.myPseudo+'</strong> ne souhaite plus être votre ami sur le site Collect\'Or.<p><br />'+
					'<br /><br /><br /><i>Vil-Coyote Products</i>'
				);
			});
		});
	};

	// ---------------------------------------------------------------------------------------------------------------------------
	// Annulation d'une invitatiion
	// Suppression du membre dans ma propre liste d'amis
	// Suppression de moi-même dans la liste d'amis du mmebre qui avait été invité
	// Envoi d'une Notification d'opération effectuée
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.cancelInvitation = function(pcancelInvitSent, pWebSocketConnection, pSocketIo){

console.log('------------------------------------------------------------------')
console.log('cancelInvitation - pcancelInvitSent : ',pcancelInvitSent)
console.log('------------------------------------------------------------------')

		this.deleteFriendIntoMyFriendList(pcancelInvitSent)
		.then(() => {
			this.deleteMeIntoFriendList(pcancelInvitSent)
			.then(() => {

				// Envoi à moi-même de la demande de suppression de l'Avatar de l'ami qui avait reçu l'invitation
				pWebSocketConnection.emit('deleteInvitedMemberFromMyInvitSentList',pcancelInvitSent);     

				// Recherche du pseudo de mon ex-ami dans le tableau des membres connectés car s'il est connecté, je déduis 1 de son nombre d'invitations reçues à traiter
				myIndex = this.searchMemberInTableOfMembers('pseudo', pcancelInvitSent.friendPseudo);

				if (myIndex !== -1){  																													// Si membre trouvé dans la table des membres actuellement connectés
					this.objectPopulation.members[myIndex].nbrWaitingInvit--;  										// On retire 1 à son Nbre d'invitations en memoire vive
					
					// Envoi à ce membre seul de la demande de MAJ de son Nbre d'invitations
					pSocketIo.to(this.objectPopulation.members[myIndex].idSocket).emit('updatePuceNbreInvitations',this.objectPopulation.members[myIndex].nbrWaitingInvit);     
				}

				this.sendEMail(
					pcancelInvitSent.friendEmail, 
					'Collect\'Or - Annulation d\'une invitation', 
					'<h1 style="color: black;">Un membre a annulé l\'invitation qu\'il vous avait envoyé</h1><br />' +
					'<p><strong>'+pcancelInvitSent.myPseudo+'</strong> ne souhaite plus devenir votre ami sur le site Collect\'Or.<p><br />'+
					'<br /><br /><br /><i>Vil-Coyote Products</i>'
				);
			});
		});
	};

	// ***************************************************************************************************************************
	// 															Gestion des recommandations
	// ***************************************************************************************************************************
	// ---------------------------------------------------------------------------------------------------------------------------
	// Filtrage de tous les membres de la BDD, selon les critères suivants
	// - L'ami ne peux pas être son propre ami --> Rejet
	// - Les membres dejà amis --> Rejet
	// - Les membres ayant reçu une invitation (invitation en cours = "Ami" non confirmé) --> Rejet
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.filterFriendsRecommendable = function(pFriendToRecommendFriendsList, pFriendToRecommendPseudo, pMySelfFilteringOneFriend){
		let result = true;

		// Si l'ami en cours de filtrage est celui que je veux recommander, je ne vais pas l'afficher dans la liste des amis-cibles des recommandations --> Rejet
		if (pMySelfFilteringOneFriend.friendPseudo === pFriendToRecommendPseudo){  
			result = false;
		} else {
			// Vérifie que mon ami n'est pas dans la liste d'amis (potentiels ou confirmés)
			let myIndex = pFriendToRecommendFriendsList.indexOf(pMySelfFilteringOneFriend.friendPseudo);

			if (myIndex > -1){		// Si je suis dejà un ami potentiel ou confirmé du membre en cours de lecture, je rejete le membre de la liste d'amis potentiel
				result = false;
			};
		};

		return result ? pMySelfFilteringOneFriend : undefined;
	};

	// ---------------------------------------------------------------------------------------------------------------------------
	// Dans le cadre des recommandations, vérification que chacun de mes amis n'est pas déja en process d'invitation avec l'ami que je recommande
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.searchFriendsNotAlreadyInvitWithTargetFriend = function(pRecommendFriendsList, pWebSocketConnection){
		this.readFriends(pRecommendFriendsList.friendEmail)
		.then(documents => {
			let vRecommendedFriendCleanFriendsList =  documents[0].amis.map((propertyFilter) => { // Extraction du champ 'FriendPseudo' des objets de l'Array 'amis'
				return propertyFilter['friendPseudo'];
			})
			.map(this.splitFriendFromCombo);																											// Nettoyage des combo "AmiRecommandé/AmiRecommandeur"

			let vRecommendableFriendsList = pRecommendFriendsList.myFriendList.filter(this.filterFriendsRecommendable.bind(this, vRecommendedFriendCleanFriendsList, documents[0].pseudo)); 

// Gardé pour Historique
// Bout de code correspondant à l'ancienne formulation où j'affichais une Modale Générique pour 
// dire qu'il n'y avait aucun ami-cible à qui recommander mon ami
// 
// if (vRecommendableFriendsList.length === 0){
// 	// Il n'y pas d'amis à qui on peut recommander mon ami ==> La liste est vide, on signale et abandonne 
// 	return pWebSocketConnection.emit('emptyRecommendableFriendList',pRecommendFriendsList); 
// } else {
	
				// Affichage des amis à qui on peut recommander mon ami
				vRecommendableFriends = {
					recommendedFriendEmail 		: pRecommendFriendsList.friendEmail,
					recommendedFriendPseudo 	: pRecommendFriendsList.friendPseudo,
					recommendedFriendPhoto 		: pRecommendFriendsList.friendPhoto,
					recommendableFriendsList 	:	vRecommendableFriendsList,
					indexFriendToRecommend		: pRecommendFriendsList.indexFriendToRecommend,
				}
				return pWebSocketConnection.emit('displayRecommendableFriendList',vRecommendableFriends); 
// }
		});	
	};

  // ---------------------------------------------------------------------------------------------------------------------------
	// Promesse d'ajout de l'ami que je recommande dans la liste d'amis de l'Ami-cible
	// A noter : Je concatene le pseudo de l'ami que je recommande avec le mien, séparé par "/"
	// Exemple : "Mathos/BugsDomi"
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.addRecommendedFriendToTargetFriend = function(pFriendToAdd){
		return new Promise((resolve, reject) => {
			let vFriendToAdd = {
				friendPseudo 				 : pFriendToAdd.friendPseudo+'/'+pFriendToAdd.myPseudo,
				pendingFriendRequest : cstAttenteConfirm,
				friendEmail					 : pFriendToAdd.friendEmail,
				friendPhoto					 : pFriendToAdd.friendPhoto,
			}

			vDBMgr.collectionMembers.updateOne(
			{ 'email': pFriendToAdd.targetFriendEmail, },
			{ $push: { amis : vFriendToAdd, } }, 
			(error) => {
				if (error) {
					console.log('-------------------------------------------------------------');
					console.log('addRecommendedFriendToTargetFriend - Erreur de MAJ dans la collection \'members\' : ',error);   // Si erreur technique... Message et Plantage
					console.log('addRecommendedFriendToTargetFriend - pFriendToAdd.friendEmail : ',pFriendToAdd.friendEmail);
					console.log('-------------------------------------------------------------');
					reject(error);
					throw error;
				};
			});

			return resolve(true);
		});
	};

  // ---------------------------------------------------------------------------------------------------------------------------
	// Promesse d'ajout de l'Ami-cible de la recommandation dans le record de l'ami que je recommandde
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.addTargetFriendToRecommendedFriend = function(pFriendToAdd){
		return new Promise((resolve, reject) => {
			let vFriendToAdd = {
				friendPseudo 				 : pFriendToAdd.targetFriendPseudo,		// Ami-cible à qui je fais la recommandation
				pendingFriendRequest : cstInvitEncours,
				friendEmail		 			 : pFriendToAdd.targetFriendEmail,
				friendPhoto					 : pFriendToAdd.targetFriendPhoto,
			}

			vDBMgr.collectionMembers.updateOne(
			{ 'email': pFriendToAdd.friendEmail, },											// Ami que je recommande
			{ $push: { amis : vFriendToAdd, } }, 
			(error) => {
				if (error) {
					console.log('-------------------------------------------------------------');
					console.log('addTargetFriendToRecommendedFriend - Erreur de MAJ dans la collection \'members\' : ',error);   // Si erreur technique... Message et Plantage
					console.log('addTargetFriendToRecommendedFriend - pFriendToAdd.friendEmail : ',pFriendToAdd.friendEmail)
					console.log('-------------------------------------------------------------');
					reject(error);
					throw error;
				};
			});

			return resolve(true);
		});
	};
  
  // ---------------------------------------------------------------------------------------------------------------------------
	// Gestion d'une recommandation
	// 2 steps update :
	// 1) L'ami que je recommande avec le pseudo de celui à qui je l'ai recommandé (l'ami-cible)
	// 2) L'ami-cible à qui je fais la recommandation avec le pseudo de l'ami que je recommande
	// 3) Si le receveur est connecté, Affichage incrémenté en temps réel sur son profil
	// Emission de mail au receveur
  // Emission de mail à l'ami recommandé
	// Envoi d'une notification au recommandeur (Moi)
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.recommendationSent = function(pFriendToAdd, pWebSocketConnection, pSocketIo){
		this.addTargetFriendToRecommendedFriend(pFriendToAdd)
		.then(() => {
			this.addRecommendedFriendToTargetFriend(pFriendToAdd)
		})
		.then(() => {
			this.sendEMail(											// Mail envoyé à l'ami-cible
				pFriendToAdd.targetFriendEmail, 
				'Collect\'Or - Recommandation d\'ami', 
				'<h1 style="color: black;">Vous avez reçu une recommandation d\'ami de la part de '+pFriendToAdd.myPseudo+'</h1><br />' +
				'<p><strong>'+pFriendToAdd.myPseudo+'</strong> vous recommande <strong>'+pFriendToAdd.friendPseudo+'</strong> pour devenir votre ami sur le site Collect\'Or.<p><br />'+
				'<p>Vous pouvez accepter ou refuser sa recommandation.</p>'+
				'<br /><br /><br /><i>Vil-Coyote Products</i>'
			);

			this.sendEMail(											// Mail envoyé à l'ami recommandé
				pFriendToAdd.friendEmail, 
				'Collect\'Or - Vous avez été recommandé en tant qu\'ami', 
				'<h1 style="color: black;">Vous avez été une recommandé en tant qu\'ami de la part de '+pFriendToAdd.myPseudo+'</h1><br />' +
				'<p><strong>'+pFriendToAdd.myPseudo+'</strong> vous a recommandé à <strong>'+pFriendToAdd.targetFriendPseudo+'</strong> pour devenir son ami sur le site Collect\'Or.<p><br />'+
				'<p>Cependant, il peut accepter ou refuser cette recommandation.</p>'+
				'<br /><br /><br /><i>Vil-Coyote Products</i>'
			);

			// Recherche du pseudo de l'ami-cible dans le tableau des membres connectés car s'il est connecté, je MAJ sa puce avec le Nombre (incrémenté) d'invitations
			let myIndex = this.searchMemberInTableOfMembers('pseudo', pFriendToAdd.targetFriendPseudo);

			if (myIndex !== -1){  																													// Si membre trouvé dans la table des membres actuellement connectés
				this.objectPopulation.members[myIndex].nbrWaitingInvit++;  										// On ajoute +1 à son Nbre d'invitations en memoire vive
				
				// Envoi à ce membre seul, la demande de MAJ de son Nbre d'invitations
				pSocketIo.to(this.objectPopulation.members[myIndex].idSocket).emit('updatePuceNbreInvitations',this.objectPopulation.members[myIndex].nbrWaitingInvit);     
			};
			
			// Envoi au client de la demande d'affichage de la notification d'envoi de la demande d'ami
			pWebSocketConnection.emit('displayNotifRecommendationSent',pFriendToAdd); 			
		});
	};











	// ***************************************************************************************************************************
	// 															Gestion de la fiche de "Renseignements"
	// ***************************************************************************************************************************


	// ---------------------------------------------------------------------------------------------------------------------------
	// MAJ du nom du fichier de l'image de mon avatar dans chacun de mes amis
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.updateAvatarInOneFriend = function(pMyFriend){
		return new Promise((resolve, reject) => {
	
		vDBMgr.collectionMembers.findOneAndUpdate(                                                   
		{ 
			'email'							: pMyFriend.friendEmail,
			'amis.friendPseudo' : pMyFriend.myPseudo
		},
		{ 
			$set: {'amis.$.friendPhoto' : pMyFriend.myPhoto} 
		},(error) => {
				if (error) {
					console.log('-------------------------------------------------------------');
					console.log('updateAvatarInOneFriend - Erreur de MAJ dans la collection \'members\' : ',error);   // Si erreur technique... Message et Plantage
					console.log('updateAvatarInOneFriend - pMyFriend.friendEmail : ',pMyFriend.friendEmail);
					console.log('-------------------------------------------------------------');
					reject(error);
					throw error;
				};

			resolve('Avatar MAJ');
			});		
		});
	};

	// ---------------------------------------------------------------------------------------------------------------------------
	// J'explore ma liste d'amis (confirmés ou en cours) pour MAJ mon avatar dans leur record me concernant
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.updateAvatarInMyFriends = function (pDataProfilMembre, pPhoto){

		let vMyFriend = {
			friendEmail : null,
			myPseudo 		: null,
			myPhoto 		: null,
		}

		pDataProfilMembre.amis.forEach((item) => {					// Pour chacun de mes amis (confirmés ou non) en BDD
			vMyFriend.friendEmail = item.friendEmail;
			vMyFriend.myPseudo = pDataProfilMembre.pseudo;
			vMyFriend.myPhoto = pPhoto;

			this.updateAvatarInOneFriend(vMyFriend);								// Je MAJ mon avatar dans son record
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

		this.updateDataInBDD(myDataSet)
		.then( () => {
			// On MAJ le nom du fichier de l'image de l'avatar pour les éventuels amis
			this.updateAvatarInMyFriends(pDataProfilMembre, myDataSet.etatCivil.photo);

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
					'Vos identifiants sont : <p><strong>Pseudonyme : </strong>'+pDataProfilMembre.pseudo+'<p><strong>Mot de passe : </strong>'+pDataProfilMembre.password +
					'</p><br /><br /><br /><i>Vil-Coyote Products</i>'
				);
			};
		});
	};


	// ---------------------------------------------------------------------------------------------------------------------------
	// Deconnexion d'un visiteur et eventuellement d'un membre  :
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.disconnectMember = function(pWebSocketConnection, pSocketIo){
		let myIndex = this.searchMemberInTableOfMembers('idSocket' ,pWebSocketConnection.id);

		if (this.objectPopulation.members[myIndex].isMember){                 // Le visiteur qui se deconnecte était un membre
			this.objectPopulation.nbrMembersInSession--;                        // Nombre de visiteurs incluant les [membres + Admins]
			
			if (this.objectPopulation.members[myIndex].role < cstMembre){       // Il s'agit obligatoiremennt d'un Admin ou Super-Admin
				this.objectPopulation.nbrAdminsInSessions--;                      // Si le memnbre est un Admin, on retire 1 aux nombre d'Admin connectés
			};
		};

		this.objectPopulation.members.splice(myIndex, 1);   // Efface l'occurence du membre du tableau des membres connectés
		this.objectPopulation.nbrConnections--;
		this.UpdateDisplayPopulation(pSocketIo);

		console.log('--------------------------------------------------------------------------------------------------------------------');
		console.log('disconnectMember 0 : Nbre de visiteurs : ', this.objectPopulation.nbrConnections);
		console.log('disconnectMember 0 : Nbre de membres : ',this.objectPopulation.nbrMembersInSession);
		console.log('disconnectMember 0 : Nbre d\'Admin : ',this.objectPopulation.nbrAdminsInSessions);
		console.log('--------------------------------------------------------------------------------------------------------------------');
		console.log('disconnectMember 0 : objectPopulation.members.length : ',this.objectPopulation.members.length);
		console.log('disconnectMember 0 : objectPopulation.members : ',this.objectPopulation.members);
		console.log('--------------------------------------------------------------------------------------------------------------------');
	};

	// ---------------------------------------------------------------------------------------------------------------------------
	// Initialisation d'un visiteur :
	// 1) Stockage de son socket
	// 2) Mise a zero de tous les champs
	// 3) Ajout du visiteur dans le tableau global des personnes connectées
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.initVisiteur = function(pWebSocketConnection, pSocketIo){

	let memberLocal = 
	{
		idSocket  			: pWebSocketConnection.id,
		isMember  			: false,
		email     			: '',
		pseudo    			: '',
		role						: 0,
		nbrWaitingInvit : 0,
	}

	console.log('--------------------------------------------------------------------------------------------------------------------');
	console.log('initVisiteur 0 : Nbre de visiteurs : ', this.objectPopulation.nbrConnections);
	console.log('initVisiteur 0 : Nbre de membres : ',this.objectPopulation.nbrMembersInSession);
	console.log('initVisiteur 0 : Nbre d\'Admin : ',this.objectPopulation.nbrAdminsInSessions);
	console.log('--------------------------------------------------------------------------------------------------------------------');
	console.log('initVisiteur 0 : objectPopulation.members.length : ',this.objectPopulation.members.length);
	console.log('initVisiteur 0 : objectPopulation.members : ',this.objectPopulation.members);
	console.log('--------------------------------------------------------------------------------------------------------------------');

	this.objectPopulation.members.push(memberLocal);
	this.objectPopulation.nbrConnections++;             // Nombre de visiteurs incluant les [membres + Admins]
	this.UpdateDisplayPopulation(pSocketIo);

	console.log('--------------------------------------------------------------------------------------------------------------------');
	console.log('initVisiteur 1 : Nbre de visiteurs : ', this.objectPopulation.nbrConnections);
	console.log('initVisiteur 1 : Nbre de membres : ',this.objectPopulation.nbrMembersInSession);
	console.log('initVisiteur 1 : Nbre d\'Admin : ',this.objectPopulation.nbrAdminsInSessions);
	console.log('--------------------------------------------------------------------------------------------------------------------');
	console.log('initVisiteur 1 : objectPopulation.members.length : ',this.objectPopulation.members.length);
	console.log('initVisiteur 1 : objectPopulation.members : ',this.objectPopulation.members);
	console.log('--------------------------------------------------------------------------------------------------------------------');
	};

	// ---------------------------------------------------------------------------------------------------------------------------
	// Au lancement du serveur, on tente de lire le Nbre de messages publics stockés dans la BDD, si KO, on initialise a 0
	// On en profite poour initialiser toutes les variables de population à 0
	// ---------------------------------------------------------------------------------------------------------------------------
	MemberServer.prototype.initNbrPublicMsgs = function(){
		return new Promise((resolve, reject) => {
			vDBMgr.collectionTechnical.find()
			.limit(1)
			.toArray((error, documents) => {
				if (error) {
					console.log('-------------------------------------------------------------');
					console.log('initNbrPublicMsgs - Erreur de lecture dans la collection \'technical\' : ',error);   // Si erreur technique... Message et Plantage
					console.log('initNbrPublicMsgs - Pas de clé --> Normal');
					console.log('-------------------------------------------------------------');
					reject(error);
					throw error;
				};

				if (documents.length) {
					this.nbrPublicMsgs = documents[0].nbrPublicMsgs;                    
				} else {
					this.nbrPublicMsgs = 0;
				};

				this.objectPopulation.nbrConnections = 0;
				this.objectPopulation.nbrMembersInSession = 0;
				this.objectPopulation.nbrAdminsInSessions = 0;

				resolve('Ok')
			});
		});
	};
	
	// -------------------------------------------------------------------------
	// Verification de l'accessibilité de la base - Je ne le fais qu'au debut de l'appli, 
	// mais en tout état de cause, normalement, professionnellement, je devrais 
	// m'assurer qu'elle est toujours accessible en cours de partie, mais dans le 
	// contexte ultra-limité de cet atelier, ce n'est pas nécessaire
	// Si elle ne fonctionne pas, je sors de l'application, après avoir envoyé un message à la console
	// -------------------------------------------------------------------------
	MemberServer.prototype.checkDBConnect = function(){
		vDBMgr.checkDBConnect()
		.then((valeur) => {
			this.initNbrPublicMsgs();                // Mise en mémoire du Nbre de messages publics stockés en BDD
		});
	};
	// ------------------------------------------- Fin du module -------------------------------------------------------------------------
};
	// ------------------------------------------- Fin du module -------------------------------------------------------------------------