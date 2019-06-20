// ************************************************************************
// ***      Posts : Objet gestion des posts                              ***
// ***                                                                  ***
// *** Objet : Posts                                                     ***
// ***                                                                  ***
// *** Cet objet sert à afficher :                                      ***
// ***   - A saisir les Posts                                           ***
// ***   - A les afficher d'une façon stackable                         ***
// ***   - A saisir les les commentaires (éventuellement de manière     ***
// ***     imbriquée)                                                   ***
// ***                                                                  ***
// ***  Nécessite :                                                     ***
// ***      Rien                                                        ***
// ***                                                                  ***
// ************************************************************************

function PostsClient(pMemberClient){   						// Fonction constructeur exportée
	this.memberClient = pMemberClient;
	this.lastPublishedPost = 0;											// N0 du dernier Post publié affiché
	this.vPostTitle;																// Titre du Post
	this.vPostMsg;																	// Texte du Post
};

// ---------------------------------------------------------------------------------------------------------------------------
// Gestion des Posts
// Apres validation de la saisie dans la carte "Posts"
// Création d'un posts contenant le Posts qui vient d'être rédigé
// ---------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// Cette méthode affiche la carte de saisie des Posts
// -----------------------------------------------------------------------------
PostsClient.prototype.displayPostEdit = function(){
	var vlineHTML = {};						
	var vMountPointPostEdit = document.getElementById('idDivMountPointPostEdit'+vActiveProfile);

	vlineHTML.vDivCard = window.document.createElement('div');
	vMountPointPostEdit.appendChild(vlineHTML.vDivCard);
	vlineHTML.vDivCard.setAttribute('id', 'idPostEditCard'+vActiveProfile);
	vlineHTML.vDivCard.setAttribute('class', 'card text-white bg-warning border-warning mb-3');


	// Card Header
	vlineHTML.vDivCardHeader = window.document.createElement('div');
	vlineHTML.vDivCard.appendChild(vlineHTML.vDivCardHeader);
	vlineHTML.vDivCardHeader.setAttribute('class', 'card-header py-0 pb-1');

	vlineHTML.vH5Header = window.document.createElement('h5');
	vlineHTML.vDivCardHeader.appendChild(vlineHTML.vH5Header);
	vlineHTML.vH5Header.setAttribute('class', 'card-title text-dark ml-0');
	vlineHTML.vH5Header.innerHTML = 'Postez vos idées et informations...';


	// Card Body
	vlineHTML.vDivCardBody = window.document.createElement('div');
	vlineHTML.vDivCard.appendChild(vlineHTML.vDivCardBody);
	vlineHTML.vDivCardBody.setAttribute('class', 'card-body bg-white text-dark px-1 pt-2 pb-0');

	vlineHTML.vDivFormGroup = window.document.createElement('div');
	vlineHTML.vDivCardBody.appendChild(vlineHTML.vDivFormGroup);
	vlineHTML.vDivFormGroup.setAttribute('class', 'form-group');

	vlineHTML.vForm = window.document.createElement('form');
	vlineHTML.vDivFormGroup.appendChild(vlineHTML.vForm);
	
	vlineHTML.vDivContainer = window.document.createElement('div');
	vlineHTML.vForm.appendChild(vlineHTML.vDivContainer);
	vlineHTML.vDivContainer.setAttribute('class', 'container px-1');

	vlineHTML.vDivRow = window.document.createElement('div');
	vlineHTML.vDivContainer.appendChild(vlineHTML.vDivRow);
	vlineHTML.vDivRow.setAttribute('class', 'row m-0');

	vlineHTML.vH5Subject = window.document.createElement('h5');
	vlineHTML.vDivRow.appendChild(vlineHTML.vH5Subject);
	vlineHTML.vH5Subject.setAttribute('class', 'col-auto p-0 m-0');
	vlineHTML.vH5Subject.innerHTML = 'Sujet : ';

	vlineHTML.vInputSubject = window.document.createElement('input');
	vlineHTML.vDivRow.appendChild(vlineHTML.vInputSubject);
	vlineHTML.vInputSubject.setAttribute('id', 'idPostEditTitle'+vActiveProfile);
	vlineHTML.vInputSubject.setAttribute('type', 'text');
	vlineHTML.vInputSubject.setAttribute('placeholder', 'Titre du sujet');
	vlineHTML.vInputSubject.setAttribute('class', 'col-10 mx-auto px-0');
	vlineHTML.vInputSubject.setAttribute('name', 'postEditTitle'+vActiveProfile);
	vlineHTML.vInputSubject.setAttribute('style', 'border: none !important; box-shadow: none; outline: none;');
	
	vlineHTML.vTextAreaPost = window.document.createElement('textarea');
	vlineHTML.vDivContainer.appendChild(vlineHTML.vTextAreaPost);
	vlineHTML.vTextAreaPost.setAttribute('id', 'idPostEditArea'+vActiveProfile);
	vlineHTML.vTextAreaPost.setAttribute('class', 'form-control mt-2 px-0 pb-0 textAreaAutoResizable');
	vlineHTML.vTextAreaPost.setAttribute('name', 'postEditArea'+vActiveProfile);
	vlineHTML.vTextAreaPost.setAttribute('placeholder', 'Tapez votre texte ici...');
	vlineHTML.vTextAreaPost.setAttribute('style', 'box-shadow: none; border-top: 1px darkGray solid; border-right: none; border-bottom: none; border-left: none; border-radius: unset; resize: none;');


	// Card-Footer
	vlineHTML.vDivFooter = window.document.createElement('div');
	vlineHTML.vDivCard.appendChild(vlineHTML.vDivFooter);
	vlineHTML.vDivFooter.setAttribute('class', 'card-footer border mt-1 py-1');

	vlineHTML.vDivCardFooterRow = window.document.createElement('div');
	vlineHTML.vDivFooter.appendChild(vlineHTML.vDivCardFooterRow);
	vlineHTML.vDivCardFooterRow.setAttribute('class', 'row');

	vlineHTML.vDivCardFooterCol = window.document.createElement('div');
	vlineHTML.vDivCardFooterRow.appendChild(vlineHTML.vDivCardFooterCol);
	vlineHTML.vDivCardFooterCol.setAttribute('class', 'col-auto ml-auto');

	vlineHTML.vBtnValidPost = window.document.createElement('button');
	vlineHTML.vDivCardFooterCol.appendChild(vlineHTML.vBtnValidPost);
	vlineHTML.vBtnValidPost.setAttribute('id', 'idBtnValidPost'+vActiveProfile);
	vlineHTML.vBtnValidPost.setAttribute('type', 'button');
	vlineHTML.vBtnValidPost.setAttribute('class', 'btn btn-sm bg-light pushBtnFilters border-success');
	vlineHTML.vBtnValidPost.innerHTML = 'Post';

	vlineHTML.vBtnValidPost.addEventListener('click', this.publishPost.bind(this),false);

	this.vPostTitle = document.getElementById('idPostEditTitle'+vActiveProfile);
	this.vPostMsg = document.getElementById('idPostEditArea'+vActiveProfile);

	// Permet de passer automatiquement dans le champ 'textArea' de la carte "PostEdit" lorsque l'on appui sur [Enter]
	$('#idPostEditTitle'+vActiveProfile).bind("keydown", function(event) {
    if (event.which === 13) {
			event.stopPropagation();
			event.preventDefault();
			$('#idPostEditArea'+vActiveProfile).focus();
    }
	});

	// Permet d'auto-resizer les champs "textarea" ayant le selecteur CSS "textAreaAutoResizable", 
	document.addEventListener('input', (event) => {
		if ((event.target.tagName.toLowerCase() === 'textarea') && 
				(event.target.className.indexOf('textAreaAutoResizable') > -1)){
			vToolBox.autoExpand(event.target);
		}
	}, false);
}





