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
	this.vPostTitle;
	this.vPostMsg;
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
	var vLastPost;
	var vLastPostId;
	var vLastPostNumber;
	var vMountPointPostEdit = document.getElementById('idDivMountPointPostEdit'+pActiveProfile);

	// Détermine le dernier N° de Post par Exploitation du DOM
	if (vMountPointPostEdit.firstElementChild.nextElementSibling){									// Il y a au moins 1 Post
		vLastPost = vMountPointPostEdit.firstElementChild.nextElementSibling;
		vLastPostId = vLastPost.id;
		vLastPostNumber = vLastPostId.slice(('idPublishedPost' + pActiveProfile).length, vLastPostId.length)
		this.lastPublishedPost = parseInt(vLastPostNumber) + 1;

console.log('displayPublishedPosts  1 - this.lastPublishedPost : ',this.lastPublishedPost)
	} else {																																				// Il n'y a aucun Post
		this.lastPublishedPost = 0;
console.log('displayPublishedPosts  1 - this.lastPublishedPost : ',this.lastPublishedPost)
	}

	vlineHTML.vDivCard = window.document.createElement('div');
	vMountPointPostEdit.insertBefore(vlineHTML.vDivCard, vLastPost);								// Insertion du dernier Post avant l'avant-dernier Post, etc, etc
	vlineHTML.vDivCard.setAttribute('id', 'idPublishedPost'+ pActiveProfile + this.lastPublishedPost);
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
	vlineHTML.vDivTimeStamp.setAttribute('id', 'idDivTimeStampPost'+ pActiveProfile + this.lastPublishedPost);
	vlineHTML.vDivTimeStamp.setAttribute('class', 'text-dark p-0 ml-2 font-size-70 align-self-center');
	vlineHTML.vDivTimeStamp.innerHTML = moment(pPostToPublish.postDate).format('[à publié le ]dddd DD MMMM YYYY [à] HH[h ]mm[mn ]ss[sec.]');

	vlineHTML.vDivTimeStampMoment = window.document.createElement('div');
	vlineHTML.vDivCardHeaderRow.appendChild(vlineHTML.vDivTimeStampMoment);
	vlineHTML.vDivTimeStampMoment.setAttribute('id', 'idDivTimeStampMoment'+ pActiveProfile + this.lastPublishedPost);
	vlineHTML.vDivTimeStampMoment.setAttribute('class', 'd-none');
	vlineHTML.vDivTimeStampMoment.innerHTML = moment(pPostToPublish.postDate);


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
	vlineHTML.vTextAreaPost.setAttribute('id', 'idPublishedPostArea' + pActiveProfile + this.lastPublishedPost);
	vlineHTML.vTextAreaPost.setAttribute('class', 'form-control bg-light mt-2 px-0 pb-0 textAreaAutoResizable');
	vlineHTML.vTextAreaPost.setAttribute('name', 'publishedPostArea'+pActiveProfile + this.lastPublishedPost);
	vlineHTML.vTextAreaPost.setAttribute('readonly', '');
	vlineHTML.vTextAreaPost.setAttribute('style', 'box-shadow: none; border-top: 1px darkGray solid; border-right: none; border-bottom: none; border-left: none; border-radius: unset; resize: none;');
	vlineHTML.vTextAreaPost.value = pPostToPublish.postMsg;
	vToolBox.autoResizeElem(vlineHTML.vTextAreaPost.id);						// Redimensionnement automatique (mais limité) du champs

	// Card Footer
	vlineHTML.vDivFooter = window.document.createElement('div');
	vlineHTML.vDivCard.appendChild(vlineHTML.vDivFooter);
	vlineHTML.vDivFooter.setAttribute('class', 'card-footer border mt-1 py-1');

	vlineHTML.vDivRow2 = window.document.createElement('div');
	vlineHTML.vDivFooter.appendChild(vlineHTML.vDivRow2);
	vlineHTML.vDivRow2.setAttribute('class', 'row justify-content-between mx-0 px-0');

	vlineHTML.vBtnCommentL1 = window.document.createElement('button');
	vlineHTML.vDivRow2.appendChild(vlineHTML.vBtnCommentL1);
	vlineHTML.vBtnCommentL1.setAttribute('id', 'idBtnCommentL1' + pActiveProfile + this.lastPublishedPost);
	vlineHTML.vBtnCommentL1.setAttribute('type', 'button');
	vlineHTML.vBtnCommentL1.setAttribute('data-toggle', 'collapse');
	vlineHTML.vBtnCommentL1.setAttribute('data-target', '#idDivCollapseL1' + pActiveProfile + this.lastPublishedPost);
	vlineHTML.vBtnCommentL1.setAttribute('aria-expanded', 'false');
	vlineHTML.vBtnCommentL1.setAttribute('aria-controls', 'idDivCollapseL1' + pActiveProfile + this.lastPublishedPost);
	vlineHTML.vBtnCommentL1.setAttribute('class', 'btn btn-sm bg-light pushBtnFilters border-success');

	vlineHTML.vICommentL1 = window.document.createElement('i');
	vlineHTML.vBtnCommentL1.appendChild(vlineHTML.vICommentL1);
	vlineHTML.vICommentL1.setAttribute('id', 'idICommentL1' + pActiveProfile + this.lastPublishedPost);
	vlineHTML.vICommentL1.setAttribute('class', 'fa fa-commenting-o fa-2x text-dark');
	
	vlineHTML.vBtnDeletePost = window.document.createElement('button');
	vlineHTML.vDivRow2.appendChild(vlineHTML.vBtnDeletePost);
	vlineHTML.vBtnDeletePost.setAttribute('id', 'idBtnDeletePost' + pActiveProfile + this.lastPublishedPost);
	vlineHTML.vBtnDeletePost.setAttribute('type', 'button');
	vlineHTML.vBtnDeletePost.setAttribute('class', 'btn btn-sm bg-light pushBtnFilters border-danger');
	vlineHTML.vBtnDeletePost.setAttribute('style', 'visibility: hidden;');
	vlineHTML.vBtnDeletePost.innerHTML = 'Supprimer';
	if 	((vMemberClient.member.pseudo === vlineHTML.vH5Header.innerHTML) || // Si je suis l'auteur du post, je peux effacer mon Post
			(pActiveProfile === cstMainProfileActive)){													// Le propriétaire du mur peut effacer tous les Posts qu'il désire (les siens et ceux des autres)
		vlineHTML.vBtnDeletePost.style.visibility='visible';									// Alors Affichage du bouton de suppression du Post
		vlineHTML.vBtnDeletePost.addEventListener('click', this.deletePublishedPost.bind(this),false);
	}


	// Gestion du "Collapse"
	vlineHTML.vDivRow3 = window.document.createElement('div');
	vlineHTML.vDivFooter.appendChild(vlineHTML.vDivRow3);
	vlineHTML.vDivRow3.setAttribute('class', 'row');

	vlineHTML.vdivColCollapse = window.document.createElement('div');
	vlineHTML.vDivRow3.appendChild(vlineHTML.vdivColCollapse);
	vlineHTML.vdivColCollapse.setAttribute('class', 'col');

	vlineHTML.vDivCollapse = window.document.createElement('div');
	vlineHTML.vdivColCollapse.appendChild(vlineHTML.vDivCollapse);
	vlineHTML.vDivCollapse.setAttribute('id', 'idDivCollapseL1' + pActiveProfile + this.lastPublishedPost);
	vlineHTML.vDivCollapse.setAttribute('class', 'collapse mt-2');


	// Groupe d'éléments pour la création de commentaires de niveau 1
	vlineHTML.vGroupCommentL1 = window.document.createElement('div');
	vlineHTML.vDivCollapse.appendChild(vlineHTML.vGroupCommentL1);
	vlineHTML.vGroupCommentL1.setAttribute('class', 'input-group input-group-sm border rounded');

	vlineHTML.vInputCommentL1 = window.document.createElement('input');
	vlineHTML.vGroupCommentL1.appendChild(vlineHTML.vInputCommentL1);
	vlineHTML.vInputCommentL1.setAttribute('id', 'idInputCommentL1'+pActiveProfile + this.lastPublishedPost);
	vlineHTML.vInputCommentL1.setAttribute('type', 'text');
	vlineHTML.vInputCommentL1.setAttribute('placeholder', 'Ajouter un commentaire...');
	vlineHTML.vInputCommentL1.setAttribute('class', 'form-control');
	vlineHTML.vInputCommentL1.setAttribute('name', 'inputCommentL1'+pActiveProfile + this.lastPublishedPost);
	// XXXXX
	// vlineHTML.vInputCommentL1.setAttribute('style', 'border: none !important; box-shadow: none; outline: none;');

	vlineHTML.vClearCommentL1 = window.document.createElement('div');
	vlineHTML.vGroupCommentL1.appendChild(vlineHTML.vClearCommentL1);
	vlineHTML.vClearCommentL1.setAttribute('class', 'input-group-append');

	vlineHTML.vBtnClearCommentL1 = window.document.createElement('button');
	vlineHTML.vClearCommentL1.appendChild(vlineHTML.vBtnClearCommentL1);
	vlineHTML.vBtnClearCommentL1.setAttribute('id', 'idBtnClearCommentL1' + pActiveProfile + this.lastPublishedPost);
	vlineHTML.vBtnClearCommentL1.setAttribute('class', 'btn btn-sm border pushBtnFilters');

	vlineHTML.vIIconClearCommentL1 = window.document.createElement('i');
	vlineHTML.vBtnClearCommentL1.appendChild(vlineHTML.vIIconClearCommentL1);
	vlineHTML.vIIconClearCommentL1.setAttribute('class', 'fa fa-fw fa-times');

	vlineHTML.vBtnAddCommentL1 = window.document.createElement('button');
	vlineHTML.vClearCommentL1.appendChild(vlineHTML.vBtnAddCommentL1);
	vlineHTML.vBtnAddCommentL1.setAttribute('id', 'idBtnAddCommentL1' + pActiveProfile + this.lastPublishedPost);
	vlineHTML.vBtnAddCommentL1.setAttribute('class', 'btn btn-sm border pushBtnFilters');

	vlineHTML.vIIconAddCommentL1 = window.document.createElement('i');
	vlineHTML.vBtnAddCommentL1.appendChild(vlineHTML.vIIconAddCommentL1);
	vlineHTML.vIIconAddCommentL1.setAttribute('class', 'fa fa-fw fa-check');

  vDataToTransmit = 
  {
    // myPseudo            : pSearchFilterParams.myPseudo,
		// msgRestoreFullList	: pSearchFilterParams.msgRestoreFullList,
		// msgFilteredList			: pSearchFilterParams.msgFilteredList,
		// thisContext					: this,
	}

	vlineHTML.vBtnAddCommentL1.addEventListener('click', this.addCommentL1.bind(this),false);
	vlineHTML.vBtnAddCommentL1.datas = vDataToTransmit;
	vlineHTML.vIIconAddCommentL1.datas = vDataToTransmit;

	vlineHTML.vBtnClearCommentL1.addEventListener('click', this.clearCommentL1.bind(this),false);
	vlineHTML.vBtnClearCommentL1.datas = vDataToTransmit;
  vlineHTML.vIIconClearCommentL1.datas = vDataToTransmit;	

	console.log('displayPublishedPosts - "#idDivCollapseL1" + pActiveProfile + this.lastPublishedPost : ','#idDivCollapseL1' + pActiveProfile + this.lastPublishedPost)
	console.log('displayPublishedPosts - "#idInputCommentL1" + pActiveProfile + this.lastPublishedPost : ','#idInputCommentL1' + pActiveProfile + this.lastPublishedPost)
	

	$('#idDivCollapseL1' + pActiveProfile + this.lastPublishedPost).on('shown.bs.collapse', (event) => {
		var vFocusId = event.target.id;
		var vFocusNumber = vFocusId.slice(('idDivCollapseL1' + pActiveProfile).length, vFocusId.length)
		$('#idInputCommentL1'+pActiveProfile + vFocusNumber).focus();
	})
}

