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

function Posts(pMemberClient){   						// Fonction constructeur exportée
	this.memberClient = pMemberClient;
	this.lastPublishedPost = 0;				// N0 du dernier Post publié affiché
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
Posts.prototype.displayPostEdit = function(){
	var vlineHTML = {};						
	var vMountPointPostEdit = document.getElementById('idDivMountPointPostEdit'+vActiveProfile);

	vlineHTML.vDivCard = window.document.createElement('div');
	vMountPointPostEdit.appendChild(vlineHTML.vDivCard);
	vlineHTML.vDivCard.setAttribute('id', 'idPostEditCard'+vActiveProfile);
	vlineHTML.vDivCard.setAttribute('class', 'card text-white bg-warning border-warning mb-3');

	vlineHTML.vDivCardHeader = window.document.createElement('div');
	vlineHTML.vDivCard.appendChild(vlineHTML.vDivCardHeader);
	vlineHTML.vDivCardHeader.setAttribute('class', 'card-header py-0 pb-1');

	vlineHTML.vH5Header = window.document.createElement('h5');
	vlineHTML.vDivCardHeader.appendChild(vlineHTML.vH5Header);
	vlineHTML.vH5Header.setAttribute('class', 'card-title text-dark ml-0');
	vlineHTML.vH5Header.innerHTML = 'Postez vos idées et informations...';

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

	vlineHTML.vDivFooter = window.document.createElement('div');
	vlineHTML.vDivCard.appendChild(vlineHTML.vDivFooter);
	vlineHTML.vDivFooter.setAttribute('class', 'card-footer row justify-content-end border py-1 px-0 mx-0 mt-1');
	
	vlineHTML.vBtnValidPost = window.document.createElement('button');
	vlineHTML.vDivFooter.appendChild(vlineHTML.vBtnValidPost);
	vlineHTML.vBtnValidPost.setAttribute('id', 'idBtnValidPost'+vActiveProfile);
	vlineHTML.vBtnValidPost.setAttribute('type', 'button');
	vlineHTML.vBtnValidPost.setAttribute('class', 'btn btn-sm bg-light pushBtnFilters mr-4 border-success');
	vlineHTML.vBtnValidPost.innerHTML = 'Post';

	vlineHTML.vBtnValidPost.addEventListener('click', this.publishPost.bind(this),false);
	vlineHTML.vBtnValidPost.datas = vDataToTransmit;

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

	// Permet d'auto-resizer les champs "textare" ayant le selecteur CSS "textAreaAutoResizable", 
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
Posts.prototype.displayPublishedPosts = function(pPostToPublish){
	var vlineHTML = {};						
	var vMountPointPostEdit = document.getElementById('idDivMountPointPostEdit'+vActiveProfile);

	// Détermination du N° d'Id
	// le N° d'Id est déterminé automatiquement par cette méthode
	while ($('#idPublishedPost'+ vActiveProfile +this.lastPublishedPost).length > 0) { 
		this.lastPublishedPost++;
	}

	vlineHTML.vDivCard = window.document.createElement('div');

	if(this.lastPublishedPost === 0){									// Si c'est le 1er Post affiché, je l'affiche juste en dessous de l'éditeur de Posts
		vMountPointPostEdit.appendChild(vlineHTML.vDivCard);
	} else {																					// sinon je l'insere entre l'éditeur de Posts, et le dernier Post affiché situé juste au dessous
		var vLastPublishedPost = document.getElementById('idPublishedPost'+ vActiveProfile +(this.lastPublishedPost - 1));
		var parentDiv = vLastPublishedPost.parentNode;
		parentDiv.insertBefore(vlineHTML.vDivCard, vLastPublishedPost);
	}

	vlineHTML.vDivCard.setAttribute('id', 'idPublishedPost'+ vActiveProfile + this.lastPublishedPost);
	vlineHTML.vDivCard.setAttribute('class', 'card text-white bg-warning border-warning mb-3');

	vlineHTML.vDivCardHeader = window.document.createElement('div');
	vlineHTML.vDivCard.appendChild(vlineHTML.vDivCardHeader);
	vlineHTML.vDivCardHeader.setAttribute('class', 'card-header py-1');

	vlineHTML.vImgAvatToken = window.document.createElement('img');
	vlineHTML.vDivCardHeader.appendChild(vlineHTML.vImgAvatToken);
	vlineHTML.vImgAvatToken.setAttribute('class', 'avatarToken tokenSize32 ml-0');
	vlineHTML.vImgAvatToken.setAttribute('alt', 'Avatar');
	vlineHTML.vImgAvatToken.setAttribute('src', 'static/images/'+pPostToPublish.authorPhoto);

	vlineHTML.vH5Header = window.document.createElement('h5');
	vlineHTML.vDivCardHeader.appendChild(vlineHTML.vH5Header);
	vlineHTML.vH5Header.setAttribute('class', 'card-title text-dark');
	vlineHTML.vH5Header.innerHTML = pPostToPublish.authorPseudo;

	vlineHTML.vDivCardBody = window.document.createElement('div');
	vlineHTML.vDivCard.appendChild(vlineHTML.vDivCardBody);
	vlineHTML.vDivCardBody.setAttribute('class', 'card-body bg-white text-dark px-1 pt-2 pb-0');
	
	vlineHTML.vDivContainer = window.document.createElement('div');
	vlineHTML.vDivCardBody.appendChild(vlineHTML.vDivContainer);
	vlineHTML.vDivContainer.setAttribute('class', 'container px-1');

	vlineHTML.vDivRow = window.document.createElement('div');
	vlineHTML.vDivContainer.appendChild(vlineHTML.vDivRow);
	vlineHTML.vDivRow.setAttribute('class', 'row m-0');

	vlineHTML.vH5Subject = window.document.createElement('h5');
	vlineHTML.vDivRow.appendChild(vlineHTML.vH5Subject);
	vlineHTML.vH5Subject.setAttribute('class', 'col-auto p-0 m-0');
	if (!pPostToPublish.postTitle){
		vlineHTML.vH5Subject.innerHTML = 'Sans titre';
	} else {
		vlineHTML.vH5Subject.innerHTML = pPostToPublish.postTitle;
	}
	
	vlineHTML.vTextAreaPost = window.document.createElement('textarea');
	vlineHTML.vDivContainer.appendChild(vlineHTML.vTextAreaPost);
	vlineHTML.vTextAreaPost.setAttribute('id', 'idPublishedPostArea' + vActiveProfile + this.lastPublishedPost);
	vlineHTML.vTextAreaPost.setAttribute('class', 'form-control bg-light mt-2 px-0 pb-0 textAreaAutoResizable');
	vlineHTML.vTextAreaPost.setAttribute('name', 'publishedPostArea'+vActiveProfile);
	vlineHTML.vTextAreaPost.setAttribute('readonly', '');
	vlineHTML.vTextAreaPost.setAttribute('style', 'box-shadow: none; border-top: 1px darkGray solid; border-right: none; border-bottom: none; border-left: none; border-radius: unset; resize: none;');
	vlineHTML.vTextAreaPost.value = pPostToPublish.postMsg;
	
	vlineHTML.vDivFooter = window.document.createElement('div');
	vlineHTML.vDivCard.appendChild(vlineHTML.vDivFooter);
	vlineHTML.vDivFooter.setAttribute('class', 'card-footer row justify-content-between border py-1 px-0 mx-0 mt-1');

	vlineHTML.vDivTimeStamp = window.document.createElement('div');
	vlineHTML.vDivFooter.appendChild(vlineHTML.vDivTimeStamp);
	vlineHTML.vDivTimeStamp.setAttribute('class', 'col-auto text-dark p-0 ml-2 font-size-70 align-self-center');
	vlineHTML.vDivTimeStamp.innerHTML = pPostToPublish.postDate;

	vlineHTML.vBtnDeletePost = window.document.createElement('button');
	vlineHTML.vDivFooter.appendChild(vlineHTML.vBtnDeletePost);
	vlineHTML.vBtnDeletePost.setAttribute('id', 'idBtnDeletePost' + vActiveProfile + this.lastPublishedPost);
	vlineHTML.vBtnDeletePost.setAttribute('type', 'button');
	vlineHTML.vBtnDeletePost.setAttribute('class', 'btn btn-sm bg-light pushBtnFilters mr-4 border-danger');
	vlineHTML.vBtnDeletePost.innerHTML = 'Supprimer';

	vlineHTML.vBtnDeletePost.addEventListener('click', this.deletePublishedPost.bind(this),false);
}

// -----------------------------------------------------------------------------
// Cette méthode supprime un Post
// -----------------------------------------------------------------------------
Posts.prototype.deletePublishedPost = function(){
	alert('Post supprimé')
}

// -----------------------------------------------------------------------------
// Cette méthode publie le nouveau Post
// -----------------------------------------------------------------------------
Posts.prototype.addPublishedPost = function(){

console.log('addPublishedPost - vMemberClient : ',vMemberClient)

	var vPostToPublish = {
		authorPseudo 	: vMemberClient.member.pseudo,								// C'est toujours le membre principal qui écrit
		authorPhoto		:	vMemberClient.member.etatCivil.photo,
		postDate    	: moment().format('[Publié le ]dddd DD MMMM YYYY [à] HH[h ]mm[mn ]ss[sec.]'),
		postTitle			: this.vPostTitle.value,
		postMsg				: this.vPostMsg.value,
		postOwner			: this.memberClient.member.pseudo,		// Par contre le membre principal, peut poster un message sur le profil de son ami
	}

console.log('addPublishedPost - vPostToPublish : ',vPostToPublish)
	this.displayPublishedPosts(vPostToPublish);
}

// -----------------------------------------------------------------------------
// Cette méthode publie le nouveau Post
// -----------------------------------------------------------------------------
Posts.prototype.publishPost = function(){
	if (this.vPostMsg.value){				// Si le message est non vide, il est publié
		this.addPublishedPost();
		vToolBox.autoResizeElem('idPublishedPostArea' + vActiveProfile + this.lastPublishedPost);
	}

	// Réinitialisation (Contenant et contenu) de la carte "PostEdit"
	this.vPostTitle.value = null;
	this.vPostMsg.value = null;
	vToolBox.autoResizeElem(this.vPostMsg.id);
}

// -----------------------------------------------------------------------------
// Cette méthode affiche les Posts
// -----------------------------------------------------------------------------
Posts.prototype.displayPosts = function(){
	this.displayPostEdit();

	var vPostToPublish = {
		authorPseudo 	: vMemberClient.member.pseudo,								// C'est toujours le membre principal qui écrit
		authorPhoto		:	vMemberClient.member.etatCivil.photo,
		postDate    	: moment().format('[Publié le ]dddd DD MMMM YYYY [à] HH[h ]mm[mn ]ss[sec.]'),
		postTitle			: 'Titre du Message N°1',
		postMsg				: 'Ceci est le message N°1',
		postOwner			: this.memberClient.member.pseudo,		// Par contre le membre principal, peut poster un message sur le profil de son ami
	}
	this.displayPublishedPosts(vPostToPublish);

	var vPostToPublish = {
		authorPseudo 	: vMemberClient.member.pseudo,								// C'est toujours le membre principal qui écrit
		authorPhoto		:	vMemberClient.member.etatCivil.photo,
		postDate    	: moment().format('[Publié le ]dddd DD MMMM YYYY [à] HH[h ]mm[mn ]ss[sec.]'),
		postTitle			: 'Titre du Message N°2',
		postMsg				: 'Ceci est le message N°2',
		postOwner			: this.memberClient.member.pseudo,		// Par contre le membre principal, peut poster un message sur le profil de son ami
	}
	this.displayPublishedPosts(vPostToPublish);

	var vPostToPublish = {
		authorPseudo 	: vMemberClient.member.pseudo,								// C'est toujours le membre principal qui écrit
		authorPhoto		:	vMemberClient.member.etatCivil.photo,
		postDate    	: moment().format('[Publié le ]dddd DD MMMM YYYY [à] HH[h ]mm[mn ]ss[sec.]'),
		postTitle			: 'Titre du Message N°3',
		postMsg				: 'Ceci est le message N°3',
		postOwner			: this.memberClient.member.pseudo,		// Par contre le membre principal, peut poster un message sur le profil de son ami
	}
	this.displayPublishedPosts(vPostToPublish);

	var vPostToPublish = {
		authorPseudo 	: vMemberClient.member.pseudo,								// C'est toujours le membre principal qui écrit
		authorPhoto		:	vMemberClient.member.etatCivil.photo,
		postDate    	: moment().format('[Publié le ]dddd DD MMMM YYYY [à] HH[h ]mm[mn ]ss[sec.]'),
		postTitle			: 'Titre du Message N°4',
		postMsg				: 'Ceci est le message N°4',
		postOwner			: this.memberClient.member.pseudo,		// Par contre le membre principal, peut poster un message sur le profil de son ami
	}
	this.displayPublishedPosts(vPostToPublish);

	var vPostToPublish = {
		authorPseudo 	: vMemberClient.member.pseudo,								// C'est toujours le membre principal qui écrit
		authorPhoto		:	vMemberClient.member.etatCivil.photo,
		postDate    	: moment().format('[Publié le ]dddd DD MMMM YYYY [à] HH[h ]mm[mn ]ss[sec.]'),
		postTitle			: 'Titre du Message N°5',
		postMsg				: 'Ceci est le message N°5',
		postOwner			: this.memberClient.member.pseudo,		// Par contre le membre principal, peut poster un message sur le profil de son ami
	}
	this.displayPublishedPosts(vPostToPublish);
	var vPostToPublish = {
		authorPseudo 	: vMemberClient.member.pseudo,								// C'est toujours le membre principal qui écrit
		authorPhoto		:	vMemberClient.member.etatCivil.photo,
		postDate    	: moment().format('[Publié le ]dddd DD MMMM YYYY [à] HH[h ]mm[mn ]ss[sec.]'),
		postTitle			: 'Titre du Message N°6',
		postMsg				: 'Ceci est le message N°6',
		postOwner			: this.memberClient.member.pseudo,		// Par contre le membre principal, peut poster un message sur le profil de son ami
	}
	this.displayPublishedPosts(vPostToPublish);

	var vPostToPublish = {
		authorPseudo 	: vMemberClient.member.pseudo,								// C'est toujours le membre principal qui écrit
		authorPhoto		:	vMemberClient.member.etatCivil.photo,
		postDate    	: moment().format('[Publié le ]dddd DD MMMM YYYY [à] HH[h ]mm[mn ]ss[sec.]'),
		postTitle			: 'Titre du Message N°7',
		postMsg				: 'Ceci est le message N°7',
		postOwner			: this.memberClient.member.pseudo,		// Par contre le membre principal, peut poster un message sur le profil de son ami
	}
	this.displayPublishedPosts(vPostToPublish);

	var vPostToPublish = {
		authorPseudo 	: vMemberClient.member.pseudo,								// C'est toujours le membre principal qui écrit
		authorPhoto		:	vMemberClient.member.etatCivil.photo,
		postDate    	: moment().format('[Publié le ]dddd DD MMMM YYYY [à] HH[h ]mm[mn ]ss[sec.]'),
		postTitle			: 'Titre du Message N°8',
		postMsg				: 'Ceci est le message N°8',
		postOwner			: this.memberClient.member.pseudo,		// Par contre le membre principal, peut poster un message sur le profil de son ami
	}
	this.displayPublishedPosts(vPostToPublish);
}