// -----------------------------------------------------------------------------
// Cette méthode affiche les Posts publiés
// -----------------------------------------------------------------------------
PostsClient.prototype.displayPublishedPosts = function(pPostToPublish, pActiveProfile){
	var vlineHTML = {};		
	var vPublishedPostIndex;
	var vLastPost;
	var vLastPostId;
	var vLastPostNumber;
	var vDataToTransmit;
	var vMountPointPostEdit = document.getElementById('idDivMountPointPostEdit'+pActiveProfile);

	// Détermine le dernier N° de Post par Exploitation du DOM
	if (vMountPointPostEdit.firstElementChild.nextElementSibling){									// Il y a au moins 1 Post
		vLastPost = vMountPointPostEdit.firstElementChild.nextElementSibling;
		vLastPostId = vLastPost.id;
		vLastPostNumber = vLastPostId.slice(('idPublishedPost' + pActiveProfile).length, vLastPostId.length)
		this.lastPublishedPost = parseInt(vLastPostNumber) + 1;
	} else {																																				// Il n'y a aucun Post
		this.lastPublishedPost = 0;
	}

	vPublishedPostIndex = this.lastPublishedPost;

	vlineHTML.vDivCard = window.document.createElement('div');
	vMountPointPostEdit.insertBefore(vlineHTML.vDivCard, vLastPost);								// Insertion du dernier Post avant l'avant-dernier Post, etc, etc
	vlineHTML.vDivCard.setAttribute('id', 'idPublishedPost'+ pActiveProfile + vPublishedPostIndex);
	vlineHTML.vDivCard.setAttribute('class', 'card text-white bg-warning border-warning mb-3');


	// Card Header
	vlineHTML.vDivCardHeader = window.document.createElement('div');
	vlineHTML.vDivCard.appendChild(vlineHTML.vDivCardHeader);
	vlineHTML.vDivCardHeader.setAttribute('class', 'card-header border-0 py-0');

	vlineHTML.vDivCardHeaderRow = window.document.createElement('div');
	vlineHTML.vDivCardHeader.appendChild(vlineHTML.vDivCardHeaderRow);
	vlineHTML.vDivCardHeaderRow.setAttribute('class', 'row m-0 py-1 px-0');

	vlineHTML.vImgAvatToken = window.document.createElement('img');
	vlineHTML.vDivCardHeaderRow.appendChild(vlineHTML.vImgAvatToken);
	vlineHTML.vImgAvatToken.setAttribute('class', 'avatarToken tokenSize32 ml-0');
	vlineHTML.vImgAvatToken.setAttribute('alt', 'Avatar');
	vlineHTML.vImgAvatToken.setAttribute('src', 'static/images/'+pPostToPublish.authorPhoto);

	vlineHTML.vH5Header = window.document.createElement('h5');
	vlineHTML.vDivCardHeaderRow.appendChild(vlineHTML.vH5Header);
	vlineHTML.vH5Header.setAttribute('class', 'card-title ml-1 text-dark m-0 align-self-center');
	vlineHTML.vH5Header.innerHTML = pPostToPublish.authorPseudo;

	vlineHTML.vDivTimeStamp = window.document.createElement('div');
	vlineHTML.vDivCardHeaderRow.appendChild(vlineHTML.vDivTimeStamp);
	vlineHTML.vDivTimeStamp.setAttribute('class', 'text-dark p-0 ml-2 font-size-70 align-self-center');
	vlineHTML.vDivTimeStamp.innerHTML = moment(pPostToPublish.postDate).format('[à publié le ]dddd DD MMMM YYYY [à] HH[h ]mm[mn ]ss[sec.]');

	vlineHTML.vDivTimeStampMoment = window.document.createElement('div');
	vlineHTML.vDivCardHeaderRow.appendChild(vlineHTML.vDivTimeStampMoment);
	vlineHTML.vDivTimeStampMoment.setAttribute('id', 'idDivTimeStampMoment'+ pActiveProfile + vPublishedPostIndex);
	vlineHTML.vDivTimeStampMoment.setAttribute('class', 'd-none');
	vlineHTML.vDivTimeStampMoment.innerHTML = pPostToPublish.postDate;


	
	// Card Body
	vlineHTML.vDivCardBody = window.document.createElement('div');
	vlineHTML.vDivCard.appendChild(vlineHTML.vDivCardBody);
	vlineHTML.vDivCardBody.setAttribute('class', 'card-body bg-white text-dark px-1 pt-2 pb-0');
	
	vlineHTML.vDivContainer = window.document.createElement('div');
	vlineHTML.vDivCardBody.appendChild(vlineHTML.vDivContainer);
	vlineHTML.vDivContainer.setAttribute('class', 'container px-1');

	vlineHTML.vDivRow1 = window.document.createElement('div');
	vlineHTML.vDivContainer.appendChild(vlineHTML.vDivRow1);
	vlineHTML.vDivRow1.setAttribute('class', 'row m-0');
	vlineHTML.vDivRow1.setAttribute('style', 'overflow-x: hidden;');

	vlineHTML.vH5Subject = window.document.createElement('h5');
	vlineHTML.vDivRow1.appendChild(vlineHTML.vH5Subject);
	vlineHTML.vH5Subject.setAttribute('class', 'col-auto p-0 m-0');
	if (!pPostToPublish.postTitle){
		vlineHTML.vH5Subject.innerHTML = 'Sans titre';
	} else {
		vlineHTML.vH5Subject.innerHTML = pPostToPublish.postTitle;
	}
	
	vlineHTML.vTextAreaPost = window.document.createElement('textarea');
	vlineHTML.vDivContainer.appendChild(vlineHTML.vTextAreaPost);
	vlineHTML.vTextAreaPost.setAttribute('id', 'idPublishedPostArea' + pActiveProfile + vPublishedPostIndex);
	vlineHTML.vTextAreaPost.setAttribute('class', 'form-control bg-light mt-2 px-0 pb-0 textAreaAutoResizable');
	vlineHTML.vTextAreaPost.setAttribute('name', 'publishedPostArea'+pActiveProfile + vPublishedPostIndex);
	vlineHTML.vTextAreaPost.setAttribute('readonly', '');
	vlineHTML.vTextAreaPost.setAttribute('style', 'box-shadow: none; border-top: 1px darkGray solid; border-right: none; border-bottom: none; border-left: none; border-radius: unset; resize: none;');
	vlineHTML.vTextAreaPost.value = pPostToPublish.postMsg;
	vToolBox.autoResizeElem(vlineHTML.vTextAreaPost.id);						// Redimensionnement automatique (mais limité) du champs



	// Card Footer
	vlineHTML.vDivFooter = window.document.createElement('div');
	vlineHTML.vDivCard.appendChild(vlineHTML.vDivFooter);
	vlineHTML.vDivFooter.setAttribute('class', 'card-footer border mt-1 py-1 pr-1');

		// C Ligne des boutons "Ajout de commenttaire" et "Suppression de Post"
		vlineHTML.vDivContFooter = window.document.createElement('div');
		vlineHTML.vDivFooter.appendChild(vlineHTML.vDivContFooter);
		vlineHTML.vDivContFooter.setAttribute('class', 'container pr-0');

			// R Ligne des boutons "Ajout de commenttaire" et "Suppression de Post"
			vlineHTML.vDivRow2 = window.document.createElement('div');
			vlineHTML.vDivContFooter.appendChild(vlineHTML.vDivRow2);
			vlineHTML.vDivRow2.setAttribute('class', 'row justify-content-between mx-0 px-0');

				// Bouton "Ajouter un commentaire" et son icône
				vlineHTML.vBtnCommentL1 = window.document.createElement('button');
				vlineHTML.vDivRow2.appendChild(vlineHTML.vBtnCommentL1);
				vlineHTML.vBtnCommentL1.setAttribute('id', 'idBtnCommentL1' + pActiveProfile + vPublishedPostIndex);
				vlineHTML.vBtnCommentL1.setAttribute('type', 'button');
				vlineHTML.vBtnCommentL1.setAttribute('data-toggle', 'collapse');
				vlineHTML.vBtnCommentL1.setAttribute('data-target', '#idDivCollapseL1' + pActiveProfile + vPublishedPostIndex);
				vlineHTML.vBtnCommentL1.setAttribute('aria-expanded', 'false');
				vlineHTML.vBtnCommentL1.setAttribute('aria-controls', 'idDivCollapseL1' + pActiveProfile + vPublishedPostIndex);
				vlineHTML.vBtnCommentL1.setAttribute('class', 'btn btn-sm bg-light pushBtnFilters border-success px-1 py-0');


					vlineHTML.vIIconCommentL1 = window.document.createElement('i');
					vlineHTML.vBtnCommentL1.appendChild(vlineHTML.vIIconCommentL1);
					vlineHTML.vIIconCommentL1.setAttribute('class', 'fa fa-commenting-o fa-2x text-dark');

				// Bouton "Suppression" + Gestion affichage de ce bouton en fonction du statut d'affichage du "Collapse"
				vlineHTML.vBtnDeletePost = window.document.createElement('button');
				vlineHTML.vDivRow2.appendChild(vlineHTML.vBtnDeletePost);
				vlineHTML.vBtnDeletePost.setAttribute('id', 'idBtnDeletePost' + pActiveProfile + vPublishedPostIndex);
				vlineHTML.vBtnDeletePost.setAttribute('type', 'button');
				vlineHTML.vBtnDeletePost.setAttribute('class', 'btn btn-sm bg-light pushBtnFilters border-danger px-1 py-0 mr-3');
				vlineHTML.vBtnDeletePost.setAttribute('style', 'visibility: hidden;');
				vlineHTML.vBtnDeletePost.innerHTML = 'Supprimer';

				if 	((vMemberClient.member.pseudo === vlineHTML.vH5Header.innerHTML) || // Si je suis l'auteur du post, je peux effacer mon Post
						(pActiveProfile === cstMainProfileActive)){													// Le propriétaire du mur peut effacer tous les Posts qu'il désire (les siens et ceux des autres)
					vlineHTML.vBtnDeletePost.style.visibility='visible';									// Alors Affichage du bouton de suppression du Post

					vDataToTransmit = {
						activeProfile : pActiveProfile,
					}

					vlineHTML.vBtnDeletePost.addEventListener('click', this.deletePublishedPost.bind(this),false);
					vlineHTML.vBtnDeletePost.datas = vDataToTransmit;
				}

			// Gestion du "Collapse"
			// Debut de la zone "Collapse" - Tout ce qui est "Collapsé" à l'appui du bouton "AJouter un commentaire"
			vlineHTML.vDivCollapse = window.document.createElement('div');
			vlineHTML.vDivContFooter.appendChild(vlineHTML.vDivCollapse);
			vlineHTML.vDivCollapse.setAttribute('id', 'idDivCollapseL1' + pActiveProfile + vPublishedPostIndex);
			vlineHTML.vDivCollapse.setAttribute('class', 'collapse');

				// C Ligne des boutons "Ajout de commenttaire" et "Suppression de Post"
				vlineHTML.vDivContAddComment = window.document.createElement('div');
				vlineHTML.vDivCollapse.appendChild(vlineHTML.vDivContAddComment);
				vlineHTML.vDivContAddComment.setAttribute('class', 'container pr-0');
			
					vlineHTML.vDivRow3 = window.document.createElement('div');
					vlineHTML.vDivContAddComment.appendChild(vlineHTML.vDivRow3);
					vlineHTML.vDivRow3.setAttribute('class', 'row');

						vlineHTML.vTextAreaCommentL1 = window.document.createElement('textarea');
						vlineHTML.vDivRow3.appendChild(vlineHTML.vTextAreaCommentL1);
						vlineHTML.vTextAreaCommentL1.setAttribute('id', 'idTextAreaCommentL1'+pActiveProfile + vPublishedPostIndex);
						vlineHTML.vTextAreaCommentL1.setAttribute('placeholder', 'Ajouter un commentaire...');
						vlineHTML.vTextAreaCommentL1.setAttribute('class', 'form-control mt-1 ml-0 mr-3 px-1 border textAreaAutoResizable');
						vlineHTML.vTextAreaCommentL1.setAttribute('name', 'textAreaCommentL1'+pActiveProfile + vPublishedPostIndex);
						vlineHTML.vTextAreaCommentL1.setAttribute('rows', '1');
						vlineHTML.vTextAreaCommentL1.setAttribute('style', 'box-shadow: none; resize: none;');

				// Groupe d'éléments pour la création de commentaires de niveau 1 (Bouton "Clear" + Bouton "Validation")
					vlineHTML.vClearCommentL1 = window.document.createElement('div');
					vlineHTML.vDivCollapse.appendChild(vlineHTML.vClearCommentL1);
					vlineHTML.vClearCommentL1.setAttribute('class', 'row justify-content-between mt-1 mx-0 px-0');

						// Bouton "Clear"
						vlineHTML.vBtnClearCommentL1 = window.document.createElement('button');
						vlineHTML.vClearCommentL1.appendChild(vlineHTML.vBtnClearCommentL1);
						vlineHTML.vBtnClearCommentL1.setAttribute('id', 'idBtnClearCommentL1' + pActiveProfile + vPublishedPostIndex);
						vlineHTML.vBtnClearCommentL1.setAttribute('class', 'btn btn-sm border pushBtnFilters');

							vlineHTML.vIIconClearCommentL1 = window.document.createElement('i');
							vlineHTML.vBtnClearCommentL1.appendChild(vlineHTML.vIIconClearCommentL1);
							vlineHTML.vIIconClearCommentL1.setAttribute('id', 'idIIconClearCommentL1' + pActiveProfile + vPublishedPostIndex);
							vlineHTML.vIIconClearCommentL1.setAttribute('class', 'fa fa-fw fa-times');

						// Bouton "Validation" du commentaire
						vlineHTML.vBtnAddCommentL1 = window.document.createElement('button');
						vlineHTML.vClearCommentL1.appendChild(vlineHTML.vBtnAddCommentL1);
						vlineHTML.vBtnAddCommentL1.setAttribute('id', 'idBtnAddCommentL1' + pActiveProfile + vPublishedPostIndex);
						vlineHTML.vBtnAddCommentL1.setAttribute('class', 'btn btn-sm border pushBtnFilters mr-3');

							vlineHTML.vIIconAddCommentL1 = window.document.createElement('i');
							vlineHTML.vBtnAddCommentL1.appendChild(vlineHTML.vIIconAddCommentL1);
							vlineHTML.vIIconAddCommentL1.setAttribute('id', 'idIIconAddCommentL1' + pActiveProfile + vPublishedPostIndex);
							vlineHTML.vIIconAddCommentL1.setAttribute('class', 'fa fa-fw fa-check');


				// Point de montage des commentaires L1
				vlineHTML.vDivMountpointComment = window.document.createElement('div');
				vlineHTML.vDivCollapse.appendChild(vlineHTML.vDivMountpointComment);
				vlineHTML.vDivMountpointComment.setAttribute('id', 'idDivMountPointComment' + pActiveProfile + vPublishedPostIndex);
				vlineHTML.vDivMountpointComment.setAttribute('class', 'bg-light text-dark border rounded mt-1 pl-1 pr-0 py-0 d-none');


				// Alimentation des commentaires des différents Posts
				if (pPostToPublish.commentL1){				// S'il y a des commentaires associés au Post en cours de traitement, alors affichage des commentaires dans le DOM
					pPostToPublish.commentL1.forEach((item) => {
						item.postIndex = vPublishedPostIndex;	
					});
					this.displayStoredCommentL1(pPostToPublish.commentL1, pActiveProfile);
				}


	var vDataToTransmit = {
		activeProfile 	: pActiveProfile,
	}

	vlineHTML.vBtnAddCommentL1.addEventListener('click', this.publishCommentL1.bind(this),false);
	vlineHTML.vBtnAddCommentL1.datas = vDataToTransmit;
	vlineHTML.vIIconAddCommentL1.datas = vDataToTransmit;

	vlineHTML.vBtnClearCommentL1.addEventListener('click', this.clearCommentL1.bind(this),false);
	vlineHTML.vBtnClearCommentL1.datas = vDataToTransmit;
  vlineHTML.vIIconClearCommentL1.datas = vDataToTransmit;	

	// Positionne le focus sur le champ du commentaire dès l'ouverture du "Collapse"
	$('#idDivCollapseL1' + pActiveProfile + vPublishedPostIndex).on('shown.bs.collapse', (event) => {
		this.formatComments(vlineHTML.vBtnDeletePost, '#idTextAreaCommentL1', pActiveProfile, vPublishedPostIndex )
	})

	$('#idDivCollapseL1' + pActiveProfile + vPublishedPostIndex).on('hidden.bs.collapse', (event) => {
		if 	((vMemberClient.member.pseudo === vlineHTML.vH5Header.innerHTML) || // Si je suis l'auteur du post, je peux effacer mon Post
				(pActiveProfile === cstMainProfileActive)){													// Le propriétaire du mur peut effacer tous les Posts qu'il désire (les siens et ceux des autres)
			vlineHTML.vBtnDeletePost.style.visibility='visible';									// Alors Affichage du bouton de suppression du Post
		}
	});
}