// -----------------------------------------------------------------------------
// Cette méthode publie un nouveau commentaire de Niveau 1 (L1)
// -----------------------------------------------------------------------------
PostsClient.prototype.addCommentL1 = function(){
alert('Commentaire L1 ajouté')
}

// -----------------------------------------------------------------------------
// Cette méthode efface le champ du nouveau commentaire de Niveau 1 (L1)
// -----------------------------------------------------------------------------
PostsClient.prototype.clearCommentL1 = function(){
	document.getElementById('idInputCommentL1'+vActiveProfile + this.lastPublishedPost).value = '';
}

// -----------------------------------------------------------------------------
// Cette méthode publie le nouveau Post
// -----------------------------------------------------------------------------
PostsClient.prototype.publishPost = function(){
	if (this.vPostMsg.value){				// Si le message est non vide, il est publié
		this.addPublishedPost();
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
	var vBtnClicked = event.originalTarget.id;												// Obtient le N° d'indice du bouton "Supprimer" dans le DOM
	index = vBtnClicked.slice(('idBtnDeletePost' + vActiveProfile).length, vBtnClicked.length);

	var vDivTimeStampMoment = document.getElementById('idDivTimeStampMoment'+vActiveProfile+index);		// On va lire la Date/Heure associée au Post
	vTimeStampMoment = moment(vDivTimeStampMoment.innerHTML).format();																		// On formatte la Date/Heure au format par défaut, utilisé dans la BDD

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
// Cette méthode publie le nouveau Post et le stocke dans la BDD
// -----------------------------------------------------------------------------
PostsClient.prototype.addPublishedPost = function(){
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

// -----------------------------------------------------------------------------
// Cette méthode supprime le Post correspondant à l'index passé en paramètre
// -----------------------------------------------------------------------------
PostsClient.prototype.deletePost = function(pPostToDelete, pActiveProfile){
	var vElem = document.getElementById('idPublishedPost' + pActiveProfile + pPostToDelete.index);
	var vParentNode = vElem.parentNode;
	
	// Effacement du Post
	vParentNode.removeChild(vElem);
	
	var i = pPostToDelete.index;
	// Renommage de tous les posts supérieurs pour avoir une numérotation sequentielle des Posts (sans trous)
	if (vParentNode.firstElementChild.nextElementSibling){
		var vLastPost = vParentNode.firstElementChild.nextElementSibling.id;
		var vMaxPostNumber = vLastPost.slice(('idPublishedPost'+pActiveProfile).length, vLastPost.length);
		
		while (i < vMaxPostNumber){
			document.getElementById('idPublishedPost'+ pActiveProfile + (i + 1)).setAttribute('id', 'idPublishedPost'+ pActiveProfile + i);
			document.getElementById('idDivTimeStampPost'+ pActiveProfile + (i + 1)).setAttribute('id', 'idDivTimeStampPost'+ pActiveProfile + i);
			document.getElementById('idDivTimeStampMoment'+ pActiveProfile + (i + 1)).setAttribute('id', 'idDivTimeStampMoment'+ pActiveProfile + i);
			document.getElementById('idPublishedPostArea'+ pActiveProfile + (i + 1)).setAttribute('id', 'idPublishedPostArea'+ pActiveProfile + i);
			document.getElementById('idBtnDeletePost'+ pActiveProfile + (i + 1)).setAttribute('id', 'idBtnDeletePost'+ pActiveProfile + i);
			document.getElementById('idBtnCommentL1'+ pActiveProfile + (i + 1)).setAttribute('id', 'idBtnCommentL1'+ pActiveProfile + i);
			document.getElementById('idICommentL1'+ pActiveProfile + (i + 1)).setAttribute('id', 'idICommentL1'+ pActiveProfile + i);
			document.getElementById('idInputCommentL1'+ pActiveProfile + (i + 1)).setAttribute('id', 'idInputCommentL1'+ pActiveProfile + i);
			document.getElementById('idDivCollapseL1'+ pActiveProfile + (i + 1)).setAttribute('id', 'idDivCollapseL1'+ pActiveProfile + i);
			document.getElementById('idBtnClearCommentL1'+ pActiveProfile + (i + 1)).setAttribute('id', 'idBtnClearCommentL1'+ pActiveProfile + i);
			document.getElementById('idBtnAddCommentL1'+ pActiveProfile + (i + 1)).setAttribute('id', 'idBtnAddCommentL1'+ pActiveProfile + i);
			i++;
		}
	}
}
