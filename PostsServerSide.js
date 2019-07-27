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
const cstMainProfileActive = 'Main';        // Indique si c'est le profil du membre principal qui est affiché ou celui d'un de ses amis
const cstFriendProfileActive = 'Friend';    // Indique si c'est le profil d membre principal qui est affiché ou celui d'un de ses amis

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
  PostsServer.prototype.updateTechnicalRecord = function(pIncDec){
		return new Promise((resolve, reject) => {

      this.vDBMgr.collectionTechnical.findOneAndUpdate(                                                   
      {},
      { $inc:  { nbrPublicMsgs: pIncDec }}, 
      (error) => {
        if (error) {
          console.log('-------------------------------------------------------------');
          console.log('updateTechnicalRecord - Erreur de MAJ dans la collection \'members\' : ',error);   // Si erreur technique... Message et Plantage
          console.log('updateTechnicalRecord - Pas de clé - Normal ');
          console.log('-------------------------------------------------------------');
          reject(error);
          throw error;
        };
        resolve('Ok');
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
      }

      this.vDBMgr.collectionMessages.insertOne(postLocal, (error) => {
        if (error){
          console.log('-------------------------------------------------------------');
          console.log('addPostInDatabase - Erreur d\'insertion dans la collection \'messages\' : ',error);   // Si erreur technique... Message et Plantage
          console.log('addPostInDatabase - pPostToAdd.postOwnerMail : ',pPostToAdd.postOwnerMail);
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
  // Si le propriétaire du mur à qui est adressé le Post est connecté, on MAJ son affichage en temps réel avec le nouveau Post
  // ---------------------------------------------------------------------------------------------------------------------------
  PostsServer.prototype.addNewPost = function(pPostToAdd, pSocketIo){
    this.addPostInDatabase(pPostToAdd)
    .then(() => {
      this.sendEMail(
        pPostToAdd.postOwnerMail, 
        'Un message a été posté sur votre mur', 
        '<h1 style="color: black;">'+pPostToAdd.authorPseudo+' a publié un message public (Post) sur votre mur</h1>' +
        '<p><h2>Veuillez le vérifier....</h2><br /></p>' +
        '<p><h2>S\i le Post ne vous convient pas, en tant que propriétaire du mur, vous pourrez le supprimer.</h2></p><br />' +
        '<br /><br /><br /><i>Vil-Coyote Products</i>'
      );

      this.memberServer.nbrPublicMsgs++;
      this.updateTechnicalRecord(1)
      .then(() => {
        this.UpdateDisplayPopulation(pSocketIo);                    // Affichage sur tous les postes du Nbre de messages publics
      });
    
      let document = [pPostToAdd];                                  // Mise en tableau pour pouvoir réutiliser les mêmes fonctions coté client
      pSocketIo.emit('displayPost',document); 
    });
  }

  // ---------------------------------------------------------------------------------------------------------------------------
  // Suppression d'un Post dans la BDD
  // ---------------------------------------------------------------------------------------------------------------------------
  PostsServer.prototype.deletePostInDatabase = function(pPostToDelete){
    return new Promise((resolve, reject) => {

      this.vDBMgr.collectionMessages.deleteOne(
        { 
          postOwnerMail : pPostToDelete.postOwnerMail,
          postDate      : pPostToDelete.postDate,
        },
        { justOne : true },
        (error) => {
        if (error){
          console.log('-------------------------------------------------------------');
          console.log('deletePostInDatabase - Erreur de suppression dans la collection \'messages\' : ',error);   // Si erreur technique... Message et Plantage
          console.log('deletePostInDatabase - pPostToDelete.postOwnerMail : ',pPostToDelete.postOwnerMail);
          console.log('deletePostInDatabase - pPostToDelete.postDate : ',pPostToDelete.postDate);
          console.log('-------------------------------------------------------------');
          reject(error);
          throw error;
        } 

        resolve('Suppression du Post --> Ok');
      });
    });
  };

  // ---------------------------------------------------------------------------------------------------------------------------
  // Suppression d'un Post dans la BDD
//  // Envoyer un mail
  // MAj du record technique 
  // Affichage sur tous les membres connectés pour MAJ le Nbre de messages
  // Si le propriétaire du mur à qui est adressé le Post est connecté, on MAJ son affichage en temps réel avec la supppression du Post
  // ---------------------------------------------------------------------------------------------------------------------------
  PostsServer.prototype.deletePost = function(pPostToDelete, pSocketIo){
    this.deletePostInDatabase(pPostToDelete)
    .then(() => {
      this.memberServer.nbrPublicMsgs--;
      this.updateTechnicalRecord(-1)
      .then(() => {
        this.UpdateDisplayPopulation(pSocketIo);                          // Affichage sur tous les postes du Nbre de messages publics
      });

      pSocketIo.emit('deletePost',pPostToDelete); 
    });
  }

  // ---------------------------------------------------------------------------------------------------------------------------
  // Suppression d'un Commentaire L1  dans la BDD
  // ---------------------------------------------------------------------------------------------------------------------------
  PostsServer.prototype.deleteCommentL1InDatabase = function(pCommentL1ToDelete){
    return new Promise((resolve, reject) => {
      this.vDBMgr.collectionMessages.updateOne(
        { 
          postOwnerMail : pCommentL1ToDelete.postOwnerMail,
          postDate      : pCommentL1ToDelete.postDate,
        },
        { $pull: 
          { commentL1: 
            { commentL1Date: pCommentL1ToDelete.commentL1Date }
          }
        },(error) => {
          if (error){
            console.log('-------------------------------------------------------------');
            console.log('deleteCommentL1InDatabase - Erreur de suppression dans la collection \'messages\' : ',error);   // Si erreur technique... Message et Plantage
            console.log('deleteCommentL1InDatabase - pCommentL1ToDelete.postOwnerMail : ',pCommentL1ToDelete.postOwnerMail);
            console.log('deleteCommentL1InDatabase - pCommentL1ToDelete.postDate : ',pCommentL1ToDelete.postDate);
            console.log('-------------------------------------------------------------');
            reject(error);
            throw error;
          } 

        resolve('Suppression du Commentaire L1 --> Ok');
      });
    });
  };

  // ---------------------------------------------------------------------------------------------------------------------------
  // Suppression d'un Post dans la BDD
  // MAj du record technique 
  // Affichage sur tous les membres connectés pour MAJ le Nbre de messages
  // Si le propriétaire du mur à qui est adressé le Post est connecté, on MAJ son affichage en temps réel avec la supppression du Post
  // ---------------------------------------------------------------------------------------------------------------------------
  PostsServer.prototype.deleteCommentL1 = function(pCommentL1ToDelete, pSocketIo){
    this.deleteCommentL1InDatabase(pCommentL1ToDelete)
    .then(() => {
      pSocketIo.emit('deleteCommentL1',pCommentL1ToDelete); 
    });
  }

  // ---------------------------------------------------------------------------------------------------------------------------
  // Suppression d'un Commentaire L2  dans la BDD
  // ---------------------------------------------------------------------------------------------------------------------------
  PostsServer.prototype.deleteCommentL2InDatabase = function(pCommentL2ToDelete){
    return new Promise((resolve, reject) => {
      this.vDBMgr.collectionMessages.updateOne(
        { 
          postOwnerMail             : pCommentL2ToDelete.postOwnerMail,
          postDate                  : pCommentL2ToDelete.postDate,
          "commentL1.commentL1Date" : pCommentL2ToDelete.commentL1Date,
        },
        { 
          $pull: {"commentL1.$.commentL2"  : {commentL2Date : pCommentL2ToDelete.commentL2Date}, }
        },(error) => {
          if (error){
            console.log('-------------------------------------------------------------');
            console.log('deleteCommentL2InDatabase - Erreur de suppression dans la collection \'messages\' : ',error);   // Si erreur technique... Message et Plantage
            console.log('deleteCommentL2InDatabase - pCommentL2ToDelete.postOwnerMail : ',pCommentL2ToDelete.postOwnerMail);
            console.log('deleteCommentL2InDatabase - pCommentL2ToDelete.postDate : ',pCommentL2ToDelete.postDate);
            console.log('-------------------------------------------------------------');
            reject(error);
            throw error;
          } 

        resolve('Suppression du Commentaire L2 --> Ok');
      });
    });
  };

  // ---------------------------------------------------------------------------------------------------------------------------
  // Suppression d'un Post dans la BDD
  // MAj du record technique 
  // Affichage sur tous les membres connectés pour MAJ le Nbre de messages
  // Si le propriétaire du mur à qui est adressé le Post est connecté, on MAJ son affichage en temps réel avec la supppression du Post
  // ---------------------------------------------------------------------------------------------------------------------------
  PostsServer.prototype.deleteCommentL2 = function(pCommentL2ToDelete, pSocketIo){
    this.deleteCommentL2InDatabase(pCommentL2ToDelete)
    .then(() => {
      pSocketIo.emit('deleteCommentL2',pCommentL2ToDelete); 
    });
  }
  











  // ---------------------------------------------------------------------------------------------------------------------------
	// Lecture de tous les Posts de la BDD
	// ---------------------------------------------------------------------------------------------------------------------------
	PostsServer.prototype.getPosts = function(pPostToSearch){
		return new Promise((resolve, reject) => {  
			this.vDBMgr.collectionMessages.find(                                                   
				{ postOwnerMail : pPostToSearch.postOwnerMail},
				{})
			.sort({"postDate":1})        // Tri ascendant sur la date de publication du Post (Du plus ancien au plus récent)
			.toArray((error, documents) => {
				if (error){
					console.log('-------------------------------------------------------------');
					console.log('getPosts - Erreur de Lecture dans la collection \'Posts\' : ',error);   // Si erreur technique... Message et Plantage
					console.log('getPosts - Pas de clé --> Normal : ');
					console.log('-------------------------------------------------------------');
					reject(error);
					throw error;
				} 
				resolve(documents)
			})
		});
	};

  // ---------------------------------------------------------------------------------------------------------------------------
  // Demande la liste des Posts appartenant à celui qui les a demandé
  // Affichage sur tous les Posts appartenant au membre les demandant
  // ---------------------------------------------------------------------------------------------------------------------------
  PostsServer.prototype.askPostsList = function(pPostToSearch, pWebSocketConnection){
		this.getPosts(pPostToSearch)
		.then((documents) => {
      pWebSocketConnection.emit('displayPostsList',documents);            // Affichage des Posts 
		});
  };

  // ---------------------------------------------------------------------------------------------------------------------------
  // Ajout physique d'un commentaire de Niveau 1 sur un Post pré-existant
  // ---------------------------------------------------------------------------------------------------------------------------
  PostsServer.prototype.addNewCommentL1InBDD = function(pCommentL1ToAdd){
  return new Promise((resolve, reject) => {

    let vCommentL1ToAdd = {
      commentL1Date   		  : pCommentL1ToAdd.commentL1Date,													// Récupération de la date et heure actuelle de rédaction Commentaire
      commentL1Msg				  : pCommentL1ToAdd.commentL1Msg,
      commentL1AuthorPseudo : pCommentL1ToAdd.commentL1AuthorPseudo,				// C'est toujours le membre principal qui écrit
      commentL1AuthorPhoto	:	pCommentL1ToAdd.commentL1AuthorPhoto,
      // commentL2             : [],
    }

    this.vDBMgr.collectionMessages.updateOne(
    { 
      postOwnerMail : pCommentL1ToAdd.postOwnerMail, 
      postDate      : pCommentL1ToAdd.postDate
    },
    { $push: { commentL1 : vCommentL1ToAdd, } }, 
    (error) => {
      if (error) {
        console.log('-------------------------------------------------------------');
        console.log('addNewCommentL1InBDD - Erreur de Lecture dans la collection \'Posts\' : ',error);   // Si erreur technique... Message et Plantage
        console.log('addNewCommentL1InBDD - postOwnerMail : ',postOwnerMail);
        console.log('addNewCommentL1InBDD - postDate : ',postDate);
        console.log('-------------------------------------------------------------');
        reject(error);
        throw error;
      } 
      resolve(true)
    })
  });
};

  // ---------------------------------------------------------------------------------------------------------------------------
  // Ajout d'un commentaire de Niveau 1 sur un Post pré-existant
  // ---------------------------------------------------------------------------------------------------------------------------
  PostsServer.prototype.addNewCommentL1 = function(pCommentL1ToAdd, pSocketIo){
    this.addNewCommentL1InBDD(pCommentL1ToAdd)
    .then(() => {
      let commentL1 = [{
        commentL1Date   		  : pCommentL1ToAdd.commentL1Date,			      // Récupération de la date et heure actuelle de rédaction Commentaire
        commentL1Msg				  : pCommentL1ToAdd.commentL1Msg,
        commentL1AuthorPseudo : pCommentL1ToAdd.commentL1AuthorPseudo,			// C'est toujours le membre principal qui écrit
        commentL1AuthorPhoto	:	pCommentL1ToAdd.commentL1AuthorPhoto,
        postOwnerPseudo       : pCommentL1ToAdd.postOwnerPseudo,
        postIndex             : pCommentL1ToAdd.postIndex,
      }];

      pSocketIo.emit('addCommentL1',commentL1); 
    })
  }

  // ---------------------------------------------------------------------------------------------------------------------------
  // Ajout physique d'un commentaire de Niveau 2 sur un commentaire de Niveau 1 pré-existant
  // ---------------------------------------------------------------------------------------------------------------------------
  PostsServer.prototype.addNewCommentL2InBDD = function(pCommentL2ToAdd){
    return new Promise((resolve, reject) => {
      let vCommentL2ToAdd = {
        commentL2Date   		  : pCommentL2ToAdd.commentL2Date,								// Récupération de la date et heure actuelle de rédaction Commentaire
        commentL2Msg				  : pCommentL2ToAdd.commentL2Msg,
        commentL2AuthorPseudo : pCommentL2ToAdd.commentL2AuthorPseudo,				// C'est toujours le membre principal qui écrit
        commentL2AuthorPhoto	:	pCommentL2ToAdd.commentL2AuthorPhoto,
      }

      this.vDBMgr.collectionMessages.updateOne(
      { 
        postOwnerMail             : pCommentL2ToAdd.postOwnerMail, 
        postDate                  : pCommentL2ToAdd.postDate,
        "commentL1.commentL1Date" : pCommentL2ToAdd.commentL1Date,
      },
      { $push: 
        {"commentL1.$.commentL2"  : vCommentL2ToAdd, }
      }, 
      (error) => {
        if (error) {
          console.log('-------------------------------------------------------------');
          console.log('addNewCommentL2InBDD - Erreur de Lecture dans la collection \'Posts\' : ',error);   // Si erreur technique... Message et Plantage
          console.log('addNewCommentL2InBDD - postOwnerMail : ',pCommentL2ToAdd.postOwnerMail);
          console.log('addNewCommentL2InBDD - postDate : ',pCommentL2ToAdd.postDate);
          console.log('-------------------------------------------------------------');
          reject(error);
          throw error;
        } 
        resolve(true)
      })
    });
  };

  // ---------------------------------------------------------------------------------------------------------------------------
  // Ajout d'un commentaire de Niveau 2 sur un commentaire L1 pré-existant
  // ---------------------------------------------------------------------------------------------------------------------------
  PostsServer.prototype.addNewCommentL2 = function(pCommentL2ToAdd, pSocketIo){
    this.addNewCommentL2InBDD(pCommentL2ToAdd)
    .then(() => {
      let commentL2 = [{
        postOwnerPseudo			  : pCommentL2ToAdd.postOwnerPseudo,
        commentL2Date   		  : pCommentL2ToAdd.commentL2Date,					
        commentL2Msg				  : pCommentL2ToAdd.commentL2Msg,
        commentL2AuthorPseudo : pCommentL2ToAdd.commentL2AuthorPseudo,
        commentL2AuthorPhoto	:	pCommentL2ToAdd.commentL2AuthorPhoto,
        postIndex						  : pCommentL2ToAdd.postIndex,							
        commentL1Index			  :	pCommentL2ToAdd.commentL1Index,					
      }];

      pSocketIo.emit('addCommentL2',commentL2); 
    })
  }

	// ------------------------------------------- Fin du module -------------------------------------------------------------------------
};
  // ------------------------------------------- Fin du module -------------------------------------------------------------------------
  