// -----------------------------------------------------------------------------
// Cette méthode publie le nouveau Post et le stocke dans la BDD
// -----------------------------------------------------------------------------
PostsClient.prototype.addNewPost = function(){
	var vPostToPublish = {
		postDate    		: moment().format(),													// Récupération de la date et heure actuelle
		postTitle				: this.vPostTitle.value,
		postMsg					: this.vPostMsg.value,
		authorPseudo 		: vMemberClient.member.pseudo,								// C'est toujours le membre principal qui écrit
		authorPhoto			:	vMemberClient.member.etatCivil.photo,
		// Par contre le membre principal, peut poster un message sur le profil de son ami (Ami qui est le propriétaire de son mur et de tous les Posts qui y sont écrits)
		postOwnerMail		: this.memberClient.member.email,							// Pour pouvoir afficher QUE les Posts écrits sur le mur du propriétaire
		postOwnerPseudo	: this.memberClient.member.pseudo,						// Propriétaire du mur sur lequel sont affichés les posts (les siens et ceux ecrits pour lui par d autres)
	}	
	webSocketConnection.emit('addNewPost',vPostToPublish);
}	

// -----------------------------------------------------------------------------
// Cette méthode publie le nouveau Post
// -----------------------------------------------------------------------------
PostsClient.prototype.publishPost = function(){
	if (this.vPostMsg.value){				// Si le message est non vide, il est publié
		this.addNewPost();
	}

	// Réinitialisation (Contenant et contenu) de la carte "PostEdit"
	this.vPostTitle.value = null;
	this.vPostMsg.value = null;
	vToolBox.autoResizeElem(this.vPostMsg.id);
}

