// *************************************************************************
// *** PostsServer : Objet représentant les Posts                        ***
// ***                                                                   ***
// *** Objet : PostsServer                                               ***
// ***                                                                   ***
// *** Cet objet sert à gérer :                                          ***
// ***                                                                   ***
// ***  Nécessite :                                                      ***
// ***      rien                                                         ***
// ***                                                                   ***
// *************************************************************************
// -------------------------------------------------------------------------
const cstMailFrom = 'collector@vcp.com';    // Adresse "From" du mail

module.exports = function PostsServer(pDBMgr, pSGMail, pMemberServer){  // Fonction constructeur exportée
	this.vDBMgr = pDBMgr;										// Récupération des infos de la BDD
  this.sgMail = pSGMail;									// Instance du gestionnaire de mails
  this.memberServer = pMemberServer;      // Instance pointant sur l'Objet "Membre"

	this.post = {
		postDate    		: null,							  // Heure de création du Post
		postTitle				: '',                 // Titre du Post
		postMsg					: '',                 // Message du Post
		authorPseudo 		: '',								  // Auteur (C'est toujours le membre lui-même qui écrit)
		authorPhoto			:	'',                 // Photo de l'auteur (Gardé pour éviter des accès supplémentaires à la collection "Members")
		postOwnerMail		: '',							    // Racine unique pour identifier les propriétaires des Posts
		postOwnerPseudo	: '',						      // Pseudo du Propriétaire d autres)
		postNumber			: 0,							    // N° des Posts du propriétaire
	}

	// ---------------------------------------------------------------------------------------------------------------------------
	// Envoi de mail générique en format HTML
	// ---------------------------------------------------------------------------------------------------------------------------
	PostsServer.prototype.sendEMail = function(pEMail, pSubject, pHTML){
		let messageToSend = {
			to       : pEMail,
			from     : cstMailFrom,
			subject  : pSubject,
			// text  : 'Félicitations\n\nVous êtes dorénavant membre de la Communauté \'Collect\'Or\'',      // Variante pour une version "Text" (Non HTML)
			html     : pHTML,
		}
		this.sgMail.send(messageToSend)
		.catch((error) => {
			console.log('--------------------------------------------------------------------------');
			console.log('Problème lors de l\'envoi d\'email à ',pEMail,' --- Sujet : ',pSubject);
			console.log('sendEMail - error.code : ',error.code);
			console.log('sendEMail - error.message : ',error.message);
			console.log('--------------------------------------------------------------------------');
		});;
	}

  // ---------------------------------------------------------------------------------------------------------------------------
	// MAJ du Nbre de messages dans le record technique
	// ---------------------------------------------------------------------------------------------------------------------------
  PostsServer.prototype.updateTechnicalRecord = function(){
		return new Promise((resolve, reject) => {

      this.vDBMgr.collectionTechnical.findOneAndUpdate(                                                   
      {},
      { $inc:  { nbrPublicMsgs: 1}}, 
      (error) => {
        if (error) {
          console.log('-------------------------------------------------------------');
          console.log('updateDataInBDD - Erreur de MAJ dans la collection \'members\' : ',error);   // Si erreur technique... Message et Plantage
          console.log('updateDataInBDD - Pas de clé - Normal ');
          console.log('-------------------------------------------------------------');
          reject(error);
          throw error;
        };

        resolve('Ok');
        console.log('MAJ du Record \'Technical\' dans la BDD - Incrémentation du Nbre de messages : ');  
      });
    });
  }  

  // ---------------------------------------------------------------------------------------------------------------------------
	// Prépare les données de population et les envoie à tous clients connectés
	// ---------------------------------------------------------------------------------------------------------------------------
	PostsServer.prototype.UpdateDisplayPopulation = function(pSocketIo){
		population = {
			nbrVisitors    : this.memberServer.objectPopulation.nbrConnections,
			nbrMembers     : this.memberServer.objectPopulation.nbrMembersInSession,
			nbrAdmins      : this.memberServer.objectPopulation.nbrAdminsInSessions,
			nbrPublicMsgs  : this.memberServer.nbrPublicMsgs,
		}  

		pSocketIo.emit('displayNbrConnectedMembers', population); // Affichage sur tous les clients de la MAJ du nombre de membres connectés
  }

  // ---------------------------------------------------------------------------------------------------------------------------
  // Ajout d'un Post dans la BDD
  // ---------------------------------------------------------------------------------------------------------------------------
  PostsServer.prototype.addPostInDatabase = function(pPostToAdd){
    return new Promise((resolve, reject) => {

      let postLocal = 
      {
        postDate    		: pPostToAdd.postDate,			      // Heure de création du Post
        postTitle				: pPostToAdd.postTitle,           // Titre du Post
        postMsg					: pPostToAdd.postMsg,             // Message du Post
        authorPseudo 		: pPostToAdd.authorPseudo,        // Auteur (C'est toujours le membre lui-même qui écrit)
        authorPhoto			:	pPostToAdd.authorPhoto,         // Photo de l'auteur (Gardé pour éviter des accès supplémentaires à la collection "Members")
        postOwnerMail		: pPostToAdd.postOwnerMail,		    // Racine unique pour identifier les propriétaires des Posts
        postOwnerPseudo	: pPostToAdd.postOwnerPseudo,			// Pseudo du Propriétaire d autres)
        postNumber			: pPostToAdd.postNumber,					// N° des Posts du propriétaire
      }

      this.vDBMgr.collectionMessages.insertOne(postLocal, (error) => {
        if (error){
          console.log('-------------------------------------------------------------');
          console.log('addPostInDatabase - Erreur d\'insertion dans la collection \'messages\' : ',error);   // Si erreur technique... Message et Plantage
          console.log('addPostInDatabase - pPostToAdd.postOwnerMail : ',pPostToAdd.postOwnerMail);
          console.log('addPostInDatabase - pPostToAdd.postNumber : ',pPostToAdd.postNumber);
          console.log('-------------------------------------------------------------');
          reject(error);
          throw error;
        } 

        this.post = postLocal;
        resolve('Ajout du Post --> Ok');
      });
    });
  };

  // ---------------------------------------------------------------------------------------------------------------------------
  // Ajout d'un Post dans la BDD
  // Envoyer un mail
  // MAj du record technique 
  // Affichage sur tous les membres connectés pour MAJ le Nbre de messages
  // ---------------------------------------------------------------------------------------------------------------------------
  PostsServer.prototype.addNewPost = function(pPostToAdd, pSocketIo){
    this.addPostInDatabase(pPostToAdd)
    .then(() => {
      this.sendEMail(
        pPostToAdd.postOwnerMail, 
        'Un message a été posté sur votre mur', 
        '<h1 style="color: black;">'+pPostToAdd.authorPseudo+' a publié un message public sur votre mur</h1><p><h2>Veuillez le vérifier, et éventuellement le supprimer.</h2><br />' +
        '</p><br /><br /><br /><i>Vil-Coyote Products</i>'
      );

      this.memberServer.nbrPublicMsgs++;
      this.updateTechnicalRecord()
      .then(() => {
        this.UpdateDisplayPopulation(pSocketIo);      // Affichage sur tous les postes du Nbre de messages publics
      });
    });
  }

	// ------------------------------------------- Fin du module -------------------------------------------------------------------------
};
	// ------------------------------------------- Fin du module -------------------------------------------------------------------------