// -----------------------------------------------------------------------------
// Cette méthode supprime un Post
// On obtient d'abord le N° d'index en exploitant l'indice liés aux objets du DOM
// -----------------------------------------------------------------------------
PostsClient.prototype.deletePublishedPost = function(event){
	var vBtnClicked = event.target.id;												// Obtient le N° d'indice du bouton "Supprimer" dans le DOM
	index = vBtnClicked.slice(('idBtnDeletePost' + event.target.datas.activeProfile).length, vBtnClicked.length);

	// On va lire la Date/Heure associée au Post
	var vDivTimeStampMoment = document.getElementById('idDivTimeStampMoment'+event.target.datas.activeProfile+index);		
	vTimeStampMoment = moment(vDivTimeStampMoment.innerHTML).format();										// On formatte la Date/Heure au format par défaut, utilisé dans la BDD

	var vPostToDelete = {
		postOwnerMail 	: this.memberClient.member.email,
		postDate				: vTimeStampMoment,
		authorPseudo		:	vMemberClient.member.pseudo,
		postOwnerPseudo	: this.memberClient.member.pseudo,
		index						: parseInt(index),
	}

	webSocketConnection.emit('deletePost',vPostToDelete);
}

// -----------------------------------------------------------------------------
// Décalage des N° de Posts dans les commentaires qui sont liés au Post lors de 
// la suppression d'un Post
// -----------------------------------------------------------------------------
PostsClient.prototype.renumberPostsOfComments = function(pMountPointComment, pActiveProfile, pIndexPost){
	var vElemId;
	var vElem;
	var vElemRoot;
	var vLastCommentId;

	vLastCommentId = pMountPointComment.lastElementChild.id;						// S'il y a au moins 1 commentaire, je récupère son Id

	// On récupère le dernier N° de commentaire en prenant tous les caractères situés après le "-" dans l'Id du commentaire ()= N° de commentaire)
	vLastCommentNumber = vLastCommentId.slice(vLastCommentId.indexOf('-')+1);		// Il servira de borne haute dans la boucle "for" qui suit

	for (var j=0; j <= vLastCommentNumber; j++){																			
		vElemId = 'idMediaCommentL1'+ pActiveProfile + (pIndexPost+1) + '-' + j;									// Id de l'element à modifier
		vElem = document.getElementById(vElemId);																									// Obtention de l'objet DOM de l'élement a modifier
		vElemRoot = vElemId.slice(0, ('idMediaCommentL1'+pActiveProfile).length); 								// Obtention de la racine de l'élément (Sans N° d'index)
		vElem.setAttribute('id',vElemRoot + pIndexPost + '-' + j);																// Décrémentation du N° de Post auquel le commentaire est rattaché

		vElemId = 'idTextAreaCommentL1RO'+ pActiveProfile + (pIndexPost+1) + '-' + j;							// Id de l'element à modifier
		vElem = document.getElementById(vElemId);																									// Obbtention de l'objet DOM de l'élement a modifier
		vElemRoot = vElemId.slice(0, ('idTextAreaCommentL1RO'+pActiveProfile).length); 						// Obtention de la racine de l'élément (Sans N° d'index)
		vElem.setAttribute('name','textAreaCommentL1RO' + pActiveProfile + pIndexPost + '-' + j);	// Décrémentation du N° de Post auquel le commentaire est rattaché
		vElem.setAttribute('id', vElemRoot + pIndexPost + '-' + j);																// Décrémentation du N° de Post auquel le commentaire est rattaché
	}
}
// -----------------------------------------------------------------------------
// Cette méthode supprime le Post correspondant à l'index passé en paramètre
// Regenere une numerotation des iD de tous les Posts postérieurs pour combler
// Les trous et faciliter la gestion des évenements sur tous les postes
// -----------------------------------------------------------------------------
PostsClient.prototype.deletePost = function(pPostToDelete, pActiveProfile){
	var vElem = document.getElementById('idPublishedPost' + pActiveProfile + pPostToDelete.index);
	var vParentNode = vElem.parentNode;
	
	// Effacement du Post
	vParentNode.removeChild(vElem);
	
	var i = pPostToDelete.index;
	// Renommage de tous les Posts supérieurs pour avoir une numérotation sequentielle des Posts (sans trous)
	if (vParentNode.firstElementChild.nextElementSibling){
		var vLastPost = vParentNode.firstElementChild.nextElementSibling.id;
		var vMaxPostNumber = vLastPost.slice(('idPublishedPost'+pActiveProfile).length, vLastPost.length);
		
		while (i < vMaxPostNumber){
			document.getElementById('idPublishedPost'+ pActiveProfile + (i + 1)).setAttribute('id', 'idPublishedPost'+ pActiveProfile + i);
			document.getElementById('idDivTimeStampMoment'+ pActiveProfile + (i + 1)).setAttribute('id', 'idDivTimeStampMoment'+ pActiveProfile + i);
			
			document.getElementById('idPublishedPostArea'+ pActiveProfile + (i + 1)).setAttribute('name', 'publishedPostArea'+ pActiveProfile + i);
			document.getElementById('idPublishedPostArea'+ pActiveProfile + (i + 1)).setAttribute('id', 'idPublishedPostArea'+ pActiveProfile + i);
			
			document.getElementById('idBtnDeletePost'+ pActiveProfile + (i + 1)).setAttribute('id', 'idBtnDeletePost'+ pActiveProfile + i);
			
			document.getElementById('idBtnCommentL1'+ pActiveProfile + (i + 1)).setAttribute('data-target', '#idDivCollapseL1'+ pActiveProfile + i);
			document.getElementById('idBtnCommentL1'+ pActiveProfile + (i + 1)).setAttribute('aria-controls', 'idDivCollapseL1'+ pActiveProfile + i);
			document.getElementById('idBtnCommentL1'+ pActiveProfile + (i + 1)).setAttribute('id', 'idBtnCommentL1'+ pActiveProfile + i);

			document.getElementById('idDivCollapseL1'+ pActiveProfile + (i + 1)).setAttribute('id', 'idDivCollapseL1'+ pActiveProfile + i);
			
			document.getElementById('idTextAreaCommentL1'+ pActiveProfile + (i + 1)).setAttribute('name', 'textAreaCommentL1'+ pActiveProfile + i);
			document.getElementById('idTextAreaCommentL1'+ pActiveProfile + (i + 1)).setAttribute('id', 'idTextAreaCommentL1'+ pActiveProfile + i);
			
			document.getElementById('idBtnClearCommentL1'+ pActiveProfile + (i + 1)).setAttribute('id', 'idBtnClearCommentL1'+ pActiveProfile + i);
			document.getElementById('idIIconClearCommentL1'+ pActiveProfile + (i + 1)).setAttribute('id', 'idIIconClearCommentL1'+ pActiveProfile + i);

			document.getElementById('idBtnAddCommentL1'+ pActiveProfile + (i + 1)).setAttribute('id', 'idBtnAddCommentL1'+ pActiveProfile + i);
			document.getElementById('idIIconAddCommentL1'+ pActiveProfile + (i + 1)).setAttribute('id', 'idIIconAddCommentL1'+ pActiveProfile + i);


			// Décalage des N° de Posts dans les commentaires qui sont liés au Post
			// On récupère le point de montage des commentaires
			vMountPointComment = document.getElementById('idDivMountPointComment'+ pActiveProfile + (i + 1))  
			if (vMountPointComment.lastElementChild){															// S'il y a au moins 1 commentaire
				this.renumberPostsOfComments(vMountPointComment, pActiveProfile, i);
			}

			// document.getElementById('idDivMountPointComment'+ pActiveProfile + (i + 1)).setAttribute('id', 'idDivMountPointComment'+ pActiveProfile + i);
			vMountPointComment.setAttribute('id', 'idDivMountPointComment'+ pActiveProfile + i);
			i++;
		}
	}
}

// -----------------------------------------------------------------------------
// Cette méthode affiche les Posts à l'affichage du profil
// -----------------------------------------------------------------------------
PostsClient.prototype.displayPosts = function(){
	this.displayPostEdit();																				// Affiche la carte d'édition des Posts
	var vPostToSearch = {
		postOwnerMail	: this.memberClient.member.email,							// Pour pouvoir afficher QUE les Posts écrits sur le mur du propriétaire
	}

	webSocketConnection.emit('askPostsList',vPostToSearch);
}

// -----------------------------------------------------------------------------
// Cette méthode affiche les Posts stockés en BDD à l'affichage du profil
// -----------------------------------------------------------------------------
PostsClient.prototype.displayStoredPosts = function(pPostsList, pActiveProfile){
	pPostsList.forEach((item) => {															// Pour chacun des posts du membre
		this.displayPublishedPosts(item, pActiveProfile);
	});
}








// *********************************************************************************************************
// Gestion des commentaires
// *********************************************************************************************************



// -----------------------------------------------------------------------------
// Cette méthode publie le nouveau Commentaire L1 et le stocke dans la BDD
// -----------------------------------------------------------------------------
PostsClient.prototype.addNewCommentL1 = function(pCommentL1Msg, pTimeStampMoment, pIndex){

	var vCommentL1ToAdd = {
		postOwnerMail				: this.memberClient.member.email,							// Clé N°1  : Le propriétaire du Post auquel va être rattaché le nouveau commentaire L1
		postOwnerPseudo			: this.memberClient.member.pseudo,
		postDate						: pTimeStampMoment,														// Clé N° 2 : La Date/Heure du Post auquel va être rattaché le nouveau commentaire L1
		commentL1Date   		: moment().format(),													// Récupération de la date et heure actuelle de rédaction Commentaire
		commentL1Msg				: pCommentL1Msg,
		commentAuthorPseudo : vMemberClient.member.pseudo,								// C'est toujours le membre principal qui écrit
		commentAuthorPhoto	:	vMemberClient.member.etatCivil.photo,
		postIndex						: pIndex,																			// N° du Post auquel est rattaché le commentaire
	}	
	webSocketConnection.emit('addNewCommentL1',vCommentL1ToAdd);
}	

// -----------------------------------------------------------------------------
// Cette méthode publie un nouveau commentaire de Niveau 1 (L1)
// -----------------------------------------------------------------------------
PostsClient.prototype.publishCommentL1 = function(event){
	var vBtnClicked = event.target.id;

	if (vBtnClicked.startsWith('idIIconAddCommentL1')){
		index = vBtnClicked.slice(('idIIconAddCommentL1' + event.target.datas.activeProfile).length, vBtnClicked.length);
	} else {
		index = vBtnClicked.slice(('idBtnAddCommentL1' + event.target.datas.activeProfile).length, vBtnClicked.length);
	}

	// Récupération du TimeStamp du Post qui va avoir le commentaire
	var vDivTimeStampMoment = document.getElementById('idDivTimeStampMoment'+ event.target.datas.activeProfile + index);		// On va lire la Date/Heure associée au Post
	vTimeStampMoment = moment(vDivTimeStampMoment.innerHTML).format();			// On formatte la Date/Heure au format par défaut, utilisé dans la BDD

	var vCommentL1Msg = document.getElementById('idTextAreaCommentL1' + event.target.datas.activeProfile + index);
	if (vCommentL1Msg.value){
		this.addNewCommentL1(vCommentL1Msg.value, vTimeStampMoment, index);
	}

	// Après transmission au serveur, on reset la valeur du champ, on rétablit sa taille par défaut, et on lui redonne le focus
	vCommentL1Msg.value = null;
	vToolBox.autoResizeElem(vCommentL1Msg.id);
	$('#'+vCommentL1Msg.id).focus();

}

// -----------------------------------------------------------------------------
// Cette méthode efface le champ du nouveau commentaire de Niveau 1 (L1)
// -----------------------------------------------------------------------------
PostsClient.prototype.clearCommentL1 = function(event){
	var vBtnClicked = event.target.id;

	if (vBtnClicked.startsWith('idIIconClearCommentL1')){
		index = vBtnClicked.slice(('idIIconClearCommentL1' + event.target.datas.activeProfile).length, vBtnClicked.length);
	} else {
		index = vBtnClicked.slice(('idBtnClearCommentL1' + event.target.datas.activeProfile).length, vBtnClicked.length);
	}

	document.getElementById('idTextAreaCommentL1'+ event.target.datas.activeProfile + index).value = '';
}









// -----------------------------------------------------------------------------
// Cette méthode effectue des actions sur les commentaires au moment de leur ouverture
// -----------------------------------------------------------------------------
PostsClient.prototype.formatComments = function(pBtnDeletePost, pTextAreaCommentL1, pActiveProfile, pPublishedPostIndex){
	pBtnDeletePost.style.visibility='hidden';	

	var vElem = document.getElementById('idDivMountPointComment' + pActiveProfile + pPublishedPostIndex);
	vElem.classList.replace('d-none','d-block');
	
	if (vElem.firstElementChild){
		i=0;
		var toto = document.getElementById('idTextAreaCommentL1RO' + pActiveProfile + pPublishedPostIndex + '-'+i);
		while (toto) {
			vToolBox.autoResizeElem(toto.id);
			i++;
			toto = document.getElementById('idTextAreaCommentL1RO' + pActiveProfile + pPublishedPostIndex + '-'+i);
		}
	}

	$(pTextAreaCommentL1 + pActiveProfile + pPublishedPostIndex).focus();
}

// -----------------------------------------------------------------------------
// Cette méthode affiche les commentaires de Niveau 1 stockés en BDD à l'affichage 
// des commentaires du post concerné
// -----------------------------------------------------------------------------
PostsClient.prototype.displayCommentL1 = function(pCommentL1, pActiveProfile){
	var vlineHTML = {};		
	var vlastPublishedComment = 0;
	var vMountPointComment = document.getElementById('idDivMountPointComment' + pActiveProfile + pCommentL1.postIndex);

	// Détermine le dernier N° de Commentaire par Exploitation du DOM
	if (vMountPointComment.lastElementChild){									// Il y a au moins 1 commentaire
		vLastComment = vMountPointComment.lastElementChild;
		vLastCommentId = vLastComment.id;
		vLastCommentNumber = vLastCommentId.slice(vLastCommentId.indexOf('-')+1);		// Prend tous les caractères situés après le "-"
		vlastPublishedComment = parseInt(vLastCommentNumber) + 1;
	} else {																																				// Il n'y a aucun Post
		vlastPublishedComment = 0;
	}

	// Ecriture du Commentaire proprement dit
	// <div class="media">
	vlineHTML.vDivMediaCommentL1 = window.document.createElement('div');
	vMountPointComment.appendChild(vlineHTML.vDivMediaCommentL1);
	vlineHTML.vDivMediaCommentL1.setAttribute('id', 'idMediaCommentL1' + pActiveProfile + pCommentL1.postIndex + '-' + vlastPublishedComment);
	vlineHTML.vDivMediaCommentL1.setAttribute('class', 'media mb-1');

		//   <img src="..." class="mr-3" alt="...">
		vlineHTML.vImgCommentL1 = window.document.createElement('img');
		vlineHTML.vDivMediaCommentL1.appendChild(vlineHTML.vImgCommentL1);
		vlineHTML.vImgCommentL1.setAttribute('class', 'avatarToken tokenSize32 ml-0 mt-1');
		vlineHTML.vImgCommentL1.setAttribute('alt', 'Avatar');
		vlineHTML.vImgCommentL1.setAttribute('src', 'static/images/'+pCommentL1.commentAuthorPhoto);

		//   <div class="media-body">
		vlineHTML.vDivMediaBody = window.document.createElement('div');
		vlineHTML.vDivMediaCommentL1.appendChild(vlineHTML.vDivMediaBody);
		vlineHTML.vDivMediaBody.setAttribute('class', 'media-body bg-gray border rounded p-1');

		vlineHTML.vDivCommentL1HeaderRow = window.document.createElement('div');
		vlineHTML.vDivMediaBody.appendChild(vlineHTML.vDivCommentL1HeaderRow);
		vlineHTML.vDivCommentL1HeaderRow.setAttribute('class', 'row m-0 py-1 px-0');

			//     <h5 class="mt-0">Media heading</h5>
			vlineHTML.vH5 = window.document.createElement('h5');
			vlineHTML.vDivCommentL1HeaderRow.appendChild(vlineHTML.vH5);
			vlineHTML.vH5.setAttribute('class', 'my-0');
			vlineHTML.vH5.innerHTML = pCommentL1.commentAuthorPseudo;
			
			vlineHTML.vDivCommentL1TimeStamp = window.document.createElement('div');
			vlineHTML.vDivCommentL1HeaderRow.appendChild(vlineHTML.vDivCommentL1TimeStamp);
			vlineHTML.vDivCommentL1TimeStamp.setAttribute('class', 'text-dark p-0 ml-2 font-size-70 align-self-center');
			vlineHTML.vDivCommentL1TimeStamp.innerHTML = moment(pCommentL1.commentL1Date).format('[à commenté le ]dddd DD MMMM YYYY [à] HH[h ]mm[mn ]ss[sec.]');

			vlineHTML.vTextAreaCommentL1RO = window.document.createElement('textarea');
			vlineHTML.vDivMediaBody.appendChild(vlineHTML.vTextAreaCommentL1RO);
			vlineHTML.vTextAreaCommentL1RO.setAttribute('id', 'idTextAreaCommentL1RO' + pActiveProfile + pCommentL1.postIndex + '-' + vlastPublishedComment);
			vlineHTML.vTextAreaCommentL1RO.setAttribute('class', 'form-control border bg-gray  m-0 p-2 textAreaAutoResizable');
			vlineHTML.vTextAreaCommentL1RO.setAttribute('name', 'textAreaCommentL1RO' + pActiveProfile + pCommentL1.postIndex + '-' + vlastPublishedComment);
			vlineHTML.vTextAreaCommentL1RO.setAttribute('readonly', '');
			vlineHTML.vTextAreaCommentL1RO.setAttribute('style', 'box-shadow: none; border-top: 1px darkGray solid; border-right: none; border-bottom: none; border-left: none; border-radius: unset; resize: none;');
			vlineHTML.vTextAreaCommentL1RO.value = pCommentL1.commentL1Msg;
			vToolBox.autoResizeElem(vlineHTML.vTextAreaCommentL1RO.id);						// Redimensionnement automatique (mais limité) du champs


// Exemple Alignement
// <div class="media">
//   <img src="..." class="align-self-start mr-3" alt="...">
//   <div class="media-body">
//     <h5 class="mt-0">Top-aligned media</h5>
//     <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
//     <p>Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
//   </div>
// </div>


// Exemple imbriqué		
// div class="media">
//   <img src="..." class="mr-3" alt="...">
//   <div class="media-body">
//     <h5 class="mt-0">Media heading</h5>
//     Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.

//     <div class="media mt-3">
//       <a class="mr-3" href="#">
//         <img src="..." class="mr-3" alt="...">
//       </a>
//       <div class="media-body">
//         <h5 class="mt-0">Media heading</h5>
//         Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
//       </div>
//     </div>
//   </div>
// </div>



// Exemple Media-List
// <ul class="list-unstyled">
//   <li class="media">
//     <img src="..." class="mr-3" alt="...">
//     <div class="media-body">
//       <h5 class="mt-0 mb-1">List-based media object</h5>
//       Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
//     </div>
//   </li>
//   <li class="media my-4">
//     <img src="..." class="mr-3" alt="...">
//     <div class="media-body">
//       <h5 class="mt-0 mb-1">List-based media object</h5>
//       Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
//     </div>
//   </li>
//   <li class="media">
//     <img src="..." class="mr-3" alt="...">
//     <div class="media-body">
//       <h5 class="mt-0 mb-1">List-based media object</h5>
//       Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
//     </div>
//   </li>
// </ul>
}

// -----------------------------------------------------------------------------
// Cette méthode affiche les commentaires de Niveau 1 stockés en BDD à l'affichage 
// des commentaires du post concerné
// -----------------------------------------------------------------------------
PostsClient.prototype.displayStoredCommentL1 = function(pCommentL1List, pActiveProfile){
	pCommentL1List.forEach((item) => {															// Pour chacun des posts du membre
		this.displayCommentL1(item, pActiveProfile);
	});